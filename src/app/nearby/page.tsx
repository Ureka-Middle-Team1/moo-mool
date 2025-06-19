"use client";

import NearbyHeader from "@/components/nearby/NearbyHeader";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import NearbyUserAvatar from "@/components/nearby/NearbyUserAvatar";
import { motion, AnimatePresence } from "framer-motion";
import { NearbyUser } from "@/types/Nearby";
import { useGetUserCharacterProfile } from "@/hooks/useGetUserCharacterProfile";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { client } from "@/lib/axiosInstance";

export default function NearbyPage() {
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const { data: myProfile } = useGetUserCharacterProfile(userId);
  const { data: userInfo } = useGetUserInfo(userId);

  const [users, setUsers] = useState<NearbyUser[]>([]);
  const [interactedUserIds, setInteractedUserIds] = useState<Set<string>>(
    new Set()
  );

  const myIdRef = useRef<string | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  const positionCache = useRef(
    new Map<string, { angle: number; distance: number }>()
  );
  const clickedUserPositions = useRef(
    new Map<string, { angle: number; distance: number }>()
  );

  useEffect(() => {
    if (userId) myIdRef.current = userId;
  }, [userId]);

  // ✅ 초대 수 전송 함수 정의
  const sendInviteCount = async () => {
    if (userId && interactedUserIds.size > 0) {
      try {
        const res = await client.post("/user/invite-multiple", {
          inviterId: userId,
          count: interactedUserIds.size,
        });
        console.log("✅ 초대한 사용자 수 반영 완료:", res.data);
        // optional: alert("초대한 수 반영 완료!");
      } catch (err) {
        console.error("❌ 초대한 사용자 수 반영 실패:", err);
      }
    }
  };

  // ✅ 페이지 이탈 감지 및 처리
  useEffect(() => {
    const handleLeave = () => {
      sendInviteCount(); // async 아님, 위에서 Axios로 처리되도록 수정
    };

    window.addEventListener("pagehide", handleLeave); // ✅ 모바일 브라우저 포함 안전
    return () => {
      handleLeave();
      window.removeEventListener("pagehide", handleLeave);
    };
  }, [userId, interactedUserIds]);

  // ✅ WebSocket 연결 및 메시지 처리
  useEffect(() => {
    if (!userId || !userInfo) {
      console.log("websoket 연결 중");
      return;
    }

    const socket = new WebSocket(process.env.NEXT_PUBLIC_WSS_SERVER_URL!);
    wsRef.current = socket;

    const sendLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          if (wsRef.current?.readyState === WebSocket.OPEN) {
            wsRef.current.send(
              JSON.stringify({
                type: "location_update",
                userId,
                userName: userInfo.name,
                lat: latitude,
                lng: longitude,
              })
            );
          }
        },
        (err) => console.error("❌ 위치 에러:", err)
      );
    };

    socket.onopen = () => {
      console.log("websocket 연결됨");
      sendLocation();
      const intervalId = setInterval(sendLocation, 1000);
      return () => clearInterval(intervalId);
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      console.log("message", message);

      if (message.type === "nearby_users") {
        const filtered = message.nearbyUsers.filter(
          (u: NearbyUser) => u.userId !== myIdRef.current
        );
        setUsers(filtered);
      }

      if (message.type === "click_notice") {
        const fromName = message.fromUserName || message.fromUserId;
        const toName = message.toUserName || userInfo?.name || message.toUserId;

        if (fromName && toName) {
          alert(`${fromName}님이 ${toName}님을 클릭했습니다`);
        }
      }
    };

    socket.onerror = (e) => {
      console.error("WebSocket 에러 발생:", e);
    };

    socket.onclose = () => {
      console.log("❌ WebSocket 연결 종료됨");
    };

    console.log("NearByPage 초기 세팅 완료");

    return () => {
      // ✅ 페이지 이탈 시 초대 수 증가 요청
      console.log("✅ ✅ ✅ ✅ 스탬프 개수", interactedUserIds.size);
      if (userId && interactedUserIds.size > 0) {
        client
          .post("/user/invite-multiple", {
            inviterId: userId,
            count: interactedUserIds.size,
          })
          .then((res) => {
            console.log("✅ 초대한 사용자 수 반영 완료:", res.data);
          })
          .catch((err) => {
            console.error("❌ 초대한 사용자 수 반영 실패:", err);
          });
      }

      socket.close();
    };
  }, [userId, userInfo]);

  const handleUserClick = (targetId: string, clickedType?: string) => {
    const myType = myProfile?.type;
    if (!clickedType || !myType || !wsRef.current || !userInfo?.name) {
      console.log("아직 세팅 다 안됨");
      return;
    }

    if (clickedType === myType) {
      const pos = positionCache.current.get(targetId);
      if (pos) clickedUserPositions.current.set(targetId, pos);
      setInteractedUserIds((prev) => new Set(prev).add(targetId));
      console.log("아이콘 클릭");
      // ✅ WebSocket 상태 확인 후 클릭 전송
      if (wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(
          JSON.stringify({
            type: "user_click",
            fromUserId: userId,
            fromUserName: userInfo?.name,
            toUserId: targetId,
          })
        );
      }
    }
  };

  if (!userId) {
    return (
      <div className="p-4 text-center text-gray-500">로그인이 필요합니다</div>
    );
  }

  return (
    <>
      <NearbyHeader />
      <div className="relative flex h-screen items-center justify-center overflow-hidden bg-white">
        {[20, 40, 60, 90, 110, 130].map((r, idx) => (
          <div
            key={`circle-${r}`}
            className="absolute animate-ping rounded-full border border-yellow-300"
            style={{
              width: `${r}vw`,
              height: `${r}vw`,
              left: `calc(50% - ${r / 2}vw)`,
              top: `calc(50% - ${r / 2}vw - 2vh)`,
              animationDelay: `${idx * 0.4}s`,
              opacity: 0.8,
            }}
          />
        ))}

        {/* 나 */}
        <motion.div
          key={`nearby-me`}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 12 }}>
          <NearbyUserAvatar userId={userId} angle={0} distance={0} isMe />
        </motion.div>

        {/* 주변 유저 */}
        <AnimatePresence>
          {users.map((user, idx) => {
            const wasClicked = interactedUserIds.has(user.userId);
            let position = wasClicked
              ? clickedUserPositions.current.get(user.userId)
              : positionCache.current.get(user.userId);

            if (!position) {
              const angle = Math.random() * 360;
              const distance = Math.random() * 30 + 40;
              position = { angle, distance };
              positionCache.current.set(user.userId, position);
            }

            return (
              <motion.div
                key={`nearby-${user.userId}-${idx}`} // ✅ 중복 키 방지
                initial={{ scale: 0.5, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.5, opacity: 0, y: 10 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                <NearbyUserAvatar
                  userId={user.userId}
                  angle={position.angle}
                  distance={position.distance}
                  onClick={(type) => handleUserClick(user.userId, type)}
                  isEmptyStamp={wasClicked}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </>
  );
}

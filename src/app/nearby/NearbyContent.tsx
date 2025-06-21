"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NearbyUser } from "@/types/Nearby";
import NearbyHeader from "@/components/nearby/NearbyHeader";
import NearbyUserAvatar from "@/components/nearby/NearbyUserAvatar";
import { useGetUserCharacterProfile } from "@/hooks/useGetUserCharacterProfile";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { useNearbyStore } from "@/hooks/useNearbyStore";
import { useInviteMultiple } from "@/hooks/useInviteMultiple";
import { useNearbySocket } from "@/hooks/useNearbySocket";

export default function NearbyContent({ session }: { session: any }) {
  const userId = session?.user?.id ?? "";
  const { data: myProfile } = useGetUserCharacterProfile(userId);
  const { data: userInfo } = useGetUserInfo(userId);
  const [users, setUsers] = useState<NearbyUser[]>([]);
  const [interactedUserIds, setInteractedUserIds] = useState<Set<string>>(
    new Set()
  );

  const positionCache = useRef(
    new Map<string, { angle: number; distance: number }>()
  );
  const clickedUserPositions = useRef(
    new Map<string, { angle: number; distance: number }>()
  );
  const { setMyType } = useNearbyStore();
  const { mutate: inviteMultiple } = useInviteMultiple();

  // 내 타입을 글로벌 상태에 저장
  useEffect(() => {
    if (myProfile?.type) {
      setMyType(myProfile.type);
      console.log(" 내 타입 저장됨:", myProfile.type);
    }
  }, [myProfile?.type]);

  // 초대한 사용자 수 전송
  const sendInviteCount = () => {
    if (userId && interactedUserIds.size > 0) {
      inviteMultiple(
        { inviterId: userId, count: interactedUserIds.size },
        {
          onSuccess: (data) =>
            console.log("✅ 초대한 사용자 수 반영 완료:", data),
          onError: (error) =>
            console.error("❌ 초대한 사용자 수 반영 실패:", error),
        }
      );
    }
  };

  // 페이지 이탈 시 초대 수 전송
  useEffect(() => {
    const handleLeave = () => sendInviteCount();
    window.addEventListener("pagehide", handleLeave);
    return () => {
      handleLeave();
      window.removeEventListener("pagehide", handleLeave);
    };
  }, [userId, interactedUserIds]);

  // WebSocket 훅 사용
  const wsRef = useNearbySocket({
    userId,
    userName: userInfo?.name ?? "",
    onNearbyUsers: (nearby) => {
      const filtered = nearby.filter((u) => u.userId !== userId);
      setUsers(filtered);
    },
    onClickNotice: (from, to) => {
      alert(`${from}님이 ${to}님을 클릭했습니다`);
    },
  });

  // 사용자 클릭 처리
  const handleUserClick = (targetId: string, clickedType?: string) => {
    const myType = myProfile?.type;
    if (!clickedType || !myType || !wsRef.current || !userInfo?.name) return;

    if (clickedType === myType) {
      const pos = positionCache.current.get(targetId);
      if (pos) clickedUserPositions.current.set(targetId, pos);
      setInteractedUserIds((prev) => new Set(prev).add(targetId));

      if (wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(
          JSON.stringify({
            type: "user_click",
            fromUserId: userId,
            fromUserName: userInfo.name,
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
        {/* 배경 원 */}
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
                key={`nearby-${user.userId}-${idx}`}
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

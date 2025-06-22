"use client";

import { JSX, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { NearbyUser } from "@/types/Nearby";
import NearbyHeader from "@/components/nearby/NearbyHeader";
import NearbyUserAvatar from "@/components/nearby/NearbyUserAvatar";
import { useGetUserCharacterProfile } from "@/hooks/useGetUserCharacterProfile";
import { useGetUserInfo } from "@/hooks/useGetUserInfo";
import { useNearbyStore } from "@/hooks/useNearbyStore";
import { useNearbySocket } from "@/hooks/useNearbySocket";
import { bounceVariants } from "./animations";
import { useIncreaseInvitedCount } from "@/hooks/useIncreseInvitedCount";

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
  const [localInvitedCount, setLocalInvitedCount] = useState(0);
  const { mutate: increaseInvitedCount } = useIncreaseInvitedCount();

  // 내 타입을 글로벌 상태에 저장
  useEffect(() => {
    if (myProfile?.type) {
      setMyType(myProfile.type);
      console.log(" 내 타입 저장됨:", myProfile.type);
    }
  }, [myProfile?.type]);

  // 사용자의 invited_count 수 가져오기
  useEffect(() => {
    if (userInfo?.invited_count != null && localInvitedCount === 0) {
      setLocalInvitedCount(userInfo.invited_count);
    }
  }, [userInfo?.invited_count]);

  // 클릭 시 중복 alert 방지
  const recentClickRef = useRef<Set<string>>(new Set());

  // WebSocket 훅 사용
  const wsRef = useNearbySocket({
    userId,
    userName: userInfo?.name ?? "",
    onNearbyUsers: (nearby) => {
      const filtered = nearby.filter((u) => u.userId !== userId);
      setUsers(filtered);
    },
    onClickNotice: (from, to, fromId) => {
      if (!recentClickRef.current.has(fromId)) {
        alert(`${from}님이 당신을 클릭했습니다`);
        recentClickRef.current.add(fromId);
      }
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

      // 실시간 invitedCount 증가
      increaseInvitedCount(userId, {
        onSuccess: () => {
          setLocalInvitedCount((prev: number) => Math.min(prev + 1, 10));
        },
      });

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

  //  설명 바 텍스트 동적 생성
  let boosterDisplay: JSX.Element;

  if (localInvitedCount >= 10) {
    boosterDisplay = <span className="font-bold text-yellow-400">만렙!</span>;
  } else if (localInvitedCount >= 5) {
    boosterDisplay = (
      <>
        만렙까지{" "}
        <span className="font-bold text-yellow-400">
          {10 - localInvitedCount}명
        </span>
        !
      </>
    );
  } else {
    boosterDisplay = (
      <>
        레벨업까지{" "}
        <span className="font-bold text-yellow-400">
          {5 - localInvitedCount}명
        </span>
        !
      </>
    );
  }
  console.log("bossterDisplay ~~~~~ ", boosterDisplay);

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
        <div className="relative flex flex-col items-center">
          {/* 설명 바 (absolute가 아니라 margin 대신 translate로 명확하게 띄우기) */}
          <div className="z-40 mb-[-3.5rem] translate-y-[-7rem]">
            <div className="inline-block rounded-full border border-gray-500 bg-black/70 px-4 py-2 text-sm font-medium whitespace-nowrap text-white shadow-md">
              {boosterDisplay}
            </div>
          </div>

          {/* 아바타 */}
          <motion.div
            variants={bounceVariants}
            animate="visible"
            initial={false}>
            <NearbyUserAvatar
              userId={userId}
              angle={0}
              distance={0}
              isMe={true}
            />
          </motion.div>
        </div>

        {/* 주변 유저 */}
        <AnimatePresence>
          {users.map((user, idx) => {
            const wasClicked = interactedUserIds.has(user.userId);
            let position = wasClicked
              ? clickedUserPositions.current.get(user.userId)
              : positionCache.current.get(user.userId);

            if (!position) {
              const angle = Math.random() * 360;
              const distance = Math.random() * 50 + 60;
              position = { angle, distance };
              positionCache.current.set(user.userId, position);
            }

            return (
              <motion.div
                key={`nearby-${user.userId}-${idx}`}
                initial="hidden"
                animate="visible"
                exit={{ scale: 0.5, opacity: 0, y: 10 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                variants={bounceVariants}>
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

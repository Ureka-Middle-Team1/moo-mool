"use client";

import NearbyHeader from "@/components/nearby/NearbyHeader";
import { useNearbySocket } from "@/hooks/useNearbySocket";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import NearbyUserAvatar from "@/components/nearby/NearbyUserAvatar";
import { motion, AnimatePresence } from "framer-motion";
import { NearbyUser } from "@/types/Nearby";
import { useGetUserCharacterProfile } from "@/hooks/useGetUserCharacterProfile";
import MyPageModal from "@/components/myPage/MyPageModal";

export default function NearbyPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const { data: myProfile } = useGetUserCharacterProfile(userId);

  const [users, setUsers] = useState<NearbyUser[]>([]);
  const [interactedUserIds, setInteractedUserIds] = useState<Set<String>>(
    new Set()
  );
  const myIdRef = useRef<string | null>(null);

  // ✅ 일반 사용자 위치 고정용
  const positionCache = useRef<
    Map<string, { angle: number; distance: number }>
  >(new Map());

  // ✅ 클릭된 사용자 위치 저장용
  const clickedUserPositions = useRef<
    Map<string, { angle: number; distance: number }>
  >(new Map());

  useEffect(() => {
    if (userId) {
      myIdRef.current = userId;
    }
  }, [userId]);

  useNearbySocket((users: NearbyUser[]) => {
    // 내 userId는 제외
    const filtered = users.filter((u) => u.userId !== myIdRef.current);

    setUsers(filtered); // 현재 반경 내 사용자 목록 업데이트
  }, userId);

  if (!userId) {
    return (
      <div className="p-4 text-center text-gray-500">로그인이 필요합니다</div>
    );
  }

  const handleUserClick = (userId: string, clickedType?: string) => {
    const myType = myProfile?.type;
    if (!clickedType || !myType) return;

    if (clickedType === myType) {
      console.log("타입 일치 - 아이콘 사라짐");
      setInteractedUserIds((prev) => {
        const newSet = new Set(prev);
        newSet.add(userId);

        // ✅ 클릭 시점의 위치 저장
        const currentPos = positionCache.current.get(userId);
        if (currentPos) {
          clickedUserPositions.current.set(userId, currentPos);
        }

        console.log("클릭된 사용자", interactedUserIds);
        return newSet;
      });
    }
  };

  return (
    <>
      <NearbyHeader onAvatarClick={() => setIsModalOpen(true)} />
      {/* 마이페이지 Modal */}
      <MyPageModal open={isModalOpen} onOpenChange={setIsModalOpen} />
      <div className="relative flex h-screen items-center justify-center overflow-hidden bg-white">
        {/* 배경 파동 원형 */}
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

        {/* 나 표시 (크기 크게 + 보정 위치) */}
        <motion.div
          key={`nearby-me`}
          initial={{ scale: 0, opacity: 0 }} // 처음엔 작고 투명하게
          animate={{ scale: 1, opacity: 1 }} // 등장 시 커지면서 나타남
          transition={{ type: "spring", stiffness: 120, damping: 12 }} // 자연스러운 스프링 효과
        >
          <NearbyUserAvatar userId={userId} angle={0} distance={0} isMe />
        </motion.div>

        {/* 주변 사용자 표시 */}
        <AnimatePresence>
          {users.map((user) => {
            const wasClicked = interactedUserIds.has(user.userId);

            // ✅ 클릭된 경우: clickedUserPositions에 있는 위치 사용
            let position = wasClicked
              ? clickedUserPositions.current.get(user.userId)
              : positionCache.current.get(user.userId);

            // ✅ 위치 캐싱 (랜덤 생성은 최초 1회만)
            if (!position) {
              const angle = Math.random() * 360;
              const distance = Math.random() * 30 + 40;
              position = { angle, distance };
              positionCache.current.set(user.userId, position);
            }

            return (
              <motion.div
                key={`nearby-${user.userId}`}
                initial={{ scale: 0.5, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.5, opacity: 0, y: 10 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}>
                <NearbyUserAvatar
                  userId={user.userId}
                  angle={position.angle}
                  distance={position.distance}
                  onClick={(type) => handleUserClick(user.userId, type)}
                  isEmptyStamp={wasClicked} // ✅ 클릭된 유저는 empty_stamp로
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </>
  );
}

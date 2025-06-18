"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Canvas } from "@react-three/fiber";
import CharacterModel from "../chat/CharacterModel";
import { useGetRecentChatSessions } from "@/hooks/useGetRecentChatSessions";
import { useSession } from "next-auth/react";

export default function FloatingChatbotButton() {
  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const { data: sessions } = useGetRecentChatSessions(userId);

  const fullText = "무너에게 물어봐";
  const [visible, setVisible] = useState(true);
  const [typed, setTyped] = useState("");
  const [showHistory, setShowHistory] = useState(false); // 🔹 최근 세션 보기 상태

  useEffect(() => {
    let current = 0;

    const typeNext = () => {
      setTyped(fullText.slice(0, current + 1));
      current++;

      if (current < fullText.length) {
        setTimeout(typeNext, 130);
      } else {
        setTimeout(() => setVisible(false), 1300);
      }
    };

    const delayStart = setTimeout(() => {
      setVisible(true);
      typeNext();
    }, 300);

    return () => {
      clearTimeout(delayStart);
    };
  }, []);

  return (
    <div
      className="fixed bottom-1 left-1/2 z-40 flex translate-x-[calc(220px-100%)] flex-col items-center"
      onClick={() => setShowHistory((prev) => !prev)}>
      <AnimatePresence>
        {visible && (
          <motion.div
            key="balloon"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4 }}
            className="mb-[-2rem] rounded-full bg-white px-4 py-1.5 text-sm font-medium whitespace-nowrap shadow-md">
            {typed}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative h-40 w-40">
        {/* 🔼 최근 세션 말풍선 */}
        <AnimatePresence>
          {showHistory && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute -top-44 left-1/2 w-72 -translate-x-1/2 rounded-xl bg-white px-4 py-3 text-sm shadow-md ring-1 ring-gray-200">
              <h2 className="mb-2 font-semibold text-gray-800">최근 대화</h2>
              <ul className="max-h-40 space-y-1 overflow-y-auto text-gray-700">
                {sessions?.map((s) => (
                  <li
                    key={s.id}
                    className="rounded-md bg-gray-100 px-3 py-2 text-xs">
                    {s.summary ||
                      JSON.parse(s.messages)?.[0]?.content ||
                      "대화 없음"}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => {
                  setShowHistory(false);
                  router.push("/chat");
                }}
                className="mt-3 w-full rounded-full bg-yellow-300 py-1.5 text-xs font-semibold">
                새 채팅 시작하기
              </button>
            </motion.div>
          )}
        </AnimatePresence>
        {/* 말풍선 클릭 감지 영역 */}
        {/* <div
          className="absolute top-0 z-0 h-full w-full bg-blue-400"
          onClick={() => setShowHistory((prev) => !prev)}
        /> */}
        {/* 🔘 무너 캐릭터 */}
        <Canvas camera={{ position: [0, 0, 2.5] }}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[0, 0, 2]} intensity={0.6} />
          <hemisphereLight intensity={0.6} groundColor="white" />
          <CharacterModel
            onClick={() => {}}
            isSpeaking={false}
            isThinking={false}
          />
        </Canvas>
      </div>
    </div>
  );
}

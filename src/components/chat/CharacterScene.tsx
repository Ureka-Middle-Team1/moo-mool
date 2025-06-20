"use client";

import { useTTS } from "@/hooks/useTTS";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import CharacterModel from "./CharacterModel";
import ShadowRing from "./ShadowRing";
import { useChatStore } from "@/store/useChatStore";
import { useTTSStore } from "@/store/useTTSStore";
import { useEffect, useRef, useState } from "react";
import SpeechBubble from "./SpeechBubble";
import PlanListCard from "@/components/planList/PlanListCard";
import { AnimatePresence, motion } from "framer-motion";
import { useStreamingText } from "@/hooks/useStreamingText";
import { convertToPlanDBApiResponse } from "@/utils/planDataConverter";

export default function CharacterScene() {
  const { speak, initAudio } = useTTS();
  const isSpeaking = useTTSStore((state) => state.isSpeaking);

  const messages = useChatStore((state) => state.messages);
  const getLastBotMessage = useChatStore((state) => state.getLastBotMessage);

  const prevBotMessageRef = useRef<string | null>(null);
  const hasInteracted = useRef<boolean>(false);

  const latestBotMsg = getLastBotMessage();
  const lastMessage = messages[messages.length - 1];
  const isWaitingForBot = lastMessage?.role === "user" && !isSpeaking;

  const [triggerCount, setTriggerCount] = useState(0);

  // useStreamingText 훅 사용
  const streamingText = useStreamingText({
    fullText: latestBotMsg?.content ?? "",
    speed: 50,
    mode: "char", // 음성 말풍선은 char 단위
    onDone: undefined,
    triggerKey: `${latestBotMsg?.content}-${triggerCount}`,
  });

  // 최초 1회 사용자 클릭 시 TTS 허용
  useEffect(() => {
    const handleClick = () => {
      hasInteracted.current = true;
      initAudio();
    };
    window.addEventListener("click", handleClick, { once: true });
    return () => window.removeEventListener("click", handleClick);
  }, []);

  // 모델 클릭 시 수동 발화
  const handleSpeak = () => {
    const lastBotMessage = getLastBotMessage();
    if (!lastBotMessage) {
      speak("지금은 대화가 준비되지 않았어요.");
      return;
    }
    prevBotMessageRef.current = lastBotMessage.content;
    setTriggerCount((c) => c + 1); // 스트리밍 재시작
    speak(lastBotMessage.content);
  };

  // messages 변경 감지하여 자동 발화 (상호작용 이후에만 허용)
  useEffect(() => {
    const latestBotMsg = getLastBotMessage();
    if (!latestBotMsg) return;
    if (!hasInteracted.current) return; // 사용자 상호작용 없으면 skip

    if (latestBotMsg.content !== prevBotMessageRef.current) {
      prevBotMessageRef.current = latestBotMsg.content;
      speak(latestBotMsg.content); // 훅이 자동 스트리밍하므로 startStreaming 제거
    }
  }, [messages]);

  const shouldShowPlanCard =
    lastMessage?.role === "bot" &&
    lastMessage?.type === "plan" &&
    lastMessage?.planData;

  return (
    <div className="relative flex h-[80%] w-full flex-col items-center justify-center">
      {/* 말풍선 */}
      {isSpeaking && latestBotMsg?.content && !shouldShowPlanCard && (
        <SpeechBubble text={streamingText} />
      )}

      {/* 최종 요금제 카드 애니메이션 */}
      <AnimatePresence>
        {shouldShowPlanCard && (
          <motion.div
            key="plan-card"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative flex flex-col items-center">
            {/* 요금제 카드 */}
            <PlanListCard
              plan={convertToPlanDBApiResponse(lastMessage.planData!)}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 문어 3D */}
      <Canvas
        style={{ width: "60%", height: "50%" }}
        camera={{ position: [0, 2, 4], fov: 35 }}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[2, 2, 5]} intensity={1.2} />
        <CharacterModel
          onClick={handleSpeak}
          isSpeaking={isSpeaking}
          isThinking={isWaitingForBot}
        />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={false}
        />
      </Canvas>
      <AnimatePresence>
        {!hasInteracted.current && (
          <motion.div
            key="click-guide"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mt-3 text-sm text-gray-500">
            클릭해서 시작해보세요 👆
          </motion.div>
        )}
      </AnimatePresence>

      <ShadowRing
        isActive={isSpeaking}
        color="bg-pink-400"
        offsetBottom="11rem"
      />
    </div>
  );
}

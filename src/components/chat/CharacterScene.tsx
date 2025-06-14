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
import PlanCard from "./PlanCard";
import { AnimatePresence, motion } from "framer-motion";

export default function CharacterScene() {
  const { speak } = useTTS();
  const isSpeaking = useTTSStore((state) => state.isSpeaking);

  const messages = useChatStore((state) => state.messages);
  const getLastBotMessage = useChatStore((state) => state.getLastBotMessage);

  const prevBotMessageRef = useRef<string | null>(null);
  const latestBotMsg = getLastBotMessage();

  const lastMessage = messages[messages.length - 1];
  const isWaitingForBot = lastMessage?.role === "user" && !isSpeaking;

  const [streamingText, setStreamingText] = useState("");
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startStreaming = (text: string) => {
    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    setStreamingText("");
    let i = 0;
    typingIntervalRef.current = setInterval(() => {
      i++;
      setStreamingText(text.slice(0, i));
      if (i >= text.length) clearInterval(typingIntervalRef.current!);
    }, 50);
  };

  // 모델 클릭 시 수동 발화
  const handleSpeak = () => {
    const lastBotMessage = getLastBotMessage();
    if (!lastBotMessage) {
      speak("지금은 대화가 준비되지 않았어요.");
      return;
    }
    startStreaming(lastBotMessage.content);
    speak(lastBotMessage.content);
  };

  // messages 변경 감지하여 자동 발화
  useEffect(() => {
    const latestBotMsg = getLastBotMessage();
    if (!latestBotMsg) return;

    // 중복 방지
    if (latestBotMsg.content !== prevBotMessageRef.current) {
      prevBotMessageRef.current = latestBotMsg.content;
      startStreaming(latestBotMsg.content);
      speak(latestBotMsg.content);
    }
  }, [messages]);

  // PlanCard를 보여줄 조건: 마지막 메시지가 plan type
  const shouldShowPlanCard =
    lastMessage?.role === "bot" &&
    lastMessage?.type === "plan" &&
    lastMessage?.planData;

  return (
    <div className="relative flex h-[80%] w-full flex-col items-center justify-center">
      {/* 말풍선 표시 */}
      {isSpeaking && latestBotMsg?.content && (
        <SpeechBubble text={streamingText} />
      )}

      {/* 최종 요금제 추천 카드 UI */}
      <AnimatePresence>
        {shouldShowPlanCard && (
          <motion.div
            key="plan-card"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.7, ease: "easeOut" }}>
            <PlanCard {...lastMessage.planData!} />
          </motion.div>
        )}
      </AnimatePresence>
      {/* 3D 문어 */}
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

      <ShadowRing
        isActive={isSpeaking}
        color="bg-pink-400"
        offsetBottom="11rem"
      />
    </div>
  );
}

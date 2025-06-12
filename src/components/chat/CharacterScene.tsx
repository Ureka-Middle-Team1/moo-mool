"use client";

import { useTTS } from "@/hooks/useTTS";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import CharacterModel from "./CharacterModel";
import ShadowRing from "./ShadowRing";
import { useChatStore } from "@/store/useChatStore";
import { useTTSStore } from "@/store/useTTSStore";
import { useEffect, useRef } from "react";

export default function CharacterScene() {
  const { speak } = useTTS("Google 한국의 여성");
  const isSpeaking = useTTSStore((state) => state.isSpeaking);

  const messages = useChatStore((state) => state.messages);
  const getLastBotMessage = useChatStore((state) => state.getLastBotMessage);

  const prevBotMessageRef = useRef<string | null>(null);

  // 모델 클릭 시 수동 발화
  const handleSpeak = () => {
    const lastBotMessage = getLastBotMessage();
    if (lastBotMessage) {
      speak(lastBotMessage.content);
    } else {
      speak("지금은 대화가 준비되지 않았어요.");
    }
  };

  // messages 변경 감지하여 자동 발화
  useEffect(() => {
    const latestBotMsg = [...messages].reverse().find((m) => m.role === "bot");
    if (!latestBotMsg) return;

    // 중복 방지: 이미 읽은 메시지면 무시
    if (latestBotMsg.content !== prevBotMessageRef.current) {
      prevBotMessageRef.current = latestBotMsg.content;
      speak(latestBotMsg.content);
    }
  }, [messages]);

  return (
    <div className="relative flex h-[80%] w-full items-center justify-center">
      <Canvas
        style={{ width: "60%", height: "50%" }}
        camera={{ position: [0, 2, 4], fov: 35 }}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[2, 2, 5]} intensity={1.2} />
        <CharacterModel onClick={handleSpeak} isSpeaking={isSpeaking} />
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

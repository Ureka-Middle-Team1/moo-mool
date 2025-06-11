"use client";

import { useTTS } from "@/hooks/useTTS";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import CharacterModel from "./CharacterModel";
import ShadowRing from "./ShadowRing";
import { useChatStore } from "@/store/useChatStore";

export default function CharacterScene() {
  const { speak, isSpeaking } = useTTS("Google 한국의 여성");
  const getLastBotMessage = useChatStore((state) => state.getLastBotMessage);

  const handleSpeak = () => {
    const lastBotMessage = getLastBotMessage();
    if (lastBotMessage) {
      speak(lastBotMessage.content);
    } else {
      speak("지금은 대화가 준비되지 않았어요.");
    }
  };

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

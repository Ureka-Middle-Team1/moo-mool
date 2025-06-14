import CharacterModel from "../chat/CharacterModel";
import { Canvas } from "@react-three/fiber";
import { useRouter } from "next/navigation";

export default function FloatingChatbotButton() {
  const router = useRouter();

  return (
    <div
      className="fixed bottom-1 left-1/2 z-50 flex translate-x-[calc(220px-100%)] flex-col items-center"
      onClick={() => router.push("/chatbot")}>
      <div className="mb-[-2rem] rounded-full bg-white px-4 py-1.5 text-sm font-medium whitespace-nowrap shadow-md">
        무너에게 물어봐
      </div>
      <div className="h-40 w-40">
        <Canvas camera={{ position: [0, 0, 2.5] }}>
          <ambientLight intensity={0.7} />
          <directionalLight position={[0, 0, 2]} intensity={0.6} />
          <hemisphereLight intensity={0.6} groundColor="white" />
          <CharacterModel
            onClick={() => router.push("/chatbot")}
            isSpeaking={false}
            isThinking={false}
          />
        </Canvas>
      </div>
    </div>
  );
}

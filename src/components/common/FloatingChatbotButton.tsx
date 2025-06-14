import CharacterModel from "../chat/CharacterModel";
import { Canvas } from "@react-three/fiber";
import { useRouter } from "next/navigation";

export default function FloatingChatbotButton() {
  const router = useRouter();

  return (
    <div
      className="fixed bottom-4 left-1/2 z-50 flex translate-x-[calc(215px-100%)] flex-col items-center"
      onClick={() => router.push("/chatbot")}>
      <div className="mb-1 rounded-md bg-white px-3 py-1 text-sm shadow-md">
        무너에게 물어봐
      </div>
      <div className="h-16 w-16">
        <Canvas camera={{ position: [0, 0, 2.5] }}>
          <ambientLight intensity={0.7} />
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

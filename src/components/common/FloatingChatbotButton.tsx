import CharacterModel from "../chat/CharacterModel";
import { Canvas } from "@react-three/fiber";
import { useRouter } from "next/navigation";

export default function FloatingChatbotButton() {
  const router = useRouter();

  return (
    <div
      className="absolute right-6 bottom-6 z-50 flex flex-col items-center"
      onClick={() => router.push("/chatbot")}>
      <div className="mb-1 rounded-md bg-white px-3 py-1 text-sm shadow-md">
        무너에게 물어봐
      </div>
      <div className="h-20 w-20">
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

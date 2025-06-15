import CharacterModel from "../chat/CharacterModel";
import { Canvas } from "@react-three/fiber";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function FloatingChatbotButton() {
  const router = useRouter();

  const fullText = "무너에게 물어봐";
  const [visible, setVisible] = useState(true);
  const [typed, setTyped] = useState("");

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

    // 문어 렌더링 이후 살짝 딜레이 후 등장
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
      className="fixed bottom-1 left-1/2 z-50 flex translate-x-[calc(220px-100%)] flex-col items-center"
      onClick={() => router.push("/chat")}>
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

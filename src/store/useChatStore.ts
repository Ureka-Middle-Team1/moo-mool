import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Message } from "@/types/Message";
import { questionTextMap } from "@/lib/chat/chatBotQuestionFlow";

const initialMessage: Message[] = questionTextMap[1]
  ? [{ role: "bot", content: questionTextMap[1] }]
  : [];

interface ChatStore {
  messages: Message[];
  currentQuestionId: number;
  setCurrentQuestionId: (id: number) => void;
  setMessages: (messages: Message[]) => void;
  appendMessage: (message: Message) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set) => ({
      messages: initialMessage,
      currentQuestionId: 1,
      setCurrentQuestionId: (id) => set({ currentQuestionId: id }),
      setMessages: (messages) => set({ messages }),
      appendMessage: (message) =>
        set((state) => ({ messages: [...state.messages, message] })),
      clearMessages: () => set({ messages: initialMessage }),
    }),
    {
      name: "chat-storage", // localStorage key 이름
      partialize: (state) => ({ messages: state.messages }), // 저장할 필드 제한
    }
  )
);

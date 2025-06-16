import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Message } from "@/types/Chat";
import { questionTextMap } from "@/lib/chat/chatBotQuestionFlow";

// 챗봇은 우선 "자연스러운 대화" vs "정확한 답변" 질문부터 해야 한다
const initialMessage: Message[] = questionTextMap[0]
  ? [{ role: "bot", content: questionTextMap[0] }]
  : [];

interface ChatStore {
  messages: Message[];
  currentQuestionId: number;
  setCurrentQuestionId: (id: number) => void;
  setMessages: (messages: Message[]) => void;
  appendMessage: (message: Message) => void;
  clearMessages: () => void;
  getLastBotMessage: () => Message | undefined;
  hasRecommended: boolean; // 추천이 이미 되었는지 여부(요금제 카드 새로고침 해도 한 번만 호출되기 하기 위함)
  setHasRecommended: (v: boolean) => void;
}

// 채팅 관련 내용을 localStorage(persist 옵션에 의거)에 저장하는 ChatStore
export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      messages: initialMessage,
      currentQuestionId: 0,
      setCurrentQuestionId: (id) => set({ currentQuestionId: id }),
      setMessages: (messages) => set({ messages }),
      appendMessage: (message) =>
        set((state) => ({ messages: [...state.messages, message] })),
      clearMessages: () => set({ messages: initialMessage }),
      getLastBotMessage: () => {
        const messages = get().messages;
        for (let i = messages.length - 1; i >= 0; i--) {
          if (messages[i].role === "bot") return messages[i];
        }
        return undefined;
      },
      hasRecommended: false,
      setHasRecommended: (v) => set({ hasRecommended: v }),
    }),
    {
      name: "chat-storage", // localStorage key 이름
      partialize: (state) => ({
        messages: state.messages,
        currentQuestionId: state.currentQuestionId,
        hasRecommended: state.hasRecommended, // 이 정보도 저장해야 함(새로고침 되어도 유지돼야 함)
      }), // 저장할 필드 제한
    }
  )
);

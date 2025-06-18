import { Message } from "@/types/Chat";
import { create } from "zustand";
import { persist } from "zustand/middleware";

// "자연스러운 대화" 모드에서 사용자의 응답을 저장하는 FreeTalkStore
interface FreeTalkStore {
  messages: Message[];
  userMessageCount: number; // 사용자 응답 횟수(8회마다 요약 트리거 예정)
  addMessage: (msg: Message) => void;
  clear: () => void;
  resetUserMessageCount: () => void; // 누적된 메시지 갯수 초기화
  shouldTriggerSummary: () => boolean; // 요약이 필요한 시점에, True 반환
  lastSummary: string | null; // 요약 내용
  setLastSummary: (s: string) => void; // 요약 내용을 update하는 함수
}

// "자연스러운 대화" 채팅 관련 내용을 localStorage(persist 옵션에 의거)에 저장하는 useFreeTalkStore
export const useFreeTalkStore = create<FreeTalkStore>()(
  persist(
    (set, get) => ({
      messages: [], // 메시지 초기상태 (처음엔 아무것도 없어야 함)
      userMessageCount: 0,
      addMessage: (msg) =>
        set((state) => ({
          messages: [...state.messages, msg],
          userMessageCount:
            msg.role === "user" // "user" 메시지가 하나씩 추가 될수록, userMessageCount + 1
              ? state.userMessageCount + 1
              : state.userMessageCount,
        })),
      clear: () => set({ messages: [], userMessageCount: 0 }), // 메시지 clear
      shouldTriggerSummary: () => get().userMessageCount >= 20,
      resetUserMessageCount: () => set({ userMessageCount: 0 }),
      lastSummary: null,
      setLastSummary: (s) => set({ lastSummary: s }),
    }),
    {
      name: "free-talk-store", // localStorage key 이름
      partialize: (state) => ({
        messages: state.messages,
        userMessageCount: state.userMessageCount,
        lastSummary: state.lastSummary,
      }),
    }
  )
);

import { create } from "zustand";
import { Message } from "@/types/Message";
import { questionTextMap } from "@/lib/chat/chatBotQuestionFlow";

const initialMessage: Message[] = questionTextMap[1]
  ? [{ role: "bot", content: questionTextMap[1] }]
  : [];

interface ChatStore {
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  appendMessage: (message: Message) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  messages: initialMessage,
  setMessages: (messages) => set({ messages }),
  appendMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  clearMessages: () => set({ messages: initialMessage }),
}));

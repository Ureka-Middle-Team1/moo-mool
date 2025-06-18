import { create } from "zustand";

interface ChatStreamingState {
  isStreaming: boolean;
  setIsStreaming: (value: boolean) => void;
}

export const useChatStreamingStore = create<ChatStreamingState>((set) => ({
  isStreaming: false,
  setIsStreaming: (value) => set({ isStreaming: value }),
}));

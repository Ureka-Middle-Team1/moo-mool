import { create } from "zustand";

type ChatMode = "text" | "voice";

interface ChatModeStore {
  mode: ChatMode;
  setMode: (mode: ChatMode) => void;
}

export const useChatModeStore = create<ChatModeStore>((set) => ({
  mode: "text",
  setMode: (mode) => set({ mode }),
}));

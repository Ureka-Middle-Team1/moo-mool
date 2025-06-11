// store/useTTSStore.ts
import { create } from "zustand";

interface TTSState {
  isSpeaking: boolean;
  setIsSpeaking: (value: boolean) => void;
}

export const useTTSStore = create<TTSState>((set) => ({
  isSpeaking: false,
  setIsSpeaking: (value) => set({ isSpeaking: value }),
}));

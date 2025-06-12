import { create } from "zustand";

interface VoiceControlState {
  waitingForBotResponse: boolean;
  setWaitingForBotResponse: (value: boolean) => void;
}

export const useVoiceControlStore = create<VoiceControlState>((set) => ({
  waitingForBotResponse: false,
  setWaitingForBotResponse: (value) => set({ waitingForBotResponse: value }),
}));

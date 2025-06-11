import { create } from "zustand";
import { SmartChoiceApiInput } from "@type/smartChoiceApiInput";

interface TendencyStore {
  userTendencyInfo: SmartChoiceApiInput;
  updateTendency: (patch: Partial<SmartChoiceApiInput>) => void;
  resetTendency: () => void;
}

const defaultState: SmartChoiceApiInput = {
  data: "",
  voice: "",
  sms: "",
  age: "",
  type: "",
  dis: "",
};

export const useTendencyStore = create<TendencyStore>((set) => ({
  userTendencyInfo: defaultState,
  updateTendency: (patch) =>
    set((state) => ({
      userTendencyInfo: { ...state.userTendencyInfo, ...patch },
    })),
  resetTendency: () => set({ userTendencyInfo: defaultState }),
}));

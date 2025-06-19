import { create } from "zustand";
import { SmartChoiceApiInput } from "@/types/smartChoiceApiInput";
import { UserTendencyInfo } from "@/types/userTendencyInfo";
import { persist } from "zustand/middleware";

interface TendencyStore {
  userTendencyInfo: UserTendencyInfo;
  updateTendency: (patch: Partial<SmartChoiceApiInput>) => void;
  resetTendency: () => void;
  setSubscription: (value: string) => void; // 구독 서비스 관련 설정 함수
}

const defaultState: UserTendencyInfo = {
  data: "",
  voice: "",
  sms: "",
  age: "",
  type: "",
  dis: "",
  subscribe: "", // 구독 서비스 관련
};

// 새로 고침해도 userTendencyInfo가 저장 되도록 persist 옵션 추가
export const useTendencyStore = create<TendencyStore>()(
  persist(
    (set) => ({
      userTendencyInfo: defaultState,
      updateTendency: (patch) =>
        set((state) => ({
          userTendencyInfo: { ...state.userTendencyInfo, ...patch },
        })),
      setSubscription: (value) =>
        set((state) => ({
          userTendencyInfo: {
            ...state.userTendencyInfo,
            subscribe: value,
          },
        })),
      resetTendency: () =>
        set(() => ({
          userTendencyInfo: defaultState,
        })),
    }),
    {
      name: "user-tendency-storage", // localStorage key
      partialize: (state) => ({ userTendencyInfo: state.userTendencyInfo }),
    }
  )
);

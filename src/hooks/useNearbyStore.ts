import { create } from "zustand";
import { persist } from "zustand/middleware";

interface NearbyStore {
  myType: string | null;
  setMyType: (type: string) => void;
}

export const useNearbyStore = create<NearbyStore>()(
  persist(
    (set) => ({
      myType: null,
      setMyType: (type) => set({ myType: type }),
    }),
    {
      name: "nearby-storage", // localStorage key
    }
  )
);

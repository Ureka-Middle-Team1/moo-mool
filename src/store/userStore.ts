import { create } from "zustand";

type UserState = {
  invitedCount: number;
  setInvitedCount: (count: number) => void;
};

export const useUserStore = create<UserState>((set) => ({
  invitedCount: 0,
  setInvitedCount: (count) => set({ invitedCount: count }),
}));

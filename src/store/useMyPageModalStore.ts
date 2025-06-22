import { create } from "zustand";

type MyPageModalState = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const useMyPageModalStore = create<MyPageModalState>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}));

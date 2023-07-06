import { create } from "zustand";

export const useDynamicStore = create((set) => ({
  num: "",
  setNum: (num) => set({ num }),
}));

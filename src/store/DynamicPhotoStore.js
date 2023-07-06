import { create } from "zustand";

export const useDynamicPhotoStore = create((set) => ({
  num: "",
  setNum: (num) => set({ num }),
}));

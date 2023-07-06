import { create } from "zustand";

export const useStore = create((set) => ({
  email: "",
  setEmail: (email) => set({ email }),
  password: "",
  setPassword: (password) => set({ password }),
}));

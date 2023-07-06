import { create } from "zustand";

export const useTodoStore = create((set) => ({
  value: "",
  setValue: (value) => set({ value }),
  todos: [],
  addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
  deleteTodo: (index) =>
    set((state) => {
      const newTodo = [...state.todos];
      newTodo.splice(index, 1);
      return { todos: newTodo };
    }),
}));

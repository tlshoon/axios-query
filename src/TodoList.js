import React from "react";
import { useTodoStore } from "./store/TodoStore";

const TodoList = () => {
  const { value, setValue, todos, addTodo, deleteTodo } = useTodoStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="할 일을 추가해주세요."
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button type="submit">추가</button>
      </form>
      {todos.map((todo, index) => (
        <div key={index}>
          {todo}
          <button onClick={() => deleteTodo(index)}>삭제</button>
        </div>
      ))}
    </>
  );
};

export default TodoList;

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import Login from "./Login";
import TodoList from "./TodoList";
import Dynamic from "./Dynamic";
import DynamicPhoto from "./DynamicPhoto";

const root = ReactDOM.createRoot(document.getElementById("root"));

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <Login />
      <TodoList />
      <Dynamic />
      <DynamicPhoto />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);

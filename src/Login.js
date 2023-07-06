import React, { useState } from "react";
import { instance } from "./http/Base";
import { useMutation } from "react-query";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    const req = await instance.post("/api/register", {
      email,
      password,
    });
    return req.data;
  };

  const loginMutation = useMutation(login, {
    onSuccess: (data) => {
        console.log(data)
    },
    onError: (error) => {
      console.log(error)
    },
  });

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          loginMutation.mutate();
        }}
      >
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">로그인</button>
        {loginMutation.isError && (
          <div>Error: {loginMutation.error.message}</div>
        )}
        {loginMutation.isLoading && (
          <div>로딩중...</div>
        )}
        {loginMutation.isSuccess && (
          <div>{JSON.stringify(loginMutation.data.token)}</div>
        )}
      </form>
    </>
  );
};

export default Login;

"use client";
import { login } from "@/services/login";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function Login() {
  const navigate = useRouter();
  const [loginData, setLoginData] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState<any | undefined>(undefined);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setLoginData({
      ...loginData,
      [event.target.name]: event.target.value,
    });
    setErrorMessage(undefined);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    loginFn();
  }

  async function loginFn() {
    const res = await login(loginData.email, loginData.password);
    console.log(res);
    if (res.status == 404) {
      setErrorMessage(res.error);
    } else if (res.status == 200) {
      localStorage.setItem("user-role", res.role);
      navigate.push("/");
    }
  }
  return (
    <div className="w-full h-full flex items-center justify-center">
      <form
        className="p-4 w-[20vw] flex flex-col gap-4 bg-slate-500 rounded-xl"
        onSubmit={handleSubmit}
      >
        <div className="text-center font-bold">Login Form</div>
        <input
          className="text-black bg-white rounded-lg p-2 focus:outline-none"
          onChange={handleChange}
          type="email"
          name="email"
          placeholder="Email Address"
        />
        <input
          className="text-black bg-white rounded-lg p-2 focus:outline-none"
          onChange={handleChange}
          type="password"
          name="password"
          placeholder="Password"
        />
        <p className="text-[11px] text-red-600 h-[10px] ml-2">
          {errorMessage ? errorMessage : ""}
        </p>
        <input
          className="text-white bg-green-500 rounded-lg p-2"
          type="submit"
          value="Submit"
        />
      </form>
    </div>
  );
}

export default Login;

"use client";
import { useState, FormEvent, ChangeEvent } from "react";
import { FormData } from "@/app/interfaces";
import { redirect } from "next/dist/server/api-utils";


const RegisterPage = () => {
  const [data, setData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  if (data.password !== data.confirmPassword){
    console.log("laas conttraseñas no coinciden")
  }

  const sendData = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth/register", {
      method: 'POST',
      body: JSON.stringify({
        username: data.username,
        email: data.email,
        password: data.password

      }),
      headers: {
        'Content-Type' : 'application/son'
      }
    })
      const resJson = await res.json()

      if (res.ok) {
        redirect('/'); 
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-7rem)]">
      <h1 className="text-3xl text-white font-bold">Formulario XD</h1>
      <form
        className="bg-gray-300 flex flex-col p-10 space-y-2 text-black"
        onSubmit={sendData}
        
      >
        <label className="text-slate-600" htmlFor="username">Name</label>
        <input
          id="username"
          name="username"
          value={data.username}
          onChange={handleChange}
          type="text"
        />
         <label className="text-slate-600" htmlFor="email">email</label>
        <input
          value={data.email}
          onChange={handleChange}
          type="email"
          name="email"
          id="email"
        />
         <label className="text-slate-600" htmlFor="password">password</label>
        <input
          value={data.password}
          onChange={handleChange}
          type="password"
          name="password"
          id="password"
        />
        <label className="text-slate-600" htmlFor="confirmPassword">confirmPassword</label>
        <input
          value={data.confirmPassword}
          onChange={handleChange}
          type="password"
          name="confirmPassword"
          id="confirmPassword"
        />

        <button className="px-2 py-2 rounded-md bg-gray-500" type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;

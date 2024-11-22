"use client";
import { useState, FormEvent, ChangeEvent } from "react";

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage = () => {
  const [data, setData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const sendData = async (e: FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth/register", {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type' : 'application/son'
      }
    })
      const resJson = await res.json()
      console.log(resJson);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="flex items-center justify-center h-[calc(100vh-7rem)]">
      <form
        className="bg-gray-300 flex flex-col p-10 space-y-2 text-black"
        onSubmit={sendData}
        
      >
        <input
          name="username"
          value={data.username}
          onChange={handleChange}
          type="text"
        />
        <input
          value={data.email}
          onChange={handleChange}
          type="email"
          name="email"
        />
        <input
          value={data.password}
          onChange={handleChange}
          type="password"
          name="password"
        />
        <input
          value={data.confirmPassword}
          onChange={handleChange}
          type="password"
          name="confirmPassword"
        />

        <button className="px-2 py-2 rounded-md bg-gray-500" type="submit">
          Enviar
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;

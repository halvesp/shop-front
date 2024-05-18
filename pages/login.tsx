// src/pages/login.tsx

import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });
      localStorage.setItem("authToken", response.data.token);
      router.push("/");
    } catch (err) {
      setError("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-primary">
      <div className="bg-primary w-full h-screen flex items-center justify-center">
        <div>
          <img src="/logo3.png" width={350} />
          <p className="text-lg text-white">
            Compre inteligente, compre no Bazaar
          </p>
        </div>
      </div>
      <div className="bg-white p-8 rounded-l-3xl shadow-md w-full h-screen flex items-center">
        <div className="w-full px-12 grid gap-3">
          <h1 className="text-2xl mb-6 text-center text-primary">
            <img src="/justb.png" width={40} className="m-auto" />
          </h1>
          <p className="text-3xl font-light text-primary">Bem vindo!</p>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-text">E-mail</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-text">Senha</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded"
                required
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button
              type="submit"
              className="w-full py-2 bg-primary text-white rounded hover:bg-secondary duration-100"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

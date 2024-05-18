import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { LoaderCircle } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    setIsLoading(true);
    setDisableBtn(true);
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        email,
        password,
      });
      localStorage.setItem("authToken", response.data.token);
      router.push("/");
    } catch (err) {
      setError(
        "Falha no login. Por favor, cheque suas credenciais e tente novamente."
      );
    } finally {
      setIsLoading(false);
      setDisableBtn(false);
    }
  };

  return (
    <div className="md:flex items-center justify-center min-h-screen bg-primary">
      <div className="bg-primary w-full h-screen md:flex hidden items-center justify-center">
        <div>
          <img src="/logo3.png" width={350} />
          <p className="text-lg text-white">
            Compre inteligente, compre no Bazaar
          </p>
        </div>
      </div>
      <div className="bg-white md:p-8 md:rounded-l-3xl shadow-md w-full h-screen flex items-center">
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
            <button
              type="submit"
              className="w-full py-2 bg-primary text-white rounded hover:bg-secondary duration-100"
              disabled={disableBtn}
            >
              {isLoading ? (
                <div className="flex items-center gap-2 font-semibold text-white text-sm">
                  <LoaderCircle className="animate-spin m-auto" width={15} />
                </div>
              ) : (
                "Entrar"
              )}
            </button>
            {error && (
              <p className="text-red-400 font-semibold mt-1">{error}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

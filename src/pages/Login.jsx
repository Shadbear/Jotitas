import { useState } from "react";

function Login({ onLogin }) {
  const [modo, setModo] = useState("login");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const limpiar = () => {
    setNombre("");
    setEmail("");
    setPassword("");
    setError("");
  };

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Completa todos los campos");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Error al iniciar sesión");
        return;
      }
      localStorage.setItem("logueado", "true");
      localStorage.setItem("usuario", JSON.stringify(data.usuario));
      onLogin();
    } catch {
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  const handleRegistro = async () => {
    if (!nombre || !email || !password) {
      setError("Completa todos los campos");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Error al registrarse");
        return;
      }
      setModo("login");
      limpiar();
      setError("");
    } catch {
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center px-6">

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-pink-500 rounded-full opacity-10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-pink-700 rounded-full opacity-10 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-500 rounded-2xl mb-4">
            <span className="text-3xl font-black text-black">J</span>
          </div>
          <h1 className="text-4xl font-black text-white">JOTITAS</h1>
          <p className="text-gray-500 mt-2">Ropa urbana con estilo</p>
        </div>

        {/* Card */}
        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-3xl shadow-2xl">

          {/* Tabs */}
          <div className="flex bg-zinc-800 rounded-2xl p-1 mb-6">
            <button
              onClick={() => { setModo("login"); limpiar(); }}
              className={`flex-1 py-2 rounded-xl font-bold transition text-sm ${
                modo === "login" ? "bg-pink-500 text-white" : "text-gray-400"
              }`}
            >
              Iniciar sesión
            </button>
            <button
              onClick={() => { setModo("registro"); limpiar(); }}
              className={`flex-1 py-2 rounded-xl font-bold transition text-sm ${
                modo === "registro" ? "bg-pink-500 text-white" : "text-gray-400"
              }`}
            >
              Registrarse
            </button>
          </div>

          {/* Nombre (solo registro) */}
          {modo === "registro" && (
            <div className="mb-4">
              <label className="text-sm text-gray-400 mb-2 block">Nombre</label>
              <input
                type="text"
                placeholder="Tu nombre"
                value={nombre}
                onChange={(e) => { setNombre(e.target.value); setError(""); }}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-pink-500 transition text-white placeholder-gray-600"
              />
            </div>
          )}

          {/* Email */}
          <div className="mb-4">
            <label className="text-sm text-gray-400 mb-2 block">
              Correo electrónico
            </label>
            <input
              type="email"
              placeholder="tucorreo@gmail.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              onKeyDown={(e) => e.key === "Enter" && (modo === "login" ? handleLogin() : handleRegistro())}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-pink-500 transition text-white placeholder-gray-600"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="text-sm text-gray-400 mb-2 block">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              onKeyDown={(e) => e.key === "Enter" && (modo === "login" ? handleLogin() : handleRegistro())}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-pink-500 transition text-white placeholder-gray-600"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 mb-4">
              <p className="text-red-400 text-sm text-center">{error}</p>
            </div>
          )}

          {/* Botón */}
          <button
            onClick={modo === "login" ? handleLogin : handleRegistro}
            disabled={loading}
            className="w-full bg-pink-500 hover:bg-pink-600 disabled:opacity-50 py-4 rounded-xl font-bold transition text-white"
          >
            {loading
              ? "Cargando..."
              : modo === "login"
              ? "Entrar"
              : "Crear cuenta"}
          </button>

        </div>

        <p className="text-center text-zinc-700 text-xs mt-6">
          © 2026 JOTITAS — Todos los derechos reservados
        </p>

      </div>
    </div>
  );
}

export default Login;
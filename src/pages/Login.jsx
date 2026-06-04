import { useState } from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";

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

  const handleLoginGoogle = async () => {
    setLoading(true);
    setError("");
    try {
      await signInWithPopup(auth, provider);
      // onAuthStateChanged en Home.jsx detecta el login solo
    } catch (err) {
      if (err.code !== "auth/popup-closed-by-user") {
        setError("No se pudo conectar con Google: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRegistro = async () => {
    if (!nombre || !email || !password) return setError("Completa todos los campos");
    if (password.length < 6) return setError("Mínimo 6 caracteres");
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, password }),
      });
      if (!res.ok) throw new Error("Error al registrarse");
      setModo("login");
      limpiar();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center px-6 relative overflow-hidden">

      <div className="absolute w-[500px] h-[500px] bg-purple-600/20 rounded-full blur-[120px] -top-20 -right-20 animate-pulse" />
      <div className="absolute w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px] -bottom-20 -left-20" />

      <div className="relative w-full max-w-md z-10">
        <div className="bg-zinc-950/80 backdrop-blur-2xl p-8 rounded-[2rem] border border-zinc-800 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative">

          <div className="absolute inset-0 rounded-[2rem] border border-purple-500/20 pointer-events-none" />

          {/* Tabs */}
          <div className="flex bg-black rounded-2xl p-1.5 mb-8 border border-zinc-800">
            {["login", "registro"].map((m) => (
              <button
                key={m}
                onClick={() => setModo(m)}
                className={`flex-1 py-3 rounded-xl font-black text-sm uppercase tracking-widest transition-all ${
                  modo === m
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
              >
                {m === "login" ? "Acceder" : "Unirse"}
              </button>
            ))}
          </div>

          {/* Inputs */}
          <div className="space-y-6">
            {modo === "registro" && (
              <Input label="Nombre" value={nombre} onChange={setNombre} />
            )}
            <Input label="Email" type="email" value={email} onChange={setEmail} />
            <Input label="Contraseña" type="password" value={password} onChange={setPassword} />
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-400 text-sm mt-4 text-center">{error}</p>
          )}

          {/* Botón registro */}
          {modo === "registro" && (
            <button
              onClick={handleRegistro}
              disabled={loading}
              className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-2xl font-black text-lg transition-all hover:opacity-90 disabled:opacity-50"
            >
              {loading ? "Procesando..." : "CREAR CUENTA"}
            </button>
          )}

          {/* Botón Google */}
          <button
            onClick={handleLoginGoogle}
            disabled={loading}
            className="w-full mt-4 bg-white hover:bg-cyan-400 text-black py-4 rounded-2xl font-black text-lg transition-all disabled:opacity-50"
          >
            {loading ? "Conectando..." : "INGRESAR CON GOOGLE"}
          </button>

        </div>
      </div>
    </div>
  );
}

function Input({ label, type = "text", value, onChange }) {
  return (
    <div>
      <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-2 block">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-4 text-white focus:border-purple-500 outline-none transition-all focus:ring-2 focus:ring-purple-500/20"
      />
    </div>
  );
}

export default Login;
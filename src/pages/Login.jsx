import { useState, useEffect } from "react";
import { auth, provider } from "../firebase";
import { signInWithRedirect, getRedirectResult } from "firebase/auth";

function Login({ onLogin }) {
  const [modo, setModo] = useState("login");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Capturar resultado de redirección al volver de Google
  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result) onLogin();
      })
      .catch((err) => setError("Error en Google: " + err.message));
  }, [onLogin]);

  const handleLoginGoogle = async () => {
    setLoading(true);
    try {
      await signInWithRedirect(auth, provider);
    } catch (err) {
      setError("No se pudo conectar con Google");
      setLoading(false);
    }
  };

  const handleRegistro = async () => {
    if (!nombre || !email || !password) return setError("Completa todos los campos");
    setLoading(true);
    try {
      const res = await fetch("/api/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, password }),
      });
      if (!res.ok) throw new Error("Error al registrarse");
      setModo("login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black min-h-screen flex items-center justify-center px-6 relative overflow-hidden font-sans">
      {/* Fondo decorativo */}
      <div className="absolute w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] -top-20 -right-20 animate-pulse" />
      
      <div className="relative w-full max-w-sm z-10">
        {/* Header Branding */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 tracking-tighter">
            JOTITAS
          </h1>
          <p className="text-zinc-500 text-sm mt-2 font-medium tracking-widest uppercase">Tu tienda, a un click</p>
        </div>

        <div className="bg-zinc-900/50 backdrop-blur-xl p-8 rounded-[2rem] border border-zinc-800 shadow-2xl">
          <div className="flex bg-black rounded-2xl p-1 mb-8 border border-zinc-800">
            {["login", "registro"].map((m) => (
              <button
                key={m}
                onClick={() => setModo(m)}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-[0.1em] transition-all ${
                  modo === m ? "bg-white text-black shadow-lg" : "text-zinc-600 hover:text-zinc-300"
                }`}
              >
                {m === "login" ? "Ingresar" : "Crear cuenta"}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {modo === "registro" && <Input label="Nombre completo" value={nombre} onChange={setNombre} />}
            <Input label="Correo electrónico" type="email" value={email} onChange={setEmail} />
            <Input label="Contraseña" type="password" value={password} onChange={setPassword} />
          </div>

          {error && <p className="text-red-400 text-[11px] mt-4 text-center font-bold">{error}</p>}

          <button
            onClick={modo === "registro" ? handleRegistro : () => { /* Aquí tu lógica de login normal */ }}
            disabled={loading}
            className="w-full mt-6 bg-white text-black py-3.5 rounded-xl font-black text-sm uppercase tracking-wider hover:bg-zinc-200 transition-colors"
          >
            {loading ? "Procesando..." : modo === "registro" ? "Continuar" : "Ingresar"}
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-zinc-800"></div></div>
            <div className="relative flex justify-center text-[10px] uppercase font-bold text-zinc-600">
              <span className="bg-zinc-900 px-2">o continuar con</span>
            </div>
          </div>

          <button
            onClick={handleLoginGoogle}
            className="w-full border border-zinc-700 text-white py-3.5 rounded-xl font-bold text-sm hover:bg-zinc-800 transition-all flex items-center justify-center gap-2"
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" className="w-4 h-4" alt="Google" />
            GOOGLE
          </button>
        </div>
      </div>
    </div>
  );
}

function Input({ label, type = "text", value, onChange }) {
  return (
    <div>
      <label className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-1.5 block ml-1">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:border-purple-500 outline-none transition-all"
      />
    </div>
  );
}

export default Login;
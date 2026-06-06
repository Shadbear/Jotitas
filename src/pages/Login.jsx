import { useState } from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

function Login({ onLogin }) {
  const [modo, setModo] = useState("login");
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegistro = async () => {
  if (!email || !password) return setError("Completa los campos");
  setLoading(true);
  setError("");
  try {
    // Esto crea el usuario directamente en Firebase
    await createUserWithEmailAndPassword(auth, email, password);
    setModo("login");
    alert("¡Cuenta creada con éxito! Ahora puedes acceder.");
  } catch (err) {
    setError("Error al crear cuenta: " + err.message);
  } finally {
    setLoading(false);
  }
};

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
      onLogin(); // Asegura la redirección al éxito
    } catch (err) {
      if (err.code !== "auth/popup-closed-by-user") {
        setError("Error: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLoginEmail = async () => {
    if (!email || !password) return setError("Completa los campos");
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLogin();
    } catch (err) {
      setError("Error al acceder: " + err.message);
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
    <div className="bg-black min-h-screen flex items-center justify-center px-6 relative overflow-hidden font-sans">
      <div className="absolute w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] -top-20 -right-20 animate-pulse" />
      <div className="absolute w-[500px] h-[500px] bg-cyan-600/5 rounded-full blur-[120px] -bottom-20 -left-20" />

      <div className="relative w-full max-w-sm z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-white tracking-tighter">JOTITAS</h1>
        </div>

        <div className="bg-zinc-900/40 backdrop-blur-xl p-8 rounded-[2rem] border border-zinc-800 shadow-2xl">
          <div className="flex bg-black rounded-2xl p-1 mb-8 border border-zinc-800">
            {["login", "registro"].map((m) => (
              <button
                key={m}
                onClick={() => { setModo(m); setError(""); }}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold uppercase tracking-[0.1em] transition-all ${
                  modo === m ? "bg-white text-black shadow-lg" : "text-zinc-600 hover:text-zinc-300"
                }`}
              >
                {m === "login" ? "Acceder" : "Unirse"}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {modo === "registro" && <Input label="Nombre" value={nombre} onChange={setNombre} />}
            <Input label="Email" type="email" value={email} onChange={setEmail} />
            <Input label="Contraseña" type="password" value={password} onChange={setPassword} />
          </div>

          {error && <p className="text-red-400 text-[10px] mt-4 text-center font-bold uppercase">{error}</p>}

          <button
            onClick={modo === "registro" ? handleRegistro : handleLoginEmail}
            disabled={loading}
            className="w-full mt-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-wider hover:opacity-90 transition-all disabled:opacity-50 shadow-[0_0_20px_rgba(168,85,247,0.3)]"
          >
            {loading ? "Procesando..." : modo === "registro" ? "Crear cuenta" : "Acceder"}
          </button>

          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 h-px bg-zinc-800" />
            <span className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">o</span>
            <div className="flex-1 h-px bg-zinc-800" />
          </div>

          <button
            onClick={handleLoginGoogle}
            disabled={loading}
            className="w-full border border-zinc-800 hover:border-purple-500/50 text-zinc-400 hover:text-white py-3.5 rounded-xl font-bold text-sm uppercase tracking-wider transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <img src="https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg" className="w-4 h-4 opacity-70" alt="Google" />
            Ingresar con Google
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
        className="w-full bg-black border border-zinc-800 rounded-xl px-4 py-3 text-white text-sm focus:border-zinc-500 outline-none transition-all"
      />
    </div>
  );
}

export default Login;
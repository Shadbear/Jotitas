import { useState } from "react";

function BotAyuda() {
  const [abierto, setAbierto] = useState(false);
  const [mensajes, setMensajes] = useState([
    {
      tipo: "bot",
      texto: "👋 ¡Hola! Soy el asistente de Jotitas. ¿En qué te puedo ayudar?",
    },
  ]);
  const [input, setInput] = useState("");
  const [escribiendo, setEscribiendo] = useState(false);

  const enviarMensaje = async () => {
    if (!input.trim() || escribiendo) return;

    const texto = input;
    setMensajes((prev) => [...prev, { tipo: "usuario", texto }]);
    setInput("");
    setEscribiendo(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mensaje: texto }),
      });
      const data = await res.json();
      setMensajes((prev) => [...prev, { tipo: "bot", texto: data.respuesta }]);
    } catch {
      setMensajes((prev) => [
        ...prev,
        { tipo: "bot", texto: "❌ Error al conectar. Intenta de nuevo." },
      ]);
    } finally {
      setEscribiendo(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") enviarMensaje();
  };

  return (
    <>
      {/* Botón flotante */}
      <button
        onClick={() => setAbierto(!abierto)}
        className="fixed bottom-24 right-6 z-50 bg-purple-600 hover:bg-purple-500 text-white p-4 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:shadow-[0_0_30px_rgba(168,85,247,0.8)] transition-all hover:scale-110"
        aria-label="Abrir chat de ayuda"
      >
        {abierto ? (
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        ) : (
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
          </svg>
        )}
      </button>

      {/* Ventana del chat */}
      {abierto && (
        <div className="fixed bottom-44 right-6 z-50 w-80 bg-zinc-900 border border-purple-500/30 rounded-3xl shadow-[0_0_30px_rgba(168,85,247,0.2)] overflow-hidden">

          {/* Header */}
          <div className="bg-purple-600 px-4 py-3 flex items-center gap-3">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-lg">
              🤖
            </div>
            <div>
              <p className="text-white font-black text-sm">Asistente Jotitas</p>
              <p className="text-purple-200 text-xs">Con IA — Siempre disponible</p>
            </div>
          </div>

          {/* Mensajes */}
          <div className="h-72 overflow-y-auto p-4 space-y-3 flex flex-col">
            {mensajes.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.tipo === "usuario" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] px-4 py-2 rounded-2xl text-sm whitespace-pre-line ${
                    msg.tipo === "usuario"
                      ? "bg-purple-600 text-white rounded-br-sm"
                      : "bg-zinc-800 text-zinc-200 rounded-bl-sm"
                  }`}
                >
                  {msg.texto}
                </div>
              </div>
            ))}
            {escribiendo && (
              <div className="flex justify-start">
                <div className="bg-zinc-800 text-zinc-400 px-4 py-2 rounded-2xl rounded-bl-sm text-sm">
                  Escribiendo...
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-zinc-800 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe tu pregunta..."
              className="flex-1 bg-zinc-800 text-white text-sm px-4 py-2 rounded-xl outline-none border border-zinc-700 focus:border-purple-500 transition-all placeholder-zinc-500"
            />
            <button
              onClick={enviarMensaje}
              disabled={escribiendo}
              className="bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white p-2 rounded-xl transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
              </svg>
            </button>
          </div>

        </div>
      )}
    </>
  );
}

export default BotAyuda;
import { useState } from "react";

function PaymentMethod({ carrito, onConfirmarPedido }) {
  const [numeroOperacion, setNumeroOperacion] = useState("");
  const [enviando, setEnviando] = useState(false);

  const total = carrito.reduce(
    (acc, item) => acc + parseFloat(item.precio) * (item.cantidad || 1),
    0
  );

  const handleConfirmar = async () => {
    if (numeroOperacion.length < 4) {
      alert("Por favor, ingresa un número de operación válido.");
      return;
    }
    setEnviando(true);
    // Llamamos a la función que viene de App.jsx pasando el número
    await onConfirmarPedido(numeroOperacion);
    setEnviando(false);
  };

  return (
    <div className="bg-zinc-900/50 p-8 rounded-3xl border border-purple-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.1)]">
      
      {/* Título */}
      <h2 className="text-3xl font-black text-white mb-6 flex items-center gap-3">
        <span className="text-4xl">💜</span> PAGO POR YAPE
      </h2>

      {/* Total */}
      <div className="bg-purple-600/20 rounded-2xl p-6 mb-8 text-center border border-purple-500/30">
        <p className="text-purple-200 font-medium">Total a pagar</p>
        <h2 className="text-5xl font-black text-white mt-1">S/ {total.toFixed(2)}</h2>
      </div>

      {/* QR Yape */}
      <div className="bg-black p-6 rounded-2xl border border-zinc-800 text-center mb-8">
        <h3 className="text-cyan-400 font-bold mb-4 tracking-widest uppercase">
          Escanea el QR
        </h3>
        <img
          src="/yape-qr.png"
          alt="QR Yape"
          className="w-64 mx-auto rounded-xl border border-zinc-700"
        />
        <h3 className="text-3xl font-black text-white mt-6 tracking-[0.2em]">
          921 629 315
        </h3>
      </div>

      {/* Input Número de Operación */}
      <div className="space-y-4">
        <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider">
          Número de operación (Yape)
        </label>

        <input
          type="text"
          placeholder="Ingresa los dígitos de tu operación"
          value={numeroOperacion}
          onChange={(e) => setNumeroOperacion(e.target.value)}
          className="w-full bg-black border border-purple-500/30 rounded-xl p-4 text-white placeholder-zinc-600 focus:border-purple-500 outline-none transition-all"
        />

        {/* Botón enviar */}
        <button
          disabled={numeroOperacion.length < 4 || enviando}
          onClick={handleConfirmar}
          className={`w-full py-4 rounded-xl font-black text-white transition-all ${
            numeroOperacion.length < 4 || enviando
              ? "bg-zinc-800 cursor-not-allowed opacity-50"
              : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          {enviando ? "Procesando..." : "ENVIAR PEDIDO YAPE"}
        </button>
      </div>
    </div>
  );
}

export default PaymentMethod;
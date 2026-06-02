import { useState } from "react";

function PaymentMethod({ carrito, onComprobanteSubido, onConfirmarPedido }) {
  const [preview, setPreview] = useState(null);
  const [enviando, setEnviando] = useState(false);

  const total = carrito.reduce(
    (acc, item) => acc + parseFloat(item.precio) * (item.cantidad || 1),
    0
  );

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
      onComprobanteSubido?.(file);
    }
  };

  const eliminarImagen = () => {
    setPreview(null);
    onComprobanteSubido?.(null);
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

      {/* Upload comprobante */}
      <div className="space-y-4">
        <label className="block text-sm font-bold text-gray-400 uppercase tracking-wider">
          Subir comprobante
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-full bg-black border border-purple-500/30 rounded-xl p-3 text-white file:bg-purple-600 file:border-0 file:px-4 file:py-2 file:rounded-lg file:text-white file:font-bold hover:file:bg-purple-700 transition-all"
        />

        {/* Preview del comprobante */}
        {preview && (
          <div className="mt-4 relative animate-in fade-in zoom-in">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-48 object-cover rounded-xl border border-cyan-500/50"
            />
            <button
              onClick={eliminarImagen}
              className="absolute top-2 right-2 bg-red-500 p-2 rounded-lg text-xs font-bold text-white"
            >
              ELIMINAR
            </button>
          </div>
        )}

        {/* Botón enviar */}
        <button
          disabled={!preview || enviando}
          onClick={onConfirmarPedido}
          className={`w-full py-4 rounded-xl font-black text-white transition-all ${
            !preview || enviando
              ? "bg-zinc-800 cursor-not-allowed"
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
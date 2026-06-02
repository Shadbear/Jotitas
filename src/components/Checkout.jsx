function Checkout({ carrito, metodoPago }) {
  const total = carrito.reduce(
    (acc, item) => acc + (parseFloat(item.precio) * (item.cantidad || 1)),
    0
  );

  return (
    // Aplicamos neon-border y un fondo semi-transparente
    <div className="bg-black/60 p-8 rounded-3xl neon-border border border-purple-500/20 backdrop-blur-md">
      <h2 className="text-3xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
        CHECKOUT
      </h2>

      <div className="space-y-4">
        {/* Inputs con estilo mejorado */}
        {["Nombre", "Dirección", "Teléfono"].map((placeholder) => (
          <input
            key={placeholder}
            type="text"
            placeholder={placeholder}
            className="w-full p-4 rounded-xl bg-black/40 border border-purple-500/30 focus:border-cyan-400 outline-none transition-all placeholder-purple-800 text-white"
          />
        ))}

        <div className="pt-6 border-t border-purple-500/20">
          <p className="text-lg text-purple-200">
            Método de pago:
            <span className="text-cyan-400 font-bold ml-2 neon-text">
              {metodoPago || "No seleccionado"}
            </span>
          </p>

          <p className="text-3xl font-black mt-4 text-white">
            TOTAL: <span className="text-purple-400">S/ {total.toFixed(2)}</span>
          </p>
        </div>

        {/* Botón neón principal */}
        <button className="w-full bg-purple-600 hover:bg-purple-700 py-4 rounded-xl text-xl font-bold transition-all shadow-[0_0_15px_rgba(168,85,247,0.5)] border border-purple-400 mt-4 active:scale-95">
          FINALIZAR COMPRA
        </button>
      </div>
    </div>
  );
}

export default Checkout;
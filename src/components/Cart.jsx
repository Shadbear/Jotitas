function Cart({ carrito, eliminarDelCarrito, vaciarCarrito, modoOscuro }) {
  const total = carrito.reduce(
    (acc, item) => acc + parseFloat(item.precio || 0) * (item.cantidad || 1),
    0
  );

  return (
    <div className={`backdrop-blur-md p-8 rounded-3xl border shadow-[0_0_20px_rgba(168,85,247,0.1)] transition-colors duration-300 ${
      modoOscuro
        ? "bg-zinc-900/50 border-purple-500/30"
        : "bg-white border-purple-200"
    }`}>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h2 className={`text-3xl font-black uppercase tracking-widest ${
          modoOscuro ? "text-white" : "text-black"
        }`}>
          Carrito
        </h2>
        <div className="bg-purple-600 px-4 py-1 rounded-full font-bold text-sm border border-purple-400 text-white">
          {carrito.reduce((acc, item) => acc + (item.cantidad || 1), 0)} ITEM(S)
        </div>
      </div>

      {carrito.length === 0 ? (
        <div className={`text-center py-16 border-2 border-dashed rounded-2xl ${
          modoOscuro ? "border-zinc-800" : "border-zinc-200"
        }`}>
          <div className="text-6xl mb-4">🛒</div>
          <p className={modoOscuro ? "text-zinc-400" : "text-zinc-500"}>
            Tu carrito está vacío
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
            {carrito.map((item) => (
              <div
                key={item.id}
                className={`border rounded-2xl p-4 flex items-center gap-4 transition-all ${
                  modoOscuro
                    ? "bg-black/40 border-zinc-800 hover:border-purple-500/50"
                    : "bg-zinc-50 border-zinc-200 hover:border-purple-300"
                }`}
              >
                <img
                  src={item.imagen}
                  alt={item.nombre}
                  className={`w-16 h-16 object-cover rounded-xl border ${
                    modoOscuro ? "border-zinc-700" : "border-zinc-200"
                  }`}
                />
                <div className="flex-grow">
                  <h3 className={`font-bold ${modoOscuro ? "text-white" : "text-black"}`}>
                    {item.nombre}
                  </h3>
                  <p className={`font-bold text-sm ${modoOscuro ? "text-cyan-400" : "text-purple-600"}`}>
                    S/ {parseFloat(item.precio).toFixed(2)}
                  </p>
                  {item.cantidad > 1 && (
                    <p className={`text-xs mt-1 ${modoOscuro ? "text-zinc-500" : "text-zinc-400"}`}>
                      x{item.cantidad} = S/ {(parseFloat(item.precio) * item.cantidad).toFixed(2)}
                    </p>
                  )}
                </div>

                {/* Botón eliminar */}
                <button
                  onClick={() => eliminarDelCarrito(item.id)}
                  className="text-zinc-400 hover:text-red-500 transition-colors p-2"
                  aria-label="Eliminar producto"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* Total y vaciar */}
          <div className={`mt-8 border-t pt-6 ${modoOscuro ? "border-zinc-800" : "border-zinc-200"}`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className={`text-xl font-bold uppercase tracking-widest ${
                modoOscuro ? "text-zinc-400" : "text-zinc-600"
              }`}>
                Total
              </h3>
              <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                S/ {total.toFixed(2)}
              </h3>
            </div>
            <button
              onClick={vaciarCarrito}
              className={`w-full py-2 rounded-xl text-sm font-bold transition-all border ${
                modoOscuro
                  ? "text-zinc-500 hover:text-red-400 border-zinc-800 hover:border-red-500/30"
                  : "text-zinc-400 hover:text-red-500 border-zinc-200 hover:border-red-300"
              }`}
            >
              Vaciar carrito
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
function ProductCard({ producto, agregarAlCarrito }) {
  return (
    <div className="group bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-purple-500/50 transition-all duration-300 flex flex-col p-4 gap-4">
      
      {/* IMAGEN - Ahora al ser 3, mejor ponerla arriba para que no se vea tan estrecha */}
      <div className="h-64 overflow-hidden rounded-2xl">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400';
          }}
        />
      </div>

      {/* INFO */}
      <div className="flex flex-col justify-between flex-grow">
        <div>
          <h3 className="text-lg font-bold text-white leading-tight">{producto.nombre}</h3>
          <p className="text-zinc-500 text-xs uppercase tracking-widest">{producto.categoria}</p>
        </div>

        <div className="flex items-center justify-between mt-4">
          <p className="text-cyan-400 text-xl font-black">S/ {parseFloat(producto.precio).toFixed(2)}</p>
          <button
            onClick={() => agregarAlCarrito(producto)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl text-sm font-bold transition-all shadow-[0_0_10px_rgba(168,85,247,0.3)]"
          >
            AÑADIR
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
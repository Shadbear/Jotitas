function ProductCard({ producto, agregarAlCarrito }) {
  return (
    <div className="group bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-purple-500/50 transition-all duration-300 flex items-center p-4 gap-6">
      
      {/* IMAGEN - 50% de ancho */}
      <div className="w-1/2 h-40 shrink-0 overflow-hidden rounded-2xl">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400';
          }}
        />
      </div>

      {/* INFO - 50% de ancho */}
      <div className="w-1/2 flex flex-col justify-between py-2">
        <div>
          <h3 className="text-lg font-bold text-white leading-tight mb-1">{producto.nombre}</h3>
          <p className="text-zinc-500 text-xs uppercase tracking-widest mb-3">{producto.categoria}</p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-cyan-400 text-xl font-black">S/ {parseFloat(producto.precio).toFixed(2)}</p>
          
          <button
            onClick={() => agregarAlCarrito(producto)}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-xl text-sm font-bold transition-all shadow-[0_0_10px_rgba(168,85,247,0.3)]"
          >
            AÑADIR
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
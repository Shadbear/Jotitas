import { useState } from "react";

function ProductCard({ producto, agregarAlCarrito }) {
  const [modalAbierto, setModalAbierto] = useState(false);

  return (
    <>
      <div className="group bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 hover:border-purple-500/50 transition-all duration-300 flex flex-col p-4 gap-4">

        {/* Imagen */}
        <div
          className="h-64 overflow-hidden rounded-2xl cursor-pointer"
          onClick={() => setModalAbierto(true)}
        >
          <img
            src={producto.imagen}
            alt={producto.nombre}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400";
            }}
          />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-between flex-grow">
          <div>
            <h3
              className="text-lg font-bold text-white leading-tight cursor-pointer hover:text-purple-400 transition-colors"
              onClick={() => setModalAbierto(true)}
            >
              {producto.nombre}
            </h3>
            <p className="text-zinc-500 text-xs uppercase tracking-widest">{producto.categoria}</p>
          </div>

          <div className="flex items-center justify-between mt-4">
            <p className="text-cyan-400 text-xl font-black">S/ {parseFloat(producto.precio).toFixed(2)}</p>
            <div className="flex gap-2">
              <button
                onClick={() => setModalAbierto(true)}
                className="border border-zinc-700 hover:border-purple-500 text-zinc-400 hover:text-white px-3 py-2 rounded-xl text-sm transition-all"
              >
                Ver
              </button>
              <button
                onClick={() => agregarAlCarrito(producto)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl text-sm font-bold transition-all shadow-[0_0_10px_rgba(168,85,247,0.3)]"
              >
                AÑADIR
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modalAbierto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
          onClick={() => setModalAbierto(false)}
        >
          <div
            className="bg-zinc-900 rounded-3xl border border-purple-500/30 max-w-md w-full overflow-hidden shadow-[0_0_40px_rgba(168,85,247,0.2)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Imagen modal */}
            <div className="h-72 overflow-hidden">
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400";
                }}
              />
            </div>

            {/* Contenido modal */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h2 className="text-2xl font-black text-white">{producto.nombre}</h2>
                  <p className="text-zinc-500 text-xs uppercase tracking-widest mt-1">{producto.categoria}</p>
                </div>
                <button
                  onClick={() => setModalAbierto(false)}
                  className="text-zinc-500 hover:text-white transition-colors p-1"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>

              <p className="text-zinc-400 text-sm mb-6">
                {producto.descripcion || "Producto de alta calidad de la colección Jotitas. Estilo urbano con acabados premium."}
              </p>

              <div className="flex items-center justify-between">
                <p className="text-cyan-400 text-3xl font-black">S/ {parseFloat(producto.precio).toFixed(2)}</p>
                <button
                  onClick={() => {
                    agregarAlCarrito(producto);
                    setModalAbierto(false);
                  }}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-black transition-all shadow-[0_0_20px_rgba(168,85,247,0.4)]"
                >
                  AÑADIR AL CARRITO
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductCard;
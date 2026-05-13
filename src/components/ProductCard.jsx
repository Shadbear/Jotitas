function ProductCard({ producto, agregarAlCarrito }) {
  return (
    <div className="group bg-zinc-900 rounded-3xl overflow-hidden shadow-lg hover:shadow-pink-500/20 transition duration-300 hover:-translate-y-2">

      {/* IMAGEN */}
      <div className="overflow-hidden relative">

        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="h-96 w-full object-cover group-hover:scale-110 transition duration-500"
        />

        <div className="absolute top-4 left-4 bg-pink-500 px-3 py-1 rounded-full text-sm font-bold">
          NEW
        </div>

      </div>

      {/* INFO */}
      <div className="p-6">

        <h3 className="text-2xl font-bold mb-2">
          {producto.nombre}
        </h3>

        <p className="text-gray-400 mb-4">
          Streetwear premium edition.
        </p>

        <div className="flex justify-between items-center">

          <p className="text-pink-400 text-2xl font-bold">
            S/ {producto.precio}
          </p>

          <button
            onClick={() => agregarAlCarrito(producto)}
            className="bg-pink-500 hover:bg-pink-600 px-5 py-3 rounded-xl font-semibold transition"
          >
            Comprar
          </button>

        </div>
      </div>
    </div>
  );
}

export default ProductCard;
function Cart({ carrito, eliminarDelCarrito }) {

  const total = carrito.reduce(
    (acc, item) => acc + parseFloat(item.precio),
    0
  );

  return (
    <div className="bg-zinc-900 p-8 rounded-3xl shadow-2xl">

      <div className="flex items-center justify-between mb-8">

        <h2 className="text-4xl font-bold">
          Carrito
        </h2>

        <div className="bg-pink-500 px-4 py-2 rounded-full font-bold">
          {carrito.length}
        </div>

      </div>

      {carrito.length === 0 ? (

        <div className="text-center py-20">

          <div className="text-7xl mb-6">
            🛒
          </div>

          <p className="text-gray-400 text-xl">
            Tu carrito está vacío
          </p>

        </div>

      ) : (

        <>
          <div className="space-y-5 max-h-[500px] overflow-y-auto pr-2">

            {carrito.map((item, index) => (

              <div
                key={index}
                className="
                  bg-black
                  border
                  border-gray-800
                  rounded-2xl
                  p-4
                  flex
                  items-center
                  justify-between
                "
              >

                <div className="flex items-center gap-4">

                  <img
                    src={item.imagen}
                    alt={item.nombre}
                    className="w-20 h-20 object-cover rounded-xl"
                  />

                  <div>

                    <h3 className="font-bold text-lg">
                      {item.nombre}
                    </h3>

                    <p className="text-gray-400 text-sm">
                      {item.categoria}
                    </p>

                    <p className="text-pink-400 font-bold mt-1">
                      S/ {item.precio.toFixed(2)}
                    </p>

                  </div>

                </div>

                <button
                  onClick={() => eliminarDelCarrito(index)}
                  className="
                    bg-red-500
                    hover:bg-red-600
                    px-4
                    py-2
                    rounded-xl
                    transition
                  "
                >
                  X
                </button>

              </div>

            ))}

          </div>

          {/* TOTAL */}
          <div className="mt-8 border-t border-gray-800 pt-6">

            <div className="flex justify-between items-center">

              <h3 className="text-2xl font-bold">
                Total
              </h3>

              <h3 className="text-4xl font-extrabold text-pink-400">
                S/ {total.toFixed(2)}
              </h3>

            </div>

          </div>
        </>
      )}

    </div>
  );
}

export default Cart;
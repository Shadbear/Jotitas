function Checkout({ carrito, metodoPago }) {

  const total = carrito.reduce(
    (acc, item) => acc + parseFloat(item.precio),
    0
  );

  return (
    <div className="bg-zinc-900 p-8 rounded-3xl">
      <h2 className="text-3xl font-bold mb-6">
        Checkout
      </h2>

      <div className="space-y-4">

        <input
          type="text"
          placeholder="Nombre"
          className="w-full p-4 rounded-xl bg-black border border-gray-700"
        />

        <input
          type="text"
          placeholder="Dirección"
          className="w-full p-4 rounded-xl bg-black border border-gray-700"
        />

        <input
          type="text"
          placeholder="Teléfono"
          className="w-full p-4 rounded-xl bg-black border border-gray-700"
        />

        <div className="pt-4">
          <p className="text-xl">
            Método de pago:
            <span className="text-pink-400 font-bold">
              {" "} {metodoPago || "No seleccionado"}
            </span>
          </p>

          <p className="text-2xl font-bold mt-4">
            Total: S/ {total.toFixed(2)}
          </p>
        </div>

        <button className="w-full bg-pink-500 py-4 rounded-xl text-xl font-bold hover:bg-pink-600 transition">
          Finalizar Compra
        </button>

      </div>
    </div>
  );
}

export default Checkout;
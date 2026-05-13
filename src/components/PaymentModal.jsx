function PaymentMethod({ metodoPago, setMetodoPago }) {
  return (
    <div className="bg-zinc-900 p-8 rounded-3xl">
      <h2 className="text-3xl font-bold mb-6">
        Método de Pago
      </h2>

      <div className="flex flex-col gap-4">

        <button
          onClick={() => setMetodoPago("Yape")}
          className={`p-4 rounded-xl border ${
            metodoPago === "Yape"
              ? "bg-pink-500 border-pink-500"
              : "border-gray-700"
          }`}
        >
          Yape
        </button>

        <button
          onClick={() => setMetodoPago("Tarjeta")}
          className={`p-4 rounded-xl border ${
            metodoPago === "Tarjeta"
              ? "bg-pink-500 border-pink-500"
              : "border-gray-700"
          }`}
        >
          Tarjeta
        </button>

        <button
          onClick={() => setMetodoPago("PayPal")}
          className={`p-4 rounded-xl border ${
            metodoPago === "PayPal"
              ? "bg-pink-500 border-pink-500"
              : "border-gray-700"
          }`}
        >
          PayPal
        </button>
      </div>
    </div>
  );
}

export default PaymentMethod;
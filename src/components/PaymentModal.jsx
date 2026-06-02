function PaymentMethod({ metodoPago, setMetodoPago }) {
  // Al cargar el componente, dejamos Yape seleccionado por defecto
  if (metodoPago !== "Yape") {
    setMetodoPago("Yape");
  }

  return (
    <div className="bg-zinc-900/80 p-8 rounded-3xl border border-purple-500/30 backdrop-blur-sm">
      <h2 className="text-2xl font-black mb-6 text-white uppercase tracking-widest">
        Método de Pago
      </h2>

      <div className="flex items-center gap-4 p-5 rounded-2xl border-2 border-purple-500 bg-purple-600/20 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
        <span className="text-4xl">💜</span>
        <div>
          <h3 className="text-white font-bold text-lg">Yape</h3>
          <p className="text-purple-200 text-sm">El pago se procesará vía Yape</p>
        </div>
      </div>
      
      <p className="mt-6 text-xs text-center text-gray-500 uppercase tracking-widest">
        Sistema de pago seguro mediante transferencia
      </p>
    </div>
  );
}

export default PaymentMethod;
import { useState } from "react";

function Checkout({ carrito, metodoPago, vaciarCarrito }) {
  const usuarioLogueado = JSON.parse(localStorage.getItem("usuario"));
  const [form, setForm] = useState({ nombre: "", direccion: "", telefono: "" });
  const [cargando, setCargando] = useState(false);

  const total = carrito.reduce(
    (acc, item) => acc + (parseFloat(item.precio) * (item.cantidad || 1)),
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const finalizarCompra = async () => {
    if (!form.nombre || !form.direccion || !form.telefono) {
      return alert("Por favor, completa todos los campos.");
    }

    setCargando(true);
    try {
      const res = await fetch("/api/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
  ...form,
  usuario_email: usuarioLogueado?.email || "anonimo@ejemplo.com", // Envía el email real o un valor por defecto
  productos: carrito,
          total: total,
          metodoPago: metodoPago || "Efectivo"
        })
      });

      if (res.ok) {
        alert("¡Compra exitosa! Gracias por confiar en JOTITAS.");
        vaciarCarrito(); // Limpiamos el carrito tras el éxito
        setForm({ nombre: "", direccion: "", telefono: "" }); // Limpiamos formulario
      } else {
        alert("Error al procesar el pedido.");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="bg-black/60 p-8 rounded-3xl neon-border border border-purple-500/20 backdrop-blur-md">
      <h2 className="text-3xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
        CHECKOUT
      </h2>

      <div className="space-y-4">
        <input name="nombre" onChange={handleChange} value={form.nombre} type="text" placeholder="Nombre" className="w-full p-4 rounded-xl bg-black/40 border border-purple-500/30 focus:border-cyan-400 outline-none text-white" />
        <input name="direccion" onChange={handleChange} value={form.direccion} type="text" placeholder="Dirección" className="w-full p-4 rounded-xl bg-black/40 border border-purple-500/30 focus:border-cyan-400 outline-none text-white" />
        <input name="telefono" onChange={handleChange} value={form.telefono} type="text" placeholder="Teléfono" className="w-full p-4 rounded-xl bg-black/40 border border-purple-500/30 focus:border-cyan-400 outline-none text-white" />

        <div className="pt-6 border-t border-purple-500/20">
          <p className="text-lg text-purple-200">
            Método de pago:
            <span className="text-cyan-400 font-bold ml-2 neon-text"> {metodoPago || "No seleccionado"}</span>
          </p>
          <p className="text-3xl font-black mt-4 text-white">
            TOTAL: <span className="text-purple-400">S/ {total.toFixed(2)}</span>
          </p>
        </div>

        <button 
          onClick={finalizarCompra}
          disabled={cargando || carrito.length === 0}
          className="w-full bg-purple-600 hover:bg-purple-700 py-4 rounded-xl text-xl font-bold transition-all border border-purple-400 mt-4 disabled:opacity-50"
        >
          {cargando ? "PROCESANDO..." : "FINALIZAR COMPRA"}
        </button>
      </div>
    </div>
  );
}

export default Checkout;
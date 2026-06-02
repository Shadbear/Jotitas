import { useState, useEffect } from "react";

function Admin() {
  const [pedidos, setPedidos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [password, setPassword] = useState("");
  const [autenticado, setAutenticado] = useState(false);

  // Cargar pedidos desde API
  useEffect(() => {
    fetch("/api/pedidos")
      .then((res) => res.json())
      .then((data) => setPedidos(data));
  }, []);

  // Cargar productos desde API
  useEffect(() => {
    fetch("/api/productos")
      .then((res) => res.json())
      .then(setProductos);
  }, []);

  // Aprobar pedido
  const aprobarPedido = async (id) => {
    const res = await fetch("/api/pedidos", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      alert("Pedido aprobado y marcado como PAGADO");
      setPedidos(pedidos.filter((p) => p.id !== id));
    }
  };

  // Actualizar producto
  const actualizarStock = async (id, nombre, precio, stock) => {
    await fetch("/api/productos", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, nombre, precio, stock }),
    });
    alert("Producto actualizado");
  };

  // Pantalla de login admin
  if (!autenticado) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black">
        <input
          type="password"
          placeholder="Contraseña"
          onChange={(e) => setPassword(e.target.value)}
          className="p-2 mb-4 text-black rounded-lg"
        />
        <button
          onClick={() => password === "Jotitas2026" && setAutenticado(true)}
          className="bg-purple-600 px-6 py-2 rounded-lg font-bold text-white hover:bg-purple-700"
        >
          Entrar
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 bg-black min-h-screen text-white">
      <h1 className="text-4xl font-black mb-8">Centro de Control Jotitas</h1>

      {/* Sección Pedidos */}
      <section className="bg-zinc-900 p-6 rounded-2xl border border-purple-500/30 mb-8">
        <h2 className="text-2xl font-bold mb-4">Pedidos Pendientes</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="text-purple-400 border-b border-zinc-700">
              <th className="p-3">Cliente</th>
              <th className="p-3">Nro Operación</th>
              <th className="p-3">Total</th>
              <th className="p-3">Acción</th>
            </tr>
          </thead>
          <tbody>
            {pedidos.map((p) => (
              <tr key={p.id} className="border-b border-zinc-800">
                <td className="p-3">{p.nombre}</td>
                <td className="p-3 font-mono text-cyan-400">{p.comprobante}</td>
                <td className="p-3">S/ {p.total}</td>
                <td className="p-3">
                  <button
                    onClick={() => aprobarPedido(p.id)}
                    className="bg-green-600 px-4 py-1 rounded-lg font-bold hover:bg-green-700"
                  >
                    Aprobar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Sección Stock */}
      <section className="bg-zinc-900 p-6 rounded-2xl border border-purple-500/30">
        <h2 className="text-2xl font-bold mb-4">Gestión de Stock</h2>
        <div className="grid gap-4">
          {productos.map((prod) => (
            <div
              key={prod.id}
              className="flex gap-4 items-center bg-black p-4 rounded-xl border border-zinc-800"
            >
              <input
                className="bg-transparent border-b border-zinc-600 w-full text-white"
                defaultValue={prod.nombre}
                onBlur={(e) => (prod.nombre = e.target.value)}
              />
              <input
                className="bg-transparent border-b border-zinc-600 w-20 text-white"
                type="number"
                defaultValue={prod.precio}
                onChange={(e) => (prod.precio = e.target.value)}
              />
              <input
                className="bg-transparent border-b border-zinc-600 w-20 text-white"
                type="number"
                defaultValue={prod.stock}
                onChange={(e) => (prod.stock = e.target.value)}
              />
              <button
                onClick={() => actualizarStock(prod.id, prod.nombre, prod.precio, prod.stock)}
                className="bg-purple-600 px-4 py-2 rounded-lg font-bold hover:bg-purple-700"
              >
                Guardar
              </button>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

export default Admin;
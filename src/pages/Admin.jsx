import { useState, useEffect } from "react";

function Admin() {
  const [pedidos, setPedidos] = useState([]);
  const [productos, setProductos] = useState([]);
  const [password, setPassword] = useState("");
  const [autenticado, setAutenticado] = useState(false);

  useEffect(() => {
    fetch("/api/pedidos")
      .then((res) => res.json())
      .then((data) => setPedidos(Array.isArray(data) ? data : []));
  }, []);

  useEffect(() => {
    fetch("/api/productos")
      .then((res) => res.json())
      .then((data) => setProductos(Array.isArray(data) ? data : []));
  }, []);

  const aprobarPedido = async (id, accion) => {
    const res = await fetch("/api/pedidos", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, accion }),
    });
    if (res.ok) {
      alert(accion === "aprobar" ? "Pedido aprobado ✅" : "Pedido rechazado ❌");
      setPedidos(pedidos.filter((p) => p.id !== id));
    }
  };

  const actualizarStock = async (id, nombre, precio, stock) => {
    const res = await fetch("/api/productos", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, nombre, precio, stock }),
    });
    if (res.ok) {
      alert("Producto actualizado");
    } else {
      alert("Error al actualizar");
    }
  };

  if (!autenticado) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black">
        <h1 className="text-3xl font-black text-white mb-8 tracking-tighter">JOTITAS ADMIN</h1>
        <input
          type="password"
          placeholder="Contraseña"
          onChange={(e) => setPassword(e.target.value)}
          className="p-3 mb-4 text-black rounded-xl w-64 outline-none"
        />
        <button
          onClick={() => password === "Jotitas2026" && setAutenticado(true)}
          className="bg-purple-600 px-8 py-3 rounded-xl font-bold text-white hover:bg-purple-700 transition-all"
        >
          Entrar
        </button>
      </div>
    );
  }

  return (
    <div className="p-8 bg-black min-h-screen text-white">
      <h1 className="text-4xl font-black mb-8 tracking-tighter">Centro de Control Jotitas</h1>

      {/* Sección Pedidos */}
      <section className="bg-zinc-900 p-6 rounded-2xl border border-purple-500/30 mb-8">
        <h2 className="text-2xl font-bold mb-6 text-purple-400">Pedidos Pendientes</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-800">
                <th className="px-4 py-3 text-xs font-bold text-purple-400 uppercase tracking-wider rounded-tl-xl">Cliente</th>
                <th className="px-4 py-3 text-xs font-bold text-purple-400 uppercase tracking-wider">Email</th>
                <th className="px-4 py-3 text-xs font-bold text-purple-400 uppercase tracking-wider">Dirección</th>
                <th className="px-4 py-3 text-xs font-bold text-purple-400 uppercase tracking-wider">Teléfono</th>
                <th className="px-4 py-3 text-xs font-bold text-purple-400 uppercase tracking-wider">Nro Operación</th>
                <th className="px-4 py-3 text-xs font-bold text-purple-400 uppercase tracking-wider">Total</th>
                <th className="px-4 py-3 text-xs font-bold text-purple-400 uppercase tracking-wider rounded-tr-xl">Acción</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-10 text-zinc-500">
                    No hay pedidos pendientes
                  </td>
                </tr>
              ) : (
                pedidos.map((p, i) => (
                  <tr
                    key={p.id}
                    className={`border-b border-zinc-800 transition-colors hover:bg-zinc-800/50 ${
                      i % 2 === 0 ? "bg-zinc-900" : "bg-zinc-900/50"
                    }`}
                  >
                    <td className="px-4 py-3 font-medium">{p.nombre}</td>
                    <td className="px-4 py-3 text-zinc-400 text-sm">{p.usuario_email}</td>
                    <td className="px-4 py-3 text-zinc-400 text-sm">{p.direccion || "—"}</td>
                    <td className="px-4 py-3 text-zinc-400 text-sm">{p.telefono || "—"}</td>
                    <td className="px-4 py-3 font-mono text-cyan-400">{p.comprobante}</td>
                    <td className="px-4 py-3 font-bold text-green-400">S/ {parseFloat(p.total).toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => aprobarPedido(p.id, "aprobar")}
                          className="bg-green-600 px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-green-700 transition-all"
                        >
                          Aprobar
                        </button>
                        <button
                          onClick={() => aprobarPedido(p.id, "rechazar")}
                          className="bg-red-600 px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-red-700 transition-all"
                        >
                          Rechazar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Sección Stock */}
      <section className="bg-zinc-900 p-6 rounded-2xl border border-purple-500/30">
        <h2 className="text-2xl font-bold mb-6 text-purple-400">Gestión de Stock</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-800">
                <th className="px-4 py-3 text-xs font-bold text-purple-400 uppercase tracking-wider rounded-tl-xl">#</th>
                <th className="px-4 py-3 text-xs font-bold text-purple-400 uppercase tracking-wider">Nombre del Producto</th>
                <th className="px-4 py-3 text-xs font-bold text-purple-400 uppercase tracking-wider">Precio (S/)</th>
                <th className="px-4 py-3 text-xs font-bold text-purple-400 uppercase tracking-wider">Stock</th>
                <th className="px-4 py-3 text-xs font-bold text-purple-400 uppercase tracking-wider rounded-tr-xl">Acción</th>
              </tr>
            </thead>
            <tbody>
              {productos.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-zinc-500">
                    No hay productos cargados
                  </td>
                </tr>
              ) : (
                productos.map((prod, i) => (
                  <tr
                    key={prod.id}
                    className={`border-b border-zinc-800 hover:bg-zinc-800/50 transition-colors ${
                      i % 2 === 0 ? "bg-zinc-900" : "bg-zinc-900/50"
                    }`}
                  >
                    <td className="px-4 py-3 text-zinc-500 text-sm">{i + 1}</td>
                    <td className="px-4 py-3">
                      <input
                        className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-1.5 text-white text-sm w-full focus:border-purple-500 outline-none transition-all"
                        defaultValue={prod.nombre}
                        onBlur={(e) => (prod.nombre = e.target.value)}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-1.5 text-white text-sm w-24 focus:border-purple-500 outline-none transition-all"
                        type="number"
                        defaultValue={prod.precio}
                        onChange={(e) => (prod.precio = e.target.value)}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <input
                        className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-1.5 text-white text-sm w-20 focus:border-purple-500 outline-none transition-all"
                        type="number"
                        defaultValue={prod.stock}
                        onChange={(e) => (prod.stock = e.target.value)}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => actualizarStock(prod.id, prod.nombre, prod.precio, prod.stock)}
                        className="bg-purple-600 px-4 py-1.5 rounded-lg text-sm font-bold hover:bg-purple-700 transition-all"
                      >
                        Guardar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}

export default Admin;
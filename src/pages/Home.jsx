import { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, getRedirectResult } from "firebase/auth";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import Cart from "../components/Cart";
import PaymentMethod from "../components/PaymentMethod";
import Login from "./Login";
import Hero from "../components/Hero";
import BotAyuda from "../components/BotAyuda";
import Footer from "../components/Footer";

const WhatsAppButton = () => (
  <a
    href="https://wa.me/51921629315"
    target="_blank"
    rel="noopener noreferrer"
    className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-400 text-white p-4 rounded-full shadow-[0_0_20px_rgba(34,197,94,0.5)] hover:shadow-[0_0_30px_rgba(34,197,94,0.8)] transition-all hover:scale-110"
    aria-label="Contactar por WhatsApp"
  >
    <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.117 1.528 5.845L.057 23.535a.75.75 0 00.906.919l5.857-1.533A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.725 9.725 0 01-4.964-1.355l-.355-.212-3.68.964.981-3.589-.232-.369A9.725 9.725 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
    </svg>
  </a>
);

function Home() {
  const [logueado, setLogueado] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  const [mostrarLogin, setMostrarLogin] = useState(false);

  useEffect(() => {
    const manejarRedirect = async () => {
      try {
        const result = await getRedirectResult(auth);
        if (result?.user) {
          setUsuario(result.user);
          setLogueado(true);
        }
      } catch (error) {
        console.error("Error en redirect:", error);
      }
    };
    manejarRedirect();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsuario(user);
        setLogueado(true);
        setMostrarLogin(false);
      } else {
        setUsuario(null);
        setLogueado(false);
      }
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    const cargarProductos = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/productos");
        if (!res.ok) throw new Error("Error cargando API");
        const data = await res.json();
        const productosLimpios = data.map((producto) => ({
          id: producto.id,
          nombre: producto.nombre || "Sin nombre",
          precio: parseFloat(producto.precio) || 0,
          categoria: producto.categoria || "Otros",
          imagen: producto.imagen || "",
        }));
        setProductos(productosLimpios);
      } catch (error) {
        console.error(error);
        setError("No se pudieron cargar productos");
      } finally {
        setLoading(false);
      }
    };
    cargarProductos();
  }, []);

  useEffect(() => {
    const guardado = localStorage.getItem("carrito");
    if (guardado) {
      try {
        setCarrito(JSON.parse(guardado));
      } catch {
        setCarrito([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto) => {
    const existe = carrito.find((item) => item.id === producto.id);
    if (existe) {
      setCarrito(
        carrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: (item.cantidad || 1) + 1 }
            : item
        )
      );
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }]);
    }
  };

  const eliminarDelCarrito = (id) => {
    setCarrito(carrito.filter((item) => item.id !== id));
  };

  const vaciarCarrito = () => setCarrito([]);

  const total = carrito.reduce(
    (acc, item) => acc + parseFloat(item.precio) * (item.cantidad || 1),
    0
  );

  const productosFiltrados = productos.filter((producto) => {
    const coincideCategoria =
      categoriaSeleccionada === "Todos"
        ? true
        : producto.categoria === categoriaSeleccionada;
    const coincideBusqueda = producto.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase());
    return coincideCategoria && coincideBusqueda;
  });

  const manejarConfirmacionPedido = async (numeroOperacion, direccion, telefono) => {
    if (!logueado) {
      setMostrarLogin(true);
      return;
    }
    if (!numeroOperacion) {
      alert("Por favor, ingresa tu número de operación de Yape");
      return;
    }
    if (carrito.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }
    try {
      setEnviando(true);
      const response = await fetch("/api/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuario_email: usuario.email,
          nombre: usuario.displayName,
          telefono: telefono,
          direccion: direccion,
          productos: carrito,
          total: total,
          metodo_pago: "YAPE",
          comprobante: numeroOperacion,
          estado: "pendiente",
        }),
      });
      if (!response.ok) throw new Error("Error al guardar en la base de datos");
      alert("¡Pedido realizado con éxito! Estamos verificando tu pago.");
      vaciarCarrito();
    } catch (error) {
      console.error("Error completo:", error);
      alert("Hubo un error al procesar el pedido.");
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="bg-[#050510] cyber-grid scanlines min-h-screen">

      {/* Navbar */}
      <Navbar
        usuario={usuario}
        carritoLength={carrito.reduce((acc, item) => acc + item.cantidad, 0)}
        onLogout={() => auth.signOut()}
      />

      {/* 1. Hero */}
      <Hero />

      {/* 2. Buscador */}
      <section className="px-6 md:px-10 pt-10">
        <input
          type="text"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          className="w-full bg-zinc-900 text-white px-5 py-3 rounded-xl outline-none border border-zinc-700 focus:border-neon-purple transition-all"
        />
      </section>

      {/* 3. Filtros por categoría */}
      <section className="flex flex-wrap gap-4 px-6 md:px-10 py-10">
        {["Todos", "Polos", "Poleras", "Pantalones", "Casacas", "Zapatillas", "Accesorios"].map(
          (categoria) => (
            <button
              key={categoria}
              onClick={() => setCategoriaSeleccionada(categoria)}
              className={`px-6 py-3 rounded-2xl transition-all ${
                categoriaSeleccionada === categoria
                  ? "bg-neon-purple shadow-neon-purple text-white"
                  : "bg-zinc-900 text-gray-400"
              }`}
            >
              {categoria}
            </button>
          )
        )}
      </section>

      {/* 4. Encabezado del catálogo */}
      <section className="flex justify-between items-center px-6 md:px-10 pb-10">
        <h2 className="text-4xl font-bold text-white">Productos</h2>
        <div className="bg-zinc-900 text-white px-5 py-2 rounded-xl">
          {productosFiltrados.length}
        </div>
      </section>

      {/* 5. Estados de carga y error */}
      {loading && (
        <div className="text-center py-20 text-pink-400 text-2xl">Cargando...</div>
      )}
      {error && (
        <div className="text-center text-red-500 py-20">{error}</div>
      )}

      {/* 6. Catálogo de productos */}
      <section id="tienda" className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-6 md:px-10 pb-20">
        {productosFiltrados.map((producto) => (
          <ProductCard
            key={producto.id}
            producto={producto}
            agregarAlCarrito={agregarAlCarrito}
          />
        ))}
      </section>

      {/* 7. Carrito y método de pago */}
      <section className="grid xl:grid-cols-2 gap-10 px-6 md:px-10 pb-20">
        <Cart
          carrito={carrito}
          eliminarDelCarrito={eliminarDelCarrito}
          vaciarCarrito={vaciarCarrito}
        />
        <PaymentMethod
          carrito={carrito}
          total={total}
          onConfirmarPedido={manejarConfirmacionPedido}
        />
      </section>

      <Footer />
      <WhatsAppButton />
      <BotAyuda />

      {/* Modal Login */}
      {mostrarLogin && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setMostrarLogin(false)}
        >
          <div onClick={(e) => e.stopPropagation()}>
            <Login onLogin={() => setMostrarLogin(false)} />
          </div>
        </div>
      )}

    </div>
  );
}

export default Home;
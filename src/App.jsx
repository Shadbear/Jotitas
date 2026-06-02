import { useEffect, useState } from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";
import PaymentMethod from "./components/PaymentMethod";
import Login from "./pages/Login";
import Hero from "./components/Hero";

function App() {
  const [logueado, setLogueado] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  const [comprobante, setComprobante] = useState(null);

  // Escuchar estado de autenticación Firebase
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUsuario(user);
        setLogueado(true);
      } else {
        setUsuario(null);
        setLogueado(false);
      }
    });
    return unsubscribe;
  }, []);

  // Cargar productos desde API
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

  // Cargar carrito desde localStorage
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

  // Guardar carrito en localStorage
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const provider = new GoogleAuthProvider();

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      console.log("Login exitoso");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

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

  const manejarConfirmacionPedido = async (archivoComprobante) => {
    if (!archivoComprobante) {
      alert("Por favor, sube tu comprobante de Yape");
      return;
    }
    try {
      setEnviando(true);

      // 1. Subir a Firebase Storage
      const storageRef = ref(storage, `comprobantes/${Date.now()}_${archivoComprobante.name}`);
      await uploadBytes(storageRef, archivoComprobante);
      const url = await getDownloadURL(storageRef);

      // 2. Enviar a la API
      const response = await fetch("/api/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuario_email: usuario.email,
          nombre: usuario.displayName,
          telefono: "999999999",
          direccion: "Tu dirección aquí",
          productos: carrito,
          total: total,
          metodo_pago: "YAPE",
          comprobante: url,
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

  if (!logueado) {
    return <Login onLogin={handleLogin} />;
  }

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
          onComprobanteSubido={(file) => setComprobante(file)}
          onConfirmarPedido={() => manejarConfirmacionPedido(comprobante)}
        />
      </section>

    </div>
  );
}

export default App;
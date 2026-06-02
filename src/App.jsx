import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";
import PaymentMethod from "./components/PaymentMethod";
import Login from "./pages/Login";
import Hero from "./components/Hero";

function App() {
  const [logueado, setLogueado] = useState(
    localStorage.getItem("logueado") === "true"
  );
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");
  const usuario = {
  nombre: "Carlos",
  email: "carlos@gmail.com",
  foto: "https://lh3.googleusercontent.com/a/..." // Esta es la foto que se verá en tu Navbar
};

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

  const eliminarDelCarrito = (indexAEliminar) => {
  const nuevoCarrito = carrito.filter((_, index) => index !== indexAEliminar);
  setCarrito(nuevoCarrito);
};

// Y en tu componente Cart dentro de App.jsx:
<Cart 
  carrito={carrito} 
  eliminarDelCarrito={eliminarDelCarrito} 
/>

  const vaciarCarrito = () => setCarrito([]);

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

  if (!logueado) {
    return <Login onLogin={() => setLogueado(true)} />;
  }

  return (
    <div className="bg-[#050510] cyber-grid scanlines min-h-screen">

      {/* Navbar */}
      <Navbar
        carrito={carrito}
        onLogout={() => {
          localStorage.removeItem("logueado");
          setLogueado(false);
        }}
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
{/* Ahora usa 1 o 2 columnas como máximo para que no se vean apretados */}
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
        <PaymentMethod carrito={carrito} />
      </section>

    </div>
  );
}

export default App;
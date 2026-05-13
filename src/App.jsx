import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import Cart from "./components/Cart";
import PaymentMethod from "./components/PaymentMethod";

function App() {

  // ESTADOS
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [categoriaSeleccionada, setCategoriaSeleccionada] =
    useState("Todos");

  const [busqueda, setBusqueda] = useState("");

  // CARGAR PRODUCTOS
  useEffect(() => {

    fetch("http://localhost/jotitas-api/productos.php")

      .then((res) => {

        if (!res.ok) {
          throw new Error("Error al obtener productos");
        }

        return res.json();

      })

      .then((data) => {

        const productosFormateados = data.map((producto) => ({
          ...producto,
          precio: parseFloat(producto.precio),
        }));

        setProductos(productosFormateados);

        setLoading(false);

      })

      .catch((err) => {

        console.error(err);

        setError("No se pudieron cargar los productos");

        setLoading(false);

      });

  }, []);

  // GUARDAR CARRITO
  useEffect(() => {

    localStorage.setItem(
      "carrito",
      JSON.stringify(carrito)
    );

  }, [carrito]);

  // CARGAR CARRITO
  useEffect(() => {

    const carritoGuardado =
      localStorage.getItem("carrito");

    if (carritoGuardado) {
      setCarrito(JSON.parse(carritoGuardado));
    }

  }, []);

  // AGREGAR AL CARRITO
  const agregarAlCarrito = (producto) => {

    setCarrito((prev) => [...prev, producto]);

  };

  // ELIMINAR DEL CARRITO
  const eliminarDelCarrito = (index) => {

    const nuevoCarrito = [...carrito];

    nuevoCarrito.splice(index, 1);

    setCarrito(nuevoCarrito);

  };

  // FILTROS
  const productosFiltrados = productos.filter((producto) => {

    const coincideCategoria =
      categoriaSeleccionada === "Todos"
        ? true
        : producto.categoria === categoriaSeleccionada;

    const coincideBusqueda =
      producto.nombre
        .toLowerCase()
        .includes(busqueda.toLowerCase());

    return coincideCategoria && coincideBusqueda;

  });

  return (

    <div className="
      bg-black
      min-h-screen
      text-white
      overflow-x-hidden
    ">

      {/* NAVBAR */}
      <Navbar carrito={carrito} />

      {/* HERO */}
      <section
        id="inicio"
        className="
          relative
          text-center
          py-32
          px-6
          bg-gradient-to-b
          from-black
          via-zinc-950
          to-zinc-900
        "
      >

        <div className="
          absolute
          inset-0
          bg-[radial-gradient(circle_at_top,rgba(236,72,153,0.15),transparent_40%)]
        " />

        <div className="relative z-10">

          <h1 className="
            text-6xl
            md:text-8xl
            font-black
            tracking-tight
            mb-6
          ">
            JOTITAS
          </h1>

          <p className="
            text-gray-400
            text-xl
            max-w-2xl
            mx-auto
            leading-relaxed
          ">
            Ropa urbana con estilo para cualquier ocasión.
          </p>

          <a
            href="#tienda"
            className="
              inline-block
              mt-10
              bg-pink-500
              hover:bg-pink-600
              px-10
              py-4
              rounded-2xl
              text-xl
              font-bold
              transition
              hover:scale-105
              shadow-lg
              shadow-pink-500/30
            "
          >
            Ver Productos
          </a>

        </div>

      </section>

      {/* BUSCADOR */}
      <section className="px-6 md:px-10 pt-10">

        <div className="relative">

          <input
            type="text"
            placeholder="Buscar ropa..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="
              w-full
              bg-zinc-900
              border
              border-gray-800
              rounded-2xl
              p-5
              text-lg
              outline-none
              focus:border-pink-500
              transition
            "
          />

          <span className="
            absolute
            right-5
            top-1/2
            -translate-y-1/2
            text-gray-500
          ">
            🔍
          </span>

        </div>

      </section>

      {/* CATEGORIAS */}
      <section className="
        flex
        flex-wrap
        gap-4
        px-6
        md:px-10
        py-10
      ">

        {[
          "Todos",
          "Polos",
          "Poleras",
          "Pantalones",
          "Casacas",
          "Zapatillas",
          "Accesorios",
        ].map((categoria) => (

          <button
            key={categoria}
            onClick={() =>
              setCategoriaSeleccionada(categoria)
            }
            className={`
              px-6
              py-3
              rounded-2xl
              font-semibold
              transition
              border

              ${
                categoriaSeleccionada === categoria
                  ? "bg-pink-500 border-pink-500"
                  : "bg-zinc-900 border-zinc-800 hover:border-pink-500"
              }
            `}
          >
            {categoria}
          </button>

        ))}

      </section>

      {/* TITULO */}
      <section className="
        flex
        items-center
        justify-between
        px-6
        md:px-10
        pb-10
      ">

        <h2 className="
          text-3xl
          md:text-4xl
          font-black
        ">
          Productos
        </h2>

        <div className="
          bg-zinc-900
          border
          border-zinc-800
          px-5
          py-2
          rounded-2xl
          text-gray-300
        ">
          {productosFiltrados.length} productos
        </div>

      </section>

      {/* LOADING */}
      {loading && (

        <div className="
          text-center
          py-20
          text-2xl
          text-pink-400
        ">
          Cargando productos...
        </div>

      )}

      {/* ERROR */}
      {error && (

        <div className="
          text-center
          py-20
          text-red-500
          text-2xl
        ">
          {error}
        </div>

      )}

      {/* PRODUCTOS */}
      {!loading && !error && (

        <section
          id="tienda"
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            gap-8
            px-6
            md:px-10
            pb-20
          "
        >

          {productosFiltrados.length === 0 && (

            <div className="
              col-span-full
              text-center
              py-24
            ">

              <h2 className="
                text-3xl
                font-bold
                text-gray-500
              ">
                No hay productos disponibles
              </h2>

            </div>

          )}

          {productosFiltrados.map((producto) => (

            <ProductCard
              key={producto.id}
              producto={producto}
              agregarAlCarrito={agregarAlCarrito}
            />

          ))}

        </section>

      )}

      {/* CARRITO + PAGO */}
      <section
        id="contacto"
        className="
          grid
          xl:grid-cols-2
          gap-10
          px-6
          md:px-10
          pb-32
        "
      >

        <Cart
          carrito={carrito}
          eliminarDelCarrito={eliminarDelCarrito}
        />

        <PaymentMethod carrito={carrito} />

      </section>

      {/* BOTON ARRIBA */}
      <a
        href="#inicio"
        className="
          fixed
          bottom-6
          right-6
          bg-pink-500
          hover:bg-pink-600
          w-14
          h-14
          rounded-full
          flex
          items-center
          justify-center
          text-2xl
          shadow-2xl
          transition
          hover:scale-110
        "
      >
        ↑
      </a>

    </div>

  );

}

export default App;
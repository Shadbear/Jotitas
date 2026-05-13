import { useState } from "react";

function Navbar({ carrito }) {

  const [menuAbierto, setMenuAbierto] = useState(false);

  const scrollToSection = (id) => {

    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }

    setMenuAbierto(false);
  };

  return (
    <nav className="
      sticky
      top-0
      z-50
      backdrop-blur-lg
      bg-black/70
      border-b
      border-gray-800
      px-6
      md:px-10
      py-5
    ">

      <div className="
        flex
        justify-between
        items-center
      ">

        {/* LOGO */}
        <div
          onClick={() => scrollToSection("inicio")}
          className="
            cursor-pointer
            flex
            items-center
            gap-3
          "
        >

          <div className="
            w-10
            h-10
            bg-pink-500
            rounded-2xl
            flex
            items-center
            justify-center
            font-black
            text-black
          ">
            J
          </div>

          <h1 className="
            text-3xl
            font-black
            tracking-tight
            text-pink-500
          ">
            JOTITAS
          </h1>

        </div>

        {/* DESKTOP MENU */}
        <div className="
          hidden
          md:flex
          items-center
          gap-8
        ">

          <button
            onClick={() => scrollToSection("inicio")}
            className="hover:text-pink-400 transition"
          >
            Inicio
          </button>

          <button
            onClick={() => scrollToSection("tienda")}
            className="hover:text-pink-400 transition"
          >
            Tienda
          </button>

          <button
            onClick={() => scrollToSection("contacto")}
            className="hover:text-pink-400 transition"
          >
            Pago
          </button>

          {/* CARRITO */}
          <div className="
            bg-pink-500
            px-5
            py-3
            rounded-2xl
            font-bold
            flex
            items-center
            gap-2
          ">

            <span className="text-xl">
              🛒
            </span>

            <span>
              {carrito.length}
            </span>

          </div>

        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setMenuAbierto(!menuAbierto)}
          className="
            md:hidden
            text-3xl
          "
        >
          ☰
        </button>

      </div>

      {/* MOBILE MENU */}
      {menuAbierto && (

        <div className="
          md:hidden
          mt-6
          flex
          flex-col
          gap-4
          bg-zinc-900
          p-6
          rounded-2xl
        ">

          <button
            onClick={() => scrollToSection("inicio")}
            className="text-left"
          >
            Inicio
          </button>

          <button
            onClick={() => scrollToSection("tienda")}
            className="text-left"
          >
            Tienda
          </button>

          <button
            onClick={() => scrollToSection("contacto")}
            className="text-left"
          >
            Pago
          </button>

          <div className="
            bg-pink-500
            px-4
            py-3
            rounded-xl
            font-bold
            text-center
          ">
            🛒 {carrito.length}
          </div>

        </div>

      )}

    </nav>
  );
}

export default Navbar;
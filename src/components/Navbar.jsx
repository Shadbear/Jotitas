import { useState } from "react";

function Navbar({ carrito, onLogout }) {

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
      bg-black/80
      border-b
      border-purple-500/30
      px-6
      md:px-10
      py-5
      neon-border
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
            group
          "
        >

<div className="w-12 h-12 bg-neon-pink shadow-neon ..."> 
  J
</div>

          <div>
            <h1 className="
              text-3xl
              font-black
              tracking-widest
              bg-gradient-to-r
              from-purple-400
              via-purple-500
              to-cyan-400
              bg-clip-text
              text-transparent
              neon-text
            ">
              JOTITAS
            </h1>
            <p className="text-cyan-400 text-xs font-bold tracking-widest">
              CYBERWEAR
            </p>
          </div>

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
            className="
              text-purple-300
              hover:text-cyan-400
              transition
              font-bold
              tracking-wide
              hover:neon-cyan
            "
          >
            INICIO
          </button>

          <button
            onClick={() => scrollToSection("tienda")}
            className="
              text-purple-300
              hover:text-cyan-400
              transition
              font-bold
              tracking-wide
            "
          >
            TIENDA
          </button>

          <button
            onClick={() => scrollToSection("contacto")}
            className="
              text-purple-300
              hover:text-cyan-400
              transition
              font-bold
              tracking-wide
            "
          >
            PAGO
          </button>

          {/* CARRITO */}
          <div className="
            bg-gradient-to-r
            from-purple-600
            to-cyan-500
            px-6
            py-3
            rounded-xl
            font-bold
            flex
            items-center
            gap-2
            neon-border
            animate-pulse-neon
          ">

            <span className="text-2xl">
              🛒
            </span>

            <span className="text-white">
              {carrito.length}
            </span>

          </div>

          {/* SALIR */}
          <button
            onClick={onLogout}
            className="
              border
              border-cyan-400
              text-cyan-400
              hover:bg-cyan-400
              hover:text-black
              px-6
              py-3
              rounded-xl
              font-bold
              transition
              neon-border-cyan
            "
          >
            SALIR
          </button>

        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setMenuAbierto(!menuAbierto)}
          className="
            md:hidden
            text-3xl
            text-purple-400
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
          bg-purple-900/20
          border
          border-purple-500/30
          p-6
          rounded-2xl
          neon-border
        ">

          <button
            onClick={() => scrollToSection("inicio")}
            className="text-left text-purple-300 font-bold hover:text-cyan-400"
          >
            INICIO
          </button>

          <button
            onClick={() => scrollToSection("tienda")}
            className="text-left text-purple-300 font-bold hover:text-cyan-400"
          >
            TIENDA
          </button>

          <button
            onClick={() => scrollToSection("contacto")}
            className="text-left text-purple-300 font-bold hover:text-cyan-400"
          >
            PAGO
          </button>

          <div className="
            bg-gradient-to-r
            from-purple-600
            to-cyan-500
            px-4
            py-3
            rounded-xl
            font-bold
            text-center
            text-white
            neon-border
          ">
            🛒 {carrito.length}
          </div>

          <button
            onClick={onLogout}
            className="
              border
              border-cyan-400
              text-cyan-400
              px-4
              py-3
              rounded-xl
              font-bold
              neon-border-cyan
            "
          >
            SALIR
          </button>

        </div>

      )}

    </nav>
  );
}

export default Navbar;
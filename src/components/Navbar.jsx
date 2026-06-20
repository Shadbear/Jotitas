function Navbar({ usuario, carritoLength, onLogout, modoOscuro, toggleModo }) {
  return (
    <nav className={`fixed top-0 w-full z-50 backdrop-blur-md border-b px-8 py-4 flex items-center justify-between transition-colors duration-300 ${
      modoOscuro 
        ? "bg-black/80 border-zinc-800" 
        : "bg-white/80 border-zinc-200"
    }`}>

      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.5)]">
          <span className="font-black text-white">J</span>
        </div>
        <span className={`text-xl font-black tracking-widest ${modoOscuro ? "text-white" : "text-black"}`}>
          JOTITAS
        </span>
      </div>

      {/* Links */}
      <div className={`flex items-center gap-8 text-sm font-bold uppercase tracking-widest ${
        modoOscuro ? "text-zinc-400" : "text-zinc-600"
      }`}>
        {["Inicio", "Tienda", "Pago"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className={`transition-colors ${modoOscuro ? "hover:text-cyan-400" : "hover:text-purple-600"}`}
          >
            {item}
          </a>
        ))}
      </div>

      {/* Perfil, toggle y carrito */}
      <div className="flex items-center gap-4">

        {/* Toggle modo */}
        <button
          onClick={toggleModo}
          className={`p-2 rounded-xl border transition-all ${
            modoOscuro
              ? "bg-zinc-900 border-zinc-700 text-yellow-400 hover:bg-zinc-800"
              : "bg-zinc-100 border-zinc-300 text-zinc-700 hover:bg-zinc-200"
          }`}
          title={modoOscuro ? "Modo claro" : "Modo oscuro"}
        >
          {modoOscuro ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
            </svg>
          )}
        </button>

        {usuario ? (
          <>
            <span className={`font-bold ${modoOscuro ? "text-white" : "text-black"}`}>
              {usuario.displayName || "Usuario"}
            </span>
            <img
              src={usuario.photoURL || "/default-avatar.png"}
              alt="Perfil"
              className="w-10 h-10 rounded-full border-2 border-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.5)] object-cover"
            />
            <button
              onClick={onLogout}
              title="Cerrar sesión"
              className={`p-3 rounded-xl transition-all ${
                modoOscuro
                  ? "bg-zinc-900 text-zinc-400 hover:bg-red-900/20 hover:text-red-400"
                  : "bg-zinc-100 text-zinc-600 hover:bg-red-100 hover:text-red-500"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
              </svg>
            </button>
          </>
        ) : (
          <button
            className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2 rounded-xl font-bold text-white shadow-lg hover:scale-105 transition-transform"
          >
            INGRESAR
          </button>
        )}

        <div className={`px-4 py-2 rounded-xl border font-bold flex items-center gap-2 ${
          modoOscuro
            ? "bg-zinc-900 border-zinc-700 text-cyan-400"
            : "bg-zinc-100 border-zinc-300 text-purple-600"
        }`}>
          <span>🛒</span> {carritoLength}
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
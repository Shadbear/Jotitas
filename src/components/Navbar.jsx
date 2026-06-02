function Navbar({ usuario, carritoLength, onLogout }) {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800 px-8 py-4 flex items-center justify-between">
      
      {/* LOGO */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.5)]">
          <span className="font-black text-white">J</span>
        </div>
        <span className="text-xl font-black tracking-widest text-white">JOTITAS</span>
      </div>

      {/* LINKS */}
      <div className="flex items-center gap-8 text-sm font-bold text-zinc-400 uppercase tracking-widest">
        {["Inicio", "Tienda", "Pago"].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-cyan-400 transition-colors">
            {item}
          </a>
        ))}
      </div>

      {/* PERFIL Y CARRITO */}
      <div className="flex items-center gap-6">
        {usuario ? (
          <>
            <span className="font-bold text-white">
              {usuario.displayName || "Usuario"}
            </span>
            <img 
              // Usamos photoURL porque es la propiedad que devuelve Google/Firebase
              src={usuario.photoURL || "/default-avatar.png"} 
              alt="Perfil" 
              className="w-10 h-10 rounded-full border-2 border-cyan-500 shadow-[0_0_10px_rgba(34,211,238,0.5)] object-cover" 
            />
            <button 
              onClick={onLogout}
              title="Cerrar sesión"
              className="bg-zinc-900 p-3 rounded-xl hover:bg-red-900/20 text-zinc-400 hover:text-red-400 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </>
        ) : (
          <button 
            onClick={() => window.location.href = '/login'} // Asegúrate de que esta ruta exista
            className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-2 rounded-xl font-bold text-white shadow-lg hover:scale-105 transition-transform"
          >
            INGRESAR
          </button>
        )}
        
        <div className="bg-zinc-900 px-4 py-2 rounded-xl border border-zinc-700 font-bold text-cyan-400 flex items-center gap-2">
          <span>🛒</span> {carritoLength}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
import { useState } from "react";
import { Home, ShoppingBag, CreditCard, ShoppingCart, LogOut, User } from "lucide-react";

function Navbar({ carrito, onLogout }) {
  const [menuAbierto, setMenuAbierto] = useState(false);

  // Supongamos que tienes el nombre del usuario guardado
  const nombreUsuario = "Carlos"; 

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-lg bg-black/80 border-b border-purple-500/30 px-6 py-4 neon-border">
      <div className="flex justify-between items-center">
        
        {/* LOGO */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center font-bold text-white neon-border">J</div>
          <h1 className="text-xl font-black text-white neon-text">JOTITAS</h1>
        </div>

        {/* MENÚ DESKTOP */}
        <div className="hidden md:flex items-center gap-6">
          <button className="flex items-center gap-2 text-purple-300 hover:text-cyan-400"><Home size={18}/> INICIO</button>
          <button className="flex items-center gap-2 text-purple-300 hover:text-cyan-400"><ShoppingBag size={18}/> TIENDA</button>
          <button className="flex items-center gap-2 text-purple-300 hover:text-cyan-400"><CreditCard size={18}/> PAGO</button>
          
          {/* PERFIL USUARIO */}
          <div className="flex items-center gap-3 pl-6 border-l border-purple-500/30">
            <div className="text-right">
              <p className="text-sm font-bold text-white">{nombreUsuario}</p>
            </div>
            <img src="https://i.pravatar.cc/150?u=carlos" alt="Perfil" className="w-10 h-10 rounded-full border-2 border-cyan-400 neon-border-cyan" />
          </div>

          <div className="flex items-center gap-2 bg-purple-900/30 px-4 py-2 rounded-lg neon-border">
            <ShoppingCart size={18} /> {carrito.length}
          </div>

          <button onClick={onLogout} className="text-cyan-400 hover:text-white transition">
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
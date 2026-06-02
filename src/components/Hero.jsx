import React from 'react';

const Hero = () => {
  return (
    <section id="inicio" className="relative h-[80vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent"></div>
      
      <div className="relative z-10 flex flex-col items-center">
        {/* Título con efecto neón */}
        <h1 className="text-6xl md:text-8xl font-black text-white neon-text animate-flicker tracking-tighter mb-4">
          JOTITAS
        </h1>
        
        {/* Subtítulo con efecto Cyber */}
        <p className="text-cyan-400 text-xl md:text-2xl font-bold tracking-[0.3em] uppercase mb-10 neon-text-cyan">
          Cyberwear Collection 2026
        </p>
        
        {/* Botón de acción */}
        <a 
          href="#tienda" 
          className="group relative px-8 py-4 bg-transparent border-2 border-purple-500 text-white font-bold tracking-widest transition-all hover:bg-purple-600 neon-border animate-pulse-neon"
        >
          <span className="relative z-10">EXPLORAR TIENDA</span>
        </a>
      </div>

      {/* Grid inferior decorativo */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#050510] to-transparent"></div>
    </section>
  );
};

export default Hero;
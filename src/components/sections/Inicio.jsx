import { useAccesibility } from '../../context/AccesibilityContext';
import { Eye, EyeOff } from 'lucide-react';

export const Inicio = () => {
  // Extraemos el estado y la función del contexto de accesibilidad
  const { animacionesActivas, setAnimacionesActivas } = useAccesibility();

  return (
    <div className="w-full flex flex-col items-start text-left font-mono relative py-2">
      <span className="text-xs md:text-sm text-[var(--color-hologram)] opacity-70 mb-1 ml-1 uppercase tracking-widest">
        Hola, soy
      </span>
      
      <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold text-white leading-none tracking-tighter uppercase mb-4">
        Rynaldo Bux
      </h1>
      
      <div className="flex items-center gap-3 ml-1 mb-8">
        <div className="h-[2px] w-8 md:w-12 bg-[var(--color-hologram)]" />
        <h2 className="text-sm md:text-xl text-[var(--color-hologram)] opacity-90 uppercase tracking-widest">
          Desarrollador web
        </h2>
      </div>

      {/* Botón de Accesibilidad para controlar Glitch y Flicker */}
      <button 
        onClick={() => setAnimacionesActivas(!animacionesActivas)}
        className="flex items-center gap-2 px-4 py-2 border border-[var(--color-hologram-soft)] text-[10px] font-mono opacity-50 hover:opacity-100 hover:bg-[var(--color-hologram-soft)] transition-all uppercase tracking-widest"
      >
        {animacionesActivas ? (
          <>
            <EyeOff size={14} /> 
            <span>Desactivar efectos visuales</span>
          </>
        ) : (
          <>
            <Eye size={14} /> 
            <span>Activar efectos visuales</span>
          </>
        )}
      </button>

      {/* Símbolo de terminal decorativo */}
      <div className="absolute -bottom-2 -right-2 text-2xl md:text-4xl opacity-20 text-[var(--color-hologram)] font-bold pointer-events-none">
        &lt;/&gt;
      </div>
    </div>
  );
};
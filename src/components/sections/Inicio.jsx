import { ArrowRight } from 'lucide-react';

export const Inicio = ({ onNavigate }) => {

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

      <button
        type="button"
        onClick={() => onNavigate('proyectos')}
        className="flex min-h-[44px] items-center gap-2 border border-[var(--color-hologram)] bg-[var(--color-hologram-soft)] px-4 py-2.5 text-xs font-mono uppercase tracking-widest text-white transition-colors hover:bg-[var(--color-hologram)] hover:text-black"
      >
        Ver proyectos <ArrowRight size={15} />
      </button>

      {/* Símbolo de terminal decorativo */}
      <div className="absolute -bottom-2 -right-2 text-2xl md:text-4xl opacity-20 text-[var(--color-hologram)] font-bold pointer-events-none">
        &lt;/&gt;
      </div>
    </div>
  );
};

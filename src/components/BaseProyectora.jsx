const secciones = ['inicio', 'sobre mi', 'proyectos', 'contacto'];

const BaseProyectora = ({ seccionActiva, setSeccionActiva }) => {
  return (
    <nav aria-label="Navegación principal" className="fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] z-50 flex max-w-[95vw] flex-wrap justify-center gap-2 rounded-xl border border-[var(--color-hologram-soft)] bg-black/60 px-3 py-2 shadow-[0_0_20px_var(--color-hologram-faint)] backdrop-blur-md">
      {secciones.map((id) => (
        <button
          key={id}
          onClick={() => setSeccionActiva(id)}
          aria-pressed={seccionActiva === id}
            className={`flex min-h-[44px] items-center justify-center rounded-lg border px-3 text-xs font-mono uppercase transition-all md:px-5 ${
            seccionActiva === id 
              ? 'bg-[var(--color-hologram-soft)] border-[var(--color-hologram)] text-[var(--color-hologram)] shadow-[0_0_10px_var(--color-hologram-glow)]' 
              : 'border-transparent text-gray-300 hover:text-white'
          }`}
        >
          {id}
        </button>
      ))}
    </nav>
  );
};

export default BaseProyectora;

const secciones = ['inicio', 'sobre mi', 'proyectos', 'contacto'];

const BaseProyectora = ({ seccionActiva, setSeccionActiva }) => {
  return (
    <div className="fixed bottom-6 flex flex-wrap justify-center gap-2 px-3 py-2 bg-black/60 backdrop-blur-md border border-[var(--color-hologram-soft)] rounded-xl max-w-[95vw] z-50 shadow-[0_0_20px_rgba(0,243,255,0.1)]">
      {secciones.map((id) => (
        <button
          key={id}
          onClick={() => setSeccionActiva(id)}
          className={`px-3 py-1.5 md:px-5 md:py-2 text-[10px] md:text-xs uppercase font-mono transition-all rounded-lg border ${
            seccionActiva === id 
              ? 'bg-[var(--color-hologram-soft)] border-[var(--color-hologram)] text-[var(--color-hologram)] shadow-[0_0_10px_var(--color-hologram-glow)]' 
              : 'border-transparent text-gray-500 hover:text-white'
          }`}
        >
          {id}
        </button>
      ))}
    </div>
  );
};

export default BaseProyectora;
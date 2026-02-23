const secciones = ['inicio', 'sobre mi', 'experiencia', 'proyectos'];

const BaseProyectora = ({ seccionActiva, setSeccionActiva }) => {
  return (
    <div className="absolute bottom-10 flex gap-4 p-2 bg-black/40 backdrop-blur-md border border-[var(--color-hologram-soft)] rounded-xl shadow-[0_0_20px_rgba(0,243,255,0.1)]">
      {secciones.map((id) => (
        <button
          key={id}
          onClick={() => setSeccionActiva(id)}
          className={`px-6 py-2 text-xs uppercase tracking-widest transition-all duration-300 rounded-lg border ${
            seccionActiva === id 
              ? 'bg-[var(--color-hologram-soft)] border-[var(--color-hologram)] text-[var(--color-hologram)] shadow-[0_0_15px_var(--color-hologram-glow)]' 
              : 'border-transparent text-gray-500 hover:text-[var(--color-hologram)] hover:border-[var(--color-hologram-soft)]'
          }`}
        >
          {id}
        </button>
      ))}
    </div>
  );
};

export default BaseProyectora;
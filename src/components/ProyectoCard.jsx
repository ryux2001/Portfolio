import { motion } from 'framer-motion';

export const ProyectoCard = ({ proyecto }) => {
  return (
    <div className="w-full max-w-md bg-black/40 border border-[var(--color-hologram-soft)] overflow-hidden flex flex-col group">
      {/* Mitad superior: Preview  */}
      <div className="h-80 overflow-hidden border-b border-[var(--color-hologram-soft)] relative">
        <img 
          src={proyecto.imagen} 
          alt={proyecto.titulo} 
          className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      {/* Mitad inferior: Descripción y Tech  */}
      <div className="p-4 flex flex-col gap-3">
        <h3 className="text-xl font-bold uppercase tracking-tighter text-white">
          {proyecto.titulo}
        </h3>
        <p className="text-xs opacity-80 leading-tight h-12 overflow-y-auto font-mono">
          {proyecto.descripcion}
        </p>
        
        {/* Tecnologías usadas  */}
        <div className="flex flex-wrap gap-2 mt-2">
          {proyecto.tecnologias.map(tech => (
            <span key={tech} className="text-[10px] px-2 py-0.5 border border-[var(--color-hologram-soft)] text-[var(--color-hologram)] bg-[var(--color-hologram-soft)]">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
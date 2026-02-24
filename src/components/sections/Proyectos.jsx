import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { listaProyectos } from '../../data/proyectos';
import { ChevronLeft, ChevronRight, List, X, ExternalLink, Eye } from 'lucide-react';

export const Proyectos = () => {
  const [indice, setIndice] = useState(0);
  const [modalAbierta, setModalAbierta] = useState(false);
  const [galeriaAbierta, setGaleriaAbierta] = useState(false);
  const [imgGaleriaIdx, setImgGaleriaIdx] = useState(0);

  const proyecto = listaProyectos[indice];

  const siguiente = () => setIndice((prev) => (prev + 1) % listaProyectos.length);
  const anterior = () => setIndice((prev) => (prev - 1 + listaProyectos.length) % listaProyectos.length);
  const sigImg = () => setImgGaleriaIdx((prev) => (prev + 1) % proyecto.galeria.length);
  const antImg = () => setImgGaleriaIdx((prev) => (prev - 1 + proyecto.galeria.length) % proyecto.galeria.length);

  if (!proyecto) return null;

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-4xl mx-auto">
      
      {/* Sistema de Navegación y Tarjeta */}
      <div className="grid grid-cols-2 md:flex md:flex-row items-center justify-center gap-4 md:gap-12 w-full">
        
        {/* Tarjeta Central (Ocupa las 2 columnas en móvil arriba) */}
        <motion.div 
          key={indice}
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="col-span-2 order-1 md:order-2 w-full max-w-[320px] md:max-w-[400px] bg-black/80 border border-[var(--color-hologram-soft)] overflow-hidden flex flex-col shadow-2xl"
        >
          <div 
            className="h-64 md:h-72 border-b border-[var(--color-hologram-soft)] bg-black relative cursor-pointer group"
            onClick={() => { setImgGaleriaIdx(0); setGaleriaAbierta(true); }}
          >
            <img src={proyecto.imagen} alt={proyecto.titulo} className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-all duration-500" />
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Eye size={40} className="text-[var(--color-hologram)] mb-2" />
              <span className="text-[var(--color-hologram)] font-mono text-[10px] tracking-widest border border-[var(--color-hologram)] px-2 py-1 bg-black/50">VER GALERÍA</span>
            </div>
          </div>

          <div className="p-5 flex flex-col gap-4 min-h-[250px]">
            <h3 className="text-xl md:text-2xl font-bold uppercase text-white tracking-tighter">{proyecto.titulo}</h3>
            <p className="text-xs opacity-70 font-mono h-20 overflow-y-auto text-[var(--color-hologram)] text-left scrollbar-hide">
              {proyecto.descripcion}
            </p> 
            <div className="flex flex-wrap gap-2">
              {proyecto.tecnologias.map(tech => (
                <span key={tech} className="text-[9px] px-2 py-0.5 border border-[var(--color-hologram-soft)] text-[var(--color-hologram)] uppercase font-mono">{tech}</span>
              ))}
            </div>
            {proyecto.url && (
              <a href={proyecto.url} target="_blank" rel="noopener noreferrer" className="mt-auto w-full py-3 bg-[var(--color-hologram-soft)] border border-[var(--color-hologram)] text-white font-mono text-xs flex justify-center items-center gap-2 hover:bg-[var(--color-hologram)] hover:text-black transition-all">
                VISITAR PROYECTO <ExternalLink size={14} />
              </a>
            )}
          </div>
        </motion.div>

        {/* Botones: Lado a lado en móvil, a los costados en PC */}
        <button onClick={anterior} className="order-2 md:order-1 p-3 border border-[var(--color-hologram-soft)] text-[var(--color-hologram)] hover:bg-[var(--color-hologram-soft)] justify-self-end">
          <ChevronLeft size={28} />
        </button>
        <button onClick={siguiente} className="order-3 md:order-3 p-3 border border-[var(--color-hologram-soft)] text-[var(--color-hologram)] hover:bg-[var(--color-hologram-soft)] justify-self-start">
          <ChevronRight size={28} />
        </button>
      </div>

      {/* GALERÍA MODAL (FULL SCREEN) */}
      <AnimatePresence>
        {galeriaAbierta && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black flex items-center justify-center p-4 md:p-12"
          >
            <button onClick={() => setGaleriaAbierta(false)} className="absolute top-6 right-6 z-[10000] text-[var(--color-hologram)] border border-[var(--color-hologram)] p-2 hover:bg-[var(--color-hologram)] hover:text-black transition-all">
              <X size={32} />
            </button>
            
            <div className="w-full max-w-6xl flex flex-col items-center gap-6">
              <h2 className="text-[var(--color-hologram)] font-mono text-sm tracking-[0.4em] uppercase text-center px-10">
                {"> VISTA_DE_DETALLE: " + proyecto.titulo}
              </h2>
              
              <div className="relative w-full flex items-center justify-center">
                <button onClick={antImg} className="absolute left-2 md:-left-12 text-[var(--color-hologram)] hover:scale-125 transition-transform">
                  <ChevronLeft size={50} />
                </button>
                
                <div className="w-full aspect-video max-h-[70vh] border border-[var(--color-hologram-soft)] bg-black/50 shadow-2xl flex items-center justify-center overflow-hidden">
                  <motion.img 
                    key={imgGaleriaIdx} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    src={proyecto.galeria[imgGaleriaIdx]} className="max-w-full max-h-full object-contain" 
                  />
                </div>

                <button onClick={sigImg} className="absolute right-2 md:-right-12 text-[var(--color-hologram)] hover:scale-125 transition-transform">
                  <ChevronRight size={50} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
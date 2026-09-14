import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { listaProyectos } from '../../data/proyectos';
import { ChevronLeft, ChevronRight, X, ExternalLink, Eye } from 'lucide-react';
import { useAccessibility } from '../../context/AccessibilityContext';

export const Proyectos = () => {
  const [indice, setIndice] = useState(0);
  const [galeriaAbierta, setGaleriaAbierta] = useState(false);
  const [imgGaleriaIdx, setImgGaleriaIdx] = useState(0);
  const modalRef = useRef(null);
  const cerrarBtnRef = useRef(null);
  const { animacionesActivas } = useAccessibility();

  const proyecto = listaProyectos[indice];

  const siguiente = () => setIndice((prev) => (prev + 1) % listaProyectos.length);
  const anterior = () => setIndice((prev) => (prev - 1 + listaProyectos.length) % listaProyectos.length);
  const sigImg = () => setImgGaleriaIdx((prev) => (prev + 1) % proyecto.galeria.length);
  const antImg = () => setImgGaleriaIdx((prev) => (prev - 1 + proyecto.galeria.length) % proyecto.galeria.length);

  // Accesibilidad del modal: foco inicial, Escape y trampa de foco
  useEffect(() => {
    if (!galeriaAbierta) return undefined;

    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const backgroundControls = [
      document.querySelector('.skip-link'),
      document.querySelector('nav[aria-label="Navegación principal"]'),
    ].filter(Boolean);

    cerrarBtnRef.current?.focus();
    document.body.style.overflow = 'hidden';
    backgroundControls.forEach((element) => {
      element.inert = true;
      element.setAttribute('aria-hidden', 'true');
    });

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setGaleriaAbierta(false);
        return;
      }
      if (e.key !== 'Tab' || !modalRef.current) return;

      const focusables = Array.from(
        modalRef.current.querySelectorAll('button:not([disabled]), a, [tabindex]:not([tabindex="-1"])')
      );
      if (focusables.length === 0) return;

      const primero = focusables[0];
      const ultimo = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === primero) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primero.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      backgroundControls.forEach((element) => {
        element.inert = false;
        element.removeAttribute('aria-hidden');
      });
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus();
    };
  }, [galeriaAbierta]);

  if (!proyecto) return null;

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-4xl mx-auto">
      
      {/* Sistema de Navegación y Tarjeta */}
      <div aria-hidden={galeriaAbierta} inert={galeriaAbierta} className="grid w-full grid-cols-2 items-center justify-center gap-4 md:flex md:flex-row md:gap-12">
        
        {/* Tarjeta Central (Ocupa las 2 columnas en móvil arriba) */}
        <motion.div 
          key={indice}
          initial={animacionesActivas ? { opacity: 0, scale: 0.9 } : false}
          animate={{ opacity: 1, scale: 1 }}
          transition={animacionesActivas ? undefined : { duration: 0 }}
          className="col-span-2 order-1 md:order-2 w-full max-w-[320px] md:max-w-[400px] bg-black/80 border border-[var(--color-hologram-soft)] overflow-hidden flex flex-col shadow-2xl"
        >
          <button
            type="button"
            onClick={() => { setImgGaleriaIdx(0); setGaleriaAbierta(true); }}
            aria-label={`Ver galería de ${proyecto.titulo}`}
            className="relative block h-64 w-full cursor-pointer border-b border-[var(--color-hologram-soft)] bg-black group md:h-72"
          >
            <img src={proyecto.imagen} alt={`Vista previa de ${proyecto.titulo}`} className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-all duration-500" />
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300">
              <Eye size={40} className="text-[var(--color-hologram)] mb-2" />
              <span className="border border-[var(--color-hologram)] bg-black/50 px-2 py-1 text-xs font-mono tracking-widest text-[var(--color-hologram)]">VER GALERÍA</span>
            </div>
          </button>

          <div className="p-5 flex flex-col gap-4 min-h-[250px]">
            <h3 className="text-xl md:text-2xl font-bold uppercase text-white tracking-tighter">{proyecto.titulo}</h3>
            <p className="text-xs opacity-70 font-mono h-20 overflow-y-auto text-[var(--color-hologram)] text-left scrollbar-hide">
              {proyecto.descripcion}
            </p> 
            <div className="flex flex-wrap gap-2">
              {proyecto.tecnologias.map(tech => (
              <span key={tech} className="border border-[var(--color-hologram-soft)] px-2 py-0.5 text-[10px] font-mono uppercase text-[var(--color-hologram)]">{tech}</span>
              ))}
            </div>
            {proyecto.url && (
              <a href={proyecto.url} target="_blank" rel="noopener noreferrer" className="mt-auto flex min-h-[44px] w-full items-center justify-center gap-2 border border-[var(--color-hologram)] bg-[var(--color-hologram-soft)] py-3 font-mono text-xs text-white transition-all hover:bg-[var(--color-hologram)] hover:text-black">
                VISITAR PROYECTO <ExternalLink size={14} />
              </a>
            )}
          </div>
        </motion.div>

        {/* Botones: Lado a lado en móvil, a los costados en PC */}
        <button onClick={anterior} aria-label="Proyecto anterior" className="order-2 md:order-1 p-3 border border-[var(--color-hologram-soft)] text-[var(--color-hologram)] hover:bg-[var(--color-hologram-soft)] justify-self-end">
          <ChevronLeft size={28} />
        </button>
        <button onClick={siguiente} aria-label="Proyecto siguiente" className="order-3 md:order-3 p-3 border border-[var(--color-hologram-soft)] text-[var(--color-hologram)] hover:bg-[var(--color-hologram-soft)] justify-self-start">
          <ChevronRight size={28} />
        </button>
      </div>

      {/* GALERÍA MODAL (FULL SCREEN) */}
      <AnimatePresence>
        {galeriaAbierta && (
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="galeria-titulo"
            initial={animacionesActivas ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            exit={animacionesActivas ? { opacity: 0 } : undefined}
            transition={animacionesActivas ? undefined : { duration: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black p-4 md:p-12"
            onClick={() => setGaleriaAbierta(false)}
          >
            <button
              ref={cerrarBtnRef}
              onClick={() => setGaleriaAbierta(false)}
              aria-label="Cerrar galería"
              className="absolute right-6 top-6 z-[10000] border border-[var(--color-hologram)] p-2 text-[var(--color-hologram)] transition-all hover:bg-[var(--color-hologram)] hover:text-black"
            >
              <X size={32} />
            </button>

            <div className="flex w-full max-w-6xl flex-col items-center gap-6" onClick={(event) => event.stopPropagation()}>
              <h2 id="galeria-titulo" className="px-10 text-center text-sm font-mono uppercase tracking-[0.4em] text-[var(--color-hologram)] hover:animate-glitch">
                {"> VISTA_DE_DETALLE: " + proyecto.titulo}
              </h2>

              <div className="relative flex w-full items-center justify-center">
                <button type="button" onClick={antImg} aria-label="Imagen anterior" className="absolute left-2 -m-2 p-2 text-[var(--color-hologram)] transition-transform hover:scale-125 md:-left-12">
                  <ChevronLeft size={50} />
                </button>

                <div className="w-full aspect-video max-h-[70vh] border border-[var(--color-hologram-soft)] bg-black/50 shadow-2xl flex items-center justify-center overflow-hidden">
                  <motion.img
                    key={imgGaleriaIdx} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={animacionesActivas ? undefined : { duration: 0 }}
                    src={proyecto.galeria[imgGaleriaIdx]}
                    alt={`Captura de ${proyecto.titulo}, imagen ${imgGaleriaIdx + 1} de ${proyecto.galeria.length}`}
                    loading="lazy"
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                <button type="button" onClick={sigImg} aria-label="Imagen siguiente" className="absolute right-2 -m-2 p-2 text-[var(--color-hologram)] transition-transform hover:scale-125 md:-right-12">
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

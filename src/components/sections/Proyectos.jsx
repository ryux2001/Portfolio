import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, Eye, Images } from 'lucide-react';
import { listaProyectos } from '../../data/proyectos';
import GaleriaProyectos from '../GaleriaProyectos';
import { useAccessibility } from '../../context/AccessibilityContext';

export const Proyectos = () => {
  const [indice, setIndice] = useState(0);
  const [galeriaAbierta, setGaleriaAbierta] = useState(false);
  const { animacionesActivas } = useAccessibility();
  const proyecto = listaProyectos[indice];
  const hayVariosProyectos = listaProyectos.length > 1;

  if (!proyecto) return null;

  const cambiarProyecto = (direccion) => {
    setIndice((actual) => (actual + direccion + listaProyectos.length) % listaProyectos.length);
  };

  return (
    <section aria-labelledby="proyectos-titulo" className="w-full max-w-6xl">
      <div className="mb-5 flex items-end justify-between gap-4 border-b border-[var(--color-hologram-soft)] pb-3">
        <h2 id="proyectos-titulo" className="text-2xl font-bold uppercase tracking-[0.08em] text-white sm:text-3xl">Proyectos</h2>
        <p className="shrink-0 font-mono text-xs text-[var(--color-hologram)]">{String(indice + 1).padStart(2, '0')} / {String(listaProyectos.length).padStart(2, '0')}</p>
      </div>

      <motion.article
        key={proyecto.id}
        initial={animacionesActivas ? { opacity: 0, y: 12 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: animacionesActivas ? 0.25 : 0 }}
        className="grid overflow-hidden border border-[var(--color-hologram-soft)] bg-black/70 lg:grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.95fr)]"
      >
        <button
          type="button"
          onClick={() => setGaleriaAbierta(true)}
          aria-label={`Ver galería de ${proyecto.titulo}`}
          className="group relative min-h-64 overflow-hidden border-b border-[var(--color-hologram-soft)] bg-black text-left lg:min-h-0 lg:border-b-0 lg:border-r"
        >
          <img
            src={proyecto.imagen}
            alt={`Vista previa de ${proyecto.titulo}`}
            className="absolute inset-0 size-full object-cover opacity-65 transition duration-500 group-hover:scale-[1.025] group-hover:opacity-40 group-focus-visible:scale-[1.025] group-focus-visible:opacity-40"
          />
          <span className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
          <span className="absolute bottom-5 left-5 right-5 flex items-center justify-between gap-3 font-mono text-xs uppercase tracking-[0.12em] text-white">
            <span className="inline-flex items-center gap-2 border border-[var(--color-hologram)] bg-black/75 px-3 py-2 text-[var(--color-hologram)]">
              <Eye size={16} /> Ver galería
            </span>
            <span className="text-[var(--color-hologram)]">{proyecto.galeria.length} capturas</span>
          </span>
        </button>

        <div className="flex min-w-0 flex-col p-5 sm:p-7">
          <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
            <h3 className="max-w-xl text-2xl font-bold leading-tight text-white sm:text-3xl">{proyecto.titulo.replace(' (En desarrollo)', '')}</h3>
            <span className="border border-[var(--color-hologram-soft)] bg-[var(--color-hologram-faint)] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-[var(--color-hologram)]">En desarrollo</span>
          </div>

          <div className="mb-5">
            <p id={`descripcion-proyecto-${proyecto.id}`} tabIndex="0" className="hologram-scrollbar max-h-48 overflow-y-auto pr-3 text-sm leading-6 text-[color:color-mix(in_srgb,var(--color-hologram)_88%,white)] sm:max-h-56 sm:text-[15px]">
              {proyecto.descripcion}
            </p>
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            {proyecto.tecnologias.map((tech) => (
              <span key={tech} className="border border-[var(--color-hologram-soft)] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-[var(--color-hologram)]">{tech}</span>
            ))}
          </div>

          {proyecto.url && (
            <a href={proyecto.url} target="_blank" rel="noopener noreferrer" className="mt-auto inline-flex min-h-[44px] items-center justify-center gap-2 border border-[var(--color-hologram)] bg-[var(--color-hologram-soft)] px-4 py-3 font-mono text-xs text-white transition-colors hover:bg-[var(--color-hologram)] hover:text-black">
              Visitar proyecto <ExternalLink size={15} />
            </a>
          )}
        </div>
      </motion.article>

      <div className="mt-5 flex items-center justify-between gap-3">
        <button type="button" disabled={!hayVariosProyectos} onClick={() => cambiarProyecto(-1)} className="project-navigation-button" aria-label="Proyecto anterior">
          <ChevronLeft size={20} /> Anterior
        </button>
        <div className="hidden items-center gap-2 font-mono text-[11px] uppercase tracking-[0.1em] text-[var(--color-hologram)] sm:flex">
          <Images size={15} /> Selecciona un proyecto
        </div>
        <button type="button" disabled={!hayVariosProyectos} onClick={() => cambiarProyecto(1)} className="project-navigation-button" aria-label="Proyecto siguiente">
          Siguiente <ChevronRight size={20} />
        </button>
      </div>

      <GaleriaProyectos
        abierta={galeriaAbierta}
        proyecto={proyecto}
        indiceInicial={0}
        onCerrar={() => setGaleriaAbierta(false)}
      />
    </section>
  );
};

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, RotateCcw, X, ZoomIn, ZoomOut } from 'lucide-react';
import { useAccessibility } from '../context/AccessibilityContext';

const FOCUSABLE_SELECTOR = 'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])';

const GaleriaProyectos = ({ abierta, proyecto, indiceInicial, onCerrar }) => {
  const [montada, setMontada] = useState(abierta);
  const [indice, setIndice] = useState(indiceInicial);
  const [zoom, setZoom] = useState(1);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);
  const dialogRef = useRef(null);
  const cerrarRef = useRef(null);
  const previousFocusRef = useRef(null);
  const previousOverflowRef = useRef('');
  const previousAppStateRef = useRef(null);
  const { animacionesActivas } = useAccessibility();

  const total = proyecto?.galeria.length ?? 0;
  const imagen = proyecto?.galeria[indice];

  const limpiarAislamiento = () => {
    document.body.style.overflow = previousOverflowRef.current;
    const appRoot = document.getElementById('root');
    if (appRoot && previousAppStateRef.current) {
      appRoot.inert = previousAppStateRef.current.inert;
      if (previousAppStateRef.current.ariaHidden === null) {
        appRoot.removeAttribute('aria-hidden');
      } else {
        appRoot.setAttribute('aria-hidden', previousAppStateRef.current.ariaHidden);
      }
    }
    previousAppStateRef.current = null;
    if (previousFocusRef.current instanceof HTMLElement && previousFocusRef.current.isConnected) {
      previousFocusRef.current.focus();
    }
    previousFocusRef.current = null;
  };

  useEffect(() => {
    if (!abierta) return undefined;

    const appRoot = document.getElementById('root');
    if (!previousAppStateRef.current) {
      previousFocusRef.current = document.activeElement;
      previousOverflowRef.current = document.body.style.overflow;
      if (appRoot) {
        previousAppStateRef.current = { inert: appRoot.inert, ariaHidden: appRoot.getAttribute('aria-hidden') };
      }
    }
    if (appRoot) {
      appRoot.inert = true;
      appRoot.setAttribute('aria-hidden', 'true');
    }
    document.body.style.overflow = 'hidden';
    // Sincroniza el ciclo visual interno con la apertura externa del portal.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMontada(true);
    setIndice(indiceInicial);
    setZoom(1);

    const focusTimer = window.setTimeout(() => cerrarRef.current?.focus(), 0);
    return () => window.clearTimeout(focusTimer);
  }, [abierta, indiceInicial]);

  useEffect(() => {
    if (!abierta) return undefined;

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onCerrar();
        return;
      }
      if (event.key === 'ArrowRight') {
        setIndice((actual) => (actual + 1) % total);
        return;
      }
      if (event.key === 'ArrowLeft') {
        setIndice((actual) => (actual - 1 + total) % total);
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;

      const controles = Array.from(dialogRef.current.querySelectorAll(FOCUSABLE_SELECTOR));
      if (!controles.length) return;

      const primero = controles[0];
      const ultimo = controles[controles.length - 1];
      if (event.shiftKey && document.activeElement === primero) {
        event.preventDefault();
        ultimo.focus();
      } else if (!event.shiftKey && document.activeElement === ultimo) {
        event.preventDefault();
        primero.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [abierta, onCerrar, total]);

  useEffect(() => {
    // Cada captura comienza ajustada y vuelve a informar de su propia carga.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setZoom(1);
    setCargando(true);
    setError(false);
  }, [indice, imagen]);

  useEffect(() => () => limpiarAislamiento(), []);

  if (!montada || !proyecto || typeof document === 'undefined') return null;

  const cambiarImagen = (direccion) => {
    setIndice((actual) => (actual + direccion + total) % total);
  };

  const finalizarSalida = () => {
    if (abierta) return;
    limpiarAislamiento();
    setMontada(false);
  };

  return createPortal(
    <AnimatePresence onExitComplete={finalizarSalida}>
      {abierta && (
        <motion.div
          key="galeria"
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="galeria-titulo"
          className="fixed inset-0 z-[100] flex min-h-dvh flex-col bg-[#010607]/[0.98] p-3 text-[var(--color-hologram)] sm:p-5"
          initial={animacionesActivas ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          exit={animacionesActivas ? { opacity: 0 } : undefined}
          transition={{ duration: animacionesActivas ? 0.2 : 0 }}
        >
          <header className="flex items-start justify-between gap-3 border-b border-[var(--color-hologram-soft)] pb-3">
            <div className="min-w-0">
              <h2 id="galeria-titulo" className="text-xs font-mono uppercase tracking-[0.16em] text-white sm:text-sm">
                Vista de detalle: {proyecto.titulo}
              </h2>
              <p className="mt-1 text-xs font-mono text-[var(--color-hologram)]">Imagen {indice + 1} de {total}</p>
            </div>
            <button
              ref={cerrarRef}
              type="button"
              onClick={onCerrar}
              aria-label="Cerrar galería"
              className="flex size-11 shrink-0 items-center justify-center border border-[var(--color-hologram-soft)] transition-colors hover:border-[var(--color-hologram)] hover:bg-[var(--color-hologram-soft)]"
            >
              <X size={22} />
            </button>
          </header>

          <div className="relative flex min-h-0 flex-1 items-center justify-center py-3 sm:py-5">
            <button type="button" onClick={() => cambiarImagen(-1)} aria-label="Imagen anterior" className="gallery-nav-button left-1 sm:left-4">
              <ChevronLeft size={28} />
            </button>

            <div className="relative flex size-full min-h-0 items-center justify-center overflow-hidden border border-[var(--color-hologram-soft)] bg-black/60">
              {cargando && !error && <span className="absolute text-xs font-mono tracking-[0.14em]">CARGANDO_CAPTURA...</span>}
              {error ? (
                <p role="alert" className="max-w-sm px-8 text-center font-mono text-sm text-white">No se pudo cargar esta captura. Usa las flechas para continuar.</p>
              ) : (
                <motion.img
                  key={imagen}
                  src={imagen}
                  alt={`Captura de ${proyecto.titulo}, imagen ${indice + 1} de ${total}`}
                  draggable={false}
                  drag={zoom > 1}
                  dragMomentum={false}
                  dragElastic={0.08}
                  onLoad={() => setCargando(false)}
                  onError={() => { setCargando(false); setError(true); }}
                  initial={animacionesActivas ? { opacity: 0 } : false}
                  animate={{ opacity: cargando ? 0 : 1, scale: zoom }}
                  transition={{ duration: animacionesActivas ? 0.18 : 0 }}
                  className={`max-h-full max-w-full select-none object-contain ${zoom > 1 ? 'cursor-grab active:cursor-grabbing' : ''}`}
                />
              )}
            </div>

            <button type="button" onClick={() => cambiarImagen(1)} aria-label="Imagen siguiente" className="gallery-nav-button right-1 sm:right-4">
              <ChevronRight size={28} />
            </button>
          </div>

          <footer className="flex flex-wrap items-center justify-center gap-2 border-t border-[var(--color-hologram-soft)] pt-3">
            <button type="button" onClick={() => setZoom((actual) => Math.max(1, Number((actual - 0.25).toFixed(2))))} disabled={zoom === 1} className="gallery-control" aria-label="Reducir zoom">
              <ZoomOut size={17} /> Reducir
            </button>
            <button type="button" onClick={() => setZoom((actual) => Math.min(2.5, Number((actual + 0.25).toFixed(2))))} disabled={zoom === 2.5} className="gallery-control" aria-label="Aumentar zoom">
              <ZoomIn size={17} /> Ampliar
            </button>
            <button type="button" onClick={() => setZoom(1)} disabled={zoom === 1} className="gallery-control" aria-label="Restablecer zoom">
              <RotateCcw size={16} /> Restablecer
            </button>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
};

export default GaleriaProyectos;

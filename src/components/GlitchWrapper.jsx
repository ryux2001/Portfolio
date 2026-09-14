import { useState, useEffect, useRef } from 'react';
import { useAccessibility } from '../context/AccessibilityContext';

export const GlitchWrapper = ({ children }) => {
  const { animacionesActivas } = useAccessibility();
  const [isGlitching, setIsGlitching] = useState(false);
  const nextTimerRef = useRef(null);
  const endTimerRef = useRef(null);

  useEffect(() => {
    if (!animacionesActivas) {
      // El contenido limpio se renderiza inmediatamente; este estado solo controla la capa decorativa.
      // eslint-disable-next-line react-hooks/set-state-in-effect -- sincroniza el estado transitorio al apagar el efecto
      setIsGlitching(false);
      return undefined;
    }

    let cancelled = false;

    const trigger = () => {
      if (cancelled) return;
      setIsGlitching(true);

      endTimerRef.current = setTimeout(() => {
        if (!cancelled) setIsGlitching(false);
      }, 100);

      nextTimerRef.current = setTimeout(trigger, Math.random() * 4000 + 2000);
    };

    nextTimerRef.current = setTimeout(trigger, 2000);

    return () => {
      cancelled = true;
      clearTimeout(nextTimerRef.current);
      clearTimeout(endTimerRef.current);
      nextTimerRef.current = null;
      endTimerRef.current = null;
    };
  }, [animacionesActivas]);

  // Si no hay animaciones, renderiza el contenido limpio sin capas extra
  if (!animacionesActivas) return <div className="relative w-full">{children}</div>;

  return (
    <div className={`relative transition-all ${isGlitching ? "glitch-active" : ""}`}>
      {isGlitching && (
        /* Capa de interferencia visual */
        <div className="absolute inset-0 z-[100] pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-hologram-soft)] to-transparent h-[2px] w-full animate-scanline" />
          <div className="glitch-layer absolute inset-0 mix-blend-screen animate-pulse" />
        </div>
      )}
      {children}
    </div>
  );
};

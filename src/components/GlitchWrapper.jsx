import { useState, useEffect } from 'react';
import { useAccesibility } from '../context/AccesibilityContext';

export const GlitchWrapper = ({ children }) => {
  const { animacionesActivas } = useAccesibility();
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    // Si las animaciones están desactivadas, nos aseguramos de apagar el glitch
    if (!animacionesActivas) {
      setIsGlitching(false);
      return;
    }

    const trigger = () => {
      setIsGlitching(true);
      
      // Duración del glitch (flash)
      setTimeout(() => setIsGlitching(false), 100); 
      
      // Aparece de forma errática
      const randomTime = Math.random() * 4000 + 2000;
      setTimeout(trigger, randomTime);
    };

    const timer = setTimeout(trigger, 2000);
    return () => clearTimeout(timer);
  }, [animacionesActivas]); // Escucha cambios en el botón de accesibilidad

  // Si no hay animaciones, renderiza el contenido limpio sin capas extra
  if (!animacionesActivas) return <div className="relative w-full">{children}</div>;

  return (
    <div className={`relative transition-all ${isGlitching ? "glitch-active" : ""}`}>
      {isGlitching && (
        /* Capa de interferencia visual */
        <div className="absolute inset-0 z-[100] pointer-events-none overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-hologram-soft)] to-transparent h-[2px] w-full animate-scanline" />
          <div className="absolute inset-0 bg-[rgba(255,0,0,0.05)] mix-blend-screen animate-pulse" />
        </div>
      )}
      {children}
    </div>
  );
};
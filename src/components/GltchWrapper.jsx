import { useState, useEffect } from 'react';

export const GlitchWrapper = ({ children }) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    const trigger = () => {
      setIsGlitching(true);
      
      // Duración del glitch muy corta para que sea un "flash"
      setTimeout(() => setIsGlitching(false), 100); 
      
      // Aparece de forma errática (numero mayor = menos frecuente)
      const randomTime = Math.random() * 20000 + 10000;
      setTimeout(trigger, randomTime);
    };

    const timer = setTimeout(trigger, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative w-full ${isGlitching ? "glitch-active" : "transition-transform duration-75"}`}>
    {isGlitching && (
      /* Líneas de interferencia mejoradas */
      <div className="absolute inset-0 z-[100] pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-hologram-soft)] to-transparent h-[2px] w-full animate-scanline" />
        <div className="absolute inset-0 bg-[rgba(255,0,0,0.05)] mix-blend-screen animate-pulse" />
      </div>
    )}
    {children}
  </div>
  );
};
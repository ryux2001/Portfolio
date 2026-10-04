import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import PantallaHolograma from './components/PantallaHolograma';
import BaseProyectora from './components/BaseProyectora';
import HazDeLuz from './components/HazDeLuz';
import { useAccessibility } from './context/AccessibilityContext';

function App() {
  const [seccionActiva, setSeccionActiva] = useState('inicio');
  const { animacionesActivas, setAnimacionesActivas } = useAccessibility();

  return (
    <main id="contenido" className="relative flex min-h-dvh w-full flex-col items-center justify-center overflow-x-hidden bg-[var(--color-abyss)] px-3 pb-32 pt-6 sm:px-4 sm:pb-28">
      <a href="#pantalla" className="skip-link">Saltar al contenido</a>

      {/* La textura se desmonta por completo cuando los efectos estan desactivados. */}
      {animacionesActivas && <div aria-hidden="true" className="scanlines pointer-events-none absolute inset-0 z-50" />}
      
      <button
        type="button"
        onClick={() => setAnimacionesActivas(!animacionesActivas)}
        aria-pressed={animacionesActivas}
        className="fixed right-4 top-4 z-50 flex min-h-[44px] items-center gap-2 border border-[var(--color-hologram-soft)] bg-black/70 px-3 font-mono text-xs text-[var(--color-hologram)] backdrop-blur-md transition-colors hover:border-[var(--color-hologram)] hover:bg-[var(--color-hologram-soft)]"
      >
        {animacionesActivas ? <EyeOff size={16} /> : <Eye size={16} />}
        <span className="hidden sm:inline">{animacionesActivas ? 'EFECTOS ON' : 'EFECTOS OFF'}</span>
      </button>

      <div className="relative flex w-full flex-1 items-center justify-center perspective-[1200px]">
        <HazDeLuz />
        <div id="pantalla" className="relative z-10 -mx-3 w-[calc(100%+1.5rem)] sm:mx-0 sm:w-full">
          <PantallaHolograma seccion={seccionActiva} onNavigate={setSeccionActiva} />
        </div>
      </div>

      {/* Base con botones */}
      <BaseProyectora 
        seccionActiva={seccionActiva} 
        setSeccionActiva={setSeccionActiva} 
      />
      
    </main>
  );
}

export default App;

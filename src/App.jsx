import { useState } from 'react';
import PantallaHolograma from './components/PantallaHolograma';
import BaseProyectora from './components/BaseProyectora';
import HazDeLuz from './components/HazDeLuz';
import { useAccessibility } from './context/AccessibilityContext';

function App() {
  const [seccionActiva, setSeccionActiva] = useState('inicio');
  const { animacionesActivas } = useAccessibility();

  return (
    <main id="contenido" className="relative flex min-h-dvh w-full flex-col items-center justify-center overflow-x-hidden bg-[var(--color-abyss)] px-3 pb-28 pt-6 perspective-[1200px] sm:px-4 sm:pb-24">
      <a href="#pantalla" className="skip-link">Saltar al contenido</a>

      {/* La textura se desmonta por completo cuando los efectos estan desactivados. */}
      {animacionesActivas && <div aria-hidden="true" className="scanlines pointer-events-none absolute inset-0 z-50" />}
      
      {/* Haz de Luz que emana desde la base hacia la pantalla */}
      <HazDeLuz />
      
      {/* Pantalla Proyectada en V */}
      <div id="pantalla" className="relative z-10 w-full">
        <PantallaHolograma seccion={seccionActiva} />
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

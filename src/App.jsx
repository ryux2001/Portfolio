import { useState } from 'react';
import PantallaHolograma from './components/PantallaHolograma';
import BaseProyectora from './components/BaseProyectora';

function App() {
  const [seccionActiva, setSeccionActiva] = useState('inicio');

  return (
    // Contenedor principal con perspectiva 3D
    <main className="relative h-screen w-full bg-[#030305] overflow-hidden flex flex-col items-center justify-center perspective-[1200px]">
      
      {/* Capa de interferencia (Scanlines) opcional para textura */}
      <div className="pointer-events-none absolute inset-0 z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

      {/* Pantalla Proyectada en V */}
      <PantallaHolograma seccion={seccionActiva} />

      {/* Base con botones */}
      <BaseProyectora 
        seccionActiva={seccionActiva} 
        setSeccionActiva={setSeccionActiva} 
      />
      
    </main>
  );
}

export default App;
import { motion, AnimatePresence } from "framer-motion";
import { Inicio } from "./sections/Inicio";
import { SobreMi } from "./sections/SobreMi";
import { Proyectos } from "./sections/Proyectos";
import { Contacto } from "./sections/Contacto";

const PantallaHolograma = ({ seccion }) => {
  return (
    <div className="relative w-full h-[75vh] flex flex-col items-center justify-end pb-12">
      
      {/* CONTENEDOR DE LA PANTALLA */}
      <div className="relative z-10 w-full max-w-4xl flex items-center justify-center px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={seccion}
            initial={{ opacity: 0, scale: 0.9, y: 20, filter: "brightness(2) blur(10px)" }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "brightness(1) blur(0px)" }}
            exit={{ opacity: 0, scale: 1.05, y: -20, filter: "brightness(2) blur(5px)" }}
            transition={{ duration: 0.3 }}
            className="w-full flex items-center justify-center"
          >
            <div className="relative w-full max-w-3xl p-6 md:p-10 border border-[var(--color-hologram-soft)] bg-black/40 backdrop-blur-xl shadow-[0_0_40px_rgba(0,243,255,0.1)] overflow-hidden">
              
              {/* Esquinas decorativas */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[var(--color-hologram)]" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[var(--color-hologram)]" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[var(--color-hologram)]" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[var(--color-hologram)]" />

              <div className="animate-[flicker_4s_infinite]">
                {seccion === "inicio" && <Inicio />}
                {seccion === "sobre mi" && <SobreMi />}
                {seccion === "proyectos" && <Proyectos />}
                {seccion === "contacto" && <Contacto />}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* HAZ DE LUZ EN V (AJUSTADO MILIMÉTRICAMENTE) */}
      <div
        className="relative w-full h-[15vh] opacity-20 pointer-events-none mt-[-1px]"
        style={{
          background: "linear-gradient(to top, var(--color-hologram), transparent)",
          // Sincronizado con el ancho max-w-3xl (aprox 28% a 72% del viewport total)
          clipPath: "polygon(28% 0%, 72% 0%, 50.5% 100%, 49.5% 100%)",
        }}
      />
    </div>
  );
};

export default PantallaHolograma;
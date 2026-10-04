import { motion, AnimatePresence } from "framer-motion";
import { Inicio } from "./sections/Inicio";
import { SobreMi } from "./sections/SobreMi";
import { Proyectos } from "./sections/Proyectos";
import { Contacto } from "./sections/Contacto";
import { GlitchWrapper } from "./GlitchWrapper";
import { useAccessibility } from '../context/AccessibilityContext';

const PantallaHolograma = ({ seccion, onNavigate }) => {
  const { animacionesActivas } = useAccessibility();

  return (
    <div className="relative flex min-h-[min(75dvh,42rem)] w-full flex-col items-center justify-end pb-8 md:pb-12">
      
      {/* CONTENEDOR DE LA PANTALLA */}
      <div className={`relative z-10 w-full max-w-4xl flex items-center justify-center px-0 sm:px-4 ${seccion === "proyectos" ? "md:max-w-6xl" : ""}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={seccion}
            initial={animacionesActivas ? { opacity: 0, scale: 0.9, y: 20, filter: "brightness(1.5) blur(6px)" } : false}
            animate={{ opacity: 1, scale: 1, y: 0, filter: "brightness(1) blur(0px)" }}
            exit={animacionesActivas ? { opacity: 0, scale: 1.05, y: -20, filter: "brightness(1.5) blur(4px)" } : undefined}
            transition={animacionesActivas ? { duration: 0.3 } : { duration: 0 }}
            className="w-full flex items-center justify-center"
          >
            <div className={`relative w-full max-w-3xl overflow-hidden border border-[var(--color-hologram-soft)] bg-black/40 p-6 shadow-[0_0_40px_var(--color-hologram-faint)] backdrop-blur-md md:p-10 ${seccion === "proyectos" ? "md:max-w-5xl" : ""}`}>
              
              {/* Esquinas decorativas */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[var(--color-hologram)]" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[var(--color-hologram)]" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[var(--color-hologram)]" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[var(--color-hologram)]" />

              {/* El flicker (parpadeo) ahora es condicional aquí */}
              <GlitchWrapper>
                <div className={`transition-all duration-500 ${animacionesActivas ? "hologram-flicker" : ""}`} aria-live="polite">
                  {seccion === "inicio" && <Inicio onNavigate={onNavigate} />}
                  {seccion === "sobre mi" && <SobreMi />}
                  {seccion === "proyectos" && <Proyectos />}
                  {seccion === "contacto" && <Contacto />}
                </div>
              </GlitchWrapper>

            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* HAZ DE LUZ EN V */}
      <div
        className="relative mt-[-1px] h-[15vh] w-full pointer-events-none opacity-20"
        style={{
          background: "linear-gradient(to top, var(--color-hologram), transparent)",
          clipPath: "polygon(28% 0%, 72% 0%, 50.5% 100%, 49.5% 100%)",
        }}
      />
    </div>
  );
};

export default PantallaHolograma;

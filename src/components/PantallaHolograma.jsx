import { motion, AnimatePresence } from 'framer-motion';

const PantallaHolograma = ({ seccion }) => {
  return (
    <div className="relative w-[80vw] h-[60vh] origin-bottom transform rotate-x-[25deg] border-b-2 border-[var(--color-hologram-soft)]">
      
      {/* Resplandor que sale de la base hacia la pantalla */}
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-hologram-soft)] to-transparent opacity-20" />

      <AnimatePresence mode="wait">
        <motion.div
          key={seccion}
          initial={{ opacity: 0, scaleY: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, scaleY: 1, filter: 'blur(0px)' }}
          exit={{ opacity: 0, scaleY: 0, filter: 'blur(10px)' }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full h-full flex flex-col items-center justify-center text-[var(--color-hologram)]"
        >
          {/* Contenido dinámico según la sección */}
          <h1 className="text-6xl font-bold tracking-tighter uppercase animate-[flicker_2s_infinite]">
            {seccion}
          </h1>
          <p className="mt-4 text-lg opacity-80 font-mono">
            — Sistema Holográfico v1.0 —
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default PantallaHolograma;
import { motion } from 'framer-motion';

// Definimos las tecnologías extraídas del contexto [cite: 14, 15, 16, 17, 18]
const techs = ['C#', 'Javascript', 'React js', 'Node js', 'Express js', 'Sql'];

export const SobreMi = () => (
  <div className="flex flex-col items-center max-w-2xl text-center">
    <h2 className="text-4xl uppercase mb-4 tracking-[0.2em]">Sobre mi</h2> 
    <h3 className="text-[var(--color-hologram)] font-mono mb-4">
      Estudiante de Desarrollo de aplicaciones multiplataforma
    </h3>
    <p className="opacity-80 leading-relaxed mb-10">
      Estudiante inclinado a desarrollar Apps Web, ofreciendo soluciones claras, enfocándome en la experiencia de usuario. 
    </p>
    
    <div className="flex flex-wrap justify-center gap-6">
      {techs.map((tech, i) => (
        <motion.span
          key={tech}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" }}
          className="px-4 py-1 border border-[var(--color-hologram-soft)] text-xs font-mono bg-black/20"
        >
          {tech}
        </motion.span>
      ))}
    </div> 
  </div>
);
import { motion } from 'framer-motion';
import { useAccessibility } from '../../context/AccessibilityContext';

const techs = ['C#','Java', 'Javascript','Typescript', 'React js', 'Next js','Nest js', 'Sql', 'Docker', 'Git', 'Github'];

export const SobreMi = () => {
  const { animacionesActivas } = useAccessibility();

  return (
    <div className="flex max-w-2xl flex-col items-center text-center">
      <h2 className="mb-4 text-4xl uppercase tracking-[0.2em]">Sobre mi</h2>
      <h3 className="mb-4 font-mono text-[var(--color-hologram)]">
        Estudiante de Desarrollo de aplicaciones multiplataforma
      </h3>
      <p className="mb-10 leading-relaxed opacity-80">
        Estudiante inclinado a desarrollar Apps Web y moviles con IA/agentes aplicada, ofreciendo soluciones claras, enfocándome en la experiencia de usuario.
      </p>

      <div className="flex flex-wrap justify-center gap-6">
        {techs.map((tech, i) => (
          <motion.span
            key={tech}
            animate={animacionesActivas ? { y: [0, -10, 0] } : { y: 0 }}
            transition={animacionesActivas ? { duration: 3, repeat: Infinity, delay: i * 0.4, ease: "easeInOut" } : { duration: 0 }}
            className="border border-[var(--color-hologram-soft)] bg-black/20 px-4 py-1 text-xs font-mono"
          >
            {tech}
          </motion.span>
        ))}
      </div>
    </div>
  );
};

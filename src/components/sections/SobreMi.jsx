import { motion } from 'framer-motion';
import { useAccessibility } from '../../context/AccessibilityContext';

const gruposTecnologias = [
  { titulo: 'Lenguajes', tecnologias: ['C#', 'Java', 'Javascript', 'Typescript'] },
  { titulo: 'Frameworks', tecnologias: ['React js', 'Next js', 'Nest js'] },
  { titulo: 'Datos y herramientas', tecnologias: ['Sql', 'Docker', 'Git', 'Github'] },
];

export const SobreMi = () => {
  const { animacionesActivas } = useAccessibility();

  return (
    <section aria-labelledby="sobre-mi-titulo" className="grid w-full max-w-5xl gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
      <div className="text-left">
        <h2 id="sobre-mi-titulo" className="mb-3 text-3xl font-bold uppercase tracking-[0.08em] text-white sm:text-4xl">Sobre mí</h2>
        <h3 className="mb-6 max-w-md font-mono text-sm leading-6 text-[var(--color-hologram)]">
          Estudiante de Desarrollo de Aplicaciones Multiplataforma
        </h3>
        <p className="max-w-prose text-[15px] leading-7 text-[color:color-mix(in_srgb,var(--color-hologram)_84%,white)]">
          Estudiante inclinado a desarrollar Apps Web y Moviles con IA/agentes aplicados, ofreciendo soluciones claras y personalizadas, enfocándome en la experiencia de usuario.
        </p>
      </div>

      <div className="border-t border-[var(--color-hologram-soft)] pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
        <h3 className="mb-5 font-mono text-sm uppercase tracking-[0.13em] text-white">Tecnologías</h3>
        <div className="space-y-5">
          {gruposTecnologias.map((grupo, grupoIndice) => (
            <div key={grupo.titulo}>
              <h4 className="mb-2 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--color-hologram)]">{grupo.titulo}</h4>
              <ul className="flex flex-wrap gap-2" aria-label={grupo.titulo}>
                {grupo.tecnologias.map((tech, indiceTech) => (
                  <li key={tech}>
                    <motion.span
                      animate={animacionesActivas ? { y: [0, -3, 0] } : { y: 0 }}
                      transition={animacionesActivas ? { duration: 4, repeat: Infinity, delay: (grupoIndice * 0.45) + (indiceTech * 0.25), ease: 'easeInOut' } : { duration: 0 }}
                      className="inline-block border border-[var(--color-hologram-soft)] bg-black/20 px-3 py-1.5 text-xs font-mono text-[var(--color-hologram)]"
                    >
                      {tech}
                    </motion.span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

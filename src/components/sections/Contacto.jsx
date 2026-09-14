import { useState } from "react";
import { Download, Mail, MessageCircle, CheckCircle, Send, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAccessibility } from "../../context/AccessibilityContext";

export const Contacto = () => {
  const [estado, setEstado] = useState("reposo"); // 'reposo', 'enviando', 'exito', 'error'
  const { animacionesActivas } = useAccessibility();

  // TUS DATOS
  const miEmail = "rynaldobuxeng@gmail.com";
  const miWhatsApp = "34654638196";
  const formspreeID = "mvzbdkww";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEstado("enviando");

    const form = e.target;
    const data = new FormData(form);

    try {
      const response = await fetch(`https://formspree.io/f/${formspreeID}`, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      setEstado(response.ok ? "exito" : "error");
    } catch {
      setEstado("error");
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md gap-6 mx-auto min-h-[300px] justify-center">
      <AnimatePresence mode="wait">
        {estado === "exito" ? (
          /* PANTALLA DE ÉXITO (SEÑAL ENVIADA) */
          <motion.div
            key="exito"
            initial={animacionesActivas ? { opacity: 0, scale: 0.8 } : false}
            animate={{ opacity: 1, scale: 1 }}
            transition={animacionesActivas ? undefined : { duration: 0 }}
            className="flex flex-col items-center text-center gap-4 py-10"
          >
            <div className="relative">
              <CheckCircle
                size={60}
                className={`text-[var(--color-hologram)] ${animacionesActivas ? "animate-pulse" : ""}`}
              />
              <div className="absolute inset-0 blur-lg bg-[var(--color-hologram)] opacity-50"></div>
            </div>
            <h2 className="text-2xl font-mono font-bold text-white tracking-[0.3em] uppercase">
              Señal Transmitida
            </h2>
            <p className="text-xs font-mono text-[var(--color-hologram)] opacity-70">
              [ MENSAJE RECIBIDO EN LA BASE CENTRAL ]
            </p>
            <button
              onClick={() => setEstado("reposo")}
               className="mt-4 flex min-h-[44px] items-center border border-[var(--color-hologram-soft)] px-4 py-1 text-xs font-mono text-white hover:bg-[var(--color-hologram-soft)]"
            >
              NUEVA COMUNICACIÓN
            </button>
          </motion.div>
        ) : (
          /* FORMULARIO ESTÁNDAR */
          <motion.div
            key="formulario"
            initial={animacionesActivas ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            exit={animacionesActivas ? { opacity: 0 } : undefined}
            transition={animacionesActivas ? undefined : { duration: 0 }}
            className="w-full flex flex-col gap-6"
          >
            <a
              href="/cv_rynaldo-bux.pdf"
              download
              className="flex min-h-[44px] w-full items-center justify-center gap-2 border border-[var(--color-hologram)] bg-[var(--color-hologram-soft)] py-3 font-mono text-white transition-all hover:shadow-[0_0_15px_var(--color-hologram-glow)]"
            >
              <Download size={18} /> DESCARGAR CV
            </a>

            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-3"
            >
              <label htmlFor="contacto-nombre" className="sr-only">Nombre</label>
              <input
                id="contacto-nombre"
                name="nombre"
                type="text"
                required
                placeholder="NOMBRE"
                autoComplete="name"
                aria-required="true"
                maxLength="100"
                aria-describedby={estado === "error" ? "contacto-error" : undefined}
                className="w-full border border-[var(--color-hologram-soft)] bg-black/40 p-2 text-base font-mono text-[var(--color-hologram)] focus:border-[var(--color-hologram)] md:text-sm"
              />
              <label htmlFor="contacto-email" className="sr-only">Correo electrónico</label>
              <input
                id="contacto-email"
                name="email"
                type="email"
                required
                placeholder="CORREO"
                autoComplete="email"
                aria-required="true"
                aria-describedby={estado === "error" ? "contacto-error" : undefined}
                className="w-full border border-[var(--color-hologram-soft)] bg-black/40 p-2 text-base font-mono text-[var(--color-hologram)] focus:border-[var(--color-hologram)] md:text-sm"
              />
              <label htmlFor="contacto-mensaje" className="sr-only">Mensaje</label>
              <textarea
                id="contacto-mensaje"
                name="mensaje"
                required
                placeholder="MENSAJE..."
                rows="3"
                aria-required="true"
                maxLength="1000"
                aria-describedby={estado === "error" ? "contacto-error" : undefined}
                className="w-full resize-none border border-[var(--color-hologram-soft)] bg-black/40 p-2 text-base font-mono text-[var(--color-hologram)] focus:border-[var(--color-hologram)] md:text-sm"
              />

              {estado === "error" && (
                <p id="contacto-error" role="alert" className="flex items-center gap-2 text-xs font-mono text-red-400">
                  <AlertTriangle size={14} /> Error en la transmisión. Intenta de nuevo.
                </p>
              )}

              <button
                disabled={estado === "enviando"}
                type="submit"
                className="flex min-h-[44px] w-full items-center justify-center gap-2 border border-[var(--color-hologram)] py-2 font-mono text-[var(--color-hologram)] transition-all hover:bg-[var(--color-hologram)] hover:text-black"
              >
                {estado === "enviando" ? (
                  "TRANSMITIENDO..."
                ) : (
                  <>
                    <Send size={16} /> ENVIAR SEÑAL
                  </>
                )}
              </button>
            </form>

            <div className="flex justify-center gap-10 text-xs font-mono">
              <a
                href={`https://wa.me/${miWhatsApp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-[44px] items-center gap-1 py-2 text-[var(--color-hologram)] opacity-90 transition-all hover:text-white hover:opacity-100"
              >
                <MessageCircle size={14} /> WHATSAPP
              </a>
              <a
                href={`mailto:${miEmail}`}
                className="flex min-h-[44px] items-center gap-1 py-2 text-[var(--color-hologram)] opacity-90 transition-all hover:text-white hover:opacity-100"
              >
                <Mail size={14} /> EMAIL
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

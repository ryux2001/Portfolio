import { useState } from "react";
import { Download, Mail, MessageCircle, CheckCircle, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const Contacto = () => {
  const [estado, setEstado] = useState("reposo"); // 'reposo', 'enviando', 'exito'

  // TUS DATOS
  const miEmail = "rynaldobuxeng@gmail.com";
  const miWhatsApp = "34654638196";
  const formspreeID = "mvzbdkww";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEstado("enviando");

    const form = e.target;
    const data = new FormData(form);

    const response = await fetch(`https://formspree.io/f/${formspreeID}`, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      setEstado("exito");
    } else {
      alert("Error en la transmisión. Intenta de nuevo.");
      setEstado("reposo");
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-md gap-6 mx-auto min-h-[300px] justify-center">
      <AnimatePresence mode="wait">
        {estado === "exito" ? (
          /* PANTALLA DE ÉXITO (SEÑAL ENVIADA) */
          <motion.div
            key="exito"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center gap-4 py-10"
          >
            <div className="relative">
              <CheckCircle
                size={60}
                className="text-[var(--color-hologram)] animate-pulse"
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
              className="mt-4 text-[10px] border border-[var(--color-hologram-soft)] px-4 py-1 hover:bg-[var(--color-hologram-soft)] text-white font-mono"
            >
              NUEVA COMUNICACIÓN
            </button>
          </motion.div>
        ) : (
          /* FORMULARIO ESTÁNDAR */
          <motion.div
            key="formulario"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full flex flex-col gap-6"
          >
            <a
              href="/cv_rynaldo-bux.pdf"
              download
              className="w-full py-3 bg-[var(--color-hologram-soft)] border border-[var(--color-hologram)] text-white font-mono flex justify-center items-center gap-2 hover:shadow-[0_0_15px_var(--color-hologram-glow)] transition-all"
            >
              <Download size={18} /> DESCARGAR CV
            </a>

            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col gap-3"
            >
              <input
                name="nombre"
                type="text"
                required
                placeholder="NOMBRE"
                className="w-full bg-black/40 border border-[var(--color-hologram-soft)] p-2 text-sm font-mono outline-none focus:border-[var(--color-hologram)] text-[var(--color-hologram)]"
              />
              <input
                name="email"
                type="email"
                required
                placeholder="CORREO"
                className="w-full bg-black/40 border border-[var(--color-hologram-soft)] p-2 text-sm font-mono outline-none focus:border-[var(--color-hologram)] text-[var(--color-hologram)]"
              />
              <textarea
                name="mensaje"
                required
                placeholder="MENSAJE..."
                rows="3"
                className="w-full bg-black/40 border border-[var(--color-hologram-soft)] p-2 text-sm font-mono outline-none focus:border-[var(--color-hologram)] text-[var(--color-hologram)] resize-none"
              />

              <button
                disabled={estado === "enviando"}
                className="w-full py-2 border border-[var(--color-hologram)] text-[var(--color-hologram)] font-mono hover:bg-[var(--color-hologram)] hover:text-black transition-all flex justify-center items-center gap-2"
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

            <div className="flex justify-center gap-10 opacity-60 text-[10px] font-mono">
              <a
                href={`https://wa.me/${miWhatsApp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-white transition-all"
              >
                <MessageCircle size={14} /> WHATSAPP
              </a>
              <a
                href={`mailto:${miEmail}`}
                className="flex items-center gap-1 hover:text-white transition-all"
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

const HazDeLuz = () => {
  return (
    <div className="pointer-events-none absolute bottom-0 h-[90vh] w-[40vw] max-w-3xl">
      <div
        className="hologram-beam h-full w-full"
        style={{
          background: 'conic-gradient(from 180deg at 50% 100%, var(--color-hologram-soft) 0deg, transparent 20deg, transparent 340deg, var(--color-hologram-soft) 360deg)',
        }}
      />
    </div>
  );
};

export default HazDeLuz;

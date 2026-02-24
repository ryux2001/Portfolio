const HazDeLuz = () => {
  return (
    <div className="absolute bottom-0 w-[40vw] h-[100vh] pointer-events-none">
      <div 
        className="w-full h-full"
        style={{
          background: 'conic-gradient(from 180deg at 50% 100%, var(--color-hologram-soft) 0deg, transparent 20deg, transparent 340deg, var(--color-hologram-soft) 360deg)',
          filter: 'blur(40px)',
          opacity: 0.3
        }}
      />
    </div>
  );
};

export default HazDeLuz;
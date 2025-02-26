export const Logo = () => {
  return (
    <div className="flex items-center space-x-6">
      <div className="w-28 h-28 flex items-center justify-center relative overflow-hidden group transition-all duration-300">
        <div className="w-full h-full rounded-full bg-white/10 backdrop-blur-sm p-2">
          <div className="w-full h-full rounded-full overflow-hidden border-2 border-white/20">
            <div className="w-full h-full flex items-center justify-center">
              <img
                src="https://kaxlpfjheljcaevaeucm.supabase.co/storage/v1/object/public/resources/images/Logo.png"
                alt="CM Planificación & Eventos"
                className="w-full h-full object-cover transform scale-150 group-hover:scale-150 transition-transform duration-300 translate-y-[-5%]"
              />
            </div>
          </div>
        </div>
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold-200 to-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
      </div>
      <div>
        <h1 className="text-3xl font-caudex tracking-wide text-white mb-1">CM</h1>
        <div className="flex flex-col">
          <span className="text-base font-caudex tracking-[0.3em] text-white">PLANIFICACIÓN</span>
          <span className="text-base font-caudex tracking-[0.3em] text-white">& EVENTOS</span>
        </div>
      </div>
    </div>
  );
};
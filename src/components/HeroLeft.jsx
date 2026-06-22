function HeroLeft() {
    return (
    //   <section className="relative z-10 flex h-full flex-col px-6 pb-10 pt-32 md:px-10 lg:px-14 lg:pb-12 lg:pt-40">
  <section className="relative z-10 flex h-full flex-col justify-between px-6 pb-10 pt-32 md:px-10 lg:px-14 lg:pb-12 lg:pt-40">
        {/* Main Content — move higher by reducing mt */}
        <div className="mt-[23vh] space-y-6">
          {/* Intro */}
          <div>
            <p className="mb-2 text-lg text-white/70 md:text-xl">
              Hello! this is
            </p>
            <p className="text-[1.5vw] font-bold text-white/90">
              Tselot Beyene
            </p>
          </div>
  
          {/* Heading */}
          <div className="space-y-2 leading-[0.86] tracking-[-0.08em]">
            <div className="text-[20vw] font-black uppercase sm:text-[18vw] lg:text-[8.5vw]">
              Design
            </div>
            <div className="text-[17vw] font-black uppercase sm:text-[15vw] lg:text-[7.1vw]">
              For Finance
            </div>
            <div className="text-[16vw] font-black uppercase text-[#ff5a1f] sm:text-[14vw] lg:text-[6.8vw]">
              Web3
            </div>
          </div>
        </div>
  
        {/* Scroll down stays at the bottom */}
        <div className="mt-auto text-lg text-white/50">
          (Scroll down)
        </div>
  
      </section>
    );
  }
  
  export default HeroLeft;
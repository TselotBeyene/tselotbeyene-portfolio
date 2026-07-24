function HeroLeft() {
  return (
    <section className="relative z-10 flex h-full flex-col px-5 pb-6 pt-24 sm:px-6 sm:pb-10 sm:pt-28 md:px-10 lg:justify-between lg:px-14 lg:pb-12 lg:pt-40">
      <div className="mt-2 space-y-3 sm:mt-[10vh] sm:space-y-6 lg:mt-[23vh]">
        <div>
          <p className="mb-1.5 text-sm text-white/70 sm:mb-2 sm:text-lg md:text-xl">
            Hello! this is
          </p>
          <p className="text-sm font-bold text-white/90 sm:text-lg md:text-xl lg:text-[1.5vw]">
            Tselot Beyene
          </p>
        </div>

        <div className="max-w-full space-y-0.5 leading-[0.9] tracking-[-0.05em] sm:space-y-2 sm:leading-[0.88] sm:tracking-[-0.08em]">
          <div className="text-[clamp(1.7rem,9vw,2.15rem)] font-black uppercase sm:text-[clamp(2.4rem,12vw,8.5vw)]">
            Full Stack
          </div>
          <div className="text-[clamp(1.55rem,8.2vw,1.95rem)] font-black uppercase sm:text-[clamp(2.1rem,10.5vw,7.1vw)]">
            Software
          </div>
          <div className="text-[clamp(1.5rem,8vw,1.9rem)] font-black uppercase text-[var(--color-accent)] sm:text-[clamp(2rem,10vw,6.8vw)]">
            Developer
          </div>
        </div>
      </div>

      {/* Mobile: fill the lower black space with the hero bio */}
      <div className="mt-auto max-w-md pt-6 lg:hidden">
        <p className="text-[0.8125rem] leading-relaxed text-white/75">
          I build full stack products across frontend, backend, and
          infrastructure, with a focus on reliable systems, clean delivery,
          and financial technology use cases.
        </p>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[0.6875rem] text-white/35">
          <span>Java</span>
          <span>Spring Boot</span>
          <span>Docker</span>
          <span>Kubernetes</span>
        </div>
        <a
          href="mailto:tselotbeyene70@gmail.com"
          className="mt-4 inline-flex min-h-11 items-center text-sm text-white underline underline-offset-4"
        >
          How can I help?
        </a>
        <p className="mt-3 text-xs text-white/45">(Scroll down)</p>
      </div>

      <div className="mt-auto hidden text-base text-white/50 lg:block sm:text-lg">
        (Scroll down)
      </div>
    </section>
  );
}

export default HeroLeft;

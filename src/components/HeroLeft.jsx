function HeroLeft() {
  return (
    <section className="relative z-10 flex h-full flex-col px-5 pb-5 pt-20 sm:px-6 sm:pb-10 sm:pt-28 md:px-10 lg:justify-between lg:px-14 lg:pb-12 lg:pt-40">
      {/* Compact top block on phones so the portrait face stays visible below */}
      <div className="mt-1 space-y-2 sm:mt-[10vh] sm:space-y-6 lg:mt-[23vh]">
        <div>
          <p className="mb-1 text-[0.75rem] text-white/70 sm:mb-2 sm:text-lg md:text-xl">
            Hello! this is
          </p>
          <p className="text-[0.8125rem] font-bold text-white/90 sm:text-lg md:text-xl lg:text-[1.5vw]">
            Tselot Beyene
          </p>
        </div>

        <div className="max-w-full space-y-0.5 leading-[0.9] tracking-[-0.05em] sm:space-y-2 sm:leading-[0.88] sm:tracking-[-0.08em]">
          <div className="text-[clamp(1.45rem,7.5vw,1.85rem)] font-black uppercase sm:text-[clamp(2.4rem,12vw,8.5vw)]">
            Full Stack
          </div>
          <div className="text-[clamp(1.35rem,7vw,1.7rem)] font-black uppercase text-[var(--color-accent)] sm:text-[clamp(2rem,10vw,6.8vw)]">
            &amp; DevOps
          </div>
        </div>
      </div>

      {/* Empty middle band — portrait face reads through here on mobile */}
      <div className="min-h-[38dvh] flex-1 lg:hidden" aria-hidden="true" />

      {/* Mobile: bio stays in the dark lower strip, clear of the face */}
      <div className="relative z-10 max-w-md rounded-xl bg-gradient-to-t from-[var(--color-bg-base)] via-[var(--color-bg-base)]/90 to-transparent pt-8 pb-1 lg:hidden">
        <p className="text-[0.75rem] leading-relaxed text-white/75">
          I build full stack products across frontend, backend, and
          infrastructure, with a focus on reliable systems, clean delivery,
          and financial technology use cases.
        </p>
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[0.625rem] text-white/35">
          <span>Java</span>
          <span>Spring Boot</span>
          <span>Docker</span>
          <span>Kubernetes</span>
        </div>
        <a
          href="mailto:tselotbeyene70@gmail.com"
          className="mt-3 inline-flex min-h-10 items-center text-sm text-white underline underline-offset-4"
        >
          How can I help?
        </a>
        <p className="mt-2 text-[0.6875rem] text-white/45">(Scroll down)</p>
      </div>

      <div className="mt-auto hidden text-base text-white/50 lg:block sm:text-lg">
        (Scroll down)
      </div>
    </section>
  );
}

export default HeroLeft;

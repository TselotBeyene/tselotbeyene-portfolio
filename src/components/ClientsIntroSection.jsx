function ClientsIntroSection() {
    return (
      <section className="relative bg-[#070707] px-6 py-24 text-white md:px-10 lg:px-14">
        <div className="mx-auto max-w-[1600px]">
          <p className="mb-10 text-sm font-medium uppercase tracking-[0.18em] text-white/60">
            Industry leaders I worked for
          </p>
  
          <div className="flex flex-wrap items-center gap-x-12 gap-y-8 border-y border-white/10 py-10 text-white/60">
            <span className="text-lg font-medium tracking-wide">Company One</span>
            <span className="text-lg font-medium tracking-wide">Company Two</span>
            <span className="text-lg font-medium tracking-wide">Company Three</span>
            <span className="text-lg font-medium tracking-wide">Company Four</span>
            <span className="text-lg font-medium tracking-wide">Your logo here</span>
          </div>
  
          <div className="grid gap-12 pt-16 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="mb-6 text-sm uppercase tracking-[0.18em] text-white/40">
                (Intro)
              </p>
  
              <p className="max-w-4xl text-2xl leading-relaxed text-white/85 md:text-3xl">
                I design digital experiences for financial products, helping brands
                create interfaces that feel modern, intuitive, and deeply human.
              </p>
  
              <div className="mt-8 max-w-3xl space-y-6 text-base leading-8 text-white/60 md:text-lg">
                <p>
                  My work focuses on simplifying complex systems and turning them
                  into experiences people can actually understand and trust.
                </p>
  
                <p>
                  From fintech platforms to web3 products, I blend strategy,
                  interface design, and brand thinking to create digital products
                  that feel clear, premium, and useful.
                </p>
              </div>
            </div>
  
            <div className="relative min-h-[420px] overflow-hidden rounded-[2rem] bg-[#111111]">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center text-white/35">
                Portrait / Editorial Image
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  export default ClientsIntroSection;
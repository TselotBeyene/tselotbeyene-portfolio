function HeroRight() {
  return (
    <aside className="flex h-full flex-col justify-between py-28 pl-0 pr-0">
      <div className="flex h-full flex-col justify-between">
        <div className="mt-8 lg:mt-28">
          <div className="mb-10">
            <div className="space-y-4 text-base font-thin text-gray-400">
              <div className="border-t border-white/10 pt-9">Full Stack Development</div>
              <div>Backend Systems &amp; APIs</div>
              <div className="border-white/10 pt-1">DevOps &amp; Infrastructure</div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6">
            <a
              href="mailto:tselotbeyene70@gmail.com"
              className="inline-flex min-h-11 items-center text-xl text-white underline underline-offset-4 transition-colors hover:text-[var(--color-accent-bright)]"
            >
              How can I help?
            </a>
          </div>
        </div>

        <div className="mt-auto pt-16">
          <p className="max-w-xs leading-relaxed text-white/70">
            I build full stack products across frontend, backend, and
            infrastructure, with a focus on reliable systems, clean delivery,
            and financial technology use cases.
          </p>

          <div className="mt-12 border-t border-white/10 pt-5">
            <p className="mb-4 text-xs uppercase tracking-[2px] text-white/40">
              Core Stack
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/30">
              <div>Java</div>
              <div>Spring Boot</div>
              <div>Docker</div>
              <div>Kubernetes</div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default HeroRight;

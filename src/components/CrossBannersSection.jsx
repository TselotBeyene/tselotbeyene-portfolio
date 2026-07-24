function BannerRow({ items, reverse = false }) {
  const loop = [...items, ...items, ...items];

  return (
    <div className="absolute left-1/2 w-[200vw] -translate-x-1/2 overflow-hidden">
      <div
        className={`flex w-max whitespace-nowrap ${
          reverse
            ? "animate-[bannerRight_20s_linear_infinite]"
            : "animate-[bannerLeft_20s_linear_infinite]"
        }`}
      >
        {loop.map((item, i) => (
          <span
            key={i}
            className="flex items-center px-4 text-[clamp(0.85rem,4.5vw,1.15rem)] font-semibold tracking-[-0.05em] text-white sm:px-10 sm:text-[clamp(1rem,5.5vw,3.2rem)]"
          >
            {item}
            <span className="ml-6 text-[0.6em] sm:ml-10">✳</span>
          </span>
        ))}
      </div>
    </div>
  );
}

const topItems = [
  "FULL STACK DEVELOPMENT",
  "BACKEND SYSTEMS & APIs",
  "FRONTEND EXPERIENCES",
  "DEVOPS & INFRASTRUCTURE",
  "RELIABLE SOFTWARE",
];

const bottomItems = [
  "JAVA & SPRING BOOT",
  "REACT & MODERN WEB",
  "DOCKER & KUBERNETES",
  "CI/CD & CLOUD DEPLOY",
  "FINTECH & COMPLIANCE",
];

export default function CrossBannerSection() {
  return (
    <section className="relative h-[32vh] overflow-hidden bg-[var(--color-bg-deep)] sm:h-[55vh] md:h-[90vh]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-glow-warm)_0%,rgba(6,95,70,0.18)_25%,transparent_60%)] blur-2xl" />

      <div className="absolute top-[45%] left-1/2 z-20 h-11 w-[200vw] -translate-x-1/2 -translate-y-1/2 rotate-[8deg] overflow-hidden bg-[var(--color-accent)] shadow-[0_20px_60px_rgba(0,0,0,0.35)] sm:h-16 md:h-[120px]">
        <BannerRow items={topItems} />
      </div>

      <div className="absolute top-[55%] left-1/2 z-10 h-11 w-[200vw] -translate-x-1/2 -translate-y-1/2 -rotate-[6deg] overflow-hidden bg-black/95 blur-[1.5px] sm:h-16 md:h-[120px]">
        <BannerRow items={bottomItems} reverse />
      </div>
    </section>
  );
}

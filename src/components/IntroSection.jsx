import secondImage from "../assets/tselot_b.png";
import { experience } from "../data/projects";

function clamp(value, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max);
}

function mapRange(value, inMin, inMax, outMin, outMax) {
  const t = clamp((value - inMin) / (inMax - inMin));
  return outMin + (outMax - outMin) * t;
}

const introWords = [
  "Software", "products", "should", "be", "useful,", "reliable,", "and",
  "well-crafted.", "I", "work", "as", "a", "full", "stack", "developer,",
  "building", "frontend", "experiences,", "backend", "services,", "and",
  "infrastructure", "that", "work", "together", "smoothly.", "From", "web",
  "interfaces", "and", "REST", "APIs", "to", "Linux", "servers,", "CI/CD",
  "pipelines,", "monitoring,", "and", "containerized", "deployments,", "I",
  "focus", "on", "shipping", "systems", "that", "scale,", "stay", "observable,",
  "and", "solve", "real", "business", "problems.", "My", "experience", "spans",
  "payments,", "mobile", "banking,", "and", "legal-tech", "platforms",
  "where", "both", "product", "delivery", "and", "technical",
  "execution", "matter.",
];

const experienceHighlights = [
  ...experience.map((job) => ({
    title: job.company,
    year: job.year,
    client: job.role,
  })),
  { title: "RouteForge", year: "2026", client: "Personal Project" },
];

function LogoTile({ children, muted = false }) {
  return (
    <div
      className={`flex aspect-[4/3] items-center justify-center border border-white/[0.04] bg-white/[0.045] px-1.5 text-center text-[0.6rem] leading-tight sm:aspect-square sm:px-3 sm:text-[0.9rem] md:text-[1.05rem] ${
        muted ? "text-white/35" : "text-white/45"
      }`}
    >
      {children}
    </div>
  );
}

function getWordStyles(index, activeWordIndex) {
  if (index <= activeWordIndex) {
    return { opacity: 1, blur: 0 };
  }

  const distance = index - activeWordIndex;
  if (distance === 1) {
    return { opacity: 0.38, blur: 4 };
  }
  if (distance === 2) {
    return { opacity: 0.28, blur: 6 };
  }

  return { opacity: 0.2, blur: 8 };
}

function LogoGrid() {
  return (
    <div className="grid grid-cols-3 gap-0 sm:grid-cols-4">
      <LogoTile>ArifPay</LogoTile>
      <div className="hidden sm:block" />
      <div className="hidden sm:block" />
      <div className="hidden sm:block" />
      <div className="hidden sm:block" />
      <LogoTile>
        <span className="px-1 text-[0.65rem] leading-snug sm:text-[0.85rem]">
          Andrew Williams Solicitors
        </span>
      </LogoTile>
      <div className="hidden sm:block" />
      <div className="hidden sm:block" />
      <LogoTile>Atlas</LogoTile>
      <div className="hidden sm:block" />
      <LogoTile muted>Payments</LogoTile>
      <div className="hidden sm:block" />
      <div className="hidden sm:block" />
      <LogoTile muted>Banking</LogoTile>
      <div className="hidden sm:block" />
      <LogoTile>RouteForge</LogoTile>
      <LogoTile muted>Full stack</LogoTile>
      <div className="hidden sm:block" />
      <LogoTile muted>DevOps</LogoTile>
      <div className="hidden sm:block" />
      <div className="hidden sm:block" />
      <LogoTile muted>Docker</LogoTile>
    </div>
  );
}

function IntroSection({ progress = 0 }) {
  // Mobile: description uses the first stretch of scroll, logos the second.
  const readingPhase = mapRange(progress, 0, 0.58, 0, 1);
  const activeWordIndex = Math.floor(readingPhase * (introWords.length - 1));

  // Gentler on mobile so centered copy isn't yanked to the top while reading.
  const mobileCopyY = mapRange(progress, 0.42, 0.62, 0, -72);
  const mobileCopyOpacity = 1 - mapRange(progress, 0.52, 0.66, 0, 1);
  const mobileLogosOpacity = mapRange(progress, 0.56, 0.7, 0, 1);
  const mobileLogosY = mapRange(progress, 0.56, 0.78, 56, 0);

  // Desktop keeps side-by-side scroll theater.
  const desktopReading = mapRange(progress, 0, 1, 0, 1);
  const desktopWordIndex = Math.floor(desktopReading * (introWords.length - 1));
  const leftY = mapRange(progress, 0.72, 1, 0, -220);
  const rightY = mapRange(progress, 0.05, 0.92, 0, -520);
  const fadeMask = "linear-gradient(to bottom, transparent 0px, black 20px)";

  return (
    <section
      className="relative h-[100dvh] overflow-hidden lg:h-screen"
      style={{ isolation: "isolate" }}
    >
      {/* ——— Mobile / tablet panel; phones are vertically centered ——— */}
      <div className="relative h-full lg:hidden">
        <div
          className="absolute inset-0 flex flex-col justify-center px-5 py-16 sm:justify-start sm:px-5 sm:pb-10 sm:pt-24"
          style={{
            opacity: mobileCopyOpacity,
            transform: `translate3d(0, ${mobileCopyY}px, 0)`,
            pointerEvents: mobileCopyOpacity < 0.15 ? "none" : "auto",
            willChange: "transform, opacity",
          }}
        >
          <div className="mx-auto w-full max-w-[34rem] text-center sm:mx-0 sm:max-w-none sm:text-left">
            <p className="mb-3 text-[0.75rem] text-white/42">(Intro)</p>
            <p className="max-h-[min(52dvh,22rem)] overflow-hidden text-[0.875rem] leading-[1.55] tracking-[-0.02em] text-white sm:max-h-none">
              {introWords.map((word, index) => {
                const revealed = index <= activeWordIndex;
                return (
                  <span
                    key={index}
                    className="transition-opacity duration-200 ease-out"
                    style={{ opacity: revealed ? 1 : 0.2 }}
                  >
                    {word}
                    {index < introWords.length - 1 ? " " : ""}
                  </span>
                );
              })}
            </p>
            <p
              className="mt-6 text-[0.6875rem] text-white/35"
              style={{ opacity: mapRange(progress, 0.35, 0.5, 0, 1) }}
            >
              Keep scrolling for companies
            </p>
          </div>
        </div>

        <div
          className="absolute inset-0 flex flex-col justify-center px-5 py-16 sm:px-5 sm:pb-10 sm:pt-24"
          style={{
            opacity: mobileLogosOpacity,
            transform: `translate3d(0, ${mobileLogosY}px, 0)`,
            pointerEvents: mobileLogosOpacity < 0.15 ? "none" : "auto",
            willChange: "transform, opacity",
          }}
        >
          <div className="mx-auto w-full max-w-[34rem] sm:mx-0">
            <div className="mb-4 h-px w-14 bg-white/10" />
            <h2 className="max-w-[16rem] text-[1.15rem] leading-[1.15] tracking-tight text-white">
              Industry leaders I worked for
            </h2>
            <div className="mt-6 w-full">
              <LogoGrid />
            </div>
          </div>
        </div>
      </div>

      {/* ——— Desktop: original two-column sticky theater ——— */}
      <div className="hidden h-full grid-cols-[0.95fr_1.25fr] gap-0 px-14 pb-20 pt-32 lg:grid">
        <div
          className="pr-12"
          style={{
            transform: `translate3d(0, ${leftY}px, 0)`,
            willChange: "transform",
            maskImage: fadeMask,
            WebkitMaskImage: fadeMask,
          }}
        >
          <div className="mb-10 h-px w-[16rem] bg-white/10" />
          <h2 className="max-w-[18rem] text-[3rem] leading-[1.04] tracking-tight text-white">
            Industry leaders I worked for
          </h2>
          <div className="mt-16 w-full max-w-[34rem]">
            <LogoGrid />
          </div>
        </div>

        <div
          className="h-full min-h-0 overflow-hidden pl-10 pr-4"
          style={{
            maskImage: fadeMask,
            WebkitMaskImage: fadeMask,
          }}
        >
          <div
            className="max-w-[60rem]"
            style={{
              transform: `translate3d(0, ${rightY}px, 0)`,
              willChange: "transform",
            }}
          >
            <div className="mb-28">
              <p className="mb-8 text-[1.1rem] text-white/42">(Intro)</p>
              <div className="relative flex flex-wrap gap-x-[0.3em] gap-y-[0.15em] text-[1.5rem] leading-[1.2] tracking-[-0.05em] text-white md:text-[2.5rem]">
                {introWords.map((word, index) => {
                  const { opacity, blur } = getWordStyles(index, desktopWordIndex);

                  return (
                    <span
                      key={index}
                      className="inline-block transition-[opacity,filter,transform] duration-300 ease-out"
                      style={{
                        opacity,
                        filter: blur > 0 ? `blur(${blur}px)` : "none",
                        transform:
                          index === desktopWordIndex ? "scale(1.02)" : "scale(1)",
                      }}
                    >
                      {word}
                    </span>
                  );
                })}
              </div>
            </div>

            <div className="mb-32 flex justify-end">
              <div className="w-[10rem] overflow-hidden bg-transparent">
                <img
                  src={secondImage}
                  alt="Editorial portrait"
                  className="block h-auto w-full rotate-6 object-contain mix-blend-lighten"
                />
              </div>
            </div>

            <div className="pt-8">
              <h2 className="mb-16 text-[1.6rem] font-medium tracking-tight text-white">
                EXPERIENCE
              </h2>
              <div className="border-t border-white/10">
                {experienceHighlights.map((award, index) => (
                  <div
                    key={`${award.title}-${index}`}
                    className="grid grid-cols-[1.6fr_0.6fr_0.8fr] items-center gap-4 border-b border-white/10 py-8 text-white/55"
                  >
                    <div className="text-[1.8rem] leading-tight tracking-tight">
                      {award.title}
                    </div>
                    <div className="text-right text-[1.15rem]">{award.year}</div>
                    <div className="text-right text-[1.15rem]">{award.client}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default IntroSection;

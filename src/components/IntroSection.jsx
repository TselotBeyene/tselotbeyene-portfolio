import secondImage from "../assets/tselot.jpg";

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
  "financial", "platforms,", "compliance", "tools,", "and", "integration-heavy",
  "products", "where", "both", "product", "delivery", "and", "technical",
  "execution", "matter.",
];

const experienceHighlights = [
  { title: "ArifPay", year: "2025", client: "DevOps Engineer" },
  { title: "Andrew Williams Solicitors", year: "2024", client: "Full Stack Developer" },
  { title: "Atlas Computer Technologies", year: "2022", client: "DevOps Engineer" },
  { title: "RouteForge", year: "2026", client: "Personal Project" },
];

function LogoTile({ children, muted = false }) {
  return (
    <div
      className={`flex aspect-square items-center justify-center border border-white/[0.04] bg-white/[0.045] px-3 text-center text-[1.05rem] leading-tight ${
        muted ? "text-white/35" : "text-white/45"
      }`}
    >
      {children}
    </div>
  );
}

function getWordStyles(index, activeWordIndex) {
  // Read words (and the active word) stay full white and sharp.
  if (index <= activeWordIndex) {
    return { opacity: 1, blur: 0 };
  }

  // Upcoming words stay dim and blurred until they are read.
  const distance = index - activeWordIndex;
  if (distance === 1) {
    return { opacity: 0.38, blur: 4 };
  }
  if (distance === 2) {
    return { opacity: 0.28, blur: 6 };
  }

  return { opacity: 0.2, blur: 8 };
}

function IntroSection({ progress = 0 }) {
    // Reveal words across the full reading window, slowly.
    const introReadingPhase = mapRange(progress, 0, 1, 0, 1);
    const activeWordIndex = Math.floor(introReadingPhase * (introWords.length - 1));

    // Keep text mostly still while reading; only drift up after most words are revealed.
    const leftY = mapRange(progress, 0.72, 1, 0, -220);
    const rightY = mapRange(progress, 0.78, 1, 0, -280);
  
    const fadeMask = "linear-gradient(to bottom, transparent 0px, black 20px)";
  
    return (
      <section
        className="relative h-screen overflow-hidden"
        style={{ isolation: "isolate" }}
      >
        <div className="grid h-full grid-cols-1 px-6 pb-20 pt-32 md:px-10 lg:grid-cols-[0.95fr_1.25fr] lg:px-14">
  
          {/* LEFT RAIL — slow parallax */}
          <div
            className="flex flex-col justify-start pr-12"
            style={{
              transform: `translateY(${leftY}px)`,
              willChange: "transform",
              maskImage: fadeMask,
              WebkitMaskImage: fadeMask,
            }}
          >
            <div className="mb-10 h-px w-[16rem] bg-white/10" />
            <h2 className="max-w-[18rem] text-[2.1rem] leading-[1.04] tracking-tight text-white md:text-[3rem]">
              Industry leaders I worked for
            </h2>
            <div className="mt-16 w-[34rem] max-w-full">
              <div className="grid grid-cols-4 gap-0">
                <LogoTile>ArifPay</LogoTile>
                <div /><div /><div />
                <div />
                <LogoTile>AWS</LogoTile>
                <div /><div />
                <LogoTile>IBIAB</LogoTile>
                <div />
                <LogoTile>Atlas</LogoTile>
                <div />
                <div />
                <LogoTile>SEP</LogoTile>
                <div />
                <LogoTile>RouteForge</LogoTile>
                <LogoTile muted>Apache Camel</LogoTile>
                <div />
                <LogoTile muted>Spring Boot</LogoTile>
                <div />
                <div />
                <LogoTile muted>Docker</LogoTile>
                <div /><div />
                <LogoTile muted />
                <div /><div /><div />
              </div>
            </div>
          </div>
  
          {/* RIGHT SIDE — fast scroll */}
          <div
            className="relative h-full pr-4 lg:pl-10"
            style={{
              maskImage: fadeMask,
              WebkitMaskImage: fadeMask,
            }}
          >
            <div
              className="max-w-[60rem]"
              style={{
                transform: `translateY(${rightY}px)`,
                willChange: "transform",
              }}
            >
              {/* INTRO */}
              <div className="mb-28 ">
                <p className="mb-8 text-[1.1rem] text-white/42">(Intro)</p>
                <div className="relative flex flex-wrap gap-x-[0.3em] gap-y-[0.15em] text-[1.5rem] leading-[1.2] tracking-[-0.05em] text-white md:text-[2.5rem]">
                  {introWords.map((word, index) => {
                    const { opacity, blur } = getWordStyles(index, activeWordIndex);

                    return (
                      <span
                        key={index}
                        className="inline-block transition-[opacity,filter] duration-300 ease-out"
                        style={{
                          opacity,
                          filter: blur > 0 ? `blur(${blur}px)` : "none",
                        }}
                      >
                        {word}
                      </span>
                    );
                  })}
                </div>
              </div>
  
              {/* MIDDLE IMAGE */}
              <div className="mb-32 flex justify-end">
                <div className="w-[8.5rem] overflow-hidden bg-white/[0.03] md:w-[10rem]">
                  <img
                    src={secondImage}
                    alt="Editorial portrait"
                    className="block h-auto w-full object-cover rotate-6"
                    />
                </div>
              </div>
  
              {/* AWARDS */}
              <div className="pt-8">
                <h2 className="mb-16 text-[1.2rem] font-medium tracking-tight text-white md:text-[1.6rem]">
                  EXPERIENCE
                </h2>
                <div className="border-t border-white/10">
                  {experienceHighlights.map((award, index) => (
                    <div
                      key={`${award.title}-${index}`}
                      className="grid grid-cols-[1.6fr_0.6fr_0.8fr] items-center border-b border-white/10 py-8 text-white/55"
                    >
                      <div className="text-[1.4rem] leading-tight tracking-tight md:text-[1.8rem]">
                        {award.title}
                      </div>
                      <div className="text-right text-[1rem] md:text-[1.15rem]">
                        {award.year}
                      </div>
                      <div className="text-right text-[1rem] md:text-[1.15rem]">
                        {award.client}
                      </div>
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
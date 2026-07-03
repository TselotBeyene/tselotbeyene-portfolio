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

function IntroSection({ progress = 0 }) {
    // const introReadingPhase = mapRange(progress, 0, 0.78, 0, 1);
    const introReadingPhase = mapRange(progress, 0, 0.7, 0, 1);
    const activeWordIndex = Math.floor(introReadingPhase * (introWords.length - 1));
  
    // Left rail scrolls steadily through the whole section.
    const leftY = mapRange(progress, 0, 1, 0, -760);
    // Right side starts moving earlier so it doesn't feel parked.
    const rightY = mapRange(progress, 0.18, 1, 0, -1700);
  
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
                <div className="flex flex-wrap gap-x-[0.3em] gap-y-[0.15em] text-[1.5rem] leading-[1.2] tracking-[-0.05em] md:text-[2.5rem]">
                  {introWords.map((word, index) => {
                    let opacity;
                    if (index < activeWordIndex - 1) opacity = "opacity-[0.18]";
                    else if (index === activeWordIndex - 1) opacity = "opacity-[0.72]";
                    else if (index === activeWordIndex) opacity = "opacity-100";
                    else if (index === activeWordIndex + 1) opacity = "opacity-[0.42]";
                    else opacity = "opacity-[0.14]";
                    return (
                      <span
                        key={index}
                        className={`inline-block ${opacity} ${
                          index === activeWordIndex ? "scale-[1.02]" : "scale-[1]"
                        }`}
                      >
                        {word}
                      </span>
                    );
                  })}
                </div>
              </div>
  
              {/* MIDDLE IMAGE */}
              <div className="mb-32 flex justify-end">
                <div className="w-[13rem] overflow-hidden bg-white/[0.03] md:w-[15rem]">
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
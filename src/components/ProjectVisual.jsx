export default function ProjectVisual({ project, compact = false }) {
  if (!project.screenshot) {
    return (
      <div
        className="relative flex h-full w-full items-end overflow-hidden p-4 md:p-6"
        style={{ background: project.surface || "#111" }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background: `radial-gradient(circle at 20% 20%, ${project.accent || "#fff"}55, transparent 55%)`,
          }}
        />
        <div className="relative">
          <p
            className={`font-semibold tracking-[-0.04em] text-white/90 ${
              compact ? "text-[0.65rem] leading-tight sm:text-[0.7rem]" : "text-[1.05rem] sm:text-[1.35rem] md:text-[1.8rem]"
            }`}
          >
            {project.title}
          </p>
          {!compact && project.eyebrow ? (
            <p className="mt-1 text-[0.65rem] uppercase tracking-[0.14em] text-white/45 sm:text-[0.75rem] sm:tracking-[0.16em]">
              {project.eyebrow}
            </p>
          ) : null}
        </div>
      </div>
    );
  }

  if (project.visual === "logo") {
    return (
      <div
        className="relative flex h-full w-full items-center justify-center overflow-hidden p-6 md:p-10"
        style={{ background: project.surface || "#0d1220" }}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-50"
          style={{
            background: `radial-gradient(circle at 50% 45%, ${project.accent || "#7c8cff"}40, transparent 58%)`,
          }}
        />
        <img
          src={project.screenshot}
          alt={`${project.title} logo`}
          className={`relative z-[1] w-full object-contain ${
            compact ? "max-h-[70%] max-w-[85%]" : "max-h-[46%] max-w-[72%]"
          }`}
          loading="lazy"
          draggable={false}
        />
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-white">
      <img
        src={project.screenshot}
        alt={`${project.title} website`}
        className="h-full w-full object-cover object-top"
        loading="lazy"
        draggable={false}
      />
    </div>
  );
}

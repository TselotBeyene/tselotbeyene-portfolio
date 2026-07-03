export default function ProjectVisual({ project, compact = false }) {
  return (
    <div
      className="relative h-full w-full overflow-hidden border border-white/10"
      style={{ background: project.surface }}
    >
      <div
        className="absolute inset-0 opacity-90"
        style={{
          background:
            "radial-gradient(circle at top right, rgba(255,255,255,0.08), transparent 28%)",
        }}
      />
      <div
        className="absolute left-[8%] top-[10%] h-[20%] w-[28%] rounded-full blur-2xl"
        style={{ background: project.accent, opacity: 0.35 }}
      />

      <div className="absolute inset-0 flex flex-col justify-between p-[8%]">
        <div>
          <p className="text-[9px] font-medium uppercase tracking-[0.24em] text-white/45">
            {project.eyebrow}
          </p>
          <h4
            className={`mt-[8%] font-semibold leading-[0.95] tracking-[-0.05em] text-white ${
              compact ? "text-[14px]" : "text-[34px]"
            }`}
          >
            {project.title}
          </h4>
        </div>

        <div className={`${compact ? "space-y-1" : "space-y-2"}`}>
          {project.lines.map((line) => (
            <div
              key={line}
              className={`rounded-full border border-white/10 bg-white/[0.04] px-[6%] py-[4%] text-white/70 ${
                compact ? "text-[8px]" : "text-[14px]"
              }`}
            >
              {line}
            </div>
          ))}
        </div>

        {!compact && (
          <div className="flex items-end justify-between pt-[8%]">
            <span className="text-[12px] uppercase tracking-[0.2em] text-white/35">
              {project.role}
            </span>
            <span
              className="text-[13px] font-medium"
              style={{ color: project.accent }}
            >
              Open
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

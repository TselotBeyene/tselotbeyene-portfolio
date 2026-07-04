function BrowserChrome({ accent, compact }) {
  return (
    <div
      className={`flex items-center gap-[6%] border-b border-white/10 bg-black/25 ${
        compact ? "px-[8%] py-[6%]" : "px-[5%] py-[3.5%]"
      }`}
    >
      <div className="flex gap-[18%]">
        <span className="block h-[7px] w-[7px] rounded-full bg-white/20" />
        <span className="block h-[7px] w-[7px] rounded-full bg-white/20" />
        <span
          className="block h-[7px] w-[7px] rounded-full"
          style={{ background: accent }}
        />
      </div>
      <div
        className={`ml-[4%] flex-1 rounded-full bg-white/[0.06] ${
          compact ? "h-[8px]" : "h-[12px]"
        }`}
      />
    </div>
  );
}

function LegalMockup({ project, compact }) {
  const { mockup, accent } = project;

  return (
    <div className={`flex h-full flex-col ${compact ? "p-[8%]" : "p-[7%]"}`}>
      <div className="flex items-center justify-between">
        <span
          className={`font-semibold tracking-[-0.04em] text-white ${
            compact ? "text-[10px]" : "text-[15px]"
          }`}
        >
          {mockup.brand}
        </span>
        <span
          className={`rounded-full px-[8%] py-[2%] text-black ${
            compact ? "text-[7px]" : "text-[10px]"
          }`}
          style={{ background: accent }}
        >
          Consult
        </span>
      </div>

      <div className={`${compact ? "mt-[10%]" : "mt-[12%]"}`}>
        <p
          className={`font-semibold leading-[1.05] tracking-[-0.04em] text-white ${
            compact ? "text-[11px]" : "text-[24px]"
          }`}
        >
          {mockup.headline}
        </p>
        {!compact && (
          <p className="mt-3 text-[12px] leading-relaxed text-white/45">
            {mockup.subhead}
          </p>
        )}
      </div>

      <div
        className={`mt-auto grid grid-cols-3 ${
          compact ? "gap-[6%]" : "gap-2"
        }`}
      >
        {mockup.panels.map((panel) => (
          <div
            key={panel}
            className={`rounded-lg border border-white/10 bg-white/[0.04] text-center text-white/70 ${
              compact ? "px-1 py-1 text-[7px]" : "px-2 py-3 text-[11px]"
            }`}
          >
            {panel}
          </div>
        ))}
      </div>
    </div>
  );
}

function SaasMockup({ project, compact }) {
  const { mockup, accent } = project;

  return (
    <div className={`flex h-full ${compact ? "p-[7%]" : "p-[6%]"}`}>
      <div
        className={`mr-[4%] flex flex-col gap-[10%] rounded-lg border border-white/8 bg-white/[0.03] ${
          compact ? "w-[18%] p-[4%]" : "w-[18%] p-2"
        }`}
      >
        {[0, 1, 2, 3].map((item) => (
          <div
            key={item}
            className="rounded-sm bg-white/10"
            style={{
              height: compact ? 4 : 8,
              opacity: item === 1 ? 1 : 0.35,
              background: item === 1 ? accent : undefined,
            }}
          />
        ))}
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center justify-between">
          <p
            className={`font-medium text-white ${
              compact ? "text-[9px]" : "text-[14px]"
            }`}
          >
            {mockup.headline}
          </p>
          <span
            className={`rounded-full px-[6%] py-[1.5%] text-black ${
              compact ? "text-[6px]" : "text-[10px]"
            }`}
            style={{ background: accent }}
          >
            Live
          </span>
        </div>

        <div className={`mt-[8%] space-y-[8%]`}>
          {mockup.rows.map((row) => (
            <div
              key={row.label}
              className={`flex items-center justify-between rounded-md border border-white/8 bg-white/[0.03] ${
                compact ? "px-[6%] py-[5%]" : "px-3 py-2.5"
              }`}
            >
              <span
                className={`text-white/75 ${
                  compact ? "text-[7px]" : "text-[12px]"
                }`}
              >
                {row.label}
              </span>
              <span
                className={`${compact ? "text-[6px]" : "text-[11px]"}`}
                style={{ color: accent }}
              >
                {row.state}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ImpactMockup({ project, compact }) {
  const { mockup, accent } = project;

  return (
    <div className={`flex h-full flex-col ${compact ? "p-[8%]" : "p-[7%]"}`}>
      <div className="flex items-center justify-between">
        <span
          className={`font-semibold text-white ${
            compact ? "text-[10px]" : "text-[15px]"
          }`}
        >
          {mockup.brand}
        </span>
        <span
          className={`h-2 w-2 rounded-full ${compact ? "h-1.5 w-1.5" : ""}`}
          style={{ background: accent }}
        />
      </div>

      <p
        className={`mt-[10%] font-semibold leading-[1.05] tracking-[-0.04em] text-white ${
          compact ? "text-[11px]" : "text-[24px]"
        }`}
      >
        {mockup.headline}
      </p>

      <div
        className={`mt-auto grid grid-cols-3 ${
          compact ? "gap-[6%]" : "gap-2"
        }`}
      >
        {mockup.cards.map((card, index) => (
          <div
            key={card}
            className={`rounded-xl border border-white/10 bg-white/[0.04] ${
              compact ? "p-[8%]" : "p-3"
            }`}
          >
            <div
              className={`mb-[20%] rounded-md ${
                compact ? "h-4" : "h-8"
              }`}
              style={{
                background: `linear-gradient(135deg, ${accent}${index === 1 ? "aa" : "55"}, transparent)`,
              }}
            />
            <p
              className={`text-white/70 ${
                compact ? "text-[7px]" : "text-[11px]"
              }`}
            >
              {card}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function PaymentsMockup({ project, compact }) {
  const { mockup, accent } = project;

  return (
    <div className={`flex h-full flex-col ${compact ? "p-[8%]" : "p-[7%]"}`}>
      <div className="flex items-center justify-between">
        <span
          className={`font-semibold text-white ${
            compact ? "text-[10px]" : "text-[15px]"
          }`}
        >
          {mockup.brand}
        </span>
        <span
          className={`rounded-full border px-[8%] py-[2%] ${
            compact ? "text-[6px]" : "text-[10px]"
          }`}
          style={{ borderColor: `${accent}66`, color: accent }}
        >
          Secure
        </span>
      </div>

      <p
        className={`mt-[10%] font-semibold leading-[1.05] tracking-[-0.04em] text-white ${
          compact ? "text-[11px]" : "text-[24px]"
        }`}
      >
        {mockup.headline}
      </p>

      <div
        className={`mt-auto rounded-xl border border-white/10 bg-black/20 ${
          compact ? "p-[8%]" : "p-4"
        }`}
      >
        <div className="mb-[10%] flex items-end justify-between">
          <span
            className={`text-white/40 ${compact ? "text-[7px]" : "text-[11px]"}`}
          >
            Pipeline health
          </span>
          <span
            className={`font-medium ${compact ? "text-[9px]" : "text-[14px]"}`}
            style={{ color: accent }}
          >
            Healthy
          </span>
        </div>
        <div className={`grid grid-cols-3 ${compact ? "gap-[6%]" : "gap-2"}`}>
          {mockup.stats.map((stat) => (
            <div
              key={stat.label}
              className={`rounded-lg bg-white/[0.04] ${
                compact ? "px-1 py-1" : "px-2 py-2"
              }`}
            >
              <p
                className={`font-semibold text-white ${
                  compact ? "text-[8px]" : "text-[13px]"
                }`}
              >
                {stat.value}
              </p>
              <p
                className={`text-white/40 ${
                  compact ? "text-[6px]" : "text-[10px]"
                }`}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ToolingMockup({ project, compact }) {
  const { mockup, accent } = project;

  return (
    <div className={`flex h-full flex-col ${compact ? "p-[8%]" : "p-[6%]"}`}>
      <div className="flex items-center justify-between">
        <span
          className={`font-semibold text-white ${
            compact ? "text-[10px]" : "text-[15px]"
          }`}
        >
          {mockup.brand}
        </span>
        <span
          className={`text-white/35 ${compact ? "text-[6px]" : "text-[10px]"}`}
        >
          Apache Camel
        </span>
      </div>

      <p
        className={`mt-[8%] font-semibold leading-[1.05] tracking-[-0.04em] text-white ${
          compact ? "text-[11px]" : "text-[22px]"
        }`}
      >
        {mockup.headline}
      </p>

      <div className={`mt-auto flex ${compact ? "gap-[6%]" : "gap-2"}`}>
        <div
          className={`flex-1 space-y-[8%] rounded-lg border border-white/10 bg-black/25 ${
            compact ? "p-[8%]" : "p-3"
          }`}
        >
          {mockup.routes.map((route, index) => (
            <div
              key={route}
              className={`flex items-center gap-[8%] ${
                compact ? "text-[7px]" : "text-[12px]"
              }`}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{
                  background: index === 0 ? accent : "rgba(255,255,255,0.2)",
                }}
              />
              <span className="text-white/70">{route}</span>
            </div>
          ))}
        </div>

        {!compact && (
          <div className="w-[42%] rounded-lg border border-white/10 bg-white/[0.03] p-3 font-mono text-[10px] leading-relaxed text-white/45">
            <div style={{ color: accent }}>route:</div>
            <div>from: direct:start</div>
            <div>to: log:done</div>
          </div>
        )}
      </div>
    </div>
  );
}

function MockupBody({ project, compact }) {
  switch (project.visual) {
    case "legal":
      return <LegalMockup project={project} compact={compact} />;
    case "saas":
      return <SaasMockup project={project} compact={compact} />;
    case "impact":
      return <ImpactMockup project={project} compact={compact} />;
    case "payments":
      return <PaymentsMockup project={project} compact={compact} />;
    case "tooling":
      return <ToolingMockup project={project} compact={compact} />;
    default:
      return <LegalMockup project={project} compact={compact} />;
  }
}

export default function ProjectVisual({ project, compact = false }) {
  const mockup = project.mockup;

  return (
    <div
      className="relative h-full w-full overflow-hidden border border-white/10"
      style={{ background: project.surface }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at 80% 12%, ${project.accent}33, transparent 28%), radial-gradient(circle at 20% 80%, ${project.accent}14, transparent 30%)`,
        }}
      />

      <div className="absolute inset-0 flex flex-col">
        <BrowserChrome accent={project.accent} compact={compact} />
        <div className="min-h-0 flex-1">
          <MockupBody project={project} compact={compact} />
        </div>

        {!compact && mockup && (
          <div className="flex items-center justify-between border-t border-white/10 px-[7%] py-[4%]">
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                {mockup.metric}
              </p>
              <p className="mt-1 text-[12px] text-white/70">{mockup.status}</p>
            </div>
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

import ProjectVisual from "./ProjectVisual";

export default function ProjectPage({
  project,
  previousProject,
  nextProject,
  onNavigateHome,
  onNavigateProject,
}) {
  if (!project) return null;

  return (
    <main className="min-h-screen bg-[var(--color-bg-deep)] text-white">
      <section className="relative overflow-hidden px-6 pb-16 pt-28 md:px-10 lg:px-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_18%,var(--color-glow-primary),transparent_22%),radial-gradient(circle_at_center,rgba(255,255,255,0.015),transparent_58%)]" />

        <div className="relative z-10">
          <button
            type="button"
            onClick={onNavigateHome}
            className="mb-10 inline-flex items-center gap-2 text-[1rem] text-white/55 transition hover:text-white"
          >
            <span>←</span>
            <span>Back to index</span>
          </button>

          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
            <div>
              <div className="mb-6 text-[0.95rem] uppercase tracking-[0.3em] text-white/32">
                {project.eyebrow}
              </div>
              <h1 className="max-w-[12ch] text-[4rem] font-semibold leading-[0.88] tracking-[-0.08em] text-white md:text-[5.8rem]">
                {project.title}
              </h1>

              <div className="mt-10 grid gap-8 border-t border-white/10 pt-8 text-white/78 md:grid-cols-2">
                <div>
                  <p className="mb-3 text-[0.9rem] text-white/30">Year</p>
                  <p className="text-[2.6rem] font-semibold leading-none">
                    {project.year}
                  </p>
                </div>
                <div>
                  <p className="mb-3 text-[0.9rem] text-white/30">Role</p>
                  <p className="max-w-[14rem] text-[1.15rem] leading-[1.4]">
                    {project.role}
                  </p>
                </div>
              </div>

              <div className="mt-10 border-t border-white/10 pt-8">
                <p className="mb-4 text-[0.9rem] text-white/30">Overview</p>
                <p className="max-w-[40rem] text-[1.08rem] leading-8 text-white/68">
                  {project.summary}
                </p>
              </div>

              <div className="mt-10 border-t border-white/10 pt-8">
                <p className="mb-4 text-[0.9rem] text-white/30">Focus</p>
                <div className="flex flex-wrap gap-2">
                  {project.lines.map((line) => (
                    <span
                      key={line}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[0.92rem] text-white/68"
                    >
                      {line}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-10 border-t border-white/10 pt-8">
                <p className="mb-4 text-[0.9rem] text-white/30">Highlights</p>
                <div className="space-y-4 text-[1.02rem] leading-7 text-white/62">
                  {project.bullets.map((bullet) => (
                    <p key={bullet} className="flex gap-3">
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                        style={{ background: project.accent }}
                      />
                      <span>{bullet}</span>
                    </p>
                  ))}
                </div>
              </div>

              <div className="mt-10 border-t border-white/10 pt-8">
                <p className="mb-4 text-[0.9rem] text-white/30">Stack</p>
                <div className="flex flex-wrap gap-3">
                  {project.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[0.92rem] text-white/68"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:pt-12">
              <div className="mx-auto aspect-[16/10] w-full max-w-[46rem] overflow-hidden">
                <ProjectVisual project={project} />
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[0.95rem] font-medium text-black transition hover:bg-[var(--color-accent)] hover:text-white"
                >
                  Visit live project <span>↗</span>
                </a>
                <button
                  type="button"
                  onClick={onNavigateHome}
                  className="inline-flex items-center gap-2 rounded-full border border-white/12 px-5 py-3 text-[0.95rem] font-medium text-white/80 transition hover:border-white/30 hover:text-white"
                >
                  Back to projects
                </button>
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-6 border-t border-white/10 pt-10 md:grid-cols-2">
            {previousProject ? (
              <button
                type="button"
                onClick={() => onNavigateProject(previousProject.slug)}
                className="text-left transition hover:opacity-100 opacity-80"
              >
                <p className="mb-3 text-[0.9rem] text-white/28">Previous project</p>
                <div className="text-[2rem] font-semibold leading-none tracking-[-0.05em]">
                  {previousProject.title}
                </div>
              </button>
            ) : (
              <div />
            )}

            {nextProject ? (
              <button
                type="button"
                onClick={() => onNavigateProject(nextProject.slug)}
                className="text-left transition hover:opacity-100 opacity-80 md:text-right"
              >
                <p className="mb-3 text-[0.9rem] text-white/28">Next project</p>
                <div className="text-[2rem] font-semibold leading-none tracking-[-0.05em]">
                  {nextProject.title}
                </div>
              </button>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

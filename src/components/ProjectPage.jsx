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
      <section className="relative overflow-hidden px-5 pb-14 pt-24 sm:px-6 sm:pb-16 sm:pt-28 md:px-10 lg:px-14">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_60%_18%,var(--color-glow-primary),transparent_22%),radial-gradient(circle_at_center,rgba(255,255,255,0.015),transparent_58%)]" />

        <div className="relative z-10">
          <button
            type="button"
            onClick={onNavigateHome}
            className="mb-8 inline-flex min-h-11 items-center gap-2 text-[0.875rem] text-white/55 transition hover:text-white sm:mb-10 sm:text-[1rem]"
          >
            <span>←</span>
            <span>Back to index</span>
          </button>

          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:gap-16">
            <div className="min-w-0">
              <div className="mb-3 text-[0.7rem] uppercase tracking-[0.2em] text-white/32 sm:mb-6 sm:text-[0.95rem] sm:tracking-[0.3em]">
                {project.eyebrow}
              </div>
              <h1 className="max-w-[14ch] text-[clamp(1.85rem,9vw,2.5rem)] font-semibold leading-[0.92] tracking-[-0.06em] text-white sm:text-[clamp(2.6rem,11vw,5.8rem)] sm:leading-[0.88] sm:tracking-[-0.08em]">
                {project.title}
              </h1>

              <div className="mt-8 grid gap-6 border-t border-white/10 pt-6 text-white/78 sm:mt-10 sm:gap-8 sm:pt-8 md:grid-cols-2">
                <div>
                  <p className="mb-2 text-[0.75rem] text-white/30 sm:mb-3 sm:text-[0.9rem]">Year</p>
                  <p className="text-[1.75rem] font-semibold leading-none sm:text-[2.6rem]">
                    {project.year}
                  </p>
                </div>
                <div>
                  <p className="mb-2 text-[0.75rem] text-white/30 sm:mb-3 sm:text-[0.9rem]">Role</p>
                  <p className="max-w-[14rem] text-[0.9375rem] leading-[1.4] sm:text-[1.15rem]">
                    {project.role}
                  </p>
                </div>
              </div>

              <div className="mt-8 border-t border-white/10 pt-6 sm:mt-10 sm:pt-8">
                <p className="mb-3 text-[0.75rem] text-white/30 sm:mb-4 sm:text-[0.9rem]">Overview</p>
                <p className="max-w-[40rem] text-[0.875rem] leading-7 text-white/68 sm:text-[1.08rem] sm:leading-8">
                  {project.summary}
                </p>
              </div>

              <div className="mt-8 border-t border-white/10 pt-6 sm:mt-10 sm:pt-8">
                <p className="mb-3 text-[0.75rem] text-white/30 sm:mb-4 sm:text-[0.9rem]">Focus</p>
                <div className="flex flex-wrap gap-2">
                  {project.lines.map((line) => (
                    <span
                      key={line}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[0.8125rem] text-white/68 sm:px-4 sm:py-2 sm:text-[0.92rem]"
                    >
                      {line}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-8 border-t border-white/10 pt-6 sm:mt-10 sm:pt-8">
                <p className="mb-3 text-[0.75rem] text-white/30 sm:mb-4 sm:text-[0.9rem]">Highlights</p>
                <div className="space-y-3 text-[0.875rem] leading-6 text-white/62 sm:space-y-4 sm:text-[1.02rem] sm:leading-7">
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

              <div className="mt-8 border-t border-white/10 pt-6 sm:mt-10 sm:pt-8">
                <p className="mb-3 text-[0.75rem] text-white/30 sm:mb-4 sm:text-[0.9rem]">Stack</p>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {project.stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[0.8125rem] text-white/68 sm:px-4 sm:py-2 sm:text-[0.92rem]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="min-w-0 lg:pt-12">
              <div className="mx-auto aspect-[16/10] w-full max-w-[46rem] overflow-hidden">
                <ProjectVisual project={project} />
              </div>

              <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-4 py-2.5 text-[0.8125rem] font-medium text-black transition hover:bg-[var(--color-accent)] hover:text-white sm:px-5 sm:py-3 sm:text-[0.95rem]"
                >
                  Visit live project <span>↗</span>
                </a>
                <button
                  type="button"
                  onClick={onNavigateHome}
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/12 px-4 py-2.5 text-[0.8125rem] font-medium text-white/80 transition hover:border-white/30 hover:text-white sm:px-5 sm:py-3 sm:text-[0.95rem]"
                >
                  Back to projects
                </button>
              </div>

              {project.relatedLinks?.length ? (
                <div className="mt-8 border-t border-white/10 pt-6">
                  <p className="mb-3 text-[0.75rem] text-white/30 sm:text-[0.9rem]">Live products</p>
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {project.relatedLinks.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-10 items-center rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-2 text-[0.75rem] text-white/70 transition hover:border-white/30 hover:text-white sm:px-4 sm:text-[0.9rem]"
                      >
                        {item.label} ↗
                      </a>
                    ))}
                  </div>
                </div>
              ) : null}

              {project.gallery?.length ? (
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {project.gallery.map((item) => (
                    <a
                      key={item.href}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block overflow-hidden border border-white/10 bg-white/[0.03]"
                    >
                      <div className="aspect-[16/10] overflow-hidden">
                        <img
                          src={item.src}
                          alt={item.label}
                          className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.02]"
                          loading="lazy"
                        />
                      </div>
                      <div className="flex items-center justify-between px-3 py-2.5 text-[0.8125rem] text-white/70 sm:px-4 sm:py-3 sm:text-[0.92rem]">
                        <span>{item.label}</span>
                        <span className="text-white/35">↗</span>
                      </div>
                    </a>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <div className="mt-12 grid gap-6 border-t border-white/10 pt-8 sm:mt-16 sm:pt-10 md:grid-cols-2">
            {previousProject ? (
              <button
                type="button"
                onClick={() => onNavigateProject(previousProject.slug)}
                className="text-left transition hover:opacity-100 opacity-80"
              >
                <p className="mb-2 text-[0.75rem] text-white/28 sm:mb-3 sm:text-[0.9rem]">Previous project</p>
                <div className="text-[clamp(1.15rem,5vw,1.45rem)] font-semibold leading-none tracking-[-0.04em] sm:text-[clamp(1.4rem,5vw,2rem)] sm:tracking-[-0.05em]">
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
                <p className="mb-2 text-[0.75rem] text-white/28 sm:mb-3 sm:text-[0.9rem]">Next project</p>
                <div className="text-[clamp(1.15rem,5vw,1.45rem)] font-semibold leading-none tracking-[-0.04em] sm:text-[clamp(1.4rem,5vw,2rem)] sm:tracking-[-0.05em]">
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

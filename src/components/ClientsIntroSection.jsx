import { experience } from "../data/projects";

function ClientsIntroSection() {
  return (
    <section className="relative bg-[var(--color-bg-base)] px-6 py-24 text-white md:px-10 lg:px-14">
      <div className="mx-auto max-w-[1600px]">
        <p className="mb-8 text-xs font-medium uppercase tracking-[0.16em] text-white/60 sm:mb-10 sm:text-sm sm:tracking-[0.18em]">
          Companies I worked for
        </p>

        <div className="flex flex-wrap items-center gap-x-8 gap-y-6 border-y border-white/10 py-8 text-white/60 sm:gap-x-12 sm:gap-y-8 sm:py-10">
          {experience.map((job) => (
            <span key={job.company} className="text-sm font-medium tracking-wide sm:text-lg">
              {job.company}
            </span>
          ))}
        </div>

        <div className="grid gap-10 pt-12 sm:gap-12 sm:pt-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.16em] text-white/40 sm:mb-6 sm:text-sm sm:tracking-[0.18em]">
              (Career)
            </p>

            <p className="max-w-4xl text-lg leading-relaxed text-white/85 sm:text-2xl md:text-3xl">
              Three employers. Clear chapters. Products nested under the
              company where they were built.
            </p>

            <div className="mt-6 max-w-3xl space-y-6 text-sm leading-7 text-white/60 sm:mt-8 sm:space-y-8 sm:text-base sm:leading-8 md:text-lg">
              {experience.map((job) => (
                <div key={job.company}>
                  <p className="text-white/85">
                    <span className="text-white">{job.company}</span>
                    <span className="text-white/35"> · {job.year} · {job.role}</span>
                  </p>
                  <p className="mt-2">{job.summary}</p>
                  <p className="mt-2 text-white/45">{job.work.join(" · ")}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative min-h-[420px] overflow-hidden rounded-[2rem] bg-[#111111]">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center text-white/35">
              Portrait / Editorial Image
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ClientsIntroSection;

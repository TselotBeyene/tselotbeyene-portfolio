import { experience } from "../data/projects";

function ClientsIntroSection() {
  return (
    <section className="relative bg-[var(--color-bg-base)] px-6 py-24 text-white md:px-10 lg:px-14">
      <div className="mx-auto max-w-[1600px]">
        <p className="mb-10 text-sm font-medium uppercase tracking-[0.18em] text-white/60">
          Companies I worked for
        </p>

        <div className="flex flex-wrap items-center gap-x-12 gap-y-8 border-y border-white/10 py-10 text-white/60">
          {experience.map((job) => (
            <span key={job.company} className="text-lg font-medium tracking-wide">
              {job.company}
            </span>
          ))}
        </div>

        <div className="grid gap-12 pt-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-6 text-sm uppercase tracking-[0.18em] text-white/40">
              (Career)
            </p>

            <p className="max-w-4xl text-2xl leading-relaxed text-white/85 md:text-3xl">
              Three employers. Clear chapters. Products nested under the
              company where they were built.
            </p>

            <div className="mt-8 max-w-3xl space-y-8 text-base leading-8 text-white/60 md:text-lg">
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

import { useEffect, useMemo, useRef, useState } from "react";
import ProjectVisual from "./ProjectVisual";
import { useCursorTarget } from "../context/CursorContext";
import { projects } from "../data/projects";

function clamp(value, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max);
}

function mapRange(value, inMin, inMax, outMin, outMax) {
  const t = clamp((value - inMin) / (inMax - inMin));
  return outMin + (outMax - outMin) * t;
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function easeInOutCubic(t) {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function getSequence(progress) {
  const reveal = clamp(mapRange(progress, 0.1, 0.2, 0, 1));
  const sequenceStart = 0.18;
  const sequenceEnd = 0.96;
  const normalized = clamp(mapRange(progress, sequenceStart, sequenceEnd, 0, 1));

  const segmentCount = projects.length - 1;
  const raw = normalized * segmentCount;

  const fromIndex = Math.min(Math.floor(raw), projects.length - 1);
  const toIndex = Math.min(fromIndex + 1, projects.length - 1);

  let t = raw - fromIndex;
  if (fromIndex === projects.length - 1) t = 1;

  const localT = easeInOutCubic(t);

  return {
    reveal,
    fromIndex,
    toIndex,
    rawT: t,
    localT: easeInOutCubic(t),
    isTransitioning: fromIndex !== toIndex && t > 0 && t < 1,
  };
}

function ThumbnailRail({
  activeIndex,
  progress,
  onOpenProject,
  cursorTarget,
}) {
  const { fromIndex, toIndex, localT, isTransitioning } = getSequence(progress);
  const currentProject = projects[fromIndex];
  const upcomingProject = projects[toIndex];
  const displayProject = projects[activeIndex];
  const totalCount = projects.length.toString().padStart(2, "0");
  // Counter + thumb only once the project stage has actually revealed.
  const visible = clamp(mapRange(progress, 0.16, 0.24, 0, 1));

  return (
    <div
      className="flex flex-col items-start"
      style={{
        opacity: visible,
        pointerEvents: visible < 0.2 ? "none" : "auto",
      }}
    >
      <div className="mb-4 h-px w-[3.8rem] bg-white/12" />
      <button
        type="button"
        onClick={() => onOpenProject(displayProject.slug)}
        {...cursorTarget}
        className="relative h-[3.6rem] w-[5.6rem] overflow-hidden border border-[var(--color-accent)] transition-all duration-500 sm:h-[4.2rem] sm:w-[6.6rem]"
      >
        {isTransitioning ? (
          <>
            <div
              className="absolute inset-0"
              style={{
                transform: `translateY(${lerp(0, -100, localT)}%) scale(${lerp(
                  1,
                  0.92,
                  localT
                )})`,
                opacity: lerp(1, 0, localT),
                transformOrigin: "center center",
              }}
            >
              <ProjectVisual project={currentProject} compact />
            </div>
            <div
              className="absolute inset-0"
              style={{
                transform: `translateY(${lerp(100, 0, localT)}%) scale(${lerp(
                  0.92,
                  1,
                  localT
                )})`,
                opacity: lerp(0, 1, localT),
                transformOrigin: "center center",
              }}
            >
              <ProjectVisual project={upcomingProject} compact />
            </div>
          </>
        ) : (
          <ProjectVisual project={displayProject} compact />
        )}
      </button>
      <div className="mt-[0.35rem] h-[3px] w-[5.5rem] bg-[var(--color-accent)] sm:w-[6.5rem]" />
      <div className="mt-6 text-[0.95rem] tracking-[-0.04em] text-white/92 sm:text-[1.1rem]">
        <span>{displayProject.id}</span>
        <span className="mx-2 text-white/28">/</span>
        <span className="text-white/28">{totalCount}</span>
      </div>
      <div className="mt-4 h-px w-[3.8rem] bg-white/12" />
    </div>
  );
}

function IntroOverlay({ progress }) {
  const opacity = 1 - clamp(mapRange(progress, 0.04, 0.22, 0, 1));
  const y = mapRange(progress, 0.04, 0.22, 0, -40);

  return (
    <div
      className="absolute inset-0 z-20 overflow-hidden px-5 pt-24 sm:px-8 md:px-12 lg:px-16"
      style={{
        opacity,
        transform: `translate3d(0, ${y}px, 0)`,
        pointerEvents: "none",
      }}
    >
      <div className="absolute right-5 top-24 text-[0.75rem] text-white/28 sm:right-8 sm:top-[6.5rem] sm:text-[1rem] lg:right-[8.8rem]">
        (Portfolio)
      </div>

      <div className="pt-8 sm:pt-[3.5rem]">
        <h2 className="text-[clamp(1.85rem,9.5vw,2.4rem)] font-semibold leading-[0.88] tracking-[-0.07em] text-white/82 sm:text-[clamp(2.6rem,12vw,10rem)] sm:leading-[0.86] sm:tracking-[-0.09em]">
          PROJECTS I
        </h2>

        <h2 className="ml-0 text-[clamp(1.85rem,9.5vw,2.4rem)] font-semibold leading-[0.88] tracking-[-0.07em] text-white/82 sm:ml-[12%] sm:text-[clamp(2.6rem,12vw,10rem)] sm:leading-[0.86] sm:tracking-[-0.09em] lg:ml-[22%]">
          WORKED ON
        </h2>

        <div className="ml-0 mt-2 flex items-start gap-2 sm:ml-[12%] lg:ml-[22%]">
          <span className="text-[clamp(1.55rem,8vw,2rem)] font-semibold leading-none tracking-[-0.06em] text-white/16 sm:text-[clamp(2.2rem,10vw,7.8rem)] sm:tracking-[-0.08em]">
            16-25
          </span>
          <span className="mt-1 text-[0.95rem] font-semibold text-[var(--color-accent)] sm:text-[1.7rem] md:text-[2.4rem]">
            ®
          </span>
        </div>
      </div>

      <div className="absolute left-[12%] top-[52%] hidden h-3 w-3 rounded-full bg-[var(--color-accent)] sm:left-[22%] sm:top-[45%] lg:block" />
    </div>
  );
}

function CenterVisual({
  progress,
  onOpenProject,
  cursorTarget,
}) {
  const stageRef = useRef(null);
  const { reveal, fromIndex, toIndex, rawT } = getSequence(progress);

  const current = projects[fromIndex];
  const next = projects[toIndex];
  const hasNext = fromIndex < projects.length - 1;
  const containerY = lerp(24, 0, reveal);
  const startScale = 0.55;
  const t = easeInOutCubic(rawT);

  const [layout, setLayout] = useState({
    w: 560,
    h: 350,
    ax: 0,
    ay: 0,
  });

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;

    const measure = () => {
      const { width, height } = el.getBoundingClientRect();
      const w = Math.min(560, Math.max(240, width * 0.9));
      const h = w * (10 / 16);
      const ax = (width - w) / 2;
      const ay = (height - h) / 2;
      setLayout((prev) =>
        prev.w === w && prev.h === h && prev.ax === ax && prev.ay === ay
          ? prev
          : { w, h, ax, ay },
      );
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { w, h, ax, ay } = layout;

  // Shared path ends exactly on the main slot. Image 2 must not travel past
  // (-w, -h) and settle back — that reverse move is what caused the end jump.
  // Landing here also matches the next segment's resting current image, so the
  // index handoff stays seamless.
  const tx = lerp(0, -w, t);
  const ty = lerp(0, -h, t);
  const s2 = lerp(startScale, 1, t);

  const outgoingTransform = `translate3d(${tx}px, ${ty}px, 0)`;
  const incomingTransform = `translate3d(${tx}px, ${ty}px, 0) scale(${s2})`;
  // Fade the outgoing image out only after it has mostly left, so no strip
  // lingers — without moving image 2 off the slot.
  const outgoingOpacity =
    reveal * (1 - clamp(mapRange(t, 0.88, 1, 0, 1)));

  return (
    <div ref={stageRef} className="relative h-full w-full overflow-hidden">
      <div
        className="absolute inset-0"
        style={{ transform: `translate3d(0, ${containerY}px, 0)` }}
      >
        {hasNext && (
          <button
            type="button"
            onClick={() => onOpenProject(next.slug)}
            {...cursorTarget}
            className="absolute overflow-hidden text-left"
            aria-label={next.title}
            style={{
              left: ax + w,
              top: ay + h,
              width: w,
              height: h,
              opacity: reveal,
              zIndex: 2,
              willChange: "transform",
              transformOrigin: "top left",
              transform: incomingTransform,
            }}
          >
            <ProjectVisual project={next} />
          </button>
        )}

        <button
          type="button"
          onClick={() => onOpenProject(current.slug)}
          {...cursorTarget}
          className="absolute overflow-hidden text-left"
          aria-label={current.title}
          style={{
            left: ax,
            top: ay,
            width: w,
            height: h,
            opacity: hasNext ? outgoingOpacity : reveal,
            zIndex: 4,
            willChange: "transform",
            transformOrigin: "top left",
            transform: hasNext ? outgoingTransform : "translate3d(0,0,0)",
          }}
        >
          <ProjectVisual project={current} />
        </button>

        {fromIndex === projects.length - 1 && (
          <button
            type="button"
            onClick={() => onOpenProject(current.slug)}
            {...cursorTarget}
            className="absolute flex h-[5.4rem] w-[5.4rem] items-center justify-center rounded-full bg-[var(--color-accent)] text-[1.1rem] text-white shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
            style={{
              left: ax + w / 2,
              top: ay + h / 2,
              opacity: clamp(mapRange(progress, 0.72, 0.88, 0, 1)),
              willChange: "transform",
              transform: `translate3d(-50%, -50%, 0) scale(${lerp(
                0.86,
                1,
                clamp(mapRange(progress, 0.72, 0.88, 0, 1))
              )})`,
            }}
          >
            View
          </button>
        )}
      </div>
    </div>
  );
}

function LeftBottomTitle({ activeIndex, progress }) {
  const opacity = clamp(mapRange(progress, 0.16, 0.24, 0, 1));
  const totalCount = projects.length.toString().padStart(2, "0");

  return (
    <div style={{ opacity }}>
      <div className="text-[1.1rem] tracking-[-0.04em] text-white/92">
        <span>{projects[activeIndex].id}</span>
        <span className="mx-2 text-white/28">/</span>
        <span className="text-white/28">{totalCount}</span>
      </div>

      <div className="mt-6 h-px w-[3.8rem] bg-white/12" />

      <h3 className="mt-8 max-w-[12rem] text-[clamp(2.6rem,4.2vw,4.6rem)] font-semibold leading-[0.92] tracking-[-0.08em] text-white">
        {projects[activeIndex].title.split(" ").map((line, i) => (
          <span key={i} className="block">
            {line}
          </span>
        ))}
      </h3>
    </div>
  );
}

function RightMeta({
  activeIndex,
  progress,
  onOpenProject,
  cursorTarget,
}) {
  const project = projects[activeIndex];
  const opacity = clamp(mapRange(progress, 0.16, 0.24, 0, 1));

  return (
    <div
      className="flex h-full min-h-0 flex-col justify-center"
      style={{ opacity }}
    >
      <div className="max-h-full space-y-6 overflow-y-auto overscroll-contain pr-1">
        <div>
          <p className="mb-2 text-[0.85rem] uppercase tracking-[0.18em] text-white/28">
            Category
          </p>
          <p className="text-[1.05rem] text-white/78">{project.eyebrow}</p>
        </div>

        <div className="grid grid-cols-2 gap-6 border-t border-white/10 pt-6">
          <div>
            <p className="mb-2 text-[0.85rem] uppercase tracking-[0.18em] text-white/28">
              Year
            </p>
            <h3 className="text-[2.4rem] font-semibold leading-none tracking-[-0.06em] text-white">
              {project.year}
            </h3>
          </div>
          <div>
            <p className="mb-2 text-[0.85rem] uppercase tracking-[0.18em] text-white/28">
              Role
            </p>
            <p className="text-[1.05rem] leading-[1.35] text-white/82">
              {project.role}
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6">
          <p className="mb-2 text-[0.85rem] uppercase tracking-[0.18em] text-white/28">
            Overview
          </p>
          <p className="text-[1.02rem] leading-[1.45] text-white/72">
            {project.description}
          </p>
        </div>

        <div className="border-t border-white/10 pt-6">
          <p className="mb-3 text-[0.85rem] uppercase tracking-[0.18em] text-white/28">
            Focus
          </p>
          <div className="flex flex-wrap gap-2">
            {project.lines.map((line) => (
              <span
                key={line}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[0.88rem] text-white/70"
              >
                {line}
              </span>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 pt-6">
          <p className="mb-3 text-[0.85rem] uppercase tracking-[0.18em] text-white/28">
            Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {project.stack.slice(0, 4).map((item) => (
              <span
                key={item}
                className="rounded-full border border-white/10 px-3 py-1.5 text-[0.82rem] text-white/55"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <button
          type="button"
          onClick={() => onOpenProject(project.slug)}
          {...cursorTarget}
          className="inline-flex items-center gap-2 pt-1 text-[1.05rem] font-medium text-[var(--color-accent)] underline underline-offset-4"
        >
          View project details <span>↗</span>
        </button>
      </div>
    </div>
  );
}

export default function ProjectsSection({ onOpenProject }) {
  const sectionRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const cursorTarget = useCursorTarget("Open");

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const total = Math.max(el.offsetHeight - window.innerHeight, 1);
      const traveled = clamp(-rect.top, 0, total);
      setProgress(traveled / total);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const activeIndex = useMemo(() => {
    const { fromIndex, toIndex, localT } = getSequence(progress);
    return localT > 0.5 ? toIndex : fromIndex;
  }, [progress]);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative h-[480vh] bg-[var(--color-bg-deep)] text-white"
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-[var(--color-bg-deep)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-glow-warm)_0%,rgba(6,95,70,0.03)_28%,rgba(0,0,0,0)_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:120px_100%] opacity-[0.04]" />

        <IntroOverlay progress={progress} />

        {/* Mobile / tablet: show the same project visual stage */}
        <div
          className="relative z-20 flex h-full flex-col px-4 pb-4 pt-24 lg:hidden"
          style={{
            opacity: clamp(mapRange(progress, 0.1, 0.22, 0, 1)),
          }}
        >
          <div className="relative min-h-0 flex-1 overflow-hidden">
            <CenterVisual
              progress={progress}
              onOpenProject={onOpenProject}
              cursorTarget={cursorTarget}
            />
          </div>

          <div
            className="shrink-0 pt-3"
            style={{
              opacity: clamp(mapRange(progress, 0.16, 0.26, 0, 1)),
            }}
          >
            <div className="mb-2 text-xs text-white/55 sm:text-sm">
              {projects[activeIndex].id} /{" "}
              {projects.length.toString().padStart(2, "0")}
              <span className="mx-2 text-white/20">·</span>
              {projects[activeIndex].eyebrow}
            </div>
            <h3 className="text-[clamp(1.45rem,7vw,1.85rem)] font-semibold leading-[0.94] tracking-[-0.06em] text-white sm:text-[clamp(1.8rem,8vw,2.4rem)] sm:leading-[0.92] sm:tracking-[-0.07em]">
              {projects[activeIndex].title}
            </h3>
            <p className="mt-2 line-clamp-3 max-w-[34rem] text-[0.8125rem] leading-[1.45] text-white/62 sm:mt-3 sm:text-[0.98rem]">
              {projects[activeIndex].description}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {projects[activeIndex].lines.map((line) => (
                <span
                  key={line}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[0.6875rem] text-white/65 sm:px-3 sm:text-[0.8rem]"
                >
                  {line}
                </span>
              ))}
            </div>
            <button
              type="button"
              onClick={() => onOpenProject(projects[activeIndex].slug)}
              className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--color-accent)]/40 bg-[var(--color-accent)]/10 px-4 text-[0.8125rem] font-medium text-[var(--color-accent-bright)] sm:text-[0.95rem]"
            >
              View project details <span>↗</span>
            </button>
          </div>
        </div>

        <div className="relative z-20 hidden h-full grid-cols-[minmax(12rem,16rem)_minmax(0,1fr)_minmax(18rem,22rem)] gap-8 px-10 pb-10 pt-28 lg:grid xl:px-14">
          <div className="flex min-h-0 flex-col justify-between py-6">
            <ThumbnailRail
              activeIndex={activeIndex}
              progress={progress}
              onOpenProject={onOpenProject}
              cursorTarget={cursorTarget}
            />
            <LeftBottomTitle activeIndex={activeIndex} progress={progress} />
          </div>

          <div className="relative min-h-0 min-w-0 overflow-hidden">
            <CenterVisual
              progress={progress}
              onOpenProject={onOpenProject}
              cursorTarget={cursorTarget}
            />
          </div>

          <div className="min-h-0 min-w-0 pl-2">
            <RightMeta
              activeIndex={activeIndex}
              progress={progress}
              onOpenProject={onOpenProject}
              cursorTarget={cursorTarget}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
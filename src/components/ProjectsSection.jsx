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
  const reveal = clamp(mapRange(progress, 0.14, 0.24, 0, 1));
  const sequenceStart = 0.24;
  const sequenceEnd = 0.92;
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
    localT,
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

  return (
    <div className="absolute left-[3.2rem] top-[22%] z-30 hidden lg:block">
      <div className="flex flex-col items-start">
        <div className="mb-4 h-px w-[3.8rem] bg-white/12" />
        <button
          type="button"
          onClick={() => onOpenProject(displayProject.slug)}
          {...cursorTarget}
          className="relative h-[2.4rem] w-[3.8rem] overflow-hidden border border-[var(--color-accent)] transition-all duration-500"
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
        <div className="mt-[0.35rem] h-[3px] w-[3.7rem] bg-[var(--color-accent)]" />
        <div className="mt-6 text-[1.1rem] tracking-[-0.04em] text-white/92">
          <span>{displayProject.id}</span>
          <span className="mx-2 text-white/28">/</span>
          <span className="text-white/28">{totalCount}</span>
        </div>
        <div className="mt-4 h-px w-[3.8rem] bg-white/12" />
      </div>
    </div>
  );
}

function IntroOverlay({ progress }) {
  const opacity = 1 - clamp(mapRange(progress, 0.04, 0.22, 0, 1));
  const y = mapRange(progress, 0.04, 0.22, 0, -40);

  return (
    <div
      className="absolute inset-0 z-20 px-8 pt-24 md:px-12 lg:px-16"
      style={{
        opacity,
        transform: `translate3d(0, ${y}px, 0)`,
        pointerEvents: "none",
      }}
    >
      <div className="absolute right-[8.8rem] top-[6.5rem] text-[1rem] text-white/28">
        (Portfolio)
      </div>

      <div className="pt-[3.5rem]">
        <h2 className="text-[4.8rem] font-semibold leading-[0.86] tracking-[-0.09em] text-white/82 md:text-[7.5rem] lg:text-[10rem]">
          PROJECTS I
        </h2>

        <h2 className="ml-[22%] text-[4.8rem] font-semibold leading-[0.86] tracking-[-0.09em] text-white/82 md:text-[7.5rem] lg:text-[10rem]">
          WORKED ON
        </h2>

        <div className="ml-[22%] mt-2 flex items-start gap-2">
          <span className="text-[4rem] font-semibold leading-none tracking-[-0.08em] text-white/16 md:text-[6rem] lg:text-[7.8rem]">
            16-25
          </span>
          <span className="mt-1 text-[1.7rem] font-semibold text-[var(--color-accent)] md:text-[2.4rem]">
            ®
          </span>
        </div>
      </div>

      <div className="absolute left-[22%] top-[45%] h-3 w-3 rounded-full bg-[var(--color-accent)]" />
    </div>
  );
}

function CenterVisual({
  progress,
  onOpenProject,
  cursorTarget,
}) {
  const { reveal, fromIndex, toIndex, localT, isTransitioning } =
    getSequence(progress);

  const current = projects[fromIndex];
  const next = projects[toIndex];

  // Match screenshot aspect (16:10) so the full website shows without zoom/crop.
  const centerW = 640;
  const centerH = 400;
  const sideW = 320;
  const sideH = 200;

  const centerX = 10;
  const centerY = 10;

  // Outgoing exits upper-left, high enough to clear the incoming card.
  const exitX = -560;
  const exitY = -480;

  // Incoming enters from lower-right.
  const enterX = 340;
  const enterY = 200;

  // Incoming settles into center early so the middle never goes empty.
  const inT = clamp(localT / 0.62);
  // Outgoing keeps moving until it is fully gone.
  const outT = localT;

  const containerY = lerp(30, 0, reveal);

  const centerStyle = {
    width: `${centerW}px`,
    height: `${centerH}px`,
    transform: `translate3d(calc(-50% + ${centerX}px), calc(-50% + ${centerY}px + ${containerY}px), 0)`,
    opacity: reveal,
  };

  const outgoingStyle = {
    width: `${lerp(centerW, sideW, outT)}px`,
    height: `${lerp(centerH, sideH, outT)}px`,
    transform: `translate3d(calc(-50% + ${lerp(
      centerX,
      exitX,
      outT
    )}px), calc(-50% + ${lerp(centerY, exitY, outT)}px + ${containerY}px), 0) scale(${lerp(
      1,
      0.88,
      outT
    )})`,
    opacity: lerp(reveal, 0, outT),
  };

  const incomingStyle = {
    width: `${lerp(sideW, centerW, inT)}px`,
    height: `${lerp(sideH, centerH, inT)}px`,
    transform: `translate3d(calc(-50% + ${lerp(
      enterX,
      centerX,
      inT
    )}px), calc(-50% + ${lerp(enterY, centerY, inT)}px + ${containerY}px), 0)`,
    opacity: inT <= 0 ? 0 : lerp(0.55, reveal, inT),
  };

  return (
    <div className="absolute inset-0 z-20 hidden overflow-hidden lg:block">
      <div className="absolute left-1/2 top-1/2 h-screen w-screen -translate-x-1/2 -translate-y-1/2">
        {isTransitioning && localT > 0 && localT < 1 ? (
          <>
            <button
              type="button"
              onClick={() => onOpenProject(current.slug)}
              {...cursorTarget}
              className="absolute left-1/2 top-1/2 overflow-hidden text-left"
              style={{ ...outgoingStyle, zIndex: 4 }}
            >
              <ProjectVisual project={current} />
            </button>
            <button
              type="button"
              onClick={() => onOpenProject(next.slug)}
              {...cursorTarget}
              className="absolute left-1/2 top-1/2 overflow-hidden text-left"
              style={{ ...incomingStyle, zIndex: 3 }}
            >
              <ProjectVisual project={next} />
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => onOpenProject(current.slug)}
            {...cursorTarget}
            className="absolute left-1/2 top-1/2 overflow-hidden text-left"
            style={{ ...centerStyle, zIndex: 3 }}
          >
            <ProjectVisual project={current} />
          </button>
        )}

        {fromIndex === projects.length - 1 && (
          <button
            type="button"
            onClick={() => onOpenProject(current.slug)}
            {...cursorTarget}
            className="absolute left-1/2 top-1/2 flex h-[5.4rem] w-[5.4rem] items-center justify-center rounded-full bg-[var(--color-accent)] text-[1.1rem] text-white shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
            style={{
              opacity: clamp(mapRange(progress, 0.72, 0.88, 0, 1)),
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
    <div
      className="absolute bottom-[3.2rem] left-[3.2rem] z-30 hidden lg:block"
      style={{ opacity }}
    >
      <div className="text-[1.1rem] tracking-[-0.04em] text-white/92">
        <span>{projects[activeIndex].id}</span>
        <span className="mx-2 text-white/28">/</span>
        <span className="text-white/28">{totalCount}</span>
      </div>

      <div className="mt-6 h-px w-[3.8rem] bg-white/12" />

      <h3 className="mt-8 text-[5.2rem] font-semibold leading-[0.9] tracking-[-0.08em] text-white">
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
      className="absolute right-[4.8rem] top-[18%] z-30 hidden w-[19rem] lg:block"
      style={{ opacity }}
    >
      <div className="space-y-[4.2rem]">
        <div>
          <p className="mb-3 text-[0.95rem] text-white/28">Year</p>
          <h3 className="text-[3.1rem] font-semibold leading-none tracking-[-0.06em] text-white">
            {project.year}
          </h3>
        </div>

        <div>
          <p className="mb-3 text-[0.95rem] text-white/28">Role</p>
          <p className="text-[1.12rem] leading-[1.35] text-white/82">
            {project.role}
          </p>
        </div>

        <div className="pt-3">
          <p className="mb-3 text-[0.95rem] text-white/28">Description</p>
          <p className="text-[1.04rem] leading-[1.42] text-white/72">
            {project.description}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onOpenProject(project.slug)}
          {...cursorTarget}
          className="inline-flex items-center gap-2 pt-2 text-[1.05rem] font-medium text-[var(--color-accent)] underline underline-offset-4"
        >
          View project <span>↗</span>
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
      className="relative h-[430vh] bg-[var(--color-bg-deep)] text-white"
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-[var(--color-bg-deep)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-glow-warm)_0%,rgba(6,95,70,0.03)_28%,rgba(0,0,0,0)_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:120px_100%] opacity-[0.04]" />

        <IntroOverlay progress={progress} />
        <ThumbnailRail
          activeIndex={activeIndex}
          progress={progress}
          onOpenProject={onOpenProject}
          cursorTarget={cursorTarget}
        />
        <CenterVisual
          progress={progress}
          onOpenProject={onOpenProject}
          cursorTarget={cursorTarget}
        />
        <LeftBottomTitle activeIndex={activeIndex} progress={progress} />
        <RightMeta
          activeIndex={activeIndex}
          progress={progress}
          onOpenProject={onOpenProject}
          cursorTarget={cursorTarget}
        />

        <div className="absolute bottom-8 left-6 right-6 z-40 lg:hidden">
          <div className="mb-3 text-sm text-white/70">
            {projects[activeIndex].id} /{" "}
            {projects.length.toString().padStart(2, "0")}
          </div>
          <h3 className="text-[2.6rem] font-semibold leading-[0.92] tracking-[-0.07em] text-white">
            {projects[activeIndex].title}
          </h3>
        </div>
      </div>
    </section>
  );
}
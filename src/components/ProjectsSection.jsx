import { useEffect, useMemo, useRef, useState } from "react";
import ProjectVisual from "./ProjectVisual";
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

function OpenCursor({ visible, x, y }) {
  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden lg:block"
      style={{
        transform: `translate3d(${x - 44}px, ${y - 44}px, 0)`,
        opacity: visible ? 1 : 0,
        transition: "opacity 120ms ease",
      }}
    >
      <div className="flex h-[88px] w-[88px] items-center justify-center rounded-full bg-[#ff5a0a] text-[1.05rem] font-medium text-white shadow-[0_16px_40px_rgba(0,0,0,0.3)]">
        Open
      </div>
    </div>
  );
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
  setCursorVisible,
  setCursorPos,
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
          onMouseEnter={() => setCursorVisible(true)}
          onMouseLeave={() => setCursorVisible(false)}
          onMouseMove={(e) => setCursorPos({ x: e.clientX, y: e.clientY })}
          className="relative h-[4.8rem] w-[3.7rem] overflow-hidden border border-[#ff5a0a] transition-all duration-500"
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
        <div className="mt-[0.35rem] h-[3px] w-[3.7rem] bg-[#ff5a0a]" />
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
          <span className="mt-1 text-[1.7rem] font-semibold text-[#ff5a0a] md:text-[2.4rem]">
            ®
          </span>
        </div>
      </div>

      <div className="absolute left-[22%] top-[45%] h-3 w-3 rounded-full bg-[#ff5a0a]" />
    </div>
  );
}

function MotionImage({ project, style, zIndex = 1 }) {
  return (
    <div
      className="absolute left-1/2 top-1/2 overflow-hidden"
      style={{ ...style, zIndex }}
    >
      <ProjectVisual project={project} />
    </div>
  );
}

function CenterVisual({
  progress,
  onOpenProject,
  setCursorVisible,
  setCursorPos,
}) {
  const { reveal, fromIndex, toIndex, localT, isTransitioning } =
    getSequence(progress);

  const current = projects[fromIndex];
  const next = projects[toIndex];
  const previous = fromIndex > 0 ? projects[fromIndex - 1] : null;

  const centerW = 460;
  const centerH = 620;

  const upperRightW = 165;
  const upperRightH = 225;

  const lowerLeftW = 165;
  const lowerLeftH = 225;

  const bottomRightW = 165;
  const bottomRightH = 225;

  const centerX = 20;
  const centerY = 95;

  const upperLeftX = -275;
  const upperLeftY = -195;

  const lowerRightX = 235;
  const lowerRightY = 185;

  const bottomRightX = 235;
  const bottomRightY = 185;

  const containerY = lerp(30, 0, reveal);

  const centerStyle = {
    width: `${centerW}px`,
    height: `${centerH}px`,
    transform: `translate3d(calc(-50% + ${centerX}px), calc(-50% + ${centerY}px + ${containerY}px), 0)`,
    opacity: reveal,
  };

  const outgoingStyle = {
    width: `${lerp(centerW, upperRightW, localT)}px`,
    height: `${lerp(centerH, upperRightH, localT)}px`,
    transform: `translate3d(calc(-50% + ${lerp(
      centerX,
      upperLeftX,
      localT
    )}px), calc(-50% + ${lerp(centerY, upperLeftY, localT)}px + ${containerY}px), 0)`,
    opacity: lerp(reveal, 0.96, localT),
  };

  const incomingStyle = {
    width: `${lerp(lowerLeftW, centerW, localT)}px`,
    height: `${lerp(lowerLeftH, centerH, localT)}px`,
    transform: `translate3d(calc(-50% + ${lerp(
      lowerRightX,
      centerX,
      localT
    )}px), calc(-50% + ${lerp(lowerRightY, centerY, localT)}px + ${containerY}px), 0)`,
    opacity: localT <= 0 ? 0 : lerp(0, reveal, localT),
  };

  const parkedUpperRightStyle = {
    width: `${upperRightW}px`,
    height: `${upperRightH}px`,
    transform: `translate3d(calc(-50% + ${upperLeftX}px), calc(-50% + ${upperLeftY}px + ${containerY}px), 0)`,
    opacity: reveal,
  };

  return (
    <div className="absolute inset-0 z-20 hidden lg:block">
      <div className="absolute left-1/2 top-1/2 h-[760px] w-[900px] -translate-x-1/2 -translate-y-1/2">
        {isTransitioning && localT > 0 && localT < 1 ? (
          <>
            <MotionImage project={current} style={outgoingStyle} zIndex={4} />
            <MotionImage project={next} style={incomingStyle} zIndex={3} />
          </>
        ) : (
          <>
            {fromIndex > 0 && fromIndex < projects.length - 1 && previous && (
              <MotionImage
                project={previous}
                style={parkedUpperRightStyle}
                zIndex={2}
              />
            )}

            <button
              type="button"
              onClick={() => onOpenProject(current.slug)}
              onMouseEnter={() => setCursorVisible(true)}
              onMouseLeave={() => setCursorVisible(false)}
              onMouseMove={(e) => setCursorPos({ x: e.clientX, y: e.clientY })}
              className="absolute left-1/2 top-1/2 overflow-hidden text-left"
              style={{ ...centerStyle, zIndex: 3 }}
            >
              <ProjectVisual project={current} />
            </button>
          </>
        )}

        {fromIndex === projects.length - 1 && (
          <button
            type="button"
            onClick={() => onOpenProject(current.slug)}
            onMouseEnter={() => setCursorVisible(true)}
            onMouseLeave={() => setCursorVisible(false)}
            onMouseMove={(e) => setCursorPos({ x: e.clientX, y: e.clientY })}
            className="absolute left-1/2 top-1/2 flex h-[5.4rem] w-[5.4rem] items-center justify-center rounded-full bg-[#ff5a0a] text-[1.1rem] text-white shadow-[0_12px_40px_rgba(0,0,0,0.35)]"
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
  setCursorVisible,
  setCursorPos,
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
          onMouseEnter={() => setCursorVisible(true)}
          onMouseLeave={() => setCursorVisible(false)}
          onMouseMove={(e) => setCursorPos({ x: e.clientX, y: e.clientY })}
          className="inline-flex items-center gap-2 pt-2 text-[1.05rem] font-medium text-[#ff5a0a] underline underline-offset-4"
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
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

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
      onMouseMove={(e) => {
        if (cursorVisible) {
          setCursorPos({ x: e.clientX, y: e.clientY });
        }
      }}
      className="relative h-[430vh] bg-[#020202] text-white"
    >
      <OpenCursor visible={cursorVisible} x={cursorPos.x} y={cursorPos.y} />
      <div className="sticky top-0 h-screen overflow-hidden bg-[#020202]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,18,10,0.12)_0%,rgba(120,18,10,0.03)_28%,rgba(0,0,0,0)_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:120px_100%] opacity-[0.04]" />

        <IntroOverlay progress={progress} />
        <ThumbnailRail
          activeIndex={activeIndex}
          progress={progress}
          onOpenProject={onOpenProject}
          setCursorVisible={setCursorVisible}
          setCursorPos={setCursorPos}
        />
        <CenterVisual
          progress={progress}
          onOpenProject={onOpenProject}
          setCursorVisible={setCursorVisible}
          setCursorPos={setCursorPos}
        />
        <LeftBottomTitle activeIndex={activeIndex} progress={progress} />
        <RightMeta
          activeIndex={activeIndex}
          progress={progress}
          onOpenProject={onOpenProject}
          setCursorVisible={setCursorVisible}
          setCursorPos={setCursorPos}
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
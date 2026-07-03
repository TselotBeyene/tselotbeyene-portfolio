import { useEffect, useRef, useState } from "react";
import subjectImg from "../assets/Subject.png";
import secondImg from "../assets/tselot_b.png";

const lerp = (a, b, t) => a + (b - a) * t;

const MAX_PROGRESS = 1.45;
const HANDOFF_AT = 1.32;
const SCROLL_SENSITIVITY = 0.0018;
const PROGRESS_LERP = 0.28;
const BLACK_POINT = 0.32;

export default function FooterTransition({
  onLoopHandoff,
  handoffActive,
  reducedMotion = false,
}) {
  const [progress, setProgress] = useState(0);
  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const rafRef = useRef(null);
  const handoffTriggeredRef = useRef(false);
  const progressLerp = reducedMotion ? 1 : PROGRESS_LERP;
  const scrollSensitivity = reducedMotion ? 0.0024 : SCROLL_SENSITIVITY;

  const resetFooter = () => {
    targetRef.current = 0;
    currentRef.current = 0;
    handoffTriggeredRef.current = false;
    setProgress(0);
  };

  useEffect(() => {
    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const runLoop = () => {
    if (rafRef.current != null) return;

    const tick = () => {
      const next = lerp(currentRef.current, targetRef.current, progressLerp);
      currentRef.current = next;
      setProgress(next);

      if (
        targetRef.current >= HANDOFF_AT &&
        next >= HANDOFF_AT &&
        Math.abs(targetRef.current - next) < 0.025 &&
        onLoopHandoff &&
        !handoffTriggeredRef.current
      ) {
        handoffTriggeredRef.current = true;
        rafRef.current = null;
        onLoopHandoff(resetFooter);
        return;
      }

      if (Math.abs(targetRef.current - next) > 0.0005) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        currentRef.current = targetRef.current;
        setProgress(targetRef.current);
        rafRef.current = null;
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  };

  const handleWheel = (e) => {
    if (handoffActive) return;

    const delta = e.deltaY * scrollSensitivity;

    // At the start of the footer, scrolling up should return to the page above.
    if (
      delta < 0 &&
      targetRef.current <= 0 &&
      currentRef.current < 0.005
    ) {
      targetRef.current = 0;
      currentRef.current = 0;
      handoffTriggeredRef.current = false;
      setProgress(0);
      return;
    }

    e.preventDefault();

    targetRef.current = Math.min(MAX_PROGRESS, Math.max(0, targetRef.current + delta));

    if (targetRef.current < HANDOFF_AT) {
      handoffTriggeredRef.current = false;
    }

    runLoop();
  };
  // progress split
  const introProgress = Math.min(progress, 0.85);
  const imageProgress = Math.max(0, progress - BLACK_POINT);

  const orangeText = progress > 7.8 ? "#ea580c" : "#000000";

  const scale = 0.7 + Math.min(imageProgress / 0.55, 1) * 1.1;
  const x = Math.min(imageProgress / 0.55, 1) * 900;
  const blur = imageProgress > 0.65 ? (imageProgress - 0.65) * 12 : 0;

  const riseSpan = HANDOFF_AT - BLACK_POINT;
  const secondT = Math.min(1, imageProgress / riseSpan);

  const secondOpacity = Math.min(1, imageProgress / 0.12);
  const secondScale = 0.92 + secondT * 0.78;
  const secondY = 160 - secondT * 520;
  const secondX = 0;

  return (
    <section
      onWheel={handleWheel}
      className="relative h-screen bg-black overflow-hidden"
    >
      {/* BACKGROUND */}
      <div
        className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_110%_75%_at_50%_-15%,rgba(5,8,11,0.95)_0%,rgba(5,8,11,0.85)_35%,rgba(5,8,11,0.4)_55%,rgba(5,8,11,0)_70%),linear-gradient(to_bottom,#0b0f12_0%,#1a0c08_20%,#4a160c_35%,#e34813_55%,#f58b3a_72%,#fff7ef_100%)]"
        style={{
          transform: `translateY(${Math.min(introProgress * 220, 100)}%)`,
        }}
      />

      {/* CONTENT */}
      <div className="pointer-events-none absolute inset-0 z-10 px-10 py-8 text-black">
        
        {/* LEFT SIDE */}
        <div className="absolute left-10 top-[20vh] space-y-16 text-sm">
          <div>
            <h3 className="mb-3 font-bold">Profiles</h3>
            <p style={{ color: orangeText }} className="font-semibold">GitHub</p>
            <p style={{ color: orangeText }} className="font-semibold">Email</p>
          </div>

          <div>
            <h3 className="mb-3 font-bold">Contact me</h3>
            <p style={{ color: orangeText }} className="font-semibold">
              tselotbeyene70@gmail.com
            </p>
            <p style={{ color: orangeText }} className="font-semibold">
              +251 936 679 199
            </p>
          </div>

          <div>
            <p className="text-black/40 mb-2">Got a project in mind?</p>
            <h2 className="text-3xl leading-tight max-w-[280px]">
              Let's make something happen together
            </h2>
          </div>
        </div>

        {/* RIGHT TEXT */}
        <div className="absolute right-16 top-[40vh] max-w-[600px]">
          <h1 className="text-4xl mb-10 leading-tight">
            I build full stack products and software systems that stay fast,
            maintainable, and dependable.
          </h1>

          <p className="text-4xl leading-tight">
            From frontend experiences to backend services and delivery
            infrastructure, I focus on products that need clean architecture,
            stable operations, and secure deployment practices.
          </p>
        </div>

        {/* MOVING EMAIL */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 overflow-hidden">
          <div className="w-max whitespace-nowrap animate-[footerMarquee_18s_linear_infinite] text-[8rem] font-medium leading-none tracking-[-0.08em] text-black/95 md:text-[10rem] lg:text-[12rem]">
            <span className="mr-10">hello</span>
            <span style={{ color: orangeText }} className="mr-10">@</span>
            <span className="mr-16">tselotbeyene.com</span>

            <span className="mr-10">hello</span>
            <span style={{ color: orangeText }} className="mr-10">@</span>
            <span className="mr-16">tselotbeyene.com</span>
          </div>
        </div>

        {/* FIRST IMAGE */}
        <img
          src={subjectImg}
          alt="Subject"
          style={{
            transform: `translateX(calc(-50% + ${x}px)) scale(${scale})`,
            filter: `blur(${blur}px)`,
          }}
          className="pointer-events-none absolute bottom-[2vh] left-[40%] z-40 h-[85vh]"
        />

        {/* SECOND IMAGE */}
        <img
          id="footer-portrait"
          src={secondImg}
          alt="Second"
          style={{
            transform: `translate(calc(-50% + ${secondX}px), ${secondY}px) scale(${secondScale})`,
            opacity: handoffActive ? 0 : secondOpacity,
          }}
          className="pointer-events-none absolute bottom-[25vh] left-1/2 z-20 h-[60vh] origin-center"
        />
      </div>
    </section>
  );
}

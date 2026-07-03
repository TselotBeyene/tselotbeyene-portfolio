import { useEffect, useRef, useState } from "react";
import subjectImg from "../assets/Subject.png";
import HeroPortrait from "./HeroPortrait";
import { HERO_PORTRAIT_IMAGE_Y, HERO_PORTRAIT_IMAGE_SCALE } from "../utils/heroPortraitLayout";

const lerp = (a, b, t) => a + (b - a) * t;

const clamp01 = (value) => Math.min(1, Math.max(0, value));

const BLACK_POINT = 0.32;
const TAKEOVER_DONE_AT = BLACK_POINT + 0.2 + 0.52;
const HANDOFF_AT = TAKEOVER_DONE_AT;
const MAX_PROGRESS = 1.1;
const SCROLL_SENSITIVITY = 0.0018;
const PROGRESS_LERP = 0.28;

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

  const firstProminenceT = Math.min(1, imageProgress / 0.3);
  const firstExitT = clamp01((imageProgress - 0.14) / 0.38);

  const scale = 0.7 + firstProminenceT * 1.1;
  const x = firstExitT * 1180;
  const blur = firstExitT * 14;
  const firstOpacity = (1 - firstExitT) * (handoffActive ? 0 : 1);

  const secondRevealT = Math.min(1, imageProgress / 0.12);
  const takeoverT = clamp01((imageProgress - 0.2) / 0.52);

  const secondImageY = lerp(180, HERO_PORTRAIT_IMAGE_Y, takeoverT);
  const secondImageScale = lerp(0.82, HERO_PORTRAIT_IMAGE_SCALE, takeoverT);
  const secondOpacity = secondRevealT;
  const secondZ = takeoverT > 0.25 ? 40 : 20;

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
          <div className="w-max whitespace-nowrap animate-[footerMarquee_18s_linear_infinite] text-[3.5rem] font-medium leading-none tracking-[-0.06em] text-black/95 md:text-[4.5rem] lg:text-[6.5rem]">
            <span className="mr-10">hello</span>
            <span style={{ color: orangeText }} className="mr-10">@</span>
            <span className="mr-16">tselotbeyene.com</span>

            <span className="mr-10">hello</span>
            <span style={{ color: orangeText }} className="mr-10">@</span>
            <span className="mr-16">tselotbeyene.com</span>
          </div>
        </div>

        {/* FIRST IMAGE — exits off screen to the right */}
        <img
          src={subjectImg}
          alt="Subject"
          style={{
            transform: `translateX(calc(-50% + ${x}px)) scale(${scale})`,
            filter: `blur(${blur}px)`,
            opacity: firstOpacity,
          }}
          className="pointer-events-none absolute bottom-[2vh] left-[40%] z-40 h-[85vh]"
        />

        {/* SECOND IMAGE — moves into the landing-page hero portrait position */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{ opacity: secondOpacity, zIndex: secondZ }}
        >
          <HeroPortrait
            imageY={secondImageY}
            imageScale={secondImageScale}
            imgId="footer-portrait"
            frameId="footer-portrait-frame"
          />
        </div>
      </div>
    </section>
  );
}

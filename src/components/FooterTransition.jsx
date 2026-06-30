import { useEffect, useRef, useState } from "react";
import subjectImg from "../assets/Subject.png";
import secondImg from "../assets/tselot_b.png";

const lerp = (a, b, t) => a + (b - a) * t;

export default function FooterTransition({ onLoopHandoff, handoffActive }) {
  const [progress, setProgress] = useState(0);
  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const rafRef = useRef(null);
  const handoffTriggeredRef = useRef(false);

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
      const next = lerp(currentRef.current, targetRef.current, 0.2);
      currentRef.current = next;
      setProgress(next);

      // once the eased motion has settled near the end, hand off to the hero
      if (next >= 2.97 && onLoopHandoff && !handoffTriggeredRef.current) {
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
    e.preventDefault();
    targetRef.current = Math.min(3, Math.max(0, targetRef.current + e.deltaY * 0.0006));
    runLoop();
  };
  // progress split
  const introProgress = Math.min(progress, 1);

  // the background finishes sliding down to black around progress 0.45
  const blackPoint = 0.45;
  const imageProgress = Math.max(0, progress - blackPoint);

  // orange becomes black during intro
  const orangeText = progress > 7.8 ? "#ea580c" : "#000000";

  // FIRST IMAGE (subject exits to the right once the background is black)
  const scale = 0.7 + imageProgress * 1.2;
  const x = imageProgress * 900;
  const blur = imageProgress > 1.0 ? (imageProgress - 1.0) * 10 : 0;

  // SECOND IMAGE (portrait) — starts right after black and keeps rising across
  // the whole remaining scroll so it is still moving when the handoff fires.
  const secondT = Math.min(1, imageProgress / 2.45);
  const secondEase = secondT * secondT * (3 - 2 * secondT);

  const secondOpacity = Math.min(1, imageProgress / 0.18);
  const secondScale = 0.6 + secondEase * 1.05;
  const secondY = 200 - secondEase * 440;
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
            <h3 className="mb-3 font-bold">Socials</h3>
            <p style={{ color: orangeText }} className="font-semibold">LinkedIn</p>
            <p style={{ color: orangeText }} className="font-semibold">Dribbble</p>
            <p style={{ color: orangeText }} className="font-semibold">Twitter/X</p>
          </div>

          <div>
            <h3 className="mb-3 font-bold">Contact me</h3>
            <p style={{ color: orangeText }} className="font-semibold">Email</p>
            <p style={{ color: orangeText }} className="font-semibold">WhatsApp</p>
            <p style={{ color: orangeText }} className="font-semibold">Telegram</p>
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
            As a designer and Rotarian, I believe in service above self.
          </h1>

          <p className="text-4xl leading-tight">
            Being a designer is about serving user needs. It’s dedicating
            yourself to finding the right balance between user needs and
            business goals.
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
          className="pointer-events-none absolute bottom-[25vh] left-1/2 z-20 h-[60vh] origin-center transition-all duration-300 ease-out"
        />
      </div>
    </section>
  );
}

import { useEffect, useRef, useState } from "react";
import portrait from "../assets/tselot_b.png";
import { easeInOutQuart, getHandoffDurations } from "../utils/motion";

function computeHeroRect() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const width = Math.min(Math.max(0.32 * vw, 360), 520);
  const height = vh;
  const centerX = vw / 2;
  const centerY = vh / 2 - 280;

  return {
    left: centerX - width / 2,
    top: centerY - height / 2,
    width,
    height,
  };
}

function applyRect(el, rect) {
  el.style.left = `${rect.left}px`;
  el.style.top = `${rect.top}px`;
  el.style.width = `${rect.width}px`;
  el.style.height = `${rect.height}px`;
}

export default function PortraitHandoff({
  fromRect,
  reducedMotion = false,
  onArrive,
  onComplete,
}) {
  const cloneRef = useRef(null);
  const rafRef = useRef(null);
  const timeoutRef = useRef(null);
  const [phase, setPhase] = useState("animating");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const clone = cloneRef.current;
    if (!clone || !fromRect) return;

    const toRect = computeHeroRect();
    const { move, settle, fade } = getHandoffDurations(reducedMotion);
    const scrollStart = window.scrollY;

    const startCrossfade = () => {
      applyRect(clone, toRect);
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      setProgress(1);
      onArrive?.();
      setPhase("crossfading");

      if (fade === 0) {
        onComplete();
        return;
      }

      timeoutRef.current = window.setTimeout(onComplete, fade);
    };

    if (move === 0) {
      startCrossfade();
      return;
    }

    const t0 = performance.now();

    const tick = (now) => {
      const t = Math.min(1, (now - t0) / move);
      const eased = easeInOutQuart(t);

      const scrollTop = scrollStart * (1 - eased);
      window.scrollTo({ top: scrollTop, left: 0, behavior: "instant" });

      applyRect(clone, {
        left: fromRect.left + (toRect.left - fromRect.left) * eased,
        top: fromRect.top + (toRect.top - fromRect.top) * eased,
        width: fromRect.width + (toRect.width - fromRect.width) * eased,
        height: fromRect.height + (toRect.height - fromRect.height) * eased,
      });

      setProgress(eased * 0.92);

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else if (settle > 0) {
        setPhase("settling");
        timeoutRef.current = window.setTimeout(startCrossfade, settle);
      } else {
        startCrossfade();
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      if (timeoutRef.current != null) window.clearTimeout(timeoutRef.current);
    };
  }, [fromRect, reducedMotion, onArrive, onComplete]);

  if (!fromRect) return null;

  const isCrossfading = phase === "crossfading";

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] bg-[#070707]"
      style={{
        opacity: isCrossfading ? 0 : 1,
        transition: reducedMotion ? "none" : "opacity 650ms ease-in-out",
      }}
      aria-busy={!isCrossfading}
      aria-live="polite"
    >
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,5,0.95)_0%,rgba(5,5,5,0.72)_16%,rgba(5,5,5,0.10)_44%,rgba(5,5,5,0.20)_60%,rgba(5,5,5,0.58)_78%,rgba(5,5,5,0.92)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_63%_18%,rgba(255,91,32,0.18),transparent_18%),radial-gradient(circle_at_61%_50%,rgba(255,35,0,0.06),transparent_24%)]" />

      <img
        ref={cloneRef}
        src={portrait}
        alt=""
        className="pointer-events-none fixed object-cover object-center"
        style={{
          left: fromRect.left,
          top: fromRect.top,
          width: fromRect.width,
          height: fromRect.height,
        }}
      />

      {!reducedMotion && (
        <div className="absolute bottom-8 left-1/2 z-10 w-[min(18rem,70vw)] -translate-x-1/2">
          <div className="mb-2 text-center text-xs tracking-wide text-white/45">
            Returning to start
          </div>
          <div className="h-[2px] overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-[#ff5a0a]"
              style={{ width: `${Math.round(progress * 100)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

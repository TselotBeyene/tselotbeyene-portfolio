import { useEffect, useRef, useState } from "react";
import portrait from "../assets/tselot_b.png";
import { easeInOutCubic, getHandoffDurations } from "../utils/motion";
import { getHeroPortraitRect } from "../utils/heroPortraitLayout";

const FADE_MS = 340;

function lerpRect(from, to, t) {
  return {
    left: from.left + (to.left - from.left) * t,
    top: from.top + (to.top - from.top) * t,
    width: from.width + (to.width - from.width) * t,
    height: from.height + (to.height - from.height) * t,
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
  const [phase, setPhase] = useState("scrolling");

  useEffect(() => {
    const clone = cloneRef.current;
    if (!clone || !fromRect) return;

    const toRect = getHeroPortraitRect();
    const { scroll, fade } = getHandoffDurations(reducedMotion);
    const scrollStart = window.scrollY;

    const finishHandoff = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      applyRect(clone, toRect);
      onArrive?.();
      setPhase("crossfading");

      if (fade === 0) {
        onComplete();
        return;
      }

      timeoutRef.current = window.setTimeout(onComplete, fade);
    };

    if (scroll === 0) {
      finishHandoff();
      return;
    }

    applyRect(clone, fromRect);

    const t0 = performance.now();
    const needsNudge =
      Math.abs(fromRect.left - toRect.left) > 2 ||
      Math.abs(fromRect.top - toRect.top) > 2 ||
      Math.abs(fromRect.width - toRect.width) > 2 ||
      Math.abs(fromRect.height - toRect.height) > 2;

    const tick = (now) => {
      const t = Math.min(1, (now - t0) / scroll);
      const eased = easeInOutCubic(t);

      window.scrollTo({
        top: scrollStart * (1 - eased),
        left: 0,
        behavior: "instant",
      });

      if (needsNudge) {
        const nudgeT = Math.min(1, eased * 1.15);
        applyRect(clone, lerpRect(fromRect, toRect, nudgeT));
      } else {
        applyRect(clone, fromRect);
      }

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        finishHandoff();
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
      className="pointer-events-none fixed inset-0 z-[9999] bg-[var(--color-bg-base)]"
      style={{
        opacity: isCrossfading ? 0 : 1,
        transition: reducedMotion ? "none" : `opacity ${FADE_MS}ms ease-in-out`,
      }}
      aria-busy={!isCrossfading}
      aria-live="polite"
    >
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,5,5,0.95)_0%,rgba(5,5,5,0.72)_16%,rgba(5,5,5,0.10)_44%,rgba(5,5,5,0.20)_60%,rgba(5,5,5,0.58)_78%,rgba(5,5,5,0.92)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_63%_18%,var(--color-glow-primary),transparent_18%),radial-gradient(circle_at_61%_50%,var(--color-glow-secondary),transparent_24%)]" />

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
    </div>
  );
}

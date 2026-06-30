import { useEffect, useRef, useState } from "react";
import portrait from "../assets/tselot_b.png";

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

// Where the hero portrait rests at the top of the page (progress 0).
// Mirrors the CSS in HeroPortrait: container is centered, h-[100vh],
// w-[32vw] (clamped 360..520), translated up by 280px, scale 1.
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

export default function PortraitHandoff({ fromRect, onArrive, onComplete }) {
  const cloneRef = useRef(null);
  const rafRef = useRef(null);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const clone = cloneRef.current;
    if (!clone || !fromRect) return;

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    const start = () => {
      const toRect = computeHeroRect();
      const duration = 700;
      const t0 = performance.now();

      const tick = (now) => {
        const t = Math.min(1, (now - t0) / duration);
        const eased = easeOutCubic(t);

        const x = fromRect.left + (toRect.left - fromRect.left) * eased;
        const y = fromRect.top + (toRect.top - fromRect.top) * eased;
        const w = fromRect.width + (toRect.width - fromRect.width) * eased;
        const h = fromRect.height + (toRect.height - fromRect.height) * eased;

        clone.style.left = `${x}px`;
        clone.style.top = `${y}px`;
        clone.style.width = `${w}px`;
        clone.style.height = `${h}px`;

        if (t < 1) {
          rafRef.current = requestAnimationFrame(tick);
        } else {
          // portrait has arrived at the hero spot: reveal the real first page
          // underneath, then crossfade this overlay away so nothing pops in.
          onArrive?.();
          requestAnimationFrame(() => setFading(true));
          setTimeout(onComplete, 520);
        }
      };

      rafRef.current = requestAnimationFrame(tick);
    };

    requestAnimationFrame(() => requestAnimationFrame(start));

    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [fromRect, onArrive, onComplete]);

  if (!fromRect) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] bg-[#070707]"
      style={{
        opacity: fading ? 0 : 1,
        transition: "opacity 500ms ease",
      }}
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
    </div>
  );
}

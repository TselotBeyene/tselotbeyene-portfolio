import { useEffect, useMemo, useRef, useState } from "react";
import HeroLeft from "./HeroLeft";
import HeroRight from "./HeroRight";
import IntroSection from "./IntroSection";
import HeroPortrait from "./HeroPortrait";

function clamp(value, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max);
}

function mapRange(value, inMin, inMax, outMin, outMax) {
  const t = clamp((value - inMin) / (inMax - inMin));
  return outMin + (outMax - outMin) * t;
}

function ScrollScene({ heroHidden = false }) {
  const sceneRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = sceneRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = clamp(-rect.top, 0, total);
      const next = total > 0 ? scrolled / total : 0;
      targetRef.current = next;
    };

    const tick = () => {
      currentRef.current += (targetRef.current - currentRef.current) * 0.12;

      if (Math.abs(targetRef.current - currentRef.current) < 0.0005) {
        currentRef.current = targetRef.current;
      }

      setProgress(currentRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const styles = useMemo(() => {
    const heroOpacity = mapRange(progress, 0.14, 0.34, 1, 0);
    const heroY = mapRange(progress, 0.12, 0.38, 0, -120);

    const imageScale = mapRange(progress, 0, 0.82, 1, 2.5);
    const imageX = mapRange(progress, 0.34, 0.9, 0, 520);
    const imageY = -280;

    const introEnterOpacity = mapRange(progress, 0.2, 0.32, 0, 1);
    const introExitOpacity = 1 - mapRange(progress, 0.92, 0.99, 0, 1);
    const introOpacity = introEnterOpacity * introExitOpacity;
    // Enter from below, then stay put while reading, only exit near the end.
    const introEnterY = mapRange(progress, 0.2, 0.32, 70, 0);
    const introExitY = mapRange(progress, 0.9, 1, 0, -160);
    const introY = introEnterY + introExitY;

    const imageDimOpacity = mapRange(progress, 0.3, 0.62, 0.08, 0.82);
    const blackStageOpacity = mapRange(progress, 0.32, 0.62, 0, 0.9);
    // Long reading window so each word has enough scroll distance.
    const readingProgress = mapRange(progress, 0.3, 0.9, 0, 1);

    return {
      heroOpacity,
      heroY,
      imageScale,
      imageX,
      imageY,
      introOpacity,
      introY,
      imageDimOpacity,
      blackStageOpacity,
      readingProgress,
    };
  }, [progress]);

  return (
    <section ref={sceneRef} className="relative h-[1000vh] bg-[var(--color-bg-base)]">
      <div className="sticky top-0 h-screen overflow-hidden bg-[var(--color-bg-base)]">
        <div className="absolute inset-0 z-0 bg-[var(--color-bg-base)]" />

        <div
          className="absolute inset-0 z-[1] overflow-hidden"
          style={{ opacity: heroHidden ? 0 : 1 }}
        >
          <HeroPortrait
            imageX={styles.imageX}
            imageY={styles.imageY}
            imageScale={styles.imageScale}
            imgId="hero-portrait"
          />
        </div>

        <div className="absolute inset-0 z-[2] bg-[linear-gradient(90deg,rgba(5,5,5,0.95)_0%,rgba(5,5,5,0.72)_16%,rgba(5,5,5,0.10)_44%,rgba(5,5,5,0.20)_60%,rgba(5,5,5,0.58)_78%,rgba(5,5,5,0.92)_100%)]" />

        <div className="absolute inset-0 z-[2] bg-[radial-gradient(circle_at_63%_18%,var(--color-glow-primary),transparent_18%),radial-gradient(circle_at_61%_50%,var(--color-glow-secondary),transparent_24%)]" />

        <div
          className="absolute inset-0 z-[3] bg-[rgba(5,5,5,0.78)]"
          style={{ opacity: styles.imageDimOpacity }}
        />

        <div
          className="absolute inset-0 z-[4] bg-[var(--color-bg-deep)]"
          style={{ opacity: styles.blackStageOpacity }}
        />

        <div
          className="absolute inset-0 z-10"
          style={{
            opacity: styles.heroOpacity,
            transform: `translateY(${styles.heroY}px)`,
          }}
        >
          <div className="flex h-full">
            <div className="w-[58%]">
              <HeroLeft />
            </div>

            <div className="ml-auto w-[28%] min-w-[300px] max-w-[430px] pl-0 pr-8 lg:pr-14">
              <HeroRight />
            </div>
          </div>
        </div>

        <div
          className="absolute inset-0 z-20"
          style={{
            opacity: styles.introOpacity,
            transform: `translateY(${styles.introY}px)`,
            pointerEvents: styles.introOpacity > 0.2 ? "auto" : "none",
          }}
        >
          <IntroSection progress={styles.readingProgress} />
        </div>
      </div>
    </section>
  );
}

export default ScrollScene;
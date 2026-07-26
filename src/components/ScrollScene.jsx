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

/** Hermite smoothstep — stable for scroll-linked motion. */
function smoothstep(t) {
  const x = clamp(t);
  return x * x * (3 - 2 * x);
}

function roundTo(value, steps = 1000) {
  return Math.round(value * steps) / steps;
}

function getCameraStyles(progress, isMobile, viewportWidth) {
  const cameraT = smoothstep(mapRange(progress, 0, 0.58, 0, 1));

  // Phones start larger and sit lower so the face clears the title.
  const isPhone = isMobile && viewportWidth < 640;
  const scaleFrom = isPhone ? 0.98 : isMobile ? 0.72 : 1.18;
  const scaleTo = isMobile ? 2.2 : 2.55;
  const imageScale = roundTo(scaleFrom + (scaleTo - scaleFrom) * cameraT);

  const panTo = isMobile
    ? viewportWidth * 0.68
    : Math.max(viewportWidth * 0.52, 580);
  const imageX = roundTo(panTo * cameraT, 100);
  const imageYBase = isPhone ? 72 : isMobile ? -40 : -280;
  const imageY = roundTo(imageYBase - 24 * cameraT, 100);

  const heroOpacity = 1 - smoothstep(mapRange(progress, 0.06, 0.36, 0, 1));
  const heroY = roundTo(-160 * smoothstep(mapRange(progress, 0.04, 0.4, 0, 1)), 100);

  const imageDimOpacity = 0.08 + 0.82 * smoothstep(mapRange(progress, 0.18, 0.42, 0, 1));
  const blackStageOpacity = smoothstep(mapRange(progress, 0.24, 0.44, 0, 1)) * 0.96;
  const imageOpacity = 1 - smoothstep(mapRange(progress, 0.32, 0.52, 0, 1));

  const introEnterOpacity = smoothstep(mapRange(progress, 0.28, 0.42, 0, 1));
  const introExitOpacity = 1 - mapRange(progress, 0.92, 1, 0, 1);
  const introOpacity = introEnterOpacity * introExitOpacity;
  const introEnterY = mapRange(progress, 0.28, 0.42, 48, 0);
  const introExitY = mapRange(progress, 0.9, 1, 0, -120);
  const introY = roundTo(introEnterY + introExitY, 100);

  const readingProgress = mapRange(progress, 0.38, 0.9, 0, 1);

  return {
    heroOpacity,
    heroY,
    imageScale,
    imageX,
    imageY,
    imageOpacity,
    introOpacity,
    introY,
    imageDimOpacity,
    blackStageOpacity,
    readingProgress,
  };
}

function ScrollScene({ heroHidden = false }) {
  const sceneRef = useRef(null);
  const panRef = useRef(null);
  const scaleRef = useRef(null);
  const layerRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1280,
  );
  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const rafRef = useRef(0);
  const uiBucketRef = useRef(-1);
  const isMobileRef = useRef(false);
  const viewportWidthRef = useRef(viewportWidth);

  useEffect(() => {
    const syncViewport = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      isMobileRef.current = mobile;
      setViewportWidth(window.innerWidth);
      viewportWidthRef.current = window.innerWidth;
    };
    syncViewport();
    window.addEventListener("resize", syncViewport);
    return () => window.removeEventListener("resize", syncViewport);
  }, []);

  useEffect(() => {
    const applyPortrait = (styles) => {
      if (panRef.current) {
        panRef.current.style.transform = `translate3d(-50%, -50%, 0) translate3d(${styles.imageX}px, ${styles.imageY}px, 0)`;
      }
      if (scaleRef.current) {
        scaleRef.current.style.transform = `scale(${styles.imageScale})`;
      }
      if (layerRef.current) {
        layerRef.current.style.opacity = heroHidden ? "0" : String(styles.imageOpacity);
      }
    };

    const handleScroll = () => {
      const el = sceneRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = clamp(-rect.top, 0, total);
      targetRef.current = total > 0 ? scrolled / total : 0;
    };

    const tick = () => {
      currentRef.current += (targetRef.current - currentRef.current) * 0.16;

      if (Math.abs(targetRef.current - currentRef.current) < 0.00035) {
        currentRef.current = targetRef.current;
      }

      const p = currentRef.current;
      const styles = getCameraStyles(p, isMobileRef.current, viewportWidthRef.current);

      // Portrait updates on the compositor path — no React re-render per frame.
      applyPortrait(styles);

      // Fine bucket → intro/hero translate stays sub-pixel smooth while scrolling.
      const bucket = Math.round(p * 1000);
      if (bucket !== uiBucketRef.current) {
        uiBucketRef.current = bucket;
        setProgress(p);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    handleScroll();
    applyPortrait(getCameraStyles(0, isMobileRef.current, viewportWidthRef.current));
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, [heroHidden]);

  const styles = useMemo(
    () => getCameraStyles(progress, isMobile, viewportWidth),
    [progress, isMobile, viewportWidth],
  );

  return (
    <section
      ref={sceneRef}
      className="relative bg-[var(--color-bg-base)]"
      style={{ height: isMobile ? "780vh" : "1000vh" }}
    >
      <div className="sticky top-0 h-[100dvh] overflow-hidden bg-[var(--color-bg-base)] lg:h-screen">
        <div className="absolute inset-0 z-0 bg-[var(--color-bg-base)]" />

        <div ref={layerRef} className="absolute inset-0 z-[1] overflow-hidden">
          <HeroPortrait
            panRef={panRef}
            scaleRef={scaleRef}
            imageX={styles.imageX}
            imageY={styles.imageY}
            imageScale={styles.imageScale}
            imgId="hero-portrait"
          />
        </div>

        <div className="pointer-events-none absolute inset-0 z-[2] hidden bg-[linear-gradient(90deg,rgba(5,5,5,0.95)_0%,rgba(5,5,5,0.72)_16%,rgba(5,5,5,0.10)_44%,rgba(5,5,5,0.20)_60%,rgba(5,5,5,0.58)_78%,rgba(5,5,5,0.92)_100%)] lg:block" />
        <div className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(180deg,rgba(5,5,5,0.55)_0%,rgba(5,5,5,0.08)_22%,rgba(5,5,5,0.05)_48%,rgba(5,5,5,0.55)_72%,rgba(5,5,5,0.96)_100%)] lg:hidden" />

        <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(circle_at_63%_18%,var(--color-glow-primary),transparent_18%),radial-gradient(circle_at_61%_50%,var(--color-glow-secondary),transparent_24%)]" />

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
            transform: `translate3d(0, ${styles.heroY}px, 0)`,
            pointerEvents: styles.heroOpacity < 0.05 ? "none" : "auto",
          }}
        >
          <div className="flex h-full flex-col lg:flex-row">
            <div className="min-h-0 w-full flex-1 lg:w-[58%]">
              <HeroLeft />
            </div>

            <div className="ml-auto hidden w-[28%] min-w-0 max-w-[430px] pl-0 pr-8 lg:block lg:min-w-[280px] lg:pr-14">
              <HeroRight />
            </div>
          </div>
        </div>

        <div
          className="pointer-events-none absolute inset-0 z-20"
          style={{
            opacity: styles.introOpacity,
            transform: `translate3d(0, ${styles.introY}px, 0)`,
          }}
        >
          <IntroSection progress={styles.readingProgress} />
        </div>
      </div>
    </section>
  );
}

export default ScrollScene;

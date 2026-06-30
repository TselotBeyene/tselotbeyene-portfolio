import { useCallback, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import ScrollScene from "./components/ScrollScene";
import CrossBannerSection from "./components/CrossBannersSection";
import ProjectsSection from "./components/ProjectsSection";
import TestimonialsSection from "./components/TestimonialSection";
import FooterTransition from "./components/FooterTransition";
import PortraitHandoff from "./components/PortraitHandoff";

function App() {
  const [handoffRect, setHandoffRect] = useState(null);
  const [heroHidden, setHeroHidden] = useState(false);
  const resetFooterRef = useRef(null);

  const handleLoopHandoff = useCallback((resetFooter) => {
    const footerEl = document.getElementById("footer-portrait");
    if (!footerEl) {
      resetFooter();
      return;
    }

    resetFooterRef.current = resetFooter;
    setHeroHidden(true);
    setHandoffRect(footerEl.getBoundingClientRect());
  }, []);

  const handleHandoffArrive = useCallback(() => {
    // portrait reached the hero spot: reset the footer and reveal the real
    // first page underneath the overlay so it can crossfade in.
    resetFooterRef.current?.();
    resetFooterRef.current = null;
    setHeroHidden(false);
  }, []);

  const handleHandoffComplete = useCallback(() => {
    setHandoffRect(null);
  }, []);

  return (
    <div className="bg-[#070707] text-white">
      <Navbar />

      <ScrollScene heroHidden={heroHidden} />
      <CrossBannerSection />
      <ProjectsSection />
      <TestimonialsSection />

      <FooterTransition
        onLoopHandoff={handleLoopHandoff}
        handoffActive={handoffRect != null}
      />

      {handoffRect && (
        <PortraitHandoff
          fromRect={handoffRect}
          onArrive={handleHandoffArrive}
          onComplete={handleHandoffComplete}
        />
      )}
    </div>
  );
}

export default App;

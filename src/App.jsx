import { useCallback, useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import ScrollScene from "./components/ScrollScene";
import CrossBannerSection from "./components/CrossBannersSection";
import ProjectsSection from "./components/ProjectsSection";
import TestimonialsSection from "./components/TestimonialSection";
import FooterTransition from "./components/FooterTransition";
import PortraitHandoff from "./components/PortraitHandoff";
import ProjectPage from "./components/ProjectPage";
import useReducedMotion from "./hooks/useReducedMotion";
import { getProjectBySlug, projects } from "./data/projects";

function App() {
  const reducedMotion = useReducedMotion();
  const [handoffRect, setHandoffRect] = useState(null);
  const [heroHidden, setHeroHidden] = useState(false);
  const [pathname, setPathname] = useState(window.location.pathname);
  const resetFooterRef = useRef(null);

  const navigateTo = useCallback((nextPath) => {
    if (nextPath !== window.location.pathname) {
      window.history.pushState({}, "", nextPath);
      setPathname(nextPath);
    } else {
      setPathname(nextPath);
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    const onPopState = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

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
    setHeroHidden(false);
  }, []);

  const handleHandoffComplete = useCallback(() => {
    resetFooterRef.current?.();
    resetFooterRef.current = null;
    setHandoffRect(null);
  }, []);

  const currentProject =
    pathname.startsWith("/projects/")
      ? getProjectBySlug(pathname.replace("/projects/", ""))
      : null;

  const currentProjectIndex = currentProject
    ? projects.findIndex((project) => project.slug === currentProject.slug)
    : -1;

  const previousProject =
    currentProjectIndex > 0 ? projects[currentProjectIndex - 1] : null;
  const nextProject =
    currentProjectIndex >= 0 && currentProjectIndex < projects.length - 1
      ? projects[currentProjectIndex + 1]
      : null;

  return (
    <div className="bg-[#070707] text-white">
      <Navbar
        onNavigateHome={() => navigateTo("/")}
        onNavigateProjects={() => navigateTo("/")}
        isProjectPage={Boolean(currentProject)}
      />

      {currentProject ? (
        <ProjectPage
          project={currentProject}
          previousProject={previousProject}
          nextProject={nextProject}
          onNavigateHome={() => navigateTo("/")}
          onNavigateProject={(slug) => navigateTo(`/projects/${slug}`)}
        />
      ) : (
        <>
          <ScrollScene heroHidden={heroHidden} />
          <CrossBannerSection />
          <ProjectsSection
            onOpenProject={(slug) => navigateTo(`/projects/${slug}`)}
          />
          <TestimonialsSection />

          <FooterTransition
            onLoopHandoff={handleLoopHandoff}
            handoffActive={handoffRect != null}
            reducedMotion={reducedMotion}
          />
        </>
      )}

      {handoffRect && (
        <PortraitHandoff
          fromRect={handoffRect}
          reducedMotion={reducedMotion}
          onArrive={handleHandoffArrive}
          onComplete={handleHandoffComplete}
        />
      )}
    </div>
  );
}

export default App;

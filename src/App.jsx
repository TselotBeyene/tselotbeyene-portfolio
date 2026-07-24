import { useCallback, useEffect, useRef, useState } from "react";
import Navbar from "./components/Navbar";
import ScrollScene from "./components/ScrollScene";
import CrossBannerSection from "./components/CrossBannersSection";
import ProjectsSection from "./components/ProjectsSection";
import TestimonialsSection from "./components/TestimonialSection";
import ProjectPage from "./components/ProjectPage";
import AskMeAnythingPage from "./components/AskMeAnythingPage";
import DotCursor from "./components/DotCursor";
import { CursorProvider } from "./context/CursorContext";
import { getProjectBySlug, projects } from "./data/projects";

function App() {
  const [pathname, setPathname] = useState(window.location.pathname);
  const pendingScrollRef = useRef(null);

  const navigateTo = useCallback((nextPath) => {
    pendingScrollRef.current = null;
    if (nextPath !== window.location.pathname) {
      window.history.pushState({}, "", nextPath);
      setPathname(nextPath);
    } else {
      setPathname(nextPath);
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  const scrollToId = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return true;
    }
    return false;
  }, []);

  const scrollToProjects = useCallback(() => {
    if (window.location.pathname !== "/" || pathname !== "/") {
      pendingScrollRef.current = "projects";
      window.history.pushState({}, "", "/");
      setPathname("/");
      return;
    }

    scrollToId("projects");
  }, [pathname, scrollToId]);

  const openMail = useCallback(() => {
    // Programmatic mailto click avoids navigating the current SPA tab to about:blank
    // (common with plain <a href="mailto:"> in some browsers / in-app webviews).
    const anchor = document.createElement("a");
    anchor.href = "mailto:tselotbeyene70@gmail.com";
    anchor.style.display = "none";
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  }, []);

  useEffect(() => {
    const onPopState = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const isAskPage =
    pathname === "/ask" || pathname === "/ask-me-anything";

  const currentProject =
    !isAskPage && pathname.startsWith("/projects/")
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

  const isHome = !currentProject && !isAskPage;

  // Land at top on home, unless Projects asked to jump to a section.
  useEffect(() => {
    if (!isHome) return;
    window.history.scrollRestoration = "manual";

    const target = pendingScrollRef.current;
    pendingScrollRef.current = null;

    if (target) {
      // Defer until home sections are painted.
      const id = window.setTimeout(() => {
        scrollToId(target);
      }, 50);
      return () => window.clearTimeout(id);
    }

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [isHome, scrollToId]);

  return (
    <CursorProvider>
      <div className="bg-[var(--color-bg-base)] text-white">
        <DotCursor />
        <Navbar
          onNavigateHome={() => navigateTo("/")}
          onNavigateProjects={scrollToProjects}
          onNavigateAsk={() => navigateTo("/ask")}
          onNavigateTalk={openMail}
          isProjectPage={Boolean(currentProject)}
          isAskPage={isAskPage}
        />

        {isAskPage ? (
          <AskMeAnythingPage />
        ) : currentProject ? (
          <ProjectPage
            project={currentProject}
            previousProject={previousProject}
            nextProject={nextProject}
            onNavigateHome={() => navigateTo("/")}
            onNavigateProject={(slug) => navigateTo(`/projects/${slug}`)}
          />
        ) : (
          <>
            <ScrollScene heroHidden={false} />
            <CrossBannerSection />
            <ProjectsSection
              onOpenProject={(slug) => navigateTo(`/projects/${slug}`)}
            />
            <TestimonialsSection />
            <AskMeAnythingPage />
          </>
        )}
      </div>
    </CursorProvider>
  );
}

export default App;

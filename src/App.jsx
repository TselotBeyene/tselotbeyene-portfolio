import { useCallback, useEffect, useState } from "react";
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

  // Always land at the top when opening the home experience.
  useEffect(() => {
    if (!isHome) return;
    window.history.scrollRestoration = "manual";
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [isHome]);

  return (
    <CursorProvider>
      <div className="bg-[var(--color-bg-base)] text-white">
        <DotCursor />
        <Navbar
          onNavigateHome={() => navigateTo("/")}
          onNavigateProjects={() => navigateTo("/")}
          onNavigateAsk={() => navigateTo("/ask")}
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

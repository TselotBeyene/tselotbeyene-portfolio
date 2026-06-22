import { useState } from "react";
import Navbar from "./components/Navbar";
import ScrollScene from "./components/ScrollScene";
import CrossBannerSection from "./components/CrossBannersSection";
import ProjectsSection from "./components/ProjectsSection";
import TestimonialsSection from "./components/TestimonialSection";
import FooterTransition from "./components/FooterTransition";

function App() {
  const [isLooping, setIsLooping] = useState(false);

  return (
    <div className="bg-[#070707] text-white">
      <Navbar />

      {!isLooping && (
        <>
          <ScrollScene />
          <CrossBannerSection />
          <ProjectsSection />
          <TestimonialsSection />
        </>
      )}

      <FooterTransition
        isLooping={isLooping}
        setIsLooping={setIsLooping}
      />
    </div>
  );
}

export default App;
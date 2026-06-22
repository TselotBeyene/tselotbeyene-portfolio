import {useEffect, useState } from "react";
import subjectImg from "../assets/Subject.png";
import secondImg from "../assets/tselot_b.png";

export default function FooterTransition({ isLooping, setIsLooping }) {
  
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    if (isLooping) {
      window.scrollTo(0, 0);
  
      const timer = setTimeout(() => {
        setProgress(0);
        setIsLooping(false);
      }, 50);
  
      return () => clearTimeout(timer);
    }
  }, [isLooping, setIsLooping]);

const handleWheel = (e) => {
  e.preventDefault();

  setProgress((prev) => {
    const next = prev + e.deltaY * 0.0003;

    if (next >= 3) {
      setIsLooping(true);
    }

    return Math.min(3, Math.max(0, next));
  });
};
  // progress split
  const introProgress = Math.min(progress, 1);
  const imageProgress = Math.max(0, progress - 1);

  // orange becomes black during intro
  const orangeText = progress > 7.8 ? "#ea580c" : "#000000";

  // FIRST IMAGE
  const scale = 0.7 + imageProgress * 1.5;
  const x = imageProgress * 1100;
  const blur =
    imageProgress > 1.2 ? (imageProgress - 1.2) * 10 : 0;

  // SECOND IMAGE
  const secondProgress = Math.min(
    1,
    Math.max(0, (imageProgress - 0.1) / 1)
  );

  const secondScale = 0.3 + secondProgress * 1.9;
  const secondOpacity = secondProgress;
  const secondY = 100 - secondProgress * 300;

  return (
    <section
      onWheel={handleWheel}
      className="relative h-screen bg-black overflow-hidden"
    >
      {/* BACKGROUND */}
      <div
        className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_110%_75%_at_50%_-15%,rgba(5,8,11,0.95)_0%,rgba(5,8,11,0.85)_35%,rgba(5,8,11,0.4)_55%,rgba(5,8,11,0)_70%),linear-gradient(to_bottom,#0b0f12_0%,#1a0c08_20%,#4a160c_35%,#e34813_55%,#f58b3a_72%,#fff7ef_100%)]"
        style={{
          transform: `translateY(${Math.min(introProgress * 220, 100)}%)`,
        }}
      />

      {/* CONTENT */}
      <div className="pointer-events-none absolute inset-0 z-10 px-10 py-8 text-black">
        
        {/* LEFT SIDE */}
        <div className="absolute left-10 top-[20vh] space-y-16 text-sm">
          <div>
            <h3 className="mb-3 font-bold">Socials</h3>
            <p style={{ color: orangeText }} className="font-semibold">LinkedIn</p>
            <p style={{ color: orangeText }} className="font-semibold">Dribbble</p>
            <p style={{ color: orangeText }} className="font-semibold">Twitter/X</p>
          </div>

          <div>
            <h3 className="mb-3 font-bold">Contact me</h3>
            <p style={{ color: orangeText }} className="font-semibold">Email</p>
            <p style={{ color: orangeText }} className="font-semibold">WhatsApp</p>
            <p style={{ color: orangeText }} className="font-semibold">Telegram</p>
          </div>

          <div>
            <p className="text-black/40 mb-2">Got a project in mind?</p>
            <h2 className="text-3xl leading-tight max-w-[280px]">
              Let's make something happen together
            </h2>
          </div>
        </div>

        {/* RIGHT TEXT */}
        <div className="absolute right-16 top-[40vh] max-w-[600px]">
          <h1 className="text-4xl mb-10 leading-tight">
            As a designer and Rotarian, I believe in service above self.
          </h1>

          <p className="text-4xl leading-tight">
            Being a designer is about serving user needs. It’s dedicating
            yourself to finding the right balance between user needs and
            business goals.
          </p>
        </div>

        {/* MOVING EMAIL */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 overflow-hidden">
          <div className="w-max whitespace-nowrap animate-[footerMarquee_18s_linear_infinite] text-[8rem] font-medium leading-none tracking-[-0.08em] text-black/95 md:text-[10rem] lg:text-[12rem]">
            <span className="mr-10">hello</span>
            <span style={{ color: orangeText }} className="mr-10">@</span>
            <span className="mr-16">tselotbeyene</span>

            <span className="mr-10">hello</span>
            <span style={{ color: orangeText }} className="mr-10">@</span>
            <span className="mr-16">tselotbeyene</span>
          </div>
        </div>

        {/* FIRST IMAGE */}
        <img
          src={subjectImg}
          alt="Subject"
          style={{
            transform: `translateX(calc(-50% + ${x}px)) scale(${scale})`,
            filter: `blur(${blur}px)`,
          }}
          className="pointer-events-none absolute bottom-[2vh] left-[40%] z-40 h-[85vh]"
        />

        {/* SECOND IMAGE */}
        <img
          src={secondImg}
          alt="Second"
          style={{
            transform: `translateY(${secondY}px) scale(${secondScale})`,
            opacity: secondOpacity,
          }}
          className="pointer-events-none absolute bottom-[25vh] left-[35%] z-20 h-[60vh] -translate-x-1/2 origin-center transition-all duration-300 ease-out"
        />
      </div>
    </section>
  );
}
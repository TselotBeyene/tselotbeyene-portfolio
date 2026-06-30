import {
    motion,
    useTransform,
    useMotionTemplate,
    useMotionValue,
  } from "framer-motion";
  import { useRef } from "react";
  import tselot from "../assets/Subject.png";
  import newImage from "../assets/tselot_b.png";

  export default function GradientTransition() {
    const sectionRef = useRef(null);
  
    const progress = useMotionValue(0);
  
    const handleWheel = (e) => {
      e.preventDefault();
  
      const next = Math.min(
        1,
        Math.max(0, progress.get() + e.deltaY * 0.00015)
      );
  
      progress.set(next);
    };
  
    // DARK OVERLAY HAPPENS FIRST
    const overlayOpacity = useTransform(progress, [0, 1], [0, 1]);
  
    // IMAGE ZOOMS AFTER SCREEN IS DARK
    const scale = useTransform(progress, [0.35, 1.8], [1, 3.2]);
    const x = useTransform(progress, [0.35, 1.8], [0, 3100]);
    const y = useTransform(progress, [0.35, 1.8], [0, -10]);
  
    const blurValue = useTransform(progress, [0.85, 1], [0, 18]);
    const blurFilter = useMotionTemplate`blur(${blurValue}px)`;
  
    // TEXT FADES OUT AS DARKNESS COMES IN
    const textOpacity = useTransform(progress, [0.05, 0.3], [1, 0]);
    const textY = useTransform(progress, [0.05, 0.3], [0, 30]);

    // SECOND IMAGE ENTERS FROM LEFT INTO THE ORIGINAL IMAGE POSITION
    const secondImageOpacity = useTransform(progress, [0.22, 0.38], [0, 1]);
    const secondImageScale = useTransform(progress, [0.22, 0.95], [0.18, 1.25]);
    const secondImageX = useTransform(progress, [0.26, 0.95], [0, 0]);
    const secondImageY = useTransform(progress, [0.26, 0.95], [0, -120]);


    const glowOpacity = useTransform(progress, [0.18, 0.38], [0, 1]);

    return (
      <section
        ref={sectionRef}
        onWheel={handleWheel}
        className="relative h-screen w-full overflow-hidden text-[#1a1a1a]"
      >
        {/* BACKGROUND */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#050505_0%,#120404_18%,#4e0f0b_34%,#8a1d0f_48%,#cf4a14_62%,#f58522_76%,#f4c98f_88%,#f5eee7_100%)]" />
  
          <div
            className="absolute left-1/2 top-[-34%] h-[72vh] w-[145%] -translate-x-1/2 blur-[26px]"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(0,0,0,1) 0%, rgba(0,0,0,0.98) 38%, rgba(0,0,0,0.88) 54%, rgba(0,0,0,0.58) 68%, rgba(0,0,0,0.2) 82%, rgba(0,0,0,0) 100%)",
            }}
          />
  
          <div className="absolute inset-x-[-10%] top-0 h-[45vh] rounded-b-[150%] bg-black/70 blur-2xl" />
  
          <div className="absolute inset-0 opacity-[0.04] mix-blend-multiply [background-image:radial-gradient(rgba(0,0,0,0.38)_0.7px,transparent_0.7px)] [background-size:5px_5px]" />
        </div>
  
        {/* CONTENT */}
        <motion.div
          style={{ opacity: textOpacity, y: textY }}
          className="relative z-30 grid h-screen w-full grid-cols-12 gap-16 px-[6vw] pb-[18vh] pt-[14vh]"
        >
          {/* LEFT COLUMN */}
          <div className="col-span-3 flex flex-col justify-end pb-0">
            <div>
              <p className="mb-6 text-[13px] text-black/45">Good morning!</p>
  
              <div className="mb-10">
                <p className="mb-3 text-[14px] font-medium text-black">Socials</p>
                <ul className="space-y-1 text-[14px]">
                  <li className="cursor-pointer text-[#ff4d00]">LinkedIn</li>
                  <li className="cursor-pointer text-[#ff4d00]">Dribbble</li>
                  <li className="cursor-pointer text-[#ff4d00]">Twitter/X</li>
                </ul>
              </div>
  
              <div>
                <p className="mb-3 text-[14px] font-medium text-black">
                  Contact me
                </p>
                <ul className="space-y-1 text-[14px]">
                  <li className="cursor-pointer text-[#ff4d00]">Email</li>
                  <li className="cursor-pointer text-[#ff4d00]">WhatsApp</li>
                  <li className="cursor-pointer text-[#ff4d00]">Telegram</li>
                </ul>
              </div>
            </div>
  
            <div className="mt-16 border-t border-black/10 pt-10">
              <p className="mb-2 text-[13px] text-black/35">
                Got a project in mind?
              </p>
              <h2 className="text-[28px] font-medium leading-[1.3] text-black">
                Let's make something
                <br />
                happen together
              </h2>
            </div>
          </div>
  
          {/* CENTER */}
          <div className="col-span-4" />
  
          {/* RIGHT TEXT */}
          <div className="relative z-20 col-span-5 flex flex-col justify-end pb-0">
            <h2 className="mb-8 max-w-[620px] text-[30px] font-medium leading-[1.4] text-[#222]">
              As a designer and Rotarian, I believe in service above self.
            </h2>
  
            <p className="max-w-[640px] text-[20px] leading-[1.7] text-[#555]">
              Being a designer is about serving user needs. It’s dedicating
              yourself to finding the right balance between user needs and
              business goals.
            </p>
          </div>
        </motion.div>
  
        {/* DARK OVERLAY */}
        <motion.div
          className="pointer-events-none absolute inset-0 bg-black"
          style={{
            opacity: overlayOpacity,
            zIndex: 35,
          }}
        />
        {/* IMAGE */}
        <div className="pointer-events-none absolute bottom-[2vh] left-[43%] z-40 -translate-x-1/2">
          <motion.img
            src={tselot}
            alt="person"
            style={{
              scale,
              x,
              y,
              filter: blurFilter,
              transformOrigin: "bottom center",
            }}
            className="block h-auto w-[25rem] max-w-none object-contain"
          />
        </div>
        {/* SECOND CINEMATIC IMAGE */}
{/* SECOND CINEMATIC IMAGE */}
<div className="pointer-events-none absolute inset-0 z-50 overflow-hidden">

  {/* SECOND IMAGE */}
  <motion.img
    src={newImage}
    alt="new person"
    style={{
      opacity: secondImageOpacity,
      scale: secondImageScale,
      x: secondImageX,
      y: secondImageY,
      transformOrigin: "center center",
    }}
    className="
      absolute left-[26%] top-[35%]
      h-[92vh] w-auto
      -translate-x-1/2 -translate-y-1/2
      select-none object-contain
      brightness-[0.78] contrast-[1.1] saturate-[0.9]
      drop-shadow-[0_40px_120px_rgba(0,0,0,0.8)]
    "
  />
</div>
  
        {/* MOVING EMAIL */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-30 overflow-hidden">
          <div className="w-max whitespace-nowrap animate-[footerMarquee_18s_linear_infinite] text-[8rem] font-medium leading-none tracking-[-0.08em] text-black/95 md:text-[10rem] lg:text-[12rem]">
            <span className="mr-10">hello</span>
            <span className="mr-10 text-[#ff4d00]">@</span>
            <span className="mr-16">tselotbeyene.com</span>
  
            <span className="mr-10">hello</span>
            <span className="mr-10 text-[#ff4d00]">@</span>
            <span className="mr-16">tselotbeyene.com</span>
          </div>
        </div>
      </section>
    );
  }
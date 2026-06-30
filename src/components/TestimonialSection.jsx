import { useEffect, useMemo, useState } from "react";

import avatar1 from "../assets/tselot.jpg";
import avatar2 from "../assets/tselot_b.jpg";
import avatar3 from "../assets/tselot3.jpg";

const testimonials = [
  {
    id: "01.",
    name: "Long (Peter) Tran",
    role: "Motion & Interaction Designer - Specialising in the UI/UX industry",
    image: avatar1,
    preview:
      "As a motion designer on her team, I've received tremendous support and inspiration from Tselot. ...",
    full: [
      "As a motion designer on her team, I've received tremendous support and inspiration from Tselot.",
      "On any given day, if there was a UI sketch on a piece of paper, it belonged to Tselot. Her deep knowledge of design is evident, and her work never fails to impress me. I've always been curious about what makes her work so distinct and beautiful. In my eyes, she is one of the finest designers on the team, known for her high-quality work.",
      "Despite her reserved nature, she's an excellent mentor with a kind heart. She's open about her failures and never brags about her successes. She always listens attentively and offers advice on not just my professional skills but also on interpersonal ones. Her sense of humor keeps our conversations incredibly engaging. We've remained friends to this day.",
      "Having Tselot on your team guarantees thoughtful collaboration and exceptional design work.",
    ],
  },
  {
    id: "02.",
    name: "Chris Azzopardi",
    role: "Chief Product Officer",
    image: avatar2,
    preview:
      "I had the pleasure of working closely with Tselot. Throughout our time together, I was consistently impressed by her exceptional design skills, strategic thinking, and unwavering...",
    full: [
      "I had the pleasure of working closely with Tselot.",
      "Throughout our time together, I was consistently impressed by her exceptional design skills, strategic thinking, and unwavering attention to quality. Tselot has a rare ability to combine strong visual taste with clear product thinking.",
      "She consistently brought calm, clarity, and depth to complex product conversations, and her design work elevated the standard of the entire team.",
    ],
  },
  {
    id: "03.",
    name: "Silvano D'Orazio",
    role: "Group Head of User Experience and Brand",
    image: avatar3,
    preview:
      "I had the distinct pleasure of working closely with Tselot over the past few years. ...",
    full: [
      "I had the distinct pleasure of working closely with Tselot over the past few years.",
      "She brought a thoughtful approach to design leadership, a sharp eye for systems, and a deep understanding of how brand and product should connect.",
      "Tselot is the kind of designer who raises the level of everyone around her.",
    ],
  },
];

function ReadCursor({ visible, x, y }) {
  return (
    <div
      className="pointer-events-none fixed left-0 top-0 z-[100] hidden lg:block"
      style={{
        transform: `translate3d(${x - 44}px, ${y - 44}px, 0)`,
        opacity: visible ? 1 : 0,
        transition: "opacity 180ms ease",
      }}
    >
      <div className="flex h-[88px] w-[88px] items-center justify-center rounded-full bg-[#ff5a0a] text-[1.05rem] font-medium text-white shadow-[0_16px_40px_rgba(0,0,0,0.3)]">
        Read
      </div>
    </div>
  );
}

function SectionHeading({ opened }) {
  return (
    <div
      className="px-6 pt-24 md:px-10 lg:px-14"
      style={{
        opacity: opened ? 0 : 1,
        transform: opened ? "translate3d(0,-30px,0)" : "translate3d(0,0,0)",
        transition: "opacity 300ms ease, transform 300ms ease",
        pointerEvents: opened ? "none" : "auto",
      }}
    >
      <p className="mb-8 text-[1.1rem] text-white/28">(Testimonials)</p>

      <div className="max-w-[90rem] leading-[0.86] tracking-[-0.09em] text-white/78">
        <div className="ml-[24%] text-[4.8rem] font-semibold md:text-[7rem] lg:text-[9rem]">
          WHAT
        </div>
        <div className="text-[4.8rem] font-semibold md:text-[7rem] lg:text-[9rem]">
          PEOPLE SAY
        </div>
        <div className="ml-[24%] flex items-end gap-5 text-[4.8rem] font-semibold md:text-[7rem] lg:text-[9rem]">
          <span>ABOUT</span>
          <span className="text-white">ME</span>
        </div>
      </div>
    </div>
  );
}

function TestimonialList({ onOpen, setCursorVisible, setCursorPos, opened }) {
  return (
    <div
      className="mt-14 px-6 pb-20 md:px-10 lg:px-14"
      style={{
        opacity: opened ? 0 : 1,
        transform: opened ? "translate3d(0,30px,0)" : "translate3d(0,0,0)",
        transition: "opacity 300ms ease, transform 300ms ease",
        pointerEvents: opened ? "none" : "auto",
      }}
    >
      <div className="border-t border-white/10">
        {testimonials.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onOpen(item)}
            onMouseEnter={() => setCursorVisible(true)}
            onMouseLeave={() => setCursorVisible(false)}
            onMouseMove={(e) => setCursorPos({ x: e.clientX, y: e.clientY })}
            className="grid w-full grid-cols-1 gap-8 border-b border-white/10 py-10 text-left transition-colors duration-300 hover:text-white md:grid-cols-[0.18fr_0.18fr_0.9fr_1.2fr] md:items-center md:gap-10"
          >
            <div className="hidden text-[2.6rem] leading-none tracking-[-0.06em] text-white/22 md:block">
              {item.id}
            </div>

            <div className="hidden md:block">
              <img
                src={item.image}
                alt={item.name}
                className="h-[102px] w-[92px] object-cover"
              />
            </div>

            <div>
              <h3 className="text-[2rem] leading-none tracking-[-0.05em] text-white/82 md:text-[3rem]">
                {item.name}
              </h3>
              <p className="mt-3 max-w-[28rem] text-[1rem] leading-7 text-white/42">
                {item.role}
              </p>
            </div>

            <div className="max-w-[42rem] text-[1.2rem] leading-[1.45] text-white/38 md:text-[1.35rem]">
              {item.preview}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function TestimonialDetail({ item, onClose }) {
  if (!item) return null;

  return (
    <div className="absolute inset-0 z-30 overflow-y-auto">
      <div className="px-6 pb-20 pt-28 md:px-10 lg:px-14">
        <button
          type="button"
          onClick={onClose}
          className="mb-10 inline-flex items-center gap-2 text-[1rem] text-white/55 transition hover:text-white"
        >
          <span>←</span>
          <span>Back</span>
        </button>

        <div className="border-t border-white/10 pt-12">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.22fr_0.9fr_1.2fr] lg:gap-16">
            <div>
              <img
                src={item.image}
                alt={item.name}
                className="h-[122px] w-[94px] object-cover"
              />
            </div>

            <div>
              <h3 className="text-[2.2rem] leading-none tracking-[-0.05em] text-white md:text-[3.2rem]">
                {item.name}
              </h3>
              <p className="mt-4 max-w-[28rem] text-[1.05rem] leading-8 text-white/48">
                {item.role}
              </p>
            </div>

            <div className="max-w-[46rem] space-y-10 text-[1.3rem] leading-[1.55] text-white/58 md:text-[1.55rem]">
              {item.full.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const [selected, setSelected] = useState(null);
  const [cursorVisible, setCursorVisible] = useState(false);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (selected) {
      setCursorVisible(false);
    }
  }, [selected]);

  const opened = useMemo(() => Boolean(selected), [selected]);

  return (
    <section className="relative min-h-screen bg-[#020202] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(120,18,10,0.08)_0%,rgba(120,18,10,0.02)_28%,rgba(0,0,0,0)_60%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:120px_100%] opacity-[0.04]" />

      <ReadCursor visible={cursorVisible && !opened} x={cursorPos.x} y={cursorPos.y} />

      <SectionHeading opened={opened} />

      <TestimonialList
        onOpen={setSelected}
        setCursorVisible={setCursorVisible}
        setCursorPos={setCursorPos}
        opened={opened}
      />

      <div
        className="absolute inset-0"
        style={{
          opacity: opened ? 1 : 0,
          transform: opened ? "translate3d(0,0,0)" : "translate3d(0,24px,0)",
          transition: "opacity 320ms ease, transform 320ms ease",
          pointerEvents: opened ? "auto" : "none",
        }}
      >
        <TestimonialDetail item={selected} onClose={() => setSelected(null)} />
      </div>
    </section>
  );
}
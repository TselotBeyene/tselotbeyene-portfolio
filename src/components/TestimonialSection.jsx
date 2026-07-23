import { useEffect, useMemo, useState } from "react";

import avatar1 from "../assets/setegn.jpg";
import avatar2 from "../assets/tselot_b.jpg";
import avatar3 from "../assets/tselot3.jpg";
import { useCursor, useCursorTarget } from "../context/CursorContext";

const testimonials = [
  {
    id: "01.",
    name: "Adam Tewodros",
    role: "Upwork client",
    image: avatar2,
    preview:
      "Tselot delivered clean work, clear updates, and never left me guessing about progress.",
    full: [
      "I hired Tselot on Upwork and it was one of the smoother freelance collaborations I've had. He understood the brief quickly, asked the right questions early, and kept communication simple and consistent.",
      "What stood out was ownership — he didn't just complete tasks, he thought about edge cases, delivery quality, and how the work would hold up after handoff.",
      "If you need someone reliable who can move between product details and technical execution without drama, I'd recommend him without hesitation.",
    ],
  },
  {
    id: "02.",
    name: "Muhaba Mohammed",
    role: "Colleague · Atlas Computer Technology",
    image: avatar3,
    preview:
      "Still one of the people I trust most when production systems need calm, practical engineering.",
    full: [
      "I worked with Tselot at Atlas Computer Technology, and we still collaborate. In banking and delivery work, you learn quickly who stays steady when things get messy — he's that person.",
      "He's strong across the stack and especially dependable around infrastructure, deployments, and making sure systems behave in real production conditions, not just demos.",
      "Beyond the technical side, he's easy to work with: clear, accountable, and focused on getting the right outcome for the team and the client.",
    ],
  },
  {
    id: "03.",
    name: "Setegn",
    role: "Colleague · Atlas Computer Technology",
    image: avatar1,
    preview:
      "A teammate who ships carefully, communicates well, and still shows up when the work gets hard.",
    full: [
      "Tselot and I worked together at Atlas Computer Technology on mobile banking delivery, and we continue to work together. He's the kind of engineer you want in the room when reliability matters.",
      "He balances speed with care — moving work forward without cutting corners on quality, coordination, or follow-through. That made collaboration smoother for everyone around him.",
      "I'd describe him as practical, sharp, and trustworthy. Whether it's day-to-day delivery or solving something under pressure, he makes the team better.",
    ],
  },
];

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

function TestimonialList({ onOpen, cursorTarget, opened }) {
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
            {...cursorTarget}
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
  const { clearLabel } = useCursor();
  const cursorTarget = useCursorTarget("Read");

  useEffect(() => {
    if (selected) {
      clearLabel();
    }
  }, [selected, clearLabel]);

  const opened = useMemo(() => Boolean(selected), [selected]);

  return (
    <section className="relative min-h-screen bg-[var(--color-bg-deep)] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-glow-warm)_0%,rgba(6,95,70,0.02)_28%,rgba(0,0,0,0)_60%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:120px_100%] opacity-[0.04]" />

      <SectionHeading opened={opened} />

      <TestimonialList
        onOpen={setSelected}
        cursorTarget={opened ? {} : cursorTarget}
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
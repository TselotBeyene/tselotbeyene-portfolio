import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";

import avatarAdam from "../assets/adam.jpg";
import avatarSetegn from "../assets/setegn.jpg";
// import avatarMuhaba from "../assets/tselot3.jpg";
import { useCursor, useCursorTarget } from "../context/CursorContext";

const testimonials = [
  {
    id: "01.",
    name: "Adam Tewodros",
    role: "Upwork client",
    image: avatarAdam,
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
    // image: avatarMuhaba,
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
    image: avatarSetegn,
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
      className="px-5 pt-24 sm:px-6 md:px-10 lg:px-14"
      style={{
        opacity: opened ? 0 : 1,
        transform: opened ? "translate3d(0,-30px,0)" : "translate3d(0,0,0)",
        transition: "opacity 300ms ease, transform 300ms ease",
        pointerEvents: opened ? "none" : "auto",
      }}
    >
      <p className="mb-6 text-[0.875rem] text-white/28 sm:mb-8 sm:text-[1.1rem]">(Testimonials)</p>

      <div className="max-w-[90rem] leading-[0.9] tracking-[-0.07em] text-white/78 sm:leading-[0.86] sm:tracking-[-0.09em]">
        <div className="ml-0 text-[clamp(1.85rem,9.5vw,2.4rem)] font-semibold sm:ml-[12%] sm:text-[clamp(2.6rem,12vw,9rem)] lg:ml-[24%]">
          WHAT
        </div>
        <div className="text-[clamp(1.85rem,9.5vw,2.4rem)] font-semibold sm:text-[clamp(2.6rem,12vw,9rem)]">
          PEOPLE SAY
        </div>
        <div className="ml-0 flex flex-wrap items-end gap-2 text-[clamp(1.85rem,9.5vw,2.4rem)] font-semibold sm:ml-[12%] sm:gap-5 sm:text-[clamp(2.6rem,12vw,9rem)] lg:ml-[24%]">
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
      className="mt-10 px-5 pb-16 sm:mt-14 sm:px-6 sm:pb-20 md:px-10 lg:px-14"
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
            className="grid w-full grid-cols-1 gap-4 border-b border-white/10 py-7 text-left transition-colors duration-300 hover:text-white sm:gap-8 sm:py-10 md:grid-cols-[0.18fr_0.18fr_0.9fr_1.2fr] md:items-center md:gap-10"
          >
            <div className="hidden text-[2.6rem] leading-none tracking-[-0.06em] text-white/22 md:block">
              {item.id}
            </div>

            <div className="flex items-start gap-4 md:block">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-[72px] w-[64px] shrink-0 object-cover sm:h-[88px] sm:w-[80px] md:h-[102px] md:w-[92px]"
                />
              ) : (
                <div className="flex h-[72px] w-[64px] shrink-0 items-center justify-center bg-white/[0.06] text-[0.85rem] text-white/35 sm:h-[88px] sm:w-[80px] md:h-[102px] md:w-[92px]">
                  {item.name.slice(0, 1)}
                </div>
              )}

              <div className="min-w-0 md:hidden">
                <h3 className="text-[clamp(1.25rem,6vw,1.75rem)] leading-none tracking-[-0.04em] text-white/82">
                  {item.name}
                </h3>
                <p className="mt-2 text-[0.8125rem] leading-6 text-white/42">
                  {item.role}
                </p>
              </div>
            </div>

            <div className="hidden md:block">
              <h3 className="text-[clamp(1.6rem,7vw,3rem)] leading-none tracking-[-0.05em] text-white/82">
                {item.name}
              </h3>
              <p className="mt-3 max-w-[28rem] text-[1rem] leading-7 text-white/42">
                {item.role}
              </p>
            </div>

            <div className="max-w-[42rem] text-[0.875rem] leading-[1.45] text-white/38 sm:text-[1.2rem] md:text-[1.35rem]">
              {item.preview}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function TestimonialDetail({ item, onClose }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!item) return;
    scrollRef.current?.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [item]);

  if (!item || typeof document === "undefined") return null;

  return createPortal(
    <div
      ref={scrollRef}
      className="fixed inset-0 z-[60] overflow-y-auto bg-[var(--color-bg-deep)]"
      style={{
        animation: "testimonialIn 280ms ease both",
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-glow-warm)_0%,rgba(6,95,70,0.02)_28%,rgba(0,0,0,0)_60%)]" />

      <div className="relative px-6 pb-20 pt-28 md:px-10 lg:px-14">
        <button
          type="button"
          onClick={onClose}
          className="mb-8 inline-flex min-h-11 items-center gap-2 text-[0.875rem] text-white/55 transition hover:text-white sm:mb-10 sm:text-[1rem]"
        >
          <span>←</span>
          <span>Back</span>
        </button>

        <div className="border-t border-white/10 pt-8 sm:pt-12">
          <div className="grid grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-[0.22fr_0.9fr_1.2fr] lg:gap-16">
            <div>
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-[122px] w-[94px] object-cover"
                />
              ) : (
                <div className="flex h-[122px] w-[94px] items-center justify-center bg-white/[0.06] text-[1.2rem] text-white/35">
                  {item.name.slice(0, 1)}
                </div>
              )}
            </div>

            <div>
              <h3 className="text-[1.55rem] leading-none tracking-[-0.04em] text-white sm:text-[2.2rem] sm:tracking-[-0.05em] md:text-[3.2rem]">
                {item.name}
              </h3>
              <p className="mt-3 max-w-[28rem] text-[0.875rem] leading-7 text-white/48 sm:mt-4 sm:text-[1.05rem] sm:leading-8">
                {item.role}
              </p>
            </div>

            <div className="max-w-[46rem] space-y-6 text-[0.9375rem] leading-[1.55] text-white/58 sm:space-y-10 sm:text-[1.3rem] md:text-[1.55rem]">
              {item.full.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default function TestimonialsSection() {
  const [selected, setSelected] = useState(null);
  const { clearLabel } = useCursor();
  const cursorTarget = useCursorTarget("Read");

  useEffect(() => {
    if (!selected) return;

    clearLabel();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [selected, clearLabel]);

  const opened = useMemo(() => Boolean(selected), [selected]);

  return (
    <section className="relative min-h-screen bg-[var(--color-bg-deep)] text-white">
      <style>{`
        @keyframes testimonialIn {
          from { opacity: 0; transform: translate3d(0, 16px, 0); }
          to { opacity: 1; transform: translate3d(0, 0, 0); }
        }
      `}</style>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-glow-warm)_0%,rgba(6,95,70,0.02)_28%,rgba(0,0,0,0)_60%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:120px_100%] opacity-[0.04]" />

      <SectionHeading opened={opened} />

      <TestimonialList
        onOpen={setSelected}
        cursorTarget={opened ? {} : cursorTarget}
        opened={opened}
      />

      <TestimonialDetail item={selected} onClose={() => setSelected(null)} />
    </section>
  );
}

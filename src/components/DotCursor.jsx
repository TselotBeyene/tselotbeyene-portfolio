import { useEffect, useRef, useState } from "react";
import { getCursorLabelAtPoint, useCursor } from "../context/CursorContext";

export default function DotCursor() {
  const { label, pos, setPos, setLabel, clearLabel } = useCursor();
  const [visible, setVisible] = useState(false);
  const [enabled, setEnabled] = useState(false);
  const posRef = useRef(pos);

  useEffect(() => {
    posRef.current = pos;
  }, [pos]);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)");
    const updateEnabled = () => setEnabled(finePointer.matches);
    updateEnabled();

    finePointer.addEventListener("change", updateEnabled);
    return () => finePointer.removeEventListener("change", updateEnabled);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const handleMove = (event) => {
      const nextPos = { x: event.clientX, y: event.clientY };
      posRef.current = nextPos;
      setPos(nextPos);
      setVisible(true);
      setLabel(getCursorLabelAtPoint(nextPos.x, nextPos.y));
    };

    const handleScroll = () => {
      const { x, y } = posRef.current;
      setLabel(getCursorLabelAtPoint(x, y));
    };

    const handleLeave = () => {
      setVisible(false);
      clearLabel();
    };

    const handleEnter = () => setVisible(true);

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.documentElement.addEventListener("mouseleave", handleLeave);
    document.documentElement.addEventListener("mouseenter", handleEnter);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("scroll", handleScroll);
      document.documentElement.removeEventListener("mouseleave", handleLeave);
      document.documentElement.removeEventListener("mouseenter", handleEnter);
      clearLabel();
    };
  }, [enabled, setPos, setLabel, clearLabel]);

  if (!enabled) return null;

  const showLabel = Boolean(label);
  const showDot = visible && !showLabel;

  return (
    <>
      <div
        className="pointer-events-none fixed left-0 top-0 z-[9998]"
        style={{
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
          opacity: showDot ? 1 : 0,
          transition: "opacity 120ms ease",
        }}
        aria-hidden="true"
      >
        <div
          className="h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: "var(--color-accent, #10b981)",
            boxShadow:
              "0 0 0 1px rgba(16,185,129,0.15), 0 0 18px rgba(16,185,129,0.55)",
          }}
        />
      </div>

      <div
        className="pointer-events-none fixed left-0 top-0 z-[9998]"
        style={{
          transform: `translate3d(${pos.x - 44}px, ${pos.y - 44}px, 0)`,
          opacity: showLabel && visible ? 1 : 0,
          transition: "opacity 120ms ease",
        }}
        aria-hidden="true"
      >
        <div className="flex h-[88px] w-[88px] items-center justify-center rounded-full bg-[var(--color-accent)] text-[1.05rem] font-medium text-white shadow-[0_16px_40px_rgba(0,0,0,0.3)]">
          {label}
        </div>
      </div>
    </>
  );
}

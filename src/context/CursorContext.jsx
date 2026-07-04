import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

const CursorContext = createContext(null);

export function CursorProvider({ children }) {
  const [label, setLabelState] = useState(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const setLabel = useCallback((nextLabel) => {
    setLabelState(nextLabel);
  }, []);

  const clearLabel = useCallback(() => {
    setLabelState(null);
  }, []);

  const value = useMemo(
    () => ({
      label,
      pos,
      setPos,
      setLabel,
      clearLabel,
    }),
    [label, pos, setLabel, clearLabel]
  );

  return (
    <CursorContext.Provider value={value}>{children}</CursorContext.Provider>
  );
}

export function useCursor() {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error("useCursor must be used within CursorProvider");
  }
  return context;
}

/** Mark a clickable element so Open/Read only appears while the pointer is over it. */
export function useCursorTarget(label) {
  return {
    "data-cursor-label": label,
  };
}

export function getCursorLabelAtPoint(x, y) {
  const el = document.elementFromPoint(x, y);
  if (!el) return null;

  const target = el.closest("[data-cursor-label]");
  return target?.getAttribute("data-cursor-label") || null;
}

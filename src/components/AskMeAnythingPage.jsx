import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useId, useRef, useState } from "react";
import portrait from "../assets/tselot_b.png";
import { fetchAgentStatus, getFollowUps, streamAgentReply } from "../lib/agentClient";
import useReducedMotion from "../hooks/useReducedMotion";

const SUGGESTIONS = [
  "Give me the fun version of who you are",
  "What's your coolest project?",
  "Convince me you're not just another developer",
  "What are you nerdy about right now?",
  "Walk me through your career like a movie plot",
  "What tools make you weirdly happy?",
  "How do I actually reach you?",
  "Surprise me with something interesting",
];

const EMPTY_COPY =
  "Hey — I'm Tselot's slightly caffeinated AI twin.\n\nAsk me the real questions: wild projects, career plot twists, stack opinions, what I'm building next, or how to get in touch. I answer with personality (and receipts).";

function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 px-1 py-1" aria-label="Assistant is typing">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent-bright)]"
          animate={{ opacity: [0.25, 1, 0.25], y: [0, -3, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

function AgentAvatar({ reducedMotion, speaking }) {
  return (
    <div className="relative mx-auto w-fit">
      <motion.div
        className="absolute -inset-3 rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.35)_0%,transparent_70%)] blur-xl sm:-inset-6 sm:blur-2xl"
        animate={
          reducedMotion
            ? { opacity: 0.55 }
            : { opacity: speaking ? [0.45, 0.85, 0.45] : [0.35, 0.6, 0.35], scale: speaking ? [1, 1.08, 1] : [1, 1.04, 1] }
        }
        transition={{ duration: speaking ? 1.4 : 3.6, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="relative rounded-full p-[2px]"
        style={{
          background:
            "conic-gradient(from 180deg, #10b981, #34d399, #059669, #6ee7b7, #10b981)",
        }}
        animate={reducedMotion ? undefined : { rotate: 360 }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      >
        <div className="rounded-full bg-[var(--color-bg-base)] p-0.5 sm:p-1">
          <motion.div
            className="relative h-16 w-16 overflow-hidden rounded-full sm:h-24 sm:w-24 md:h-32 md:w-32"
            animate={reducedMotion ? undefined : { y: [0, -6, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <img
              src={portrait}
              alt="Tselot Beyene"
              className="h-full w-full object-cover object-[center_18%]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-bg-base)]/35 to-transparent" />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="absolute -right-1 top-0 flex items-center gap-1 rounded-full border border-white/10 bg-black/50 px-2 py-0.5 text-[0.62rem] text-white/80 backdrop-blur-md sm:right-0 sm:top-2 sm:gap-1.5 sm:px-2.5 sm:py-1 sm:text-[0.7rem]"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent)] opacity-60" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--color-accent-bright)] sm:h-2 sm:w-2" />
        </span>
        Online
      </motion.div>
    </div>
  );
}

function MessageActions({ content, onRegenerate, showRegenerate }) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="mt-2 flex flex-wrap gap-2">
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(content);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1400);
          } catch {
            setCopied(false);
          }
        }}
        className="inline-flex min-h-9 items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[0.72rem] text-white/45 transition-colors hover:text-white"
        data-cursor-label="Copy"
      >
        {copied ? "Copied" : "Copy"}
      </button>
      {showRegenerate && (
        <button
          type="button"
          onClick={onRegenerate}
          className="inline-flex min-h-9 items-center rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-[0.72rem] text-white/45 transition-colors hover:text-white"
          data-cursor-label="Retry"
        >
          Regenerate
        </button>
      )}
    </div>
  );
}

const STORAGE_KEY = "portfolio-ask-chat-v1";

function loadSessionMessages() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((m) => m?.role && m?.content != null) : [];
  } catch {
    return [];
  }
}

function AskMeAnythingPage() {
  const reducedMotion = useReducedMotion();
  const formId = useId();
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const [messages, setMessages] = useState(loadSessionMessages);
  const [followUps, setFollowUps] = useState([]);
  const [agentStatus, setAgentStatus] = useState({
    online: false,
    label: "Connecting",
    message: "Checking agent…",
  });
  const listRef = useRef(null);
  const abortRef = useRef(null);
  const started = messages.length > 0;

  useEffect(() => {
    let cancelled = false;
    fetchAgentStatus().then((status) => {
      if (!cancelled) setAgentStatus(status);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    try {
      const toStore = messages
        .filter((m) => !m.streaming)
        .map(({ id, role, content }) => ({ id, role, content }));
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
    } catch {
      // ignore quota errors
    }
  }, [messages]);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    list.scrollTo({
      top: list.scrollHeight,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  }, [messages, busy, reducedMotion]);

  const send = async (rawText, { regenerate = false } = {}) => {
    const content = rawText.trim();
    if (!content || busy) return;

    setError(null);
    setFollowUps([]);
    setBusy(true);
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    let apiMessages;

    if (regenerate) {
      const withoutLastAssistant =
        messages.at(-1)?.role === "assistant" ? messages.slice(0, -1) : messages;
      apiMessages = withoutLastAssistant
        .filter((m) => (m.role === "user" || m.role === "assistant") && m.content)
        .map((m) => ({ role: m.role, content: m.content }));

      if (apiMessages.at(-1)?.role !== "user") {
        apiMessages = [...apiMessages, { role: "user", content }];
      }

      setMessages([
        ...withoutLastAssistant,
        { id: crypto.randomUUID(), role: "assistant", content: "", streaming: true },
      ]);
    } else {
      const userMessage = {
        id: crypto.randomUUID(),
        role: "user",
        content,
      };
      const next = [...messages, userMessage];
      apiMessages = next
        .filter((m) => (m.role === "user" || m.role === "assistant") && m.content)
        .map((m) => ({ role: m.role, content: m.content }));

      setMessages([
        ...next,
        { id: crypto.randomUUID(), role: "assistant", content: "", streaming: true },
      ]);
      setInput("");
    }

    try {
      const reply = await streamAgentReply(apiMessages, {
        signal: controller.signal,
        onMeta: (meta) => {
          if (!meta) return;
          setAgentStatus({
            online: true,
            label: meta.label || meta.provider || "Agent",
            message: meta.local
              ? "Portfolio knowledge (ChatGPT unavailable)"
              : `${meta.label || meta.provider} · ${meta.model}`,
            provider: meta.provider,
            model: meta.model,
          });
        },
        onToken: (_token, full) => {
          const next = full ?? _token;
          setMessages((current) => {
            const copy = [...current];
            const last = copy[copy.length - 1];
            if (last?.role === "assistant") {
              copy[copy.length - 1] = {
                ...last,
                content: next,
                streaming: true,
              };
            }
            return copy;
          });
        },
      });

      setMessages((current) => {
        const copy = [...current];
        const last = copy[copy.length - 1];
        if (last?.role === "assistant") {
          copy[copy.length - 1] = {
            ...last,
            content: reply,
            streaming: false,
          };
        }
        return copy;
      });
      setFollowUps(getFollowUps(reply));
    } catch (err) {
      if (err?.name === "AbortError") return;
      setError(err?.message || "Something went wrong reaching the agent. You can try again.");
      setMessages((current) => {
        const copy = [...current];
        if (copy.at(-1)?.role === "assistant" && !copy.at(-1)?.content) {
          copy.pop();
        }
        return copy;
      });
    } finally {
      setBusy(false);
    }
  };

  const clearConversation = () => {
    abortRef.current?.abort();
    setMessages([]);
    setFollowUps([]);
    setError(null);
    setBusy(false);
    setInput("");
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const regenerateLast = () => {
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    if (!lastUser) return;
    send(lastUser.content, { regenerate: true });
  };

  const onKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      send(input);
    }
  };

  return (
    <main
      id="ask-me-anything"
      className="relative flex min-h-[100dvh] flex-col overflow-x-hidden bg-[var(--color-bg-base)] pt-16 pb-4 sm:pt-24 sm:pb-6 md:pt-28 md:pb-8"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-16 h-40 w-40 -translate-x-1/2 rounded-full bg-[var(--color-glow-primary)] blur-3xl sm:top-24 sm:h-72 sm:w-72" />
        <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-[var(--color-glow-warm)] blur-3xl sm:h-80 sm:w-80" />
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative mx-auto flex w-full max-w-5xl min-w-0 flex-1 flex-col gap-3 px-4 sm:gap-5 sm:px-5 md:gap-6 md:px-8 lg:px-10">
        <section className="grid shrink-0 items-center gap-3 sm:gap-5 lg:grid-cols-[auto_1fr] lg:gap-10">
          <AgentAvatar reducedMotion={reducedMotion} speaking={busy} />

          <div className="text-center lg:text-left">
            <motion.p
              className="text-[0.65rem] uppercase tracking-[0.18em] text-[var(--color-accent-bright)] sm:text-[0.75rem] sm:tracking-[0.22em]"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Portfolio twin
            </motion.p>
            <motion.h1
              className="mt-1 text-[1.35rem] font-semibold leading-[1.1] tracking-tight text-white sm:mt-2 sm:text-[clamp(2rem,5vw,3.4rem)] sm:leading-[1.05]"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
            >
              Ask Me Anything
            </motion.h1>
            <motion.p
              className="mx-auto mt-2 max-w-xl text-[0.75rem] leading-5 text-white/55 sm:mt-3 sm:text-[0.98rem] sm:leading-7 lg:mx-0"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Skip the stiff resume energy. Ask about projects, plot twists,
              stack opinions, what I&apos;m building next — or just say surprise me.
            </motion.p>
          </div>
        </section>

        <motion.section
          className="relative flex min-h-[22rem] w-full min-w-0 flex-1 flex-col overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/[0.035] shadow-[0_30px_100px_rgba(0,0,0,0.35)] backdrop-blur-2xl sm:h-[min(58dvh,36rem)] sm:min-h-[22rem] sm:flex-none sm:rounded-[1.75rem] md:h-[min(64vh,40rem)]"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
        >
          <div className="flex shrink-0 items-center justify-between gap-3 border-b border-white/10 px-3 py-2.5 sm:px-4 sm:py-3 md:px-5">
            <div className="min-w-0 flex-1 truncate text-[0.7rem] text-white/55 sm:text-[0.85rem]">
              <span className="mr-2 inline-flex align-middle">
                <span className="relative flex h-2 w-2">
                  {agentStatus.online ? (
                    <>
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-accent)] opacity-50" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-accent-bright)]" />
                    </>
                  ) : (
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-white/35" />
                  )}
                </span>
              </span>
              {agentStatus.online
                ? `Online · ${agentStatus.message}`
                : agentStatus.message || "Agent offline"}
            </div>
            {started && (
              <button
                type="button"
                onClick={clearConversation}
                className="inline-flex min-h-9 shrink-0 items-center rounded-full border border-white/10 px-3 py-1.5 text-[0.72rem] text-white/45 transition-colors hover:border-white/25 hover:text-white sm:text-[0.78rem]"
                data-cursor-label="Clear"
              >
                Clear chat
              </button>
            )}
          </div>

          <div
            ref={listRef}
            className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain px-3 py-3 sm:space-y-4 sm:px-4 sm:py-5 md:px-6"
          >
            {!started && (
              <motion.div
                className="mx-auto max-w-xl rounded-2xl border border-white/10 bg-black/20 px-3.5 py-4 text-center sm:rounded-3xl sm:px-5 sm:py-6"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <p className="whitespace-pre-line text-[0.75rem] leading-5 text-white/70 sm:text-[1.02rem] sm:leading-7">
                  {EMPTY_COPY}
                </p>
                <div className="mt-4 flex flex-wrap justify-center gap-1.5 sm:mt-6 sm:gap-2">
                  {SUGGESTIONS.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => send(suggestion)}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1.5 text-left text-[0.72rem] text-white/60 transition-all hover:border-[var(--color-accent)]/45 hover:bg-[var(--color-accent)]/10 hover:text-white sm:px-3.5 sm:py-2 sm:text-[0.82rem]"
                      data-cursor-label="Ask"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            <AnimatePresence initial={false}>
              {messages.map((message, index) => {
                const isUser = message.role === "user";
                const isLastAssistant =
                  !isUser && index === messages.length - 1 && !busy;

                return (
                  <motion.div
                    key={message.id}
                    className={`flex ${isUser ? "justify-end" : "justify-start"}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className={`max-w-[min(100%,36rem)] ${isUser ? "" : "w-full"}`}>
                      {!isUser && (
                        <div className="mb-1.5 flex items-center gap-2 text-[0.68rem] text-white/35 sm:mb-2 sm:text-[0.75rem]">
                          <img
                            src={portrait}
                            alt=""
                            className="h-4 w-4 rounded-full object-cover object-[center_18%] sm:h-5 sm:w-5"
                          />
                          Tselot&apos;s twin
                          {message.streaming && (
                            <span className="text-[var(--color-accent-bright)]">vibing…</span>
                          )}
                        </div>
                      )}
                      <div
                        className={`rounded-2xl px-3 py-2.5 text-[0.8125rem] leading-5 sm:rounded-3xl sm:px-4 sm:py-3 sm:text-[0.98rem] sm:leading-7 ${
                          isUser
                            ? "bg-[var(--color-accent)] text-[#04150e]"
                            : "border border-white/10 bg-white/[0.04] text-white/80"
                        }`}
                      >
                        {message.content || (message.streaming ? <TypingDots /> : null)}
                        {message.streaming && message.content ? (
                          <span className="ml-0.5 inline-block h-4 w-[2px] animate-pulse bg-[var(--color-accent-bright)] align-middle" />
                        ) : null}
                      </div>
                      {!isUser && !message.streaming && message.content && (
                        <MessageActions
                          content={message.content}
                          showRegenerate={isLastAssistant}
                          onRegenerate={regenerateLast}
                        />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {busy && messages.at(-1)?.role === "assistant" && !messages.at(-1)?.content && (
              <div className="w-fit rounded-3xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <TypingDots />
              </div>
            )}

            {error && (
              <div className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-[0.82rem] text-red-100/90 sm:text-[0.9rem]">
                {error}
              </div>
            )}

            {followUps.length > 0 && !busy && (
              <div className="flex flex-wrap gap-2 pt-1">
                {followUps.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => send(item)}
                    className="rounded-full border border-[var(--color-accent)]/25 bg-[var(--color-accent)]/5 px-3 py-1.5 text-[0.72rem] text-[var(--color-accent-bright)] transition-colors hover:bg-[var(--color-accent)]/15 sm:text-[0.8rem]"
                    data-cursor-label="Ask"
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            id={formId}
            className="shrink-0 border-t border-white/10 bg-black/20 p-2.5 sm:p-3 md:p-4"
            onSubmit={(event) => {
              event.preventDefault();
              send(input);
            }}
          >
            <div className="flex min-w-0 items-end gap-2 rounded-2xl border border-white/10 bg-white/[0.03] p-1.5 focus-within:border-[var(--color-accent)]/45 sm:p-2">
              <textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                onKeyDown={onKeyDown}
                rows={1}
                placeholder="Ask about projects, stack, or how to reach me…"
                className="max-h-28 min-h-10 min-w-0 flex-1 resize-none bg-transparent px-2 py-2 text-[0.8125rem] text-white outline-none placeholder:text-white/30 sm:min-h-11 sm:px-3 sm:py-2.5 sm:text-[0.98rem]"
                disabled={busy}
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                className="inline-flex min-h-10 shrink-0 items-center rounded-xl bg-[var(--color-accent)] px-3.5 py-2 text-[0.82rem] font-medium text-[#04150e] transition-opacity disabled:opacity-40 sm:min-h-11 sm:px-4 sm:py-2.5 sm:text-[0.92rem]"
                data-cursor-label="Send"
              >
                Send
              </button>
            </div>
            <p className="mt-2 hidden px-1 text-[0.72rem] text-white/30 sm:block">
              Enter to send · Shift + Enter for a new line
            </p>
          </form>
        </motion.section>
      </div>
    </main>
  );
}

export default AskMeAnythingPage;

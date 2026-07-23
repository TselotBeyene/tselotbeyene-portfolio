/**
 * Talks to the integrated LLM agent at /api/chat (ChatGPT / Claude / Groq).
 * agentKnowledge is only used server-side as the system prompt context.
 */
export async function streamAgentReply(messages, { onToken, onMeta, signal } = {}) {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, stream: true }),
    signal,
  });

  if (response.status === 404) {
    throw new Error(
      "Agent API is not available. Restart npm run dev so the ChatGPT route loads.",
    );
  }

  if (!response.ok) {
    let detail = `Agent HTTP ${response.status}`;
    try {
      const data = await response.json();
      if (data?.error) detail = data.error;
    } catch {
      // ignore
    }
    throw new Error(detail);
  }

  const contentType = response.headers.get("content-type") || "";

  if (contentType.includes("text/html")) {
    throw new Error(
      "Agent API returned the website HTML instead of ChatGPT. Restart the dev server.",
    );
  }

  if (!contentType.includes("text/event-stream")) {
    const data = await response.json();
    if (data.error) throw new Error(data.error);
    const reply = data.reply;
    if (!reply) throw new Error("Empty reply from the AI agent.");
    onMeta?.({
      provider: data.provider,
      model: data.model,
      label: data.label,
      local: Boolean(data.local),
    });
    onToken?.(reply);
    return reply;
  }

  const reader = response.body?.getReader();
  if (!reader) {
    throw new Error("No stream body from the AI agent.");
  }

  const decoder = new TextDecoder();
  let buffer = "";
  let full = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";

    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data:")) continue;
      const payload = trimmed.slice(5).trim();
      if (!payload || payload === "[DONE]") continue;

      try {
        const parsed = JSON.parse(payload);
        if (parsed.error) throw new Error(parsed.error);
        if (parsed.meta) onMeta?.(parsed.meta);
        if (parsed.token) {
          full += parsed.token;
          onToken?.(parsed.token, full);
        }
      } catch (error) {
        if (error instanceof SyntaxError) continue;
        throw error;
      }
    }
  }

  if (!full.trim()) {
    throw new Error("Empty reply from the AI agent.");
  }

  return full.trim();
}

export async function fetchAgentStatus() {
  try {
    const response = await fetch("/api/chat?status=1");
    if (!response.ok) {
      return {
        online: false,
        label: "Offline",
        message: "Agent API offline",
      };
    }
    return await response.json();
  } catch {
    return {
      online: false,
      label: "Offline",
      message: "Agent API offline",
    };
  }
}

export function getFollowUps(lastAssistantText = "") {
  const text = lastAssistantText.toLowerCase();

  if (text.includes("contact") || text.includes("email") || text.includes("github")) {
    return [
      "What should I look at first on your portfolio?",
      "Got a passion project I should open?",
      "Surprise me with something interesting",
    ];
  }

  if (
    text.includes("devops") ||
    text.includes("ci/cd") ||
    text.includes("docker") ||
    text.includes("payment")
  ) {
    return [
      "What's the hardest part of payments infra?",
      "Show me your cooler product-side work",
      "How do I reach you?",
    ];
  }

  if (
    text.includes("project") ||
    text.includes("routeforge") ||
    text.includes("arifpay")
  ) {
    return [
      "What makes you different?",
      "What are you nerdy about right now?",
      "Walk me through your career like a movie plot",
    ];
  }

  return [
    "What's your coolest project?",
    "Convince me you're not just another developer",
    "How do I actually reach you?",
  ];
}

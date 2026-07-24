import { answerLocally, buildSystemPrompt } from "../src/data/agentKnowledge.js";

const MAX_MESSAGES = 16;
const MAX_MESSAGE_LENGTH = 800;

export function cleanMessages(messages) {
  return (Array.isArray(messages) ? messages : [])
    .filter(
      (message) =>
        message &&
        (message.role === "user" || message.role === "assistant") &&
        typeof message.content === "string",
    )
    .slice(-MAX_MESSAGES)
    .map((message) => ({
      role: message.role,
      content: message.content.slice(0, MAX_MESSAGE_LENGTH),
    }));
}

function providerFromEnv(env, name) {
  if (name === "openai" || name === "chatgpt") {
    if (!env.OPENAI_API_KEY) return null;
    return {
      provider: "openai",
      label: "ChatGPT",
      apiKey: env.OPENAI_API_KEY,
      model: env.AGENT_MODEL_OPENAI || env.AGENT_MODEL || "gpt-4o-mini",
    };
  }

  if (name === "anthropic" || name === "claude") {
    if (!env.ANTHROPIC_API_KEY) return null;
    return {
      provider: "anthropic",
      label: "Claude",
      apiKey: env.ANTHROPIC_API_KEY,
      model: env.AGENT_MODEL_ANTHROPIC || env.AGENT_MODEL || "claude-sonnet-4-5",
    };
  }

  if (name === "groq") {
    if (!env.GROQ_API_KEY) return null;
    return {
      provider: "groq",
      label: "Groq",
      apiKey: env.GROQ_API_KEY,
      model: env.AGENT_MODEL_GROQ || env.AGENT_MODEL || "llama-3.3-70b-versatile",
      baseUrl: "https://api.groq.com/openai/v1",
    };
  }

  return null;
}

/** Ordered list of usable providers. Prefer free Groq first. */
export function listLlmConfigs(env = process.env) {
  const preferred = (env.AGENT_PROVIDER || "").toLowerCase().trim();
  const order = ["groq", "anthropic", "openai"];

  if (preferred) {
    const rest = order.filter((name) => name !== preferred);
    order.splice(0, order.length, preferred, ...rest);
  }

  const configs = [];
  const seen = new Set();

  for (const name of order) {
    const config = providerFromEnv(env, name);
    if (!config || seen.has(config.provider)) continue;
    seen.add(config.provider);
    configs.push(config);
  }

  return configs;
}

export function getLlmConfig(env = process.env) {
  return listLlmConfigs(env)[0] || null;
}

export function getAgentStatus(env = process.env) {
  const configs = listLlmConfigs(env);
  if (configs.length === 0) {
    return {
      online: true,
      provider: "local",
      model: "portfolio-knowledge",
      label: "Portfolio knowledge",
      message: "Free mode · add GROQ_API_KEY from console.groq.com",
    };
  }

  const primary = configs[0];
  const extras = configs
    .slice(1)
    .map((config) => config.label)
    .join(", ");

  return {
    online: true,
    provider: primary.provider,
    model: primary.model,
    label: primary.label,
    message: extras
      ? `${primary.label} · ${primary.model} · fallback: ${extras}`
      : `${primary.label} · ${primary.model}`,
  };
}

export function friendlyAgentError(error) {
  const msg = String(error?.message || error || "");

  if (msg.includes("insufficient_quota") || msg.includes("429")) {
    return "That AI provider hit a quota limit. Use free Groq instead: set GROQ_API_KEY from console.groq.com and restart.";
  }
  if (msg.includes("401") || msg.includes("invalid_api_key")) {
    return "API key looks invalid. Check GROQ_API_KEY in .env.";
  }
  if (msg.includes("missing_api_key") || msg.includes("No LLM")) {
    return "Add a free GROQ_API_KEY from https://console.groq.com/keys to .env, then restart npm run dev.";
  }

  return "The AI agent failed to respond. Check your API key and try again.";
}

function isRetryableProviderError(error) {
  const msg = String(error?.message || error || "");
  return (
    msg.includes("429") ||
    msg.includes("insufficient_quota") ||
    msg.includes("rate_limit") ||
    msg.includes("529") ||
    msg.includes("503") ||
    msg.includes("500") ||
    msg.includes("401") ||
    msg.includes("invalid_api_key")
  );
}

async function* streamOpenAiCompatible(cleaned, config) {
  const baseUrl = config.baseUrl || "https://api.openai.com/v1";
  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: config.model,
      temperature: 0.45,
      max_tokens: 520,
      stream: true,
      messages: [
        { role: "system", content: buildSystemPrompt() },
        ...cleaned,
      ],
    }),
  });

  if (!response.ok || !response.body) {
    const detail = await response.text();
    throw new Error(`LLM HTTP ${response.status}: ${detail}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const parts = buffer.split("\n");
    buffer = parts.pop() || "";

    for (const line of parts) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data:")) continue;
      const payload = trimmed.slice(5).trim();
      if (!payload || payload === "[DONE]") continue;

      try {
        const parsed = JSON.parse(payload);
        const delta = parsed.choices?.[0]?.delta?.content;
        if (delta) yield delta;
      } catch {
        // ignore malformed chunks
      }
    }
  }
}

async function* streamAnthropic(cleaned, config) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": config.apiKey,
      "anthropic-version": "2023-06-01",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: config.model,
      max_tokens: 520,
      temperature: 0.45,
      system: buildSystemPrompt(),
      stream: true,
      messages: cleaned.map((message) => ({
        role: message.role === "assistant" ? "assistant" : "user",
        content: message.content,
      })),
    }),
  });

  if (!response.ok || !response.body) {
    const detail = await response.text();
    throw new Error(`Claude HTTP ${response.status}: ${detail}`);
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const parts = buffer.split("\n");
    buffer = parts.pop() || "";

    for (const line of parts) {
      const trimmed = line.trim();
      if (!trimmed.startsWith("data:")) continue;
      const payload = trimmed.slice(5).trim();
      if (!payload) continue;

      try {
        const parsed = JSON.parse(payload);
        if (
          parsed.type === "content_block_delta" &&
          parsed.delta?.type === "text_delta" &&
          parsed.delta.text
        ) {
          yield parsed.delta.text;
        }
      } catch {
        // ignore malformed chunks
      }
    }
  }
}

async function* streamOneProvider(cleaned, config) {
  if (config.provider === "anthropic") {
    yield* streamAnthropic(cleaned, config);
    return;
  }
  yield* streamOpenAiCompatible(cleaned, config);
}

export async function* streamAgentTokens(cleaned, env = process.env) {
  const configs = listLlmConfigs(env);
  const preferred = (env.AGENT_PROVIDER || "").toLowerCase().trim();
  const forcePreferred =
    preferred === "openai" ||
    preferred === "chatgpt" ||
    preferred === "anthropic" ||
    preferred === "claude" ||
    preferred === "groq";

  let lastError = null;

  for (const config of configs) {
    try {
      let produced = false;
      for await (const token of streamOneProvider(cleaned, config)) {
        produced = true;
        yield { token, provider: config.provider, label: config.label, model: config.model };
      }
      if (produced) return;
    } catch (error) {
      lastError = error;
      console.error(`Agent provider ${config.label} failed:`, error);
      if (!isRetryableProviderError(error)) throw error;
      // If user forced ChatGPT/Claude/Groq, don't silently fake answers from local knowledge.
      if (forcePreferred && configs.length === 1) {
        throw error;
      }
    }
  }

  if (forcePreferred && lastError) {
    throw lastError;
  }

  const lastUser = [...cleaned].reverse().find((message) => message.role === "user");
  yield {
    token: answerLocally(lastUser?.content ?? ""),
    provider: "local",
    label: "Portfolio knowledge",
    model: "portfolio-knowledge",
    local: true,
  };
  if (lastError) {
    console.warn("All LLM providers failed; used portfolio knowledge fallback.", lastError);
  }
}

async function completeOneProvider(cleaned, config) {
  if (config.provider === "anthropic") {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "x-api-key": config.apiKey,
        "anthropic-version": "2023-06-01",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: config.model,
        max_tokens: 520,
        temperature: 0.45,
        system: buildSystemPrompt(),
        messages: cleaned.map((message) => ({
          role: message.role === "assistant" ? "assistant" : "user",
          content: message.content,
        })),
      }),
    });

    if (!response.ok) {
      const detail = await response.text();
      throw new Error(`Claude HTTP ${response.status}: ${detail}`);
    }

    const data = await response.json();
    const reply = data.content
      ?.filter((block) => block.type === "text")
      .map((block) => block.text)
      .join("")
      .trim();

    if (!reply) throw new Error("empty_reply");
    return { reply, provider: "anthropic", model: config.model, label: config.label };
  }

  const baseUrl = config.baseUrl || "https://api.openai.com/v1";
  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: config.model,
      temperature: 0.45,
      max_tokens: 520,
      messages: [
        { role: "system", content: buildSystemPrompt() },
        ...cleaned,
      ],
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`LLM HTTP ${response.status}: ${detail}`);
  }

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content?.trim();
  if (!reply) throw new Error("empty_reply");
  return {
    reply,
    provider: config.provider,
    model: config.model,
    label: config.label,
  };
}

export async function completeAgentReply(cleaned, env = process.env) {
  const configs = listLlmConfigs(env);
  const preferred = (env.AGENT_PROVIDER || "").toLowerCase().trim();
  const forcePreferred =
    preferred === "openai" ||
    preferred === "chatgpt" ||
    preferred === "anthropic" ||
    preferred === "claude" ||
    preferred === "groq";

  let lastError = null;

  for (const config of configs) {
    try {
      return await completeOneProvider(cleaned, config);
    } catch (error) {
      lastError = error;
      console.error(`Agent provider ${config.label} failed:`, error);
      if (!isRetryableProviderError(error)) throw error;
      if (forcePreferred && configs.length === 1) {
        throw error;
      }
    }
  }

  if (forcePreferred && lastError) {
    throw lastError;
  }

  const lastUser = [...cleaned].reverse().find((message) => message.role === "user");
  return {
    reply: answerLocally(lastUser?.content ?? ""),
    provider: "local",
    model: "portfolio-knowledge",
    label: "Portfolio knowledge",
    local: true,
    warning: lastError ? friendlyAgentError(lastError) : undefined,
  };
}

export async function handleAgentChat({
  messages,
  stream = false,
  write,
  end,
  setHeader,
  status,
  json,
  env = process.env,
}) {
  const cleaned = cleanMessages(messages);
  if (cleaned.length === 0) {
    return json?.(400, { error: "No messages provided." }) ?? status?.(400);
  }

  const configs = listLlmConfigs(env);
  const primary = configs[0] || {
    provider: "local",
    label: "Portfolio knowledge",
    model: "portfolio-knowledge",
  };

  if (stream) {
    setHeader?.("Content-Type", "text/event-stream; charset=utf-8");
    setHeader?.("Cache-Control", "no-cache, no-transform");
    setHeader?.("Connection", "keep-alive");

    try {
      write(
        `data: ${JSON.stringify({
          meta: {
            provider: primary.provider,
            model: primary.model,
            label: primary.label,
          },
        })}\n\n`,
      );
      for await (const chunk of streamAgentTokens(cleaned, env)) {
        if (typeof chunk === "string") {
          write(`data: ${JSON.stringify({ token: chunk })}\n\n`);
          continue;
        }
        if (chunk.provider) {
          write(
            `data: ${JSON.stringify({
              meta: {
                provider: chunk.provider,
                model: chunk.model,
                label: chunk.label,
                local: Boolean(chunk.local),
              },
            })}\n\n`,
          );
        }
        if (chunk.token) {
          write(
            `data: ${JSON.stringify({
              token: chunk.token,
              local: Boolean(chunk.local),
            })}\n\n`,
          );
        }
      }
      write("data: [DONE]\n\n");
      return end();
    } catch (error) {
      console.error("Agent stream failed:", error);
      write(
        `data: ${JSON.stringify({ error: friendlyAgentError(error) })}\n\n`,
      );
      write("data: [DONE]\n\n");
      return end();
    }
  }

  try {
    const result = await completeAgentReply(cleaned, env);
    return json?.(200, result);
  } catch (error) {
    console.error("Agent chat failed:", error);
    return json?.(502, { error: friendlyAgentError(error) });
  }
}

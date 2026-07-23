import { getAgentStatus, handleAgentChat } from "./agentLlm.js";

function cors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

export default async function handler(req, res) {
  cors(res);

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method === "GET") {
    return res.status(200).json(getAgentStatus(process.env));
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  return handleAgentChat({
    messages: req.body?.messages,
    stream: Boolean(req.body?.stream),
    write: (chunk) => res.write(chunk),
    end: () => res.end(),
    setHeader: (key, value) => res.setHeader(key, value),
    json: (code, body) => res.status(code).json(body),
    status: (code) => res.status(code).end(),
    env: process.env,
  });
}

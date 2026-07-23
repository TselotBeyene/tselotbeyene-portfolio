import { loadEnv } from "vite";
import { getAgentStatus, handleAgentChat } from "./api/agentLlm.js";

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (chunk) => chunks.push(chunk));
    req.on("end", () => {
      try {
        const raw = Buffer.concat(chunks).toString("utf8");
        resolve(raw ? JSON.parse(raw) : {});
      } catch (error) {
        reject(error);
      }
    });
    req.on("error", reject);
  });
}

/**
 * Serves /api/chat during `npm run dev` so OpenAI/Claude keys work locally.
 */
export function agentApiPlugin() {
  return {
    name: "agent-api",
    configureServer(server) {
      const env = {
        ...process.env,
        ...loadEnv(server.config.mode, server.config.root, ""),
      };

      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split("?")[0];
        if (url !== "/api/chat") return next();

        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");

        if (req.method === "OPTIONS") {
          res.statusCode = 204;
          return res.end();
        }

        if (req.method === "GET") {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          return res.end(JSON.stringify(getAgentStatus(env)));
        }

        if (req.method !== "POST") {
          res.statusCode = 405;
          res.setHeader("Content-Type", "application/json");
          return res.end(JSON.stringify({ error: "Method not allowed" }));
        }

        try {
          const body = await readJsonBody(req);
          await handleAgentChat({
            messages: body.messages,
            stream: Boolean(body.stream),
            env,
            write: (chunk) => res.write(chunk),
            end: () => res.end(),
            setHeader: (key, value) => res.setHeader(key, value),
            json: (code, payload) => {
              res.statusCode = code;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify(payload));
            },
            status: (code) => {
              res.statusCode = code;
              res.end();
            },
          });
        } catch (error) {
          console.error("Dev agent API error:", error);
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: "server_error" }));
        }
      });
    },
  };
}

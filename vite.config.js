import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { agentApiPlugin } from "./vite-plugin-agent-api.js";

export default defineConfig({
  plugins: [react(), tailwindcss(), agentApiPlugin()],
});

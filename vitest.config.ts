import { defineConfig } from "vitest/config";
import path from "node:path";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    setupFiles: ["./vitest.setup.ts"],
    environment: "jsdom",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname),
    },
  },
});

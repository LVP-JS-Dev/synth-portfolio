import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
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

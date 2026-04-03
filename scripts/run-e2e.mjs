import { spawnSync } from "node:child_process";
import process from "node:process";

const result = spawnSync("pnpm", ["exec", "playwright", "test"], {
  stdio: "inherit",
  env: {
    ...process.env,
    E2E_MODE: process.env.E2E_MODE ?? "static",
  },
});

process.exit(result.status ?? 1);


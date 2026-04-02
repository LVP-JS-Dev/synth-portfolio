import { spawn } from "node:child_process";

const EN_PORT = 3000;
const RU_PORT = 3001;

function run(command, args, options) {
  const child = spawn(command, args, {
    stdio: "inherit",
    shell: false,
    ...options,
  });

  child.on("exit", (code, signal) => {
    if (signal) {
      process.exitCode = 0;
      return;
    }

    if (code !== 0) {
      process.exitCode = code ?? 1;
    }
  });

  return child;
}

function waitForUrl(url, { timeoutMs }) {
  const startedAt = Date.now();

  return new Promise((resolve, reject) => {
    const tick = async () => {
      try {
        const res = await fetch(url, { redirect: "manual" });
        if (res.ok || (res.status >= 300 && res.status < 400)) {
          resolve();
          return;
        }
      } catch {
        // ignore until timeout
      }

      if (Date.now() - startedAt > timeoutMs) {
        reject(new Error(`Timed out waiting for ${url}`));
        return;
      }

      setTimeout(tick, 250);
    };

    tick();
  });
}

async function main() {
  const baseEnv = {
    ...process.env,
    SITE_ORIGIN_EN: `http://localhost:${EN_PORT}`,
    SITE_ORIGIN_RU: `http://localhost:${RU_PORT}`,
  };

  // Build once for both servers.
  const build = run("pnpm", ["run", "build"], { env: baseEnv });
  await new Promise((resolve, reject) => {
    build.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`build failed with exit code ${code}`));
    });
  });

  const en = run(
    "pnpm",
    ["exec", "next", "start", "-p", String(EN_PORT)],
    { env: { ...baseEnv, FORCE_LOCALE: "en" } },
  );
  const ru = run(
    "pnpm",
    ["exec", "next", "start", "-p", String(RU_PORT)],
    { env: { ...baseEnv, FORCE_LOCALE: "ru" } },
  );

  const shutdown = () => {
    en.kill("SIGTERM");
    ru.kill("SIGTERM");
  };

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);

  await Promise.all([
    waitForUrl(`http://localhost:${EN_PORT}`, { timeoutMs: 120_000 }),
    waitForUrl(`http://localhost:${RU_PORT}`, { timeoutMs: 120_000 }),
  ]);

  // Keep the manager process alive while Playwright runs.
  await new Promise(() => {});
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

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

function waitForServerReady(child, url, { timeoutMs, shutdown }) {
  return new Promise((resolve, reject) => {
    let settled = false;

    const onExit = (code, signal) => {
      if (settled) return;
      settled = true;
      shutdown();
      reject(
        new Error(
          `Server process exited before it became ready (${url}). code=${code ?? "null"} signal=${signal ?? "null"}`,
        ),
      );
    };

    child.once("exit", onExit);

    waitForUrl(url, { timeoutMs })
      .then(() => {
        if (settled) return;
        settled = true;
        child.off("exit", onExit);
        resolve();
      })
      .catch((error) => {
        if (settled) return;
        settled = true;
        child.off("exit", onExit);
        shutdown();
        reject(error);
      });
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
    waitForServerReady(en, `http://localhost:${EN_PORT}`, { timeoutMs: 120_000, shutdown }),
    waitForServerReady(ru, `http://localhost:${RU_PORT}`, { timeoutMs: 120_000, shutdown }),
  ]);

  // Keep the manager process alive while Playwright runs.
  await new Promise(() => {});
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

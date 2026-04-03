import { spawn } from "node:child_process";
import { createServer } from "node:http";
import { readFileSync, existsSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

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

  const buildEn = run("pnpm", ["run", "build:static:en"], { env: baseEnv });
  await new Promise((resolve, reject) => {
    buildEn.on("exit", (code) => (code === 0 ? resolve() : reject(new Error(`build:static:en failed (${code})`))));
  });

  const buildRu = run("pnpm", ["run", "build:static:ru"], { env: baseEnv });
  await new Promise((resolve, reject) => {
    buildRu.on("exit", (code) => (code === 0 ? resolve() : reject(new Error(`build:static:ru failed (${code})`))));
  });

  const repoRoot = path.dirname(fileURLToPath(import.meta.url));

  function contentTypeFor(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    if (ext === ".html") return "text/html; charset=utf-8";
    if (ext === ".css") return "text/css; charset=utf-8";
    if (ext === ".js") return "application/javascript; charset=utf-8";
    if (ext === ".json") return "application/json; charset=utf-8";
    if (ext === ".svg") return "image/svg+xml";
    if (ext === ".png") return "image/png";
    if (ext === ".jpg" || ext === ".jpeg") return "image/jpeg";
    if (ext === ".ico") return "image/x-icon";
    if (ext === ".woff2") return "font/woff2";
    return "application/octet-stream";
  }

  function resolveFile(rootDir, urlPathname) {
    const decoded = decodeURIComponent(urlPathname);
    const safePath = decoded.replaceAll("\0", "");
    const withoutQuery = safePath.split("?")[0].split("#")[0];
    const normalized = path.posix.normalize(withoutQuery);
    if (normalized.startsWith("../")) return null;

    const relative = normalized.replace(/^\/+/, "");

    if (relative === "") {
      const indexPath = path.join(rootDir, "index.html");
      return existsSync(indexPath) && statSync(indexPath).isFile() ? indexPath : null;
    }

    const asFile = path.join(rootDir, relative);
    if (existsSync(asFile) && statSync(asFile).isFile()) return asFile;

    const asDirIndex = path.join(rootDir, relative, "index.html");
    if (existsSync(asDirIndex) && statSync(asDirIndex).isFile()) return asDirIndex;

    const asHtml = path.join(rootDir, `${relative}.html`);
    if (existsSync(asHtml) && statSync(asHtml).isFile()) return asHtml;

    return null;
  }

  function startStaticServer({ port, dir }) {
    const rootDir = path.join(repoRoot, "..", dir);
    const server = createServer((req, res) => {
      const requestUrl = new URL(req.url ?? "/", `http://localhost:${port}`);
      const filePath = resolveFile(rootDir, requestUrl.pathname);
      if (!filePath) {
        const notFoundPath = path.join(rootDir, "404.html");
        res.statusCode = 404;
        if (existsSync(notFoundPath)) {
          res.setHeader("content-type", "text/html; charset=utf-8");
          res.end(readFileSync(notFoundPath));
          return;
        }
        res.end("Not found");
        return;
      }

      res.statusCode = 200;
      res.setHeader("content-type", contentTypeFor(filePath));
      res.end(readFileSync(filePath));
    });

    return new Promise((resolve, reject) => {
      server.on("error", reject);
      server.listen(port, () => resolve(server));
    });
  }

  const servers = await Promise.all([
    startStaticServer({ port: EN_PORT, dir: "out-en" }),
    startStaticServer({ port: RU_PORT, dir: "out-ru" }),
  ]);

  const shutdown = () => {
    for (const server of servers) {
      server.close();
    }
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

import { createServer } from "node:http";
import { existsSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import process from "node:process";

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

const port = Number(process.env.PORT ?? "3000");
const rootDir = path.join(process.cwd(), "out");

if (!existsSync(rootDir)) {
  process.stderr.write("Missing ./out directory. Run `pnpm run build` first.\n");
  process.exit(1);
}

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

server.listen(port, () => {
  process.stdout.write(`Serving ${rootDir} on http://localhost:${port}\n`);
});


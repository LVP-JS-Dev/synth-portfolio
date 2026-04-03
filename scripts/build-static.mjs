import { spawnSync } from "node:child_process";
import { rmSync } from "node:fs";
import { rename } from "node:fs/promises";
import process from "node:process";

function fail(message) {
  process.stderr.write(`${message}\n`);
  process.exit(1);
}

function parseArgs(argv) {
  const args = new Map();
  for (const item of argv) {
    const match = /^--([^=]+)=(.+)$/.exec(item);
    if (!match) continue;
    args.set(match[1], match[2]);
  }
  return {
    locale: args.get("locale") ?? null,
    out: args.get("out") ?? null,
  };
}

const { locale, out } = parseArgs(process.argv.slice(2));
if (locale !== "en" && locale !== "ru") fail("Usage: node scripts/build-static.mjs --locale=en|ru --out=out-dir");
if (!out) fail("Usage: node scripts/build-static.mjs --locale=en|ru --out=out-dir");

rmSync("out", { recursive: true, force: true });
rmSync(out, { recursive: true, force: true });

const env = {
  ...process.env,
  STATIC_EXPORT: "true",
  FORCE_LOCALE: locale,
};

const result = spawnSync("pnpm", ["run", "build"], { stdio: "inherit", env });
if (result.status !== 0) process.exit(result.status ?? 1);

await rename("out", out);
rmSync(`${out}/admin`, { recursive: true, force: true });

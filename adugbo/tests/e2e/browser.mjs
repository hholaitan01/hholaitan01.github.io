// Shared Playwright helpers: launches Chromium (software WebGL) against `vite preview` on port 4173.
import { createRequire } from "node:module";
import { spawn } from "node:child_process";
const require = createRequire(import.meta.url);
let pw;
try {
  pw = require("playwright");
} catch {
  pw = createRequire("/opt/node22/lib/node_modules/")("playwright");
}

export async function startPreview() {
  const proc = spawn(process.execPath, ["node_modules/vite/bin/vite.js", "preview", "--port", "4173", "--strictPort", "--host", "127.0.0.1"], { stdio: "pipe", cwd: new URL("../..", import.meta.url).pathname });
  await new Promise((res, rej) => {
    const t = setTimeout(() => rej(new Error("preview did not start")), 20000);
    proc.stdout.on("data", (d) => String(d).includes("4173") && (clearTimeout(t), res()));
  });
  return proc;
}

export async function launch() {
  const args = ["--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"];
  // Behind an HTTPS proxy (CI sandboxes) keep loopback direct so the preview server is reachable.
  if (process.env.HTTPS_PROXY) args.push(`--proxy-server=${process.env.HTTPS_PROXY}`, "--proxy-bypass-list=127.0.0.1;localhost");
  return pw.chromium.launch({ args });
}

export function collectErrors(page, errs, tag) {
  page.on("console", (m) => m.type() === "error" && errs.push(`${tag} console: ${m.text().slice(0, 300)}`));
  page.on("pageerror", (e) => errs.push(`${tag} pageerror: ${e.message}`));
}

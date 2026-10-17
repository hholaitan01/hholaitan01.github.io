import { describe, expect, it } from "vitest";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const assets = path.join(root, "public/assets");
const manifest = JSON.parse(fs.readFileSync(path.join(assets, "manifest.json"), "utf8"));

function walk(d: string): string[] {
  return fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(d, e.name);
    return e.isDirectory() ? walk(p) : [path.relative(assets, p).split(path.sep).join("/")];
  });
}

describe("asset manifest", () => {
  const shipped = walk(assets).filter((f) => f !== "manifest.json");

  it("lists every shipped asset file", () => {
    for (const f of shipped) expect(manifest.files, `missing manifest entry for ${f}`).toHaveProperty([f]);
  });

  it("has no entries for files that are not shipped", () => {
    for (const f of Object.keys(manifest.files)) expect(shipped).toContain(f);
  });

  it("records the licence terms of every source a file uses", () => {
    for (const [f, entry] of Object.entries<{ sources: string[] }>(manifest.files))
      for (const s of entry.sources) {
        const src = manifest.sources[s];
        expect(src, `${f} cites unknown source ${s}`).toBeDefined();
        for (const k of ["url", "author", "licence", "commercialUse", "modification", "attribution", "redistribution", "status"])
          expect(src, `${s} lacks ${k}`).toHaveProperty(k);
        expect(String(src.status)).toMatch(/^accepted/);
      }
  });

  it("ships no raw FBX files", () => {
    expect(shipped.filter((f) => f.toLowerCase().endsWith(".fbx"))).toEqual([]);
  });
});

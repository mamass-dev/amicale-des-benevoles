// Télécharge toutes les images Sanity en local pour la migration vers Payload.
// Usage : node scripts/download-sanity-assets.mjs <backup-dir>
// Ex : node scripts/download-sanity-assets.mjs sanity-backup/2026-04-28T08-08-38-283Z

import { readFile, writeFile, mkdir } from "node:fs/promises";
import { join } from "node:path";

const dir = process.argv[2];
if (!dir) {
  console.error("Usage : node scripts/download-sanity-assets.mjs <backup-dir>");
  process.exit(1);
}

const assets = JSON.parse(await readFile(join(dir, "assets.json"), "utf8"));
const outDir = join(dir, "images");
await mkdir(outDir, { recursive: true });

console.log(`📥 Téléchargement de ${assets.length} images...`);

let ok = 0;
let fail = 0;

for (const a of assets) {
  if (a._type !== "sanity.imageAsset" || !a.url) continue;
  const filename = a._id.replace("image-", "").replace(/-(\w+)$/, ".$1");
  try {
    const res = await fetch(a.url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(join(outDir, filename), buf);
    ok++;
    process.stdout.write(`\r  ${ok}/${assets.length}`);
  } catch (err) {
    fail++;
    console.error(`\n✗ ${a._id} : ${err.message}`);
  }
}

console.log(`\n✅ ${ok} images téléchargées dans ${outDir}/ (${fail} échecs)`);

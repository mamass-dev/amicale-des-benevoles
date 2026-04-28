// Export complet de tous les documents Sanity en JSON local.
// Usage : SANITY_TOKEN=xxx node scripts/backup-sanity.mjs
// Sortie : ./sanity-backup/<timestamp>/all.json

import { createClient } from "@sanity/client";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

const client = createClient({
  projectId: "mp1jjp4v",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_TOKEN,
});

if (!process.env.SANITY_TOKEN) {
  console.error("❌ SANITY_TOKEN manquant.");
  process.exit(1);
}

const ts = new Date().toISOString().replace(/[:.]/g, "-").split(".")[0];
const dir = join("sanity-backup", ts);
await mkdir(dir, { recursive: true });

console.log("📦 Export Sanity → " + dir);

// 1) Tous les documents (sans drafts)
const allDocs = await client.fetch('*[!(_id in path("drafts.**"))]');
console.log(`  ${allDocs.length} documents publiés`);

// 2) Tous les drafts
const drafts = await client.fetch('*[_id in path("drafts.**")]');
console.log(`  ${drafts.length} drafts`);

// 3) Tous les assets
const assets = await client.fetch('*[_type in ["sanity.imageAsset", "sanity.fileAsset"]]{_id, _type, url, originalFilename, mimeType, size, metadata}');
console.log(`  ${assets.length} assets`);

await writeFile(join(dir, "documents.json"), JSON.stringify(allDocs, null, 2), "utf8");
await writeFile(join(dir, "drafts.json"), JSON.stringify(drafts, null, 2), "utf8");
await writeFile(join(dir, "assets.json"), JSON.stringify(assets, null, 2), "utf8");

// 4) Récap par type
const byType = {};
for (const d of allDocs) byType[d._type] = (byType[d._type] || 0) + 1;
console.log("\n📊 Récap par type :");
Object.entries(byType).sort((a, b) => b[1] - a[1]).forEach(([t, n]) => console.log(`   ${t.padEnd(20)} ${n}`));

console.log(`\n✅ Backup terminé dans ${dir}/`);

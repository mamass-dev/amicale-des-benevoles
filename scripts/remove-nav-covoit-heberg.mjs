// Retire les entrées Covoiturage et Hébergement du navLinks de siteSettings.
// Usage : SANITY_TOKEN=xxx node scripts/remove-nav-covoit-heberg.mjs

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || "mp1jjp4v",
  dataset: process.env.SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_TOKEN,
});

if (!process.env.SANITY_TOKEN) {
  console.error("❌ SANITY_TOKEN manquant.");
  process.exit(1);
}

const REMOVE_HREFS = new Set(["/covoiturage", "/hebergement"]);

async function run() {
  const ids = ["siteSettings", "drafts.siteSettings"];
  for (const id of ids) {
    const doc = await client.fetch(`*[_id == $id][0]`, { id });
    if (!doc) {
      console.log(`ℹ️  ${id} : pas de document`);
      continue;
    }
    const before = doc.navLinks || [];
    const after = before.filter((l) => !REMOVE_HREFS.has(l?.href));
    if (before.length === after.length) {
      console.log(`✅ ${id} : déjà propre (${before.length} liens)`);
      continue;
    }
    await client.patch(id).set({ navLinks: after }).commit();
    console.log(`✅ ${id} : ${before.length} → ${after.length} liens`);
    console.log("   retirés :", before.filter((l) => REMOVE_HREFS.has(l?.href)).map((l) => `${l.label} (${l.href})`).join(", "));
  }
}

run().catch((err) => {
  console.error("Erreur :", err.message);
  process.exit(1);
});

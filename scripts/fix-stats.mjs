// Corrige le format des documents `stat` : value doit être un number (pas une string),
// et le symbole (% ou +) doit être stocké dans `suffix`. Sans ça, l'animation de
// compteur reçoit NaN et les chiffres restent bloqués à 0 en prod.
// Usage : SANITY_TOKEN=xxx node scripts/fix-stats.mjs

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

const updates = [
  { _id: "stat-1", value: 3000, suffix: "+" },
  { _id: "stat-2", value: 62, suffix: "%" },
  { _id: "stat-3", value: 18, suffix: "" },
  { _id: "stat-4", value: 2019, suffix: "" },
];

const toDelete = ["stat-5"];

async function run() {
  for (const u of updates) {
    await client.patch(u._id).set({ value: u.value, suffix: u.suffix }).commit();
    console.log(`✅ ${u._id} : value=${u.value}, suffix="${u.suffix}"`);
  }
  for (const id of toDelete) {
    try {
      await client.delete(id);
      console.log(`🗑️  ${id} supprimé`);
    } catch (err) {
      console.error(`❌ ${id} :`, err.message);
    }
  }
}

run().catch((err) => {
  console.error("Erreur :", err.message);
  process.exit(1);
});

// Seed des partenaires dans Sanity.
// Usage : SANITY_TOKEN=xxx node scripts/seed-partners.mjs

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || "mp1jjp4v",
  dataset: process.env.SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_TOKEN,
});

if (!process.env.SANITY_TOKEN) {
  console.error("SANITY_TOKEN manquant.");
  process.exit(1);
}

const partners = [
  { name: "Avoriaz", order: 1 },
  { name: "OSL", order: 2 },
  { name: "Colnago GF Series", order: 3 },
  { name: "Saint-François-Longchamp", order: 4 },
  { name: "GF Provence", order: 5 },
  { name: "Les Intenses Sessions", order: 6 },
  { name: "UTGC", order: 7 },
  { name: "GF Series", order: 8 },
];

async function run() {
  console.log("Seed des partenaires...");
  const existing = await client.fetch(`*[_type == "partner"]{ _id, name }`);
  const byName = new Map(existing.map((p) => [p.name, p._id]));
  for (const p of partners) {
    const id = byName.get(p.name) || `partner-${p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
    await client.createOrReplace({
      _id: id,
      _type: "partner",
      name: p.name,
      order: p.order,
    });
    console.log(`  OK ${p.name}`);
  }
  console.log("Terminé. Les logos seront liés par upload-images.mjs.");
}

run().catch((err) => {
  console.error("Erreur :", err);
  process.exit(1);
});

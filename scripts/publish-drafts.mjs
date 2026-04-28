// Publie tous les drafts Sanity en attente.
// Usage : SANITY_TOKEN=xxx node scripts/publish-drafts.mjs

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "mp1jjp4v",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_TOKEN,
});

if (!process.env.SANITY_TOKEN) {
  console.error("SANITY_TOKEN manquant.");
  process.exit(1);
}

const drafts = await client.fetch(`*[_id match "drafts.*"]`);

if (!drafts.length) {
  console.log("Aucun draft en attente.");
  process.exit(0);
}

console.log(`${drafts.length} drafts à publier...\n`);

for (const draft of drafts) {
  const publishedId = draft._id.replace(/^drafts\./, "");
  const { _id, _rev, _createdAt, _updatedAt, ...rest } = draft;
  try {
    await client.createOrReplace({ _id: publishedId, ...rest });
    await client.delete(draft._id);
    console.log(`  OK ${publishedId}`);
  } catch (err) {
    console.error(`  ECHEC ${publishedId} : ${err.message}`);
  }
}

console.log("\nTermine.");

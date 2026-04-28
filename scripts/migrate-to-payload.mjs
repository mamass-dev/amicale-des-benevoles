// Migre les données du backup Sanity vers Payload.
//
// Pré-requis :
//   - Backup Sanity dans sanity-backup/<timestamp>/ (documents.json + images/)
//   - .env.local avec DATABASE_URI + PAYLOAD_SECRET (+ BLOB_READ_WRITE_TOKEN si Vercel Blob)
//   - Payload doit avoir migré son schema (npx payload migrate)
//
// Usage :
//   node scripts/migrate-to-payload.mjs sanity-backup/2026-04-28T08-08-38-283Z

import { config as dotenv } from "dotenv";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";
import { readFile } from "node:fs/promises";
import { createReadStream, statSync } from "node:fs";

dotenv({ path: resolve(process.cwd(), ".env.local") });
dotenv({ path: resolve(process.cwd(), ".env") });

if (!process.env.DATABASE_URI) {
  console.error("❌ DATABASE_URI manquant dans .env.local");
  process.exit(1);
}

const backupDir = process.argv[2];
if (!backupDir) {
  console.error("Usage : node scripts/migrate-to-payload.mjs <backup-dir>");
  process.exit(1);
}

const { getPayload } = await import("payload");
const config = (await import("../payload.config.ts")).default;
const payload = await getPayload({ config });

const documents = JSON.parse(await readFile(join(backupDir, "documents.json"), "utf8"));
const imagesDir = join(backupDir, "images");

console.log(`📦 ${documents.length} documents à migrer\n`);

// ─── Helpers ────────────────────────────────────────────────────────────────

const sanityIdToPayloadMediaId = new Map();

async function uploadAsset(sanityRef) {
  if (!sanityRef) return null;
  const id = typeof sanityRef === "string" ? sanityRef : sanityRef.asset?._ref;
  if (!id) return null;
  if (sanityIdToPayloadMediaId.has(id)) return sanityIdToPayloadMediaId.get(id);

  // Convert "image-abc123-1920x1080-jpg" → "abc123.jpg"
  const filename = id.replace("image-", "").replace(/-(\w+)$/, ".$1").replace(/-\d+x\d+/, "");
  const filepath = join(imagesDir, filename);

  try {
    statSync(filepath);
  } catch {
    console.warn(`  ⚠️ Image manquante : ${filename}`);
    return null;
  }

  const created = await payload.create({
    collection: "media",
    data: { alt: filename },
    file: {
      data: await readFile(filepath),
      mimetype: filename.endsWith(".png") ? "image/png" : filename.endsWith(".webp") ? "image/webp" : "image/jpeg",
      name: filename,
      size: statSync(filepath).size,
    },
  });

  sanityIdToPayloadMediaId.set(id, created.id);
  return created.id;
}

async function upsertGlobal(slug, data) {
  await payload.updateGlobal({ slug, data });
  console.log(`✓ global ${slug}`);
}

async function upsertCollection(collection, slug, data) {
  const existing = await payload.find({ collection, where: { slug: { equals: slug } }, limit: 1 });
  if (existing.docs.length) {
    await payload.update({ collection, id: existing.docs[0].id, data });
  } else {
    await payload.create({ collection, data });
  }
}

// ─── Group documents by type ────────────────────────────────────────────────

const byType = {};
for (const d of documents) {
  byType[d._type] = byType[d._type] || [];
  byType[d._type].push(d);
}

// ─── Events ─────────────────────────────────────────────────────────────────

console.log("\n📅 Events...");
for (const e of byType.event ?? []) {
  const imageId = await uploadAsset(e.image);
  await upsertCollection("events", e.slug?.current ?? e.slug, {
    name: e.name,
    slug: e.slug?.current ?? e.slug,
    type: e.type,
    location: e.location,
    dates: e.dates,
    dateStart: e.dateStart,
    dateEnd: e.dateEnd,
    description: e.description,
    image: imageId,
    missions: (e.missions ?? []).map((label) => ({ label })),
    practicalInfo: (e.practicalInfo ?? []).map((label) => ({ label })),
    coordinates: e.coordinates ? [e.coordinates.lng, e.coordinates.lat] : undefined,
  });
  console.log(`  ✓ ${e.name}`);
}

// ─── Team members ───────────────────────────────────────────────────────────

console.log("\n👥 Team members...");
for (const m of byType.teamMember ?? []) {
  const imageId = await uploadAsset(m.image);
  // teamMember n'a pas de slug — on utilise le nom comme clé d'unicité
  const existing = await payload.find({
    collection: "team-members",
    where: { name: { equals: m.name } },
    limit: 1,
  });
  const data = {
    name: m.name,
    role: m.role,
    category: m.category,
    focus: m.focus,
    email: m.email,
    phone: m.phone,
    image: imageId,
    order: m.order ?? 0,
  };
  if (existing.docs.length) {
    await payload.update({ collection: "team-members", id: existing.docs[0].id, data });
  } else {
    await payload.create({ collection: "team-members", data });
  }
  console.log(`  ✓ ${m.name}`);
}

// ─── Testimonials ───────────────────────────────────────────────────────────

console.log("\n💬 Testimonials...");
for (const t of byType.testimonial ?? []) {
  const imageId = await uploadAsset(t.image);
  const existing = await payload.find({
    collection: "testimonials",
    where: { name: { equals: t.name } },
    limit: 1,
  });
  const data = {
    name: t.name,
    org: t.org,
    text: t.text,
    image: imageId,
    order: t.order ?? 0,
  };
  if (existing.docs.length) {
    await payload.update({ collection: "testimonials", id: existing.docs[0].id, data });
  } else {
    await payload.create({ collection: "testimonials", data });
  }
  console.log(`  ✓ ${t.name}`);
}

// ─── Partners ───────────────────────────────────────────────────────────────

console.log("\n⭐ Partners...");
for (const p of byType.partner ?? []) {
  const logoId = await uploadAsset(p.logo);
  if (!logoId) continue;
  const existing = await payload.find({
    collection: "partners",
    where: { name: { equals: p.name } },
    limit: 1,
  });
  const data = { name: p.name, logo: logoId, url: p.url, order: p.order ?? 0 };
  if (existing.docs.length) {
    await payload.update({ collection: "partners", id: existing.docs[0].id, data });
  } else {
    await payload.create({ collection: "partners", data });
  }
  console.log(`  ✓ ${p.name}`);
}

// ─── Stats ──────────────────────────────────────────────────────────────────

console.log("\n📊 Stats...");
for (const s of byType.stat ?? []) {
  const existing = await payload.find({
    collection: "stats",
    where: { label: { equals: s.label } },
    limit: 1,
  });
  const data = { label: s.label, value: s.value, suffix: s.suffix ?? "", order: s.order ?? 0 };
  if (existing.docs.length) {
    await payload.update({ collection: "stats", id: existing.docs[0].id, data });
  } else {
    await payload.create({ collection: "stats", data });
  }
  console.log(`  ✓ ${s.label}`);
}

// ─── Globals (pages) ────────────────────────────────────────────────────────

console.log("\n📝 Pages (globals)...");
const globalMap = {
  homePage: "home-page",
  aboutPage: "about-page",
  eventsPage: "events-page",
  organizersPage: "organizers-page",
  volunteerPage: "volunteer-page",
  faqPage: "faq-page",
  contactPage: "contact-page",
  legalPage: "legal-page",
  siteSettings: "site-settings",
};

for (const [sanityType, payloadSlug] of Object.entries(globalMap)) {
  const docs = byType[sanityType] ?? [];
  if (docs.length === 0) continue;
  const doc = docs[0];

  // Process all asset references
  const data = { ...doc };
  for (const [key, val] of Object.entries(data)) {
    if (val && typeof val === "object" && val._type === "image") {
      data[key] = await uploadAsset(val);
    } else if (Array.isArray(val) && val[0]?._type === "image") {
      data[key] = await Promise.all(
        val.map(async (item) => ({ image: await uploadAsset(item) }))
      );
    }
  }

  // Special : missions and practicalInfo are arrays of strings → convert to objects
  if (Array.isArray(data.heroTags)) data.heroTags = data.heroTags.map((label) => ({ label }));
  if (Array.isArray(data.missionTags)) data.missionTags = data.missionTags.map((label) => ({ label }));
  if (Array.isArray(data.phase1Items)) data.phase1Items = data.phase1Items.map((label) => ({ label }));
  if (Array.isArray(data.phase2Items)) data.phase2Items = data.phase2Items.map((label) => ({ label }));
  if (Array.isArray(data.navLinks)) data.navLinks = data.navLinks.map((l) => ({ label: l.label, href: l.href }));

  // Cleanup Sanity-specific fields
  delete data._id;
  delete data._type;
  delete data._rev;
  delete data._createdAt;
  delete data._updatedAt;

  try {
    await upsertGlobal(payloadSlug, data);
  } catch (err) {
    console.error(`  ✗ ${payloadSlug} : ${err.message}`);
  }
}

console.log("\n✅ Migration terminée. Va sur /admin pour vérifier.");
process.exit(0);

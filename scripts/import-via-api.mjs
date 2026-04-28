// Import des données du backup Sanity vers Payload via l'API REST.
// Pré-requis : dev server actif (npm run dev), user admin créé.
//
// Usage : node scripts/import-via-api.mjs <backup-dir> <email> <password>

import { readFile, readdir, stat } from "node:fs/promises";
import { join, basename } from "node:path";

const [, , backupDir, email, password] = process.argv;

if (!backupDir || !email || !password) {
  console.error("Usage : node scripts/import-via-api.mjs <backup-dir> <email> <password>");
  process.exit(1);
}

const API = "http://localhost:3000/api";

// 1) Login
console.log("🔑 Login...");
const loginRes = await fetch(`${API}/users/login`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password }),
});
const login = await loginRes.json();
if (!login.token) {
  console.error("❌ Login failed:", login);
  process.exit(1);
}
const token = login.token;
const auth = { Authorization: `JWT ${token}` };
console.log("✓ Logged in as", email);

// 2) Charger le backup
const documents = JSON.parse(await readFile(join(backupDir, "documents.json"), "utf8"));
const imagesDir = join(backupDir, "images");
console.log(`📦 ${documents.length} documents à migrer\n`);

// 3) Helpers
const sanityIdToPayloadId = new Map();

async function uploadAsset(sanityRef) {
  if (!sanityRef) return null;
  const id = typeof sanityRef === "string" ? sanityRef : sanityRef.asset?._ref;
  if (!id) return null;
  if (sanityIdToPayloadId.has(id)) return sanityIdToPayloadId.get(id);

  // "image-abc123-1920x1080-jpg" → "abc123-1920x1080.jpg" (matches le filename exporté par download-sanity-assets.mjs)
  const filename = id.replace("image-", "").replace(/-(\w+)$/, ".$1");
  const filepath = join(imagesDir, filename);

  let fileBuf;
  try {
    fileBuf = await readFile(filepath);
  } catch {
    console.warn(`  ⚠️ Image manquante : ${filename}`);
    return null;
  }

  const ext = filename.split(".").pop()?.toLowerCase();
  const mime =
    ext === "png" ? "image/png" :
    ext === "webp" ? "image/webp" :
    ext === "svg" ? "image/svg+xml" :
    "image/jpeg";

  const form = new FormData();
  form.set("_payload", JSON.stringify({ alt: basename(filename) }));
  form.set("file", new File([fileBuf], filename, { type: mime }));

  const res = await fetch(`${API}/media`, { method: "POST", headers: auth, body: form });
  const data = await res.json();
  if (!data.doc?.id) {
    console.warn(`  ⚠️ Upload échoué pour ${filename} :`, data.errors ?? data);
    return null;
  }
  sanityIdToPayloadId.set(id, data.doc.id);
  return data.doc.id;
}

async function findBy(collection, field, value) {
  const url = `${API}/${collection}?where[${field}][equals]=${encodeURIComponent(value)}&limit=1`;
  const res = await fetch(url, { headers: auth });
  const data = await res.json();
  return data.docs?.[0]?.id ?? null;
}

async function upsert(collection, uniqueField, uniqueValue, data) {
  const existingId = await findBy(collection, uniqueField, uniqueValue);
  const url = existingId ? `${API}/${collection}/${existingId}` : `${API}/${collection}`;
  const method = existingId ? "PATCH" : "POST";
  const res = await fetch(url, {
    method,
    headers: { ...auth, "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (!result.doc?.id && !result.id) {
    console.warn(`  ⚠️ ${collection} ${uniqueValue} :`, result.errors?.[0]?.message ?? result);
    return null;
  }
  return result.doc?.id ?? result.id;
}

async function updateGlobal(slug, data) {
  const res = await fetch(`${API}/globals/${slug}`, {
    method: "POST",
    headers: { ...auth, "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  if (result.errors) {
    console.warn(`  ⚠️ global ${slug} :`, result.errors?.[0]?.message ?? result.errors);
  }
  return result;
}

// 4) Group documents by type
const byType = {};
for (const d of documents) {
  byType[d._type] = byType[d._type] || [];
  byType[d._type].push(d);
}

// 5) Events
console.log("\n📅 Events...");
for (const e of byType.event ?? []) {
  const slug = e.slug?.current ?? e.slug;
  if (!slug) continue;
  const imageId = await uploadAsset(e.image);
  await upsert("events", "slug", slug, {
    name: e.name,
    slug,
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

// 6) Team members
console.log("\n👥 Team members...");
for (const m of byType.teamMember ?? []) {
  const imageId = await uploadAsset(m.image);
  await upsert("team-members", "name", m.name, {
    name: m.name,
    role: m.role,
    category: m.category,
    focus: m.focus,
    email: m.email,
    phone: m.phone,
    image: imageId,
    order: m.order ?? 0,
  });
  console.log(`  ✓ ${m.name}`);
}

// 7) Testimonials
// Le backup Sanity utilise les anciens noms de champs : "quote" et "role"
// (avant que le schema soit migré vers "text" et "org"). On normalise ici.
console.log("\n💬 Testimonials...");
for (const t of byType.testimonial ?? []) {
  const imageId = await uploadAsset(t.image);
  const text = t.text || t.quote || "";
  const org = t.org || t.role || "Bénévole";
  if (!text || text.length < 20) {
    console.warn(`  ⚠️ Testimonial ${t.name} ignoré (texte trop court)`);
    continue;
  }
  await upsert("testimonials", "name", t.name, {
    name: t.name,
    org,
    text,
    image: imageId,
    order: t.order ?? 0,
  });
  console.log(`  ✓ ${t.name}`);
}

// 8) Partners
console.log("\n⭐ Partners...");
for (const p of byType.partner ?? []) {
  const logoId = await uploadAsset(p.logo);
  if (!logoId) continue;
  await upsert("partners", "name", p.name, {
    name: p.name,
    logo: logoId,
    url: p.url,
    order: p.order ?? 0,
  });
  console.log(`  ✓ ${p.name}`);
}

// 9) Stats
console.log("\n📊 Stats...");
for (const s of byType.stat ?? []) {
  await upsert("stats", "label", s.label, {
    label: s.label,
    value: s.value,
    suffix: s.suffix ?? "",
    order: s.order ?? 0,
  });
  console.log(`  ✓ ${s.label}`);
}

// 10) Globals
console.log("\n📝 Globals (pages)...");
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

const ARRAY_OF_STRINGS_TO_OBJECT = new Set([
  "heroTags", "missionTags", "phase1Items", "phase2Items",
  "phase1Items", "phase2Items",
]);

async function processData(obj) {
  const out = {};
  for (const [key, val] of Object.entries(obj)) {
    if (key.startsWith("_")) continue;
    if (val == null) continue;

    // Image asset
    if (typeof val === "object" && !Array.isArray(val) && val._type === "image") {
      const id = await uploadAsset(val);
      if (id) out[key] = id;
      continue;
    }
    // Array of images
    if (Array.isArray(val) && val[0]?._type === "image") {
      const arr = [];
      for (const item of val) {
        const id = await uploadAsset(item);
        if (id) arr.push({ image: id });
      }
      out[key] = arr;
      continue;
    }
    // Array of strings → objects
    if (Array.isArray(val) && val.every((v) => typeof v === "string") && ARRAY_OF_STRINGS_TO_OBJECT.has(key)) {
      out[key] = val.map((label) => ({ label }));
      continue;
    }
    // navLinks
    if (key === "navLinks" && Array.isArray(val)) {
      out[key] = val.map((l) => ({ label: l.label, href: l.href }));
      continue;
    }
    // Default
    out[key] = val;
  }
  return out;
}

for (const [sanityType, payloadSlug] of Object.entries(globalMap)) {
  const docs = byType[sanityType] ?? [];
  if (docs.length === 0) continue;
  const data = await processData(docs[0]);
  await updateGlobal(payloadSlug, data);
  console.log(`  ✓ ${payloadSlug}`);
}

console.log("\n✅ Migration terminée.");
console.log(`   Va sur http://localhost:3000/admin pour vérifier.`);
process.exit(0);

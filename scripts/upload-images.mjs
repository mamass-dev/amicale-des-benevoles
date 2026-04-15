// Upload toutes les images du site dans Sanity et patche les documents
// (singletons de pages, événements, équipe, partenaires, témoignages).
//
// Usage : SANITY_TOKEN=xxx node scripts/upload-images.mjs
//
// À lancer APRÈS `npm run seed:pages` et `node scripts/seed-sanity.mjs`.
// Idempotent : peut être relancé sans dupliquer les assets (Sanity dédupe par hash).

import { createClient } from "@sanity/client";
import { readFile } from "node:fs/promises";
import path from "node:path";

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

const PUBLIC = path.resolve("public");

async function uploadImage(relPath) {
  const abs = path.join(PUBLIC, relPath.replace(/^\//, ""));
  const buffer = await readFile(abs);
  const filename = path.basename(abs);
  const asset = await client.assets.upload("image", buffer, { filename });
  return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
}

async function uploadMany(paths) {
  const refs = [];
  for (const p of paths) {
    const ref = await uploadImage(p);
    refs.push({ ...ref, _key: ref.asset._ref.slice(0, 12) });
  }
  return refs;
}

async function patchDoc(id, patch) {
  await client.patch(id).set(patch).commit();
}

// === Page Accueil ===
async function patchHome() {
  console.log("📄 Page Accueil...");
  const heroImage = await uploadImage("/images/events/swimrunman.jpg");
  const missionImage = await uploadImage("/images/events/hero-benevoles.jpg");
  const bannerImage = await uploadImage("/images/events/benevoles-openlakes.webp");
  const ctaImage = await uploadImage("/images/events/event-outdoor.jpg");
  const mosaicImages = await uploadMany([
    "/images/events/event-outdoor.jpg",
    "/images/events/benevoles-saintelyon.jpg",
    "/images/events/gf-ventoux.jpg",
    "/images/events/groupe-benevoles.jpg",
  ]);
  const galleryImages = await uploadMany(
    [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 43].map(
      (n) => `/images/gallery/${n}_frame.jpg`
    )
  );
  await patchDoc("homePage", { heroImage, missionImage, bannerImage, ctaImage, mosaicImages, galleryImages });
  console.log("  ✅ images injectées");
}

// === Page À propos ===
async function patchAbout() {
  console.log("📄 Page À propos...");
  const heroImage = await uploadImage("/images/events/groupe-benevoles.jpg");
  const teamGroupImage = await uploadImage("/images/team/equipe.png");
  await patchDoc("aboutPage", { heroImage, teamGroupImage });
  console.log("  ✅ images injectées");
}

// === Logo ===
async function patchSiteSettings() {
  console.log("⚙️  Site settings...");
  const logo = await uploadImage("/images/logo/logo-new.png");
  await patchDoc("siteSettings", { logo });
  console.log("  ✅ logo injecté");
}

// === Événements (par slug) ===
const eventImages = {
  "swimrunman-gorges-du-verdon": "/images/events/srman-calanques.webp",
  "openlakes": "/images/events/benevoles-openlakes.webp",
  "colnago-gf-mont-ventoux": "/images/events/gf-ventoux.jpg",
  "lyon-street-food-festival": "/images/events/lyon-street-food.jpg",
  "swimrunman-lac-vassiviere": "/images/events/swimrunman-vassiviere.jpg",
  "marathon-du-vercors": "/images/events/vercors.jpg",
  "arcteryx-alpine-academy": "/images/events/arcteryx.png",
  "yotta": "/images/events/event-sport.jpg",
  "triathlon-de-la-madeleine": "/images/events/hero-benevoles.jpg",
  "festival-danse-avoriaz": "/images/events/event-outdoor.jpg",
  "triathlon-t100": "/images/events/visuel-site.jpg",
  "ventouxman": "/images/events/ventouxman-benevole.png",
  "ultra-trail-grand-colombier": "/images/events/utgc.png",
  "high-five-festival": "/images/events/lafffr.png",
  "la-saintelyon": "/images/events/benevoles-saintelyon.jpg",
  "rock-on-snow": "/images/events/groupe-benevoles.jpg",
};

async function patchEvents() {
  console.log("📅 Événements...");
  const events = await client.fetch(`*[_type == "event"]{ _id, "slug": slug.current }`);
  for (const e of events) {
    const path = eventImages[e.slug];
    if (!path) {
      console.log(`  ⚠️  pas d'image pour ${e.slug}`);
      continue;
    }
    const image = await uploadImage(path);
    await patchDoc(e._id, { image });
    console.log(`  ✅ ${e.slug}`);
  }
}

// === Équipe ===
const teamImages = {
  "Anne": "/images/team/member-1.jpg",
  "Thierry": "/images/team/thierry.png",
  "Odile": "/images/team/odile.png",
  "Françoise": "/images/team/member-4.jpg",
  "Frédéric": "/images/team/member-5.jpg",
  "Sylvie": "/images/team/member-6.jpg",
  "Aurélie": "/images/team/member-3.jpg",
  "Quentin Willems": "/images/team/member-2.jpg",
  "Jordan Finoel": "/images/team/jordan.png",
  "Maëlle Dufresnes": "/images/team/member-1.jpg",
};

async function patchTeam() {
  console.log("👥 Équipe...");
  const members = await client.fetch(`*[_type == "teamMember"]{ _id, name }`);
  for (const m of members) {
    const path = teamImages[m.name];
    if (!path) {
      console.log(`  ⚠️  pas d'image pour ${m.name}`);
      continue;
    }
    const image = await uploadImage(path);
    await patchDoc(m._id, { image });
    console.log(`  ✅ ${m.name}`);
  }
}

// === Partenaires ===
const partnerImages = {
  "Avoriaz": "/images/partners/avoriaz.png",
  "OSL": "/images/partners/osl.png",
  "Colnago GF Series": "/images/partners/colnago-gf.jpg",
  "Saint-François-Longchamp": "/images/partners/saint-francois.webp",
  "GF Provence": "/images/partners/gf-provence.png",
  "Les Intenses Sessions": "/images/partners/intenses-sessions.png",
  "UTGC": "/images/partners/utgc-logo.png",
  "GF Series": "/images/partners/gf-series.webp",
};

async function patchPartners() {
  console.log("⭐ Partenaires...");
  const partners = await client.fetch(`*[_type == "partner"]{ _id, name }`);
  for (const p of partners) {
    const path = partnerImages[p.name];
    if (!path) {
      console.log(`  ⚠️  pas d'image pour ${p.name}`);
      continue;
    }
    const logo = await uploadImage(path);
    await patchDoc(p._id, { logo });
    console.log(`  ✅ ${p.name}`);
  }
}

async function run() {
  console.log("🖼️  Upload des images vers Sanity...\n");
  try {
    await patchSiteSettings();
    await patchHome();
    await patchAbout();
    await patchEvents();
    await patchTeam();
    await patchPartners();
    console.log("\n🎉 Toutes les images ont été uploadées et liées.");
  } catch (err) {
    console.error("Erreur :", err.message);
    process.exit(1);
  }
}

run();

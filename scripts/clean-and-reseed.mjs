// Nettoie les doublons et re-seed avec IDs stables.
// Usage : SANITY_TOKEN=xxx node scripts/clean-and-reseed.mjs

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

const slugify = (s) =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const events = [
  { name: "Swimrunman aux Gorges du Verdon", slug: "swimrunman-gorges-du-verdon", type: "sportif", location: "Salles-sur-Verdon (83)", dates: "09-10 mai 2026", dateStart: "2026-05-09", dateEnd: "2026-05-10", description: "Plonge au cœur des Gorges du Verdon pour une aventure swimrun inoubliable.", spots: 40, spotsFilled: 12 },
  { name: "OpenLakes", slug: "openlakes", type: "sportif", location: "Miribel Jonage (69)", dates: "16-17 mai 2026", dateStart: "2026-05-16", dateEnd: "2026-05-17", description: "Festival de nage en eau libre au Grand Parc de Miribel-Jonage.", spots: 30, spotsFilled: 8 },
  { name: "Colnago GF Mont Ventoux", slug: "colnago-gf-mont-ventoux", type: "sportif", location: "Vaison-la-Romaine (84)", dates: "04-07 juin 2026", dateStart: "2026-06-04", dateEnd: "2026-06-07", description: "La mythique Gran Fondo cycliste sur les pentes du Mont Ventoux.", spots: 80, spotsFilled: 35 },
  { name: "Lyon Street Food Festival", slug: "lyon-street-food-festival", type: "culturel", location: "Lyon (69)", dates: "11-14 juin 2026", dateStart: "2026-06-11", dateEnd: "2026-06-14", description: "Le plus grand festival de street food de France !", spots: 120, spotsFilled: 67 },
  { name: "Swimrunman Lac de Vassivière", slug: "swimrunman-lac-vassiviere", type: "sportif", location: "Peyrat-le-Château (87)", dates: "20-21 juin 2026", dateStart: "2026-06-20", dateEnd: "2026-06-21", description: "Swimrun au cœur du Limousin sur le magnifique Lac de Vassivière.", spots: 35, spotsFilled: 10 },
  { name: "Marathon du Vercors", slug: "marathon-du-vercors", type: "sportif", location: "Lans (38)", dates: "26-28 juin 2026", dateStart: "2026-06-26", dateEnd: "2026-06-28", description: "Course mythique sur le plateau du Vercors.", spots: 50, spotsFilled: 22 },
  { name: "Arc'teryx Alpine Academy", slug: "arcteryx-alpine-academy", type: "sportif", location: "Chamonix (74)", dates: "30 juin - 06 juillet 2026", dateStart: "2026-06-30", dateEnd: "2026-07-06", description: "Semaine de formation et d'aventure en montagne à Chamonix.", spots: 60, spotsFilled: 28 },
  { name: "Yotta", slug: "yotta", type: "sportif", location: "Vichy (03)", dates: "16-19 juillet 2026", dateStart: "2026-07-16", dateEnd: "2026-07-19", description: "Événement multisport à Vichy.", spots: 45, spotsFilled: 15 },
  { name: "Triathlon de la Madeleine", slug: "triathlon-de-la-madeleine", type: "sportif", location: "St Rémy de Maurienne (73)", dates: "21 août 2026", dateStart: "2026-08-21", dateEnd: "2026-08-21", description: "Triathlon au pied du Col de la Madeleine en Savoie.", spots: 30, spotsFilled: 9 },
  { name: "Festival de Danse d'Avoriaz", slug: "festival-danse-avoriaz", type: "culturel", location: "Avoriaz (74)", dates: "21-28 août 2026", dateStart: "2026-08-21", dateEnd: "2026-08-28", description: "Une semaine de danse en altitude !", spots: 50, spotsFilled: 48 },
  { name: "Triathlon T100", slug: "triathlon-t100", type: "sportif", location: "Saint-Raphaël (83)", dates: "18-20 septembre 2026", dateStart: "2026-09-18", dateEnd: "2026-09-20", description: "Compétition internationale de triathlon sur la Côte d'Azur.", spots: 70, spotsFilled: 30 },
  { name: "Ventouxman", slug: "ventouxman", type: "sportif", location: "Monteux (84)", dates: "18-20 septembre 2026", dateStart: "2026-09-18", dateEnd: "2026-09-20", description: "Triathlon longue distance au pied du Géant de Provence.", spots: 40, spotsFilled: 18 },
  { name: "Ultra Trail Grand Colombier", slug: "ultra-trail-grand-colombier", type: "sportif", location: "Culoz (01)", dates: "24-27 septembre 2026", dateStart: "2026-09-24", dateEnd: "2026-09-27", description: "Ultra-trail dans le massif du Grand Colombier.", spots: 55, spotsFilled: 20 },
  { name: "High Five Festival", slug: "high-five-festival", type: "culturel", location: "Annecy (74)", dates: "01-04 octobre 2026", dateStart: "2026-10-01", dateEnd: "2026-10-04", description: "Festival international du film de montagne et d'aventure à Annecy.", spots: 40, spotsFilled: 25 },
  { name: "La SaintéLyon", slug: "la-saintelyon", type: "sportif", location: "Lyon (69)", dates: "27-28 novembre 2026", dateStart: "2026-11-27", dateEnd: "2026-11-28", description: "La course nocturne mythique de Saint-Étienne à Lyon.", spots: 150, spotsFilled: 95 },
  { name: "Rock On Snow", slug: "rock-on-snow", type: "culturel", location: "Avoriaz (74)", dates: "09-13 décembre 2026", dateStart: "2026-12-09", dateEnd: "2026-12-13", description: "Festival de musique sur neige à Avoriaz.", spots: 45, spotsFilled: 20 },
];

const staff = [
  { name: "Quentin Willems", role: "Directeur", focus: "Développement & Engagement", email: "quentin@amicaledesbenevoles.org", phone: "06 88 65 19 60", category: "staff", order: 1 },
  { name: "Jordan Finoel", role: "Chef de projet", focus: "Production & Stratégie d'affectation", phone: "06 20 33 10 09", category: "staff", order: 2 },
  { name: "Maëlle Dufresnes", role: "Cheffe de projet", focus: "Animation & Mobilisation de communauté", category: "staff", order: 3 },
];

const board = [
  { name: "Anne", role: "Présidente", category: "board", order: 1 },
  { name: "Thierry", role: "Vice-président", category: "board", order: 2 },
  { name: "Odile", role: "Trésorière", category: "board", order: 3 },
  { name: "Françoise", role: "Secrétaire", category: "board", order: 4 },
  { name: "Frédéric", role: "Membre du bureau", category: "board", order: 5 },
  { name: "Sylvie", role: "Membre du bureau", category: "board", order: 6 },
  { name: "Aurélie", role: "Membre du bureau", category: "board", order: 7 },
];

const testimonials = [
  { name: "Sophie", role: "Bénévole depuis 2020", quote: "L'Amicale m'a permis de vivre des expériences inoubliables et de rencontrer des personnes formidables.", order: 1 },
  { name: "Marc", role: "Bénévole depuis 2019", quote: "Un accueil chaleureux, une organisation au top, je reviens chaque année !", order: 2 },
];

const stats = [
  { value: "3000+", label: "Bénévoles mobilisés", order: 1 },
  { value: "62%", label: "Taux de fidélisation", order: 2 },
  { value: "18", label: "Événements par an", order: 3 },
  { value: "2019", label: "Année de création", order: 4 },
  { value: "1", label: "Association loi 1901", order: 5 },
];

async function deleteAll(type) {
  const ids = await client.fetch(`*[_type == "${type}"]._id`);
  if (!ids.length) return;
  const tx = client.transaction();
  ids.forEach((id) => tx.delete(id));
  await tx.commit();
  console.log(`  Supprimé ${ids.length} ${type}`);
}

async function run() {
  console.log("Nettoyage des doublons...");
  for (const t of ["event", "teamMember", "testimonial", "stat", "partner"]) {
    await deleteAll(t);
  }

  console.log("\nRe-seed avec IDs stables...");
  const tx = client.transaction();
  for (const e of events) {
    tx.createOrReplace({
      _id: `event-${e.slug}`,
      _type: "event",
      ...e,
      slug: { _type: "slug", current: e.slug },
    });
  }
  for (const m of [...staff, ...board]) {
    tx.createOrReplace({ _id: `team-${slugify(m.name)}`, _type: "teamMember", ...m });
  }
  for (let i = 0; i < testimonials.length; i++) {
    const t = testimonials[i];
    tx.createOrReplace({ _id: `testimonial-${slugify(t.name)}-${i + 1}`, _type: "testimonial", ...t });
  }
  for (let i = 0; i < stats.length; i++) {
    tx.createOrReplace({ _id: `stat-${i + 1}`, _type: "stat", ...stats[i] });
  }
  const partners = [
    "Avoriaz", "OSL", "Colnago GF Series", "Saint-François-Longchamp",
    "GF Provence", "Les Intenses Sessions", "UTGC", "GF Series",
  ];
  partners.forEach((name, i) => {
    tx.createOrReplace({ _id: `partner-${slugify(name)}`, _type: "partner", name, order: i + 1 });
  });

  await tx.commit();
  console.log("Terminé. Run upload-images.mjs pour rattacher les images.");
}

run().catch((err) => {
  console.error("Erreur :", err);
  process.exit(1);
});

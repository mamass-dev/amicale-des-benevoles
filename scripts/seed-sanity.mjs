import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "mp1jjp4v",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_TOKEN,
});

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
  { name: "Frédéric", role: "Comptable", category: "board", order: 5 },
  { name: "Sylvie", role: "Chargée de communication", category: "board", order: 6 },
  { name: "Aurélie", role: "Administratrice", category: "board", order: 7 },
];

const testimonials = [
  { name: "Ambre", org: "AREMACS", text: "Les bénévoles ont été très attentifs et super motivés. L'Amicale a su recruter des profils engagés qui ont fait la différence sur notre événement.", order: 1 },
  { name: "Mathieu Kurtz", org: "High Five Festival", text: "L'équipe a su analyser et apporter des correctifs pour améliorer l'expérience. Je suis satisfait de la prestation de l'ADB sur le volume et la gestion des bénévoles.", order: 2 },
];

const stats = [
  { label: "De satisfaction", value: 95, suffix: "%", order: 1 },
  { label: "Bénévoles mobilisés", value: 3000, suffix: "+", order: 2 },
  { label: "Journées bénévoles", value: 8500, suffix: "", order: 3 },
  { label: "Événements", value: 18, suffix: "", order: 4 },
  { label: "De fidélisation", value: 62, suffix: "%", order: 5 },
];

const faqs = [
  { question: "Qui peut utiliser le covoiturage ?", answer: "Le service est ouvert à tous les bénévoles de l'Amicale. Conducteurs et passagers sont tous des membres inscrits.", category: "covoiturage", order: 1 },
  { question: "Comment sont partagés les frais ?", answer: "C'est entre vous ! On recommande un partage équitable des frais d'essence et de péage. Ce n'est pas commercial, c'est solidaire.", category: "covoiturage", order: 2 },
  { question: "Comment je contacte un conducteur ou un passager ?", answer: "Chaque annonce affiche les coordonnées de la personne après un clic volontaire. Tu la contactes directement. L'Amicale n'intervient pas.", category: "covoiturage", order: 3 },
  { question: "Le covoiturage est-il assuré ?", answer: "Chaque conducteur est couvert par sa propre assurance auto. Vérifiez que votre contrat couvre le covoiturage.", category: "covoiturage", order: 4 },
  { question: "L'hébergement est-il gratuit ?", answer: "Oui, c'est un hébergement solidaire. L'hôte ne demande aucune rémunération. Un petit geste d'attention est toujours apprécié !", category: "hebergement", order: 1 },
  { question: "Comment je contacte un hôte ou un voyageur ?", answer: "Chaque annonce affiche les coordonnées après un clic. Tu contactes la personne directement. L'Amicale n'intervient pas.", category: "hebergement", order: 2 },
  { question: "Quels types de logement sont acceptés ?", answer: "Tout est bienvenu : chambre privée, canapé-lit, matelas d'appoint, studio... L'important c'est d'avoir un toit.", category: "hebergement", order: 3 },
  { question: "Combien de temps à l'avance faut-il s'y prendre ?", answer: "Idéalement 2 à 3 semaines avant l'événement. Pour les gros événements, les hébergements partent vite.", category: "hebergement", order: 4 },
];

const siteSettings = {
  _id: "siteSettings",
  _type: "siteSettings",
  siteName: "Amicale des Bénévoles",
  siteDescription: "Association loi 1901 pour la promotion du bénévolat événementiel sportif et culturel.",
  email: "contact@amicaledesbenevoles.org",
  phone1: "Quentin : 06 88 65 19 60",
  phone2: "Jordan : 06 20 33 10 09",
  address: "107 rue Bechevelin, 69007 Lyon",
  rna: "W691100560",
  facebookUrl: "https://www.facebook.com/amicaledesbenevoles",
  instagramUrl: "https://www.instagram.com/amicale_des_benevoles/",
  linkedinUrl: "https://www.linkedin.com/company/amicaledesbenevoles",
  whatsappUrl: "https://www.whatsapp.com/channel/0029Vb6untf7j6g4FzAq3o0Q",
  inscriptionUrl: "https://event.recrewteer.com/v2/organization/121/form/7034",
};

async function seed() {
  console.log("Seeding site settings...");
  await client.createOrReplace(siteSettings);

  console.log("Seeding events...");
  for (const e of events) {
    await client.create({ _type: "event", ...e, slug: { _type: "slug", current: e.slug } });
  }

  console.log("Seeding team members...");
  for (const m of [...staff, ...board]) {
    await client.create({ _type: "teamMember", ...m });
  }

  console.log("Seeding testimonials...");
  for (const t of testimonials) {
    await client.create({ _type: "testimonial", ...t });
  }

  console.log("Seeding stats...");
  for (const s of stats) {
    await client.create({ _type: "stat", ...s });
  }

  console.log("Seeding FAQs...");
  for (const f of faqs) {
    await client.create({ _type: "faq", ...f });
  }

  console.log("Done! All data seeded.");
}

seed().catch(console.error);

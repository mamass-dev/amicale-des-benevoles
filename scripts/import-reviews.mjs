// Import des avis bénévoles dans Sanity.
// Usage : SANITY_TOKEN=xxx node scripts/import-reviews.mjs

import { createClient } from "@sanity/client";

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

// Données extraites du message de l'utilisateur.
// Date : approximation depuis "il y a X mois" basée sur 2026-04-29.
function monthsAgo(n) {
  const d = new Date(2026, 3, 29);
  d.setMonth(d.getMonth() - n);
  return d.toISOString().split("T")[0];
}

const reviews = [
  { authorName: "Avis Trustpilot", source: "trustpilot", rating: 4, text: "Toujours plaisant, et enrichissant, et surtout bravo à tous ces athlètes 👍", visitedAt: monthsAgo(48) },
  { authorName: "boulghalagh el ouazna", source: "google", rating: 5, text: "Super organisation et le meilleur référent et Team, Big up à Didier!! Moment unique un Triathlon mondial, je l'ai fais ! Un privilège…", eventName: "Triathlon T100", visitedAt: "2025-09-01" },
  { authorName: "Soufiane DARISS", source: "google", rating: 5, text: "5 étoiles ! Quelle expérience incroyable que ce Triathlon de Fréjus & saint raphael, le T100 ! Toute la semaine de préparation a été un moment inoubliable…", eventName: "Triathlon T100", visitedAt: "2025-09-01" },
  { authorName: "Hubert Guiraud", source: "google", rating: 5, text: "Premièrement je tenais à remercier QUENTIN WILLIAMS et GUY MALANDAIN pour ne citer qu'eux pour leur dévouement et surtout bienveillance et gestion des équipes.", eventName: "Triathlon T100", visitedAt: "2025-08-01" },
  { authorName: "Albanelli C", source: "google", rating: 5, text: "Une super expérience avec une organisation du tonnerre. Quentin ne se laisse pas déborder et nous permet de faire du bon boulot. Merci pour le T100 French Riviera", eventName: "Triathlon T100", visitedAt: "2025-09-01" },
  { authorName: "severine sire", source: "google", rating: 5, text: "En tant que bénévole, je trouve que l'on a été choyé. Une très bonne ambiance, avec des animations, et de la disponibilité de la part des organisateurs. Très belle expérience avec l'amicale des bénévoles que je referai sans aucune hésitation.", visitedAt: "2025-08-01" },
  { authorName: "Annick NAVEILHAN", source: "google", rating: 5, text: "Super expérience au cours du T100 à Fréjus. Les organisateurs.trices sont au top, bienveillants et compétents et ont la banane 😉", eventName: "Triathlon T100", visitedAt: "2025-09-01" },
  { authorName: "Philippe Chapier", source: "google", rating: 5, text: "Un événement tel que l'UTGC ne peut réussir que grâce aux participants et aux bénévoles. Nous sommes tous et toutes différentes et sans l'amicale des bénévoles…", eventName: "Ultra Trail Grand Colombier", visitedAt: "2025-05-01" },
  { authorName: "Na Ma", source: "google", rating: 5, text: "Incroyable expérience en tant que Bénévole ! Venez l'année prochaine essayer cette période magique !!!", visitedAt: "2025-09-01" },
  { authorName: "Lucie", source: "google", rating: 5, text: "Une équipe au top qui accompagne ses bénévoles aux petits oignons pour leur faire passer un super moment ! Vraiment un beau programme bénévole :D", visitedAt: "2025-09-01" },
  { authorName: "Lucrece Roland", source: "google", rating: 5, text: "Ambiance conviviale, partage de connaissances, bonne humeur. La recette d'un bon groupe", visitedAt: "2025-09-01" },
  { authorName: "Isabel Ogé", source: "google", rating: 5, text: "Une belle experience, de jolies rencontre, un beau moment de partage. Appelez moi pour le prochain T100…", eventName: "Triathlon T100", visitedAt: "2025-09-01" },
  { authorName: "Mélanie Berthomiere", source: "google", rating: 5, text: "Deuxième expérience avec l'amicale des bénévoles et toujours aussi incroyable, de la bonne humeur, de la rigolade à volonté etc…", visitedAt: "2025-12-01" },
  { authorName: "Annie Schlexer", source: "google", rating: 5, text: "T100 : un pur régal super organisation bonne ambiance, choyé au petit dej et à midi. Moi sauf contre ordre partante pour 2026. Merci", eventName: "Triathlon T100", visitedAt: "2025-09-01" },
  { authorName: "Jean-Pierre SERASSET", source: "google", rating: 5, text: "Super expérience avec une super ambiance et bien sûr une équipe au top", visitedAt: "2025-09-01" },
  { authorName: "Theo Bernard", source: "google", rating: 5, text: "Superbe association très gentille accueillante est bravo a Quentin pour le travail qui fourni rendu de fou pour l'événement du T100 au 11 novembre Théo 😉", eventName: "Triathlon T100", visitedAt: "2025-09-01" },
  { authorName: "Caroline", source: "google", rating: 5, text: "Très bonne expérience lors du T100, super association. Bonnes rencontres, hâte de participer à d'autres événements avec cette association.", eventName: "Triathlon T100", visitedAt: "2025-09-01" },
  { authorName: "Dom", source: "google", rating: 5, text: "High Five 2025 très bonne ambiance bonne cohésion team au top et surtout le smille 🤩", eventName: "High Five Festival", visitedAt: "2025-10-01" },
  { authorName: "Catherine FANCHON", source: "google", rating: 5, text: "Expérience fort sympathique, conviviale, organisation au top à très vite pour de nouvelles aventures", visitedAt: "2025-08-01" },
  { authorName: "CFEY Centre de Formation à l'Enseignement du Yoga", source: "google", rating: 5, text: "Une super équipe, très professionnelle et très humaine. Une expérience riche à renouveler avec grand plaisir", visitedAt: "2025-09-01" },
  { authorName: "Michael FACON", source: "google", rating: 5, text: "Une première expérience au top. Vivement la prochaine. Quentin, tu es au TOP ne change rien !", visitedAt: "2025-09-01" },
  { authorName: "Alexandra renard", source: "google", rating: 5, text: "Trop belle expérience humaine et sportive où la bienveillance et l'entraide sont au rendez vous !", visitedAt: "2025-08-01" },
  { authorName: "Anouk Roy", source: "google", rating: 5, text: "1ère expérience de bénévole excellente. Super encadrement. Ambiance excellente. Merci beaucoup", visitedAt: "2025-09-01" },
  { authorName: "Bea Durieux", source: "google", rating: 5, text: "Un 1er week end très convivial dans le Vercors. Merci à Jordan et Donald. On reviendra !", eventName: "Marathon du Vercors", visitedAt: "2025-07-01" },
  { authorName: "Francis Challine", source: "google", rating: 5, text: "T100 non T600, super équipe, super ambiance, que du bonheur !!! 🤪", eventName: "Triathlon T100", visitedAt: "2025-09-01" },
  { authorName: "suzon", source: "google", rating: 5, text: "Trop bien. Ambiance géniale. Solidarité au top. Ravie de mon expérience. Amicalement. Suzon", visitedAt: "2025-09-01" },
  { authorName: "Dom Faug", source: "google", rating: 5, text: "Une bonne équipe bien encadrée et super organisée. Un régal !", visitedAt: "2025-09-01" },
  { authorName: "Cecile Genty-Guemard", source: "google", rating: 4, text: "Superbe lieu et superbe ambiance", visitedAt: "2025-09-01" },
  { authorName: "Didier Ramella", source: "google", rating: 5, text: "Organisation exceptionnelle du Festival Rock On Snow !!", eventName: "Rock On Snow", visitedAt: "2025-12-01" },
  { authorName: "Roger Szkuta", source: "google", rating: 5, text: "Une bonne ambiance très sérieux, de belle mission agréable et enrichissantes avec des responsables au top quentin et aurelie. Respect de soi et aussi des autres…", visitedAt: "2022-07-01" },
  { authorName: "Josiane Dechaume", source: "google", rating: 5, text: "Magique, une expérience à faire connaître", visitedAt: "2025-09-01" },
  { authorName: "Noel Pitton", source: "google", rating: 4, text: "Bonne ambiance et bonne équipe pour le marathon du Vercors.", eventName: "Marathon du Vercors", visitedAt: "2025-07-01" },
  { authorName: "Moget Caroline", source: "google", rating: 5, text: "Super ne changez rien !!! 🙏", visitedAt: "2025-08-01" },
  { authorName: "Muriel B", source: "google", rating: 5, text: "Super sympa l'équipe !! Bravo à tous", visitedAt: "2025-05-01" },
  { authorName: "AURELIE I", source: "google", rating: 5, text: "Equipe au top comme toujours.", visitedAt: "2025-07-01" },
];

console.log(`📥 Import de ${reviews.length} avis bénévoles...\n`);

// Clean les anciens avant re-import
const existing = await client.fetch('*[_type == "review"]{_id}');
if (existing.length > 0) {
  console.log(`🧹 Suppression de ${existing.length} avis existants...`);
  for (const doc of existing) {
    await client.delete(doc._id);
  }
}

let order = 1;
for (const r of reviews) {
  const doc = {
    _type: "review",
    ...r,
    order: order++,
  };
  try {
    await client.create(doc);
    process.stdout.write(`\r  ${order - 1}/${reviews.length}`);
  } catch (err) {
    console.error(`\n✗ ${r.authorName} : ${err.message}`);
  }
}

console.log(`\n\n✅ ${reviews.length} avis importés.`);

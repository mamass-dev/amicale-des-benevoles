// Seed initial des textes de pages dans Sanity.
// Usage : SANITY_TOKEN=xxx node scripts/seed-pages.mjs
//
// Crée (ou met à jour avec createOrReplace) tous les singletons de pages.
// Les valeurs ci-dessous sont une copie de src/lib/content-defaults.ts

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || "mp1jjp4v",
  dataset: process.env.SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_TOKEN,
});

if (!process.env.SANITY_TOKEN) {
  console.error("❌ SANITY_TOKEN manquant. Récupérer un token : https://www.sanity.io/manage");
  process.exit(1);
}

const homeDefaults = {
  heroBadge: "Association loi 1901 — Depuis 2019",
  heroTitle1: "Créateur d'expériences",
  heroTitle2: "citoyennes",
  heroSubtitle: "100% événementielles",
  heroDescription:
    "Que tu sois jeune ou moins jeune, il y a forcément un événement fait pour toi. Rejoins plus de 3 000 bénévoles engagés sur des événements sportifs et culturels partout en France.",
  heroCtaPrimary: "Rejoindre l'Amicale",
  heroCtaSecondary: "Voir les événements",
  missionTitle: "Notre mission",
  missionText1:
    "Concevoir des expériences bénévoles de qualité et donner envie aux bénévoles de poursuivre leur engagement citoyen. Le bénévolat apporte une grande richesse humaine — l'association contribue à entretenir ce lien fraternel.",
  missionText2:
    "Les missions proposées par l'Amicale sont établies avec l'organisateur. Elles garantissent la qualité de l'expérience et la bonne relation organisateur/bénévole. Tu t'engages dans les meilleures conditions d'accueil, de respect et de considération.",
  missionTags: ["1 à 10 jours", "Sportif & culturel", "Partout en France"],
  pillars: [
    { title: "La cause", description: "S'engager pour une cause qui te semble juste et authentique. Chaque événement porte des valeurs qui donnent du sens à ton engagement.", icon: "Heart", color: "primary" },
    { title: "Le sentiment d'utilité", description: "Sans bénévole, il n'y a pas d'événement. Ta présence compte et fait concrètement vivre l'événement — c'est une fierté partagée.", icon: "Users", color: "secondary" },
    { title: "Le lien social", description: "Le bénévolat tout seul n'a pas de sens. Rencontre d'autres personnes engagées, crée des liens et vis des moments forts.", icon: "Handshake", color: "accent" },
  ],
  bannerText: "Plus de 3 000 bénévoles mobilisés, 62% qui reviennent.",
  bannerSubtext: "C'est ça, l'Amicale.",
  eventsTitle: "Prochains événements",
  eventsSubtitle: "Qu'importe tes raisons, ton acte citoyen est précieux !",
  eventsLinkLabel: "Tous les événements",
  galleryTitle: "L'Amicale en images",
  gallerySubtitle: "Des moments partagés par nos bénévoles sur le terrain.",
  testimonialsTitle: "Ils nous font confiance",
  partnersLabel: "Nos événements et partenaires",
  ctaTitle: "Prêt à vivre une expérience unique ?",
  ctaDescription: "Rejoins l'Amicale des Bénévoles et découvre des événements extraordinaires. Chaque raison de s'engager est la bonne, puisque c'est la tienne.",
  ctaPrimary: "Rejoindre l'Amicale",
  ctaSecondary: "Voir les événements",
};

const aboutDefaults = {
  heroTitle1: "Notre",
  heroTitle2: "histoire",
  heroDescription: "L'Amicale des Bénévoles est une association loi 1901, créée en 2019, qui œuvre pour la promotion et le développement du bénévolat dans le milieu événementiel sportif et culturel.",
  definitionQuote: "Est bénévole toute personne qui s'engage librement pour mener une action non salariée en direction d'autrui, en dehors de son temps professionnel et familial.",
  definitionSource: "Conseil Économique et Social, 24 février 1993",
  historyTitle: "D'où venons-nous ?",
  historyMilestones: [
    { year: "2013", title: "Les racines lyonnaises", description: "Championnats du Monde de para-athlétisme IPC à Lyon. Les fondateurs découvrent la puissance du bénévolat événementiel.", color: "primary" },
    { year: "2015", title: "L'expérience se confirme", description: "Championnats du Monde d'athlétisme Masters à Lyon. Le noyau de bénévoles se fidélise et l'idée d'une structure dédiée germe.", color: "primary" },
    { year: "2019", title: "Création de l'Amicale", description: "L'Amicale des Bénévoles voit le jour à Lyon. Une association loi 1901 dédiée à la promotion du bénévolat événementiel sportif et culturel.", color: "primary" },
    { year: "2026", title: "Aujourd'hui", description: "Plus de 3 000 bénévoles mobilisés, 18 événements et 62% de fidélisation record.", color: "accent" },
  ],
  valuesTitle: "Nos valeurs",
  values: [
    { title: "Fraternité", description: "Le bénévolat apporte une grande richesse humaine. Nous entretenons ce lien fraternel.", icon: "Heart" },
    { title: "Déontologie", description: "100% de nos expériences respectent notre charte éthique et les principes de la loi 1901.", icon: "Shield" },
    { title: "Intergénérationnel", description: "Jeunes ou moins jeunes, chacun trouve sa place. La diversité fait notre force.", icon: "Users" },
    { title: "Excellence", description: "95% de satisfaction bénévole. Nous visons toujours la qualité de l'expérience.", icon: "Award" },
  ],
  teamTitle: "Notre équipe",
  teamStaffTitle: "Équipe production",
  teamBoardTitle: "Comité directeur",
  inclusiveTitle: "Un espace sûr pour toutes et tous",
  inclusiveText: "L'Amicale est engagée pour un bénévolat inclusif et respectueux. Maëlle Dufresnes est notre référente LGBTQIA+ et anti-discrimination : elle accompagne et écoute tout bénévole qui en ressentirait le besoin, en toute confidentialité.",
  inclusiveReferentName: "Maëlle Dufresnes",
  inclusiveReferentRole: "Référente LGBTQIA+ & anti-discrimination",
  inclusiveContactLabel: "Échanger en confidentialité",
  inclusiveContactEmail: "maelle@amicaledesbenevoles.org",
  teamPhotoCaption: "L'équipe de l'Amicale, réunie pour préparer la saison 2026.",
  ambassadorsTitle: "Les ambassadeurs",
  ambassadorsText: "Nos ambassadeurs représentent l'association et sont garants de ses valeurs. Ils guident et orientent les nouveaux bénévoles, apportent leurs retours d'expériences, leurs idées novatrices et leurs compétences personnelles.",
  ambassadorsCta: "Devenir ambassadeur",
};

const eventsPageDefaults = {
  heroTitle1: "Nos",
  heroTitle2: "événements",
  heroDescription: "{count} événements sportifs et culturels dans le quart Sud-Est de la France. Qu'importe les raisons qui t'amènent à t'engager, ton acte citoyen est précieux !",
  ctaTitle: "Un événement te plaît ?",
  ctaDescription: "Inscris-toi à l'Amicale pour accéder aux inscriptions et vivre de belles aventures bénévoles.",
  ctaButton: "Rejoindre l'Amicale",
};

const organizersDefaults = {
  heroTitle1: "Ami organisateur,",
  heroTitle2: "bienvenue !",
  heroDescription: "Nous mobilisons, encadrons et fidélisons les bénévoles sur vos événements sportifs et culturels. Notre métier : concevoir des programmes bénévoles utiles et durables.",
  heroTags: ["De 10 à 2 000 bénévoles", "De 1 à 15 jours", "Sportif & culturel", "Quart Sud-Est France"],
  missionTitle: "Notre mission",
  missionSubtitle: "Mobiliser, encadrer & fidéliser les bénévoles",
  missionTagline: "lors des manifestations sportives, culturelles & caritatives",
  missionPillars: [
    { title: "Mobiliser", description: "Stratégie d'acquisition et de recrutement sur-mesure pour chaque événement.", icon: "Target", color: "primary" },
    { title: "Encadrer", description: "Animation sur site, espace bénévoles, suivi opérationnel et accompagnement.", icon: "Users", color: "secondary" },
    { title: "Fidéliser", description: "62% de fidélisation record. On crée du lien pour que les bénévoles reviennent.", icon: "Handshake", color: "accent" },
  ],
  methodTitle: "Notre méthodologie",
  phase1Title: "Phase 1 — Construire les conditions de réussite",
  phase1Items: [
    "Sécuriser et structurer le programme bénévoles (cadrage juridique, documents, masterplan)",
    "Donner du sens et rendre le programme attractif (cause, message d'engagement, communication)",
    "Préparer le déploiement opérationnel (logiciel, inscriptions, stratégie de mobilisation)",
  ],
  phase2Title: "Phase 2 — Animer, encadrer, fidéliser",
  phase2Items: [
    "Animer la mobilisation bénévole (suivi inscriptions, reporting, relances)",
    "Affecter, sécuriser et accompagner les bénévoles (analyse candidatures, affectations)",
    "Encadrer pendant l'événement (animation sur site, espace bénévoles)",
    "Évaluer et fidéliser la communauté (bilan, satisfaction, attestations)",
  ],
  keyStats: [
    { value: "90%", label: "Taux de couverture 2025" },
    { value: "95%", label: "Satisfaction bénévoles" },
    { value: "50-80%", label: "Fidélisation des bénévoles" },
  ],
  testimonialsTitle: "Ce que disent les organisateurs",
  contactTitle: "Parlons de votre événement",
  contactDescription: "Contactez Quentin Willems, notre directeur, pour discuter de votre programme bénévole.",
};

const volunteerDefaults = {
  heroBadge: "Accès réservé",
  heroTitle1: "Ton espace",
  heroTitle2: "bénévole",
  heroDescription: "Bienvenue dans ton espace dédié ! Retrouve toutes tes informations, tes disponibilités, tes événements et les newsletters.",
  features: [
    { title: "Tes événements", description: "Retrouve les événements auxquels tu es inscrit et tes missions.", icon: "Calendar" },
    { title: "Tes disponibilités", description: "Gère tes disponibilités et tes préférences de missions.", icon: "Settings" },
    { title: "Newsletters", description: "Accède à toutes les newsletters et infos de la communauté.", icon: "Bell" },
    { title: "Infos personnelles", description: "Mets à jour ton profil, tes coordonnées et tes compétences.", icon: "BookOpen" },
  ],
  ctaAccess: "Accéder à ton espace bénévole",
  ctaAccessNote: "Tu seras redirigé vers la plateforme Recrewteer.",
  registerTitle: "Pas encore inscrit ?",
  registerDescription: "Rejoins l'Amicale des Bénévoles pour accéder à ton espace personnel et découvrir tous nos événements.",
  registerButton: "Rejoindre l'Amicale",
};

const legalDefaults = {
  title: "Mentions légales",
  body: [
    { heading: "Éditeur du site", content: "<strong>Amicale des Bénévoles</strong><br />Association loi 1901<br />107 rue Bechevelin, 69007 Lyon<br />RNA : W691100560<br />Email : <a href=\"mailto:contact@amicaledesbenevoles.org\">contact@amicaledesbenevoles.org</a>" },
    { heading: "Responsable de publication", content: "Quentin Willems, Directeur" },
    { heading: "Hébergeur", content: "Vercel Inc.<br />440 N Bashaw St, San Francisco, CA 94107, USA" },
    { heading: "Propriété intellectuelle", content: "L'ensemble des contenus (textes, images, vidéos, logos) présents sur ce site sont protégés par le droit de la propriété intellectuelle. Toute reproduction, même partielle, est interdite sans accord préalable." },
    { heading: "Protection des données personnelles (RGPD)", content: "Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants sur vos données personnelles :<ul><li><strong>Droit d'accès</strong> : vous pouvez demander quelles données nous détenons sur vous.</li><li><strong>Droit de rectification</strong> : vous pouvez corriger vos données inexactes.</li><li><strong>Droit à l'effacement</strong> : vous pouvez demander la suppression de vos données.</li><li><strong>Droit d'opposition</strong> : vous pouvez vous opposer au traitement de vos données.</li><li><strong>Droit à la portabilité</strong> : vous pouvez récupérer vos données dans un format structuré.</li><li><strong>Droit à la limitation</strong> : vous pouvez demander la limitation du traitement.</li></ul>Pour exercer ces droits, contactez-nous à : <a href=\"mailto:contact@amicaledesbenevoles.org\">contact@amicaledesbenevoles.org</a>" },
    { heading: "Cookies", content: "Ce site n'utilise pas de cookies de traçage publicitaire. Des cookies techniques peuvent être utilisés pour assurer le bon fonctionnement du site." },
  ],
};

const siteDefaults = {
  navLinks: [
    { label: "Accueil", href: "/" },
    { label: "À propos", href: "/a-propos" },
    { label: "Événements", href: "/evenements" },
    { label: "Organisateurs", href: "/organisateurs" },
    { label: "Espace bénévole", href: "/espace-benevole" },
  ],
  navCtaLabel: "Rejoindre l'Amicale",
  footerTagline: "Association loi 1901 pour la promotion et le développement du bénévolat dans le milieu événementiel sportif et culturel.",
  footerNavTitle: "Navigation",
  footerContactTitle: "Contact",
  footerSocialTitle: "Suivez-nous",
  footerCopyright: "© {year} Amicale des Bénévoles. Tous droits réservés.",
  footerLegalLabel: "Mentions légales",
  ctaJoinLabel: "Rejoindre l'Amicale",
};

const docs = [
  { _id: "homePage", _type: "homePage", ...homeDefaults },
  { _id: "aboutPage", _type: "aboutPage", ...aboutDefaults },
  { _id: "eventsPage", _type: "eventsPage", ...eventsPageDefaults },
  { _id: "organizersPage", _type: "organizersPage", ...organizersDefaults },
  { _id: "volunteerPage", _type: "volunteerPage", ...volunteerDefaults },
  { _id: "legalPage", _type: "legalPage", ...legalDefaults },
];

async function mergeSiteSettings() {
  const existing = await client.fetch(`*[_id == "siteSettings"][0]`);
  const merged = {
    _id: "siteSettings",
    _type: "siteSettings",
    ...(existing || {}),
    ...siteDefaults,
  };
  await client.createOrReplace(merged);
  console.log("✅ siteSettings mis à jour (nav + footer)");
}

async function run() {
  console.log("🌱 Seed des textes de pages dans Sanity...\n");
  for (const doc of docs) {
    try {
      await client.createOrReplace(doc);
      console.log(`✅ ${doc._type} (${doc._id})`);
    } catch (err) {
      console.error(`❌ ${doc._id} :`, err.message);
    }
  }
  await mergeSiteSettings();
  console.log("\n🎉 Seed terminé. Ouvre /admin pour éditer les textes.");
}

run().catch((err) => {
  console.error("Erreur fatale :", err);
  process.exit(1);
});

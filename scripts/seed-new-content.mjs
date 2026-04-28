// Pousse les NOUVEAUX contenus Sanity (FAQ, Contact, sections "Comment ça marche", guide Recrewteer...)
// Ne touche pas au contenu existant (utilise createIfNotExists et patch ciblé).
// Usage : SANITY_TOKEN=xxx node scripts/seed-new-content.mjs

import { createClient } from "@sanity/client";

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID || "mp1jjp4v",
  dataset: process.env.SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_TOKEN,
});

if (!process.env.SANITY_TOKEN) {
  console.error("❌ SANITY_TOKEN manquant. Récupère un token : https://www.sanity.io/manage");
  process.exit(1);
}

// ─── HOME : section "Comment ça marche" ──────────────────────────────────────
const howItWorksPatch = {
  howItWorksKicker: "Comment ça marche",
  howItWorksTitle: "Devenir bénévole, en 3 étapes",
  howItWorksDescription: "Pas besoin d'expérience. Juste l'envie de vivre un moment fort.",
  howItWorksSteps: [
    {
      _key: "step01",
      step: "01",
      title: "Inscris-toi en 2 minutes",
      description:
        "Crée ton compte gratuit sur Recrewteer. Tu renseignes tes coordonnées et tes disponibilités, c'est tout.",
      icon: "UserPlus",
    },
    {
      _key: "step02",
      step: "02",
      title: "Choisis ton événement",
      description:
        "Parcours les événements ouverts, sélectionne celui qui te tente et la mission qui te correspond.",
      icon: "CalendarCheck",
    },
    {
      _key: "step03",
      step: "03",
      title: "Vis l'expérience",
      description:
        "Tu rejoins une équipe encadrée, tu prends ton poste, et tu repars avec des souvenirs et des potes.",
      icon: "Sparkles",
    },
  ],
};

// ─── ESPACE BÉNÉVOLE : guide Recrewteer + mini FAQ ───────────────────────────
const volunteerPatch = {
  guideKicker: "Guide de démarrage",
  guideTitle: "Première utilisation de Recrewteer ?",
  guideDescription: "Voici comment t'inscrire à un événement en 4 étapes.",
  guideSteps: [
    { _key: "g01", step: "01", title: "Connecte-toi à Recrewteer", description: "Identifie-toi avec ton email et ton mot de passe. Si tu as oublié ton mot de passe, utilise le lien « Mot de passe oublié » sur la page de connexion." },
    { _key: "g02", step: "02", title: "Choisis tes événements", description: "Dans l'onglet Événements, parcours les missions ouvertes. Clique sur un événement pour voir le planning et les missions disponibles." },
    { _key: "g03", step: "03", title: "Renseigne tes disponibilités", description: "Coche les créneaux où tu peux être présent·e. Tu peux aussi indiquer tes préférences de mission (accueil, ravitaillement, sécurité…)." },
    { _key: "g04", step: "04", title: "Reçois ta confirmation", description: "Une fois validée, tu reçois un email de confirmation avec toutes les infos pratiques : lieu, horaires, contact du chef de mission, repas, hébergement." },
  ],
  supportTitle: "Besoin d'aide ?",
  supportItems: [
    { _key: "sup1", q: "J'ai oublié mon mot de passe Recrewteer, comment faire ?", a: "Sur la page de connexion, clique sur « Mot de passe oublié ». Tu reçois un email pour le réinitialiser. Si tu ne reçois rien, vérifie tes spams ou contacte-nous." },
    { _key: "sup2", q: "Mon inscription est-elle confirmée ?", a: "Tu reçois toujours un email de confirmation après inscription à un événement. Si tu ne le reçois pas sous 48h, contacte le chef de mission de l'événement ou écris à contact@amicaledesbenevoles.org." },
    { _key: "sup3", q: "Comment annuler ma participation ?", a: "Connecte-toi à Recrewteer, va sur l'événement concerné et utilise le bouton de désinscription. Ou écris-nous directement, on s'occupe du reste." },
  ],
  supportLinkLabel: "Toutes les questions",
  supportContactLabel: "Nous écrire",
};

// ─── PAGE ÉVÉNEMENTS : libellés des filtres ──────────────────────────────────
const eventsPagePatch = {
  searchPlaceholder: "Rechercher un événement, une ville...",
  filterAllLabel: "Tous",
  filterSportLabel: "Sportif",
  filterCultureLabel: "Culturel",
};

// ─── FAQ : nouveau singleton ─────────────────────────────────────────────────
const faqPageDoc = {
  _id: "faqPage",
  _type: "faqPage",
  heroBadge: "Questions fréquentes",
  heroTitle1: "Tout ce que tu dois savoir avant de devenir",
  heroTitle2: "bénévole",
  heroDescription:
    "Inscription, missions, défraiements, hébergement, accessibilité… On a regroupé ici les questions qui reviennent le plus. Une question manque ? Écris-nous à contact@amicaledesbenevoles.org.",
  sections: [
    {
      _key: "secInscription",
      title: "S'inscrire et participer",
      items: [
        { _key: "q01", question: "Comment devenir bénévole avec l'Amicale ?", answer: "Crée gratuitement ton compte sur Recrewteer en 2 minutes. Tu renseignes tes coordonnées et tes disponibilités, puis tu choisis le ou les événements sur lesquels tu veux t'engager. Aucune cotisation, aucun engagement long terme." },
        { _key: "q02", question: "Faut-il avoir de l'expérience ou des compétences spécifiques ?", answer: "Non, aucune expérience n'est requise. Les missions sont expliquées sur place par les chefs de mission. Si une mission demande une compétence particulière (secourisme, conduite de véhicule…), c'est précisé dans la fiche de l'événement." },
        { _key: "q03", question: "À partir de quel âge peut-on être bénévole ?", answer: "L'âge minimum est 16 ans avec autorisation parentale. Certains événements exigent 18 ans selon les missions (sécurité, accès tardif). C'est précisé sur chaque événement." },
        { _key: "q04", question: "Combien de temps dois-je m'engager ?", answer: "Les missions vont de quelques heures à plusieurs jours selon l'événement. Tu choisis tes créneaux à l'inscription, en fonction de tes disponibilités. Aucune obligation au-delà de ce que tu acceptes." },
      ],
    },
    {
      _key: "secSurPlace",
      title: "Sur place",
      items: [
        { _key: "q05", question: "Suis-je défrayé pour ma participation ?", answer: "Le bénévolat est par définition non rémunéré. Cependant, pour chaque mission tu bénéficies de repas et boissons offerts, d'un t-shirt ou tenue spécifique, d'une accréditation, et parfois d'avantages partenaires (réductions, cadeaux, lots)." },
        { _key: "q06", question: "L'hébergement est-il fourni ?", answer: "Selon les événements et les distances, certains organisateurs proposent un hébergement collectif (camping, gymnase, dortoir). C'est précisé sur chaque événement. Pour les événements proches de chez toi, l'hébergement n'est généralement pas nécessaire." },
        { _key: "q07", question: "Que faire si je dois annuler ?", answer: "Préviens le plus tôt possible via ton espace bénévole Recrewteer ou par mail à contact@amicaledesbenevoles.org. Cela permet à l'Amicale de mobiliser un ou une autre bénévole à ta place." },
        { _key: "q08", question: "Suis-je assuré pendant ma mission ?", answer: "Oui, l'Amicale des Bénévoles a une assurance responsabilité civile qui couvre tous les bénévoles inscrits sur ses missions. Les organisateurs disposent également d'assurances spécifiques à leur événement." },
      ],
    },
    {
      _key: "secInclusion",
      title: "Accessibilité et inclusion",
      items: [
        { _key: "q09", question: "Le bénévolat est-il accessible aux personnes en situation de handicap ?", answer: "Oui. L'Amicale a une référente inclusive qui adapte les missions aux besoins de chaque bénévole. Contacte-la via la page À propos pour échanger sur tes besoins avant l'inscription." },
        { _key: "q10", question: "Puis-je venir avec un proche ou en groupe ?", answer: "Bien sûr. Beaucoup de bénévoles s'inscrivent en duo ou en groupe d'amis. Indique-le dans ton inscription Recrewteer pour qu'on essaie de vous placer sur les mêmes missions." },
      ],
    },
    {
      _key: "secOrganisateurs",
      title: "Pour les organisateurs",
      items: [
        { _key: "q11", question: "Comment l'Amicale aide les organisateurs à mobiliser leurs bénévoles ?", answer: "L'Amicale prend en charge tout le processus : recrutement, inscription, planning, encadrement sur place, fidélisation post-événement. Notre objectif : 95% de satisfaction côté bénévoles, 62% qui reviennent l'année suivante." },
        { _key: "q12", question: "Comment vous contacter pour un partenariat ?", answer: "Rendez-vous sur la page Organisateurs ou écrivez à quentin@amicaledesbenevoles.org. On revient vers vous sous 48h ouvrées." },
      ],
    },
  ],
  ctaTitle: "Prêt·e à te lancer ?",
  ctaDescription: "Crée ton compte sur Recrewteer et choisis ton premier événement.",
  ctaPrimary: "Rejoindre l'Amicale",
  ctaSecondary: "Voir les événements",
};

// ─── CONTACT : nouveau singleton ─────────────────────────────────────────────
const contactPageDoc = {
  _id: "contactPage",
  _type: "contactPage",
  heroTitle1: "Une question ?",
  heroTitle2: "On t'écoute.",
  heroDescription:
    "Bénévole, organisateur, partenaire, journaliste… Quel que soit ton sujet, on revient vers toi sous 48h ouvrées.",
  formTitle: "Nous écrire",
  formIntro: "Remplis ce formulaire, on te répond rapidement.",
  formNote:
    "Le formulaire ouvrira ton client mail avec un message pré-rempli. Si tu préfères, écris-nous directement à",
  sidebarTitle: "Coordonnées directes",
  sidebarReplyLabel: "Sous 48h ouvrées (lun-ven)",
  sidebarBoxTitle: "Tu es organisateur d'événement ?",
  sidebarBoxText:
    "Découvre comment l'Amicale peut mobiliser, encadrer et fidéliser tes bénévoles.",
  sidebarBoxLink: "Notre offre organisateurs →",
};

async function patch(id, data, label) {
  try {
    await client.patch(id).set(data).commit();
    console.log(`✓ ${label} mis à jour`);
  } catch (err) {
    console.error(`✗ ${label} : ${err.message}`);
  }
}

async function createIfNotExists(doc, label) {
  try {
    await client.createIfNotExists(doc);
    console.log(`✓ ${label} créé (ou déjà présent)`);
  } catch (err) {
    console.error(`✗ ${label} : ${err.message}`);
  }
}

(async () => {
  console.log("🌱 Seed des nouveaux contenus...\n");
  await patch("homePage", howItWorksPatch, "homePage » Comment ça marche");
  await patch("volunteerPage", volunteerPatch, "volunteerPage » Guide + Support");
  await patch("eventsPage", eventsPagePatch, "eventsPage » Filtres");
  await createIfNotExists(faqPageDoc, "faqPage");
  await createIfNotExists(contactPageDoc, "contactPage");
  console.log("\n✅ Terminé. Va dans le studio pour publier les modifications.");
})();

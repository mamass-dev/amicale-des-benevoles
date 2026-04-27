// Contenu par défaut de chaque page. Sert de fallback si Sanity ne renvoie rien
// (ou en local sans projet Sanity configuré). Le CMS Studio surcharge ces valeurs.

export const homeDefaults = {
  heroImage: "/images/events/swimrunman.jpg",
  missionImage: "/images/events/hero-benevoles.jpg",
  bannerImage: "/images/events/benevoles-openlakes.webp",
  ctaImage: "/images/events/event-outdoor.jpg",
  mosaicImages: [
    "/images/events/event-outdoor.jpg",
    "/images/events/benevoles-saintelyon.jpg",
    "/images/events/gf-ventoux.jpg",
    "/images/events/groupe-benevoles.jpg",
  ],
  heroBadge: "Association loi 1901 — Depuis 2019",
  heroTitle1: "Créateur d'expériences",
  heroTitle2: "citoyennes",
  heroSubtitle: "100% événementielles",
  heroDescription:
    "Que tu sois jeune ou moins jeune, il y a forcément un événement fait pour toi. Rejoins plus de 3 000 bénévoles engagés sur des événements sportifs et culturels partout en France.",
  heroCtaPrimary: "Rejoindre l'Amicale",
  heroCtaSecondary: "Voir les événements",
  howItWorksKicker: "Comment ça marche",
  howItWorksTitle: "Devenir bénévole, en 3 étapes",
  howItWorksDescription:
    "Pas besoin d'expérience. Juste l'envie de vivre un moment fort.",
  howItWorksSteps: [
    {
      step: "01",
      title: "Inscris-toi en 2 minutes",
      description:
        "Crée ton compte gratuit sur Recrewteer. Tu renseignes tes coordonnées et tes disponibilités, c'est tout.",
      icon: "UserPlus",
    },
    {
      step: "02",
      title: "Choisis ton événement",
      description:
        "Parcours les événements ouverts, sélectionne celui qui te tente et la mission qui te correspond.",
      icon: "CalendarCheck",
    },
    {
      step: "03",
      title: "Vis l'expérience",
      description:
        "Tu rejoins une équipe encadrée, tu prends ton poste, et tu repars avec des souvenirs et des potes.",
      icon: "Sparkles",
    },
  ],
  missionTitle: "Notre mission",
  missionText1:
    "Concevoir des expériences bénévoles de qualité et donner envie aux bénévoles de poursuivre leur engagement citoyen. Le bénévolat apporte une grande richesse humaine — l'association contribue à entretenir ce lien fraternel.",
  missionText2:
    "Les missions proposées par l'Amicale sont établies avec l'organisateur. Elles garantissent la qualité de l'expérience et la bonne relation organisateur/bénévole. Tu t'engages dans les meilleures conditions d'accueil, de respect et de considération.",
  missionTags: ["1 à 10 jours", "Sportif & culturel", "Partout en France"],
  pillars: [
    {
      title: "La cause",
      description:
        "S'engager pour une cause qui te semble juste et authentique. Chaque événement porte des valeurs qui donnent du sens à ton engagement.",
      icon: "Heart",
      color: "primary",
    },
    {
      title: "Le sentiment d'utilité",
      description:
        "Sans bénévole, il n'y a pas d'événement. Ta présence compte et fait concrètement vivre l'événement — c'est une fierté partagée.",
      icon: "Users",
      color: "secondary",
    },
    {
      title: "Le lien social",
      description:
        "Le bénévolat tout seul n'a pas de sens. Rencontre d'autres personnes engagées, crée des liens et vis des moments forts.",
      icon: "Handshake",
      color: "accent",
    },
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
  ctaDescription:
    "Rejoins l'Amicale des Bénévoles et découvre des événements extraordinaires. Chaque raison de s'engager est la bonne, puisque c'est la tienne.",
  ctaPrimary: "Rejoindre l'Amicale",
  ctaSecondary: "Voir les événements",
};

export const aboutDefaults = {
  heroImage: "/images/events/groupe-benevoles.jpg",
  teamGroupImage: "/images/team/equipe.png",
  heroTitle1: "Notre",
  heroTitle2: "histoire",
  heroDescription:
    "L'Amicale des Bénévoles est une association loi 1901, créée en 2019, qui œuvre pour la promotion et le développement du bénévolat dans le milieu événementiel sportif et culturel.",
  definitionQuote:
    "Est bénévole toute personne qui s'engage librement pour mener une action non salariée en direction d'autrui, en dehors de son temps professionnel et familial.",
  definitionSource: "Conseil Économique et Social, 24 février 1993",
  historyTitle: "D'où venons-nous ?",
  historyMilestones: [
    {
      year: "2013",
      title: "Les racines lyonnaises",
      description:
        "Championnats du Monde de para-athlétisme IPC à Lyon. Les fondateurs découvrent la puissance du bénévolat événementiel.",
      color: "primary",
    },
    {
      year: "2015",
      title: "L'expérience se confirme",
      description:
        "Championnats du Monde d'athlétisme Masters à Lyon. Le noyau de bénévoles se fidélise et l'idée d'une structure dédiée germe.",
      color: "primary",
    },
    {
      year: "2019",
      title: "Création de l'Amicale",
      description:
        "L'Amicale des Bénévoles voit le jour à Lyon. Une association loi 1901 dédiée à la promotion du bénévolat événementiel sportif et culturel.",
      color: "primary",
    },
    {
      year: "2026",
      title: "Aujourd'hui",
      description:
        "Plus de 3 000 bénévoles mobilisés, 18 événements et 62% de fidélisation record.",
      color: "accent",
    },
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
  inclusiveText:
    "L'Amicale est engagée pour un bénévolat inclusif et respectueux. Notre référente LGBTQIA+ et anti-discrimination accompagne et écoute tout bénévole qui en ressentirait le besoin, en toute confidentialité.",
  inclusiveReferentImage: "/images/team/member-1.jpg",
  inclusiveReferentName: "Maëlle Dufresnes",
  inclusiveReferentRole: "Référente LGBTQIA+ & anti-discrimination",
  inclusiveContactLabel: "Échanger en confidentialité",
  inclusiveContactEmail: "maelle@amicaledesbenevoles.org",
  teamPhotoCaption: "L'équipe de l'Amicale, réunie pour préparer la saison 2026.",
  ambassadorsTitle: "Les ambassadeurs",
  ambassadorsText:
    "Nos ambassadeurs représentent l'association et sont garants de ses valeurs. Ils guident et orientent les nouveaux bénévoles, apportent leurs retours d'expériences, leurs idées novatrices et leurs compétences personnelles.",
  ambassadorsCta: "Devenir ambassadeur",
};

export const eventsPageDefaults = {
  heroTitle1: "Nos",
  heroTitle2: "événements",
  heroDescription:
    "{count} événements sportifs et culturels dans le quart Sud-Est de la France. Qu'importe les raisons qui t'amènent à t'engager, ton acte citoyen est précieux !",
  searchPlaceholder: "Rechercher un événement, une ville...",
  filterAllLabel: "Tous",
  filterSportLabel: "Sportif",
  filterCultureLabel: "Culturel",
  ctaTitle: "Un événement te plaît ?",
  ctaDescription:
    "Inscris-toi à l'Amicale pour accéder aux inscriptions et vivre de belles aventures bénévoles.",
  ctaButton: "Rejoindre l'Amicale",
};

export const organizersDefaults = {
  heroTitle1: "Ami organisateur,",
  heroTitle2: "bienvenue !",
  heroDescription:
    "Nous mobilisons, encadrons et fidélisons les bénévoles sur vos événements sportifs et culturels. Notre métier : concevoir des programmes bénévoles utiles et durables.",
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

export const volunteerDefaults = {
  heroBadge: "Accès réservé",
  heroTitle1: "Ton espace",
  heroTitle2: "bénévole",
  heroDescription:
    "Bienvenue dans ton espace dédié ! Retrouve toutes tes informations, tes disponibilités, tes événements et les newsletters.",
  features: [
    { title: "Tes événements", description: "Retrouve les événements auxquels tu es inscrit et tes missions.", icon: "Calendar" },
    { title: "Tes disponibilités", description: "Gère tes disponibilités et tes préférences de missions.", icon: "Settings" },
    { title: "Newsletters", description: "Accède à toutes les newsletters et infos de la communauté.", icon: "Bell" },
    { title: "Infos personnelles", description: "Mets à jour ton profil, tes coordonnées et tes compétences.", icon: "BookOpen" },
  ],
  ctaAccess: "Accéder à ton espace bénévole",
  ctaAccessNote: "Tu seras redirigé vers la plateforme Recrewteer.",
  guideKicker: "Guide de démarrage",
  guideTitle: "Première utilisation de Recrewteer ?",
  guideDescription: "Voici comment t'inscrire à un événement en 4 étapes.",
  guideSteps: [
    {
      step: "01",
      title: "Connecte-toi à Recrewteer",
      description:
        "Identifie-toi avec ton email et ton mot de passe. Si tu as oublié ton mot de passe, utilise le lien « Mot de passe oublié » sur la page de connexion.",
    },
    {
      step: "02",
      title: "Choisis tes événements",
      description:
        "Dans l'onglet Événements, parcours les missions ouvertes. Clique sur un événement pour voir le planning et les missions disponibles.",
    },
    {
      step: "03",
      title: "Renseigne tes disponibilités",
      description:
        "Coche les créneaux où tu peux être présent·e. Tu peux aussi indiquer tes préférences de mission (accueil, ravitaillement, sécurité…).",
    },
    {
      step: "04",
      title: "Reçois ta confirmation",
      description:
        "Une fois validée, tu reçois un email de confirmation avec toutes les infos pratiques : lieu, horaires, contact du chef de mission, repas, hébergement.",
    },
  ],
  supportTitle: "Besoin d'aide ?",
  supportItems: [
    {
      q: "J'ai oublié mon mot de passe Recrewteer, comment faire ?",
      a: "Sur la page de connexion, clique sur « Mot de passe oublié ». Tu reçois un email pour le réinitialiser. Si tu ne reçois rien, vérifie tes spams ou contacte-nous.",
    },
    {
      q: "Mon inscription est-elle confirmée ?",
      a: "Tu reçois toujours un email de confirmation après inscription à un événement. Si tu ne le reçois pas sous 48h, contacte le chef de mission de l'événement ou écris à contact@amicaledesbenevoles.org.",
    },
    {
      q: "Comment annuler ma participation ?",
      a: "Connecte-toi à Recrewteer, va sur l'événement concerné et utilise le bouton de désinscription. Ou écris-nous directement, on s'occupe du reste.",
    },
  ],
  supportLinkLabel: "Toutes les questions",
  supportContactLabel: "Nous écrire",
  registerTitle: "Pas encore inscrit ?",
  registerDescription:
    "Rejoins l'Amicale des Bénévoles pour accéder à ton espace personnel et découvrir tous nos événements.",
  registerButton: "Rejoindre l'Amicale",
};

export const faqPageDefaults = {
  heroBadge: "Questions fréquentes",
  heroTitle1: "Tout ce que tu dois savoir avant de devenir",
  heroTitle2: "bénévole",
  heroDescription:
    "Inscription, missions, défraiements, hébergement, accessibilité… On a regroupé ici les questions qui reviennent le plus. Une question manque ? Écris-nous à contact@amicaledesbenevoles.org.",
  sections: [
    {
      title: "S'inscrire et participer",
      items: [
        {
          question: "Comment devenir bénévole avec l'Amicale ?",
          answer:
            "Crée gratuitement ton compte sur Recrewteer en 2 minutes. Tu renseignes tes coordonnées et tes disponibilités, puis tu choisis le ou les événements sur lesquels tu veux t'engager. Aucune cotisation, aucun engagement long terme.",
        },
        {
          question: "Faut-il avoir de l'expérience ou des compétences spécifiques ?",
          answer:
            "Non, aucune expérience n'est requise. Les missions sont expliquées sur place par les chefs de mission. Si une mission demande une compétence particulière (secourisme, conduite de véhicule…), c'est précisé dans la fiche de l'événement.",
        },
        {
          question: "À partir de quel âge peut-on être bénévole ?",
          answer:
            "L'âge minimum est 16 ans avec autorisation parentale. Certains événements exigent 18 ans selon les missions (sécurité, accès tardif). C'est précisé sur chaque événement.",
        },
        {
          question: "Combien de temps dois-je m'engager ?",
          answer:
            "Les missions vont de quelques heures à plusieurs jours selon l'événement. Tu choisis tes créneaux à l'inscription, en fonction de tes disponibilités. Aucune obligation au-delà de ce que tu acceptes.",
        },
      ],
    },
    {
      title: "Sur place",
      items: [
        {
          question: "Suis-je défrayé pour ma participation ?",
          answer:
            "Le bénévolat est par définition non rémunéré. Cependant, pour chaque mission tu bénéficies de repas et boissons offerts, d'un t-shirt ou tenue spécifique, d'une accréditation, et parfois d'avantages partenaires (réductions, cadeaux, lots).",
        },
        {
          question: "L'hébergement est-il fourni ?",
          answer:
            "Selon les événements et les distances, certains organisateurs proposent un hébergement collectif (camping, gymnase, dortoir). C'est précisé sur chaque événement. Pour les événements proches de chez toi, l'hébergement n'est généralement pas nécessaire.",
        },
        {
          question: "Que faire si je dois annuler ?",
          answer:
            "Préviens le plus tôt possible via ton espace bénévole Recrewteer ou par mail à contact@amicaledesbenevoles.org. Cela permet à l'Amicale de mobiliser un ou une autre bénévole à ta place.",
        },
        {
          question: "Suis-je assuré pendant ma mission ?",
          answer:
            "Oui, l'Amicale des Bénévoles a une assurance responsabilité civile qui couvre tous les bénévoles inscrits sur ses missions. Les organisateurs disposent également d'assurances spécifiques à leur événement.",
        },
      ],
    },
    {
      title: "Accessibilité et inclusion",
      items: [
        {
          question: "Le bénévolat est-il accessible aux personnes en situation de handicap ?",
          answer:
            "Oui. L'Amicale a une référente inclusive qui adapte les missions aux besoins de chaque bénévole. Contacte-la via la page À propos pour échanger sur tes besoins avant l'inscription.",
        },
        {
          question: "Puis-je venir avec un proche ou en groupe ?",
          answer:
            "Bien sûr. Beaucoup de bénévoles s'inscrivent en duo ou en groupe d'amis. Indique-le dans ton inscription Recrewteer pour qu'on essaie de vous placer sur les mêmes missions.",
        },
      ],
    },
    {
      title: "Pour les organisateurs",
      items: [
        {
          question: "Comment l'Amicale aide les organisateurs à mobiliser leurs bénévoles ?",
          answer:
            "L'Amicale prend en charge tout le processus : recrutement, inscription, planning, encadrement sur place, fidélisation post-événement. Notre objectif : 95% de satisfaction côté bénévoles, 62% qui reviennent l'année suivante.",
        },
        {
          question: "Comment vous contacter pour un partenariat ?",
          answer:
            "Rendez-vous sur la page Organisateurs ou écrivez à quentin@amicaledesbenevoles.org. On revient vers vous sous 48h ouvrées.",
        },
      ],
    },
  ],
  ctaTitle: "Prêt·e à te lancer ?",
  ctaDescription: "Crée ton compte sur Recrewteer et choisis ton premier événement.",
  ctaPrimary: "Rejoindre l'Amicale",
  ctaSecondary: "Voir les événements",
};

export const contactPageDefaults = {
  heroTitle1: "Une question ?",
  heroTitle2: "On t'écoute.",
  heroDescription:
    "Bénévole, organisateur, partenaire, journaliste… Quel que soit ton sujet, on revient vers toi sous 48h ouvrées.",
  formTitle: "Nous écrire",
  formIntro: "Remplis ce formulaire, on te répond rapidement.",
  formNote:
    "Le formulaire ouvrira ton client mail avec un message pré-rempli. Si tu préfères, écris-nous directement à l'adresse ci-dessous.",
  sidebarTitle: "Coordonnées directes",
  sidebarReplyLabel: "Sous 48h ouvrées (lun-ven)",
  sidebarBoxTitle: "Tu es organisateur d'événement ?",
  sidebarBoxText:
    "Découvre comment l'Amicale peut mobiliser, encadrer et fidéliser tes bénévoles.",
  sidebarBoxLink: "Notre offre organisateurs →",
};

export const legalDefaults = {
  title: "Mentions légales",
  body: [
    {
      heading: "Éditeur du site",
      content:
        "<strong>Amicale des Bénévoles</strong><br />Association loi 1901<br />107 rue Bechevelin, 69007 Lyon<br />RNA : W691100560<br />Email : <a href=\"mailto:contact@amicaledesbenevoles.org\">contact@amicaledesbenevoles.org</a>",
    },
    { heading: "Responsable de publication", content: "Quentin Willems, Directeur" },
    { heading: "Hébergeur", content: "Vercel Inc.<br />440 N Bashaw St, San Francisco, CA 94107, USA" },
    {
      heading: "Propriété intellectuelle",
      content:
        "L'ensemble des contenus (textes, images, vidéos, logos) présents sur ce site sont protégés par le droit de la propriété intellectuelle. Toute reproduction, même partielle, est interdite sans accord préalable.",
    },
    {
      heading: "Protection des données personnelles (RGPD)",
      content:
        "Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants sur vos données personnelles :<ul><li><strong>Droit d'accès</strong> : vous pouvez demander quelles données nous détenons sur vous.</li><li><strong>Droit de rectification</strong> : vous pouvez corriger vos données inexactes.</li><li><strong>Droit à l'effacement</strong> : vous pouvez demander la suppression de vos données.</li><li><strong>Droit d'opposition</strong> : vous pouvez vous opposer au traitement de vos données.</li><li><strong>Droit à la portabilité</strong> : vous pouvez récupérer vos données dans un format structuré.</li><li><strong>Droit à la limitation</strong> : vous pouvez demander la limitation du traitement.</li></ul>Pour exercer ces droits, contactez-nous à : <a href=\"mailto:contact@amicaledesbenevoles.org\">contact@amicaledesbenevoles.org</a>",
    },
    {
      heading: "Cookies",
      content:
        "Ce site n'utilise pas de cookies de traçage publicitaire. Des cookies techniques peuvent être utilisés pour assurer le bon fonctionnement du site.",
    },
  ],
};

export const siteDefaults = {
  logo: "/images/logo/logo-new.png",
  navLinks: [
    { label: "Accueil", href: "/" },
    { label: "À propos", href: "/a-propos" },
    { label: "Événements", href: "/evenements" },
    { label: "Organisateurs", href: "/organisateurs" },
    { label: "Espace bénévole", href: "/espace-benevole" },
  ],
  navCtaLabel: "Rejoindre l'Amicale",
  footerTagline:
    "Association loi 1901 pour la promotion et le développement du bénévolat dans le milieu événementiel sportif et culturel.",
  footerNavTitle: "Navigation",
  footerContactTitle: "Contact",
  footerSocialTitle: "Suivez-nous",
  footerCopyright: "© {year} Amicale des Bénévoles. Tous droits réservés.",
  footerLegalLabel: "Mentions légales",
  ctaJoinLabel: "Rejoindre l'Amicale",
};

export type HomeContent = typeof homeDefaults;
export type AboutContent = typeof aboutDefaults;
export type EventsPageContent = typeof eventsPageDefaults;
export type OrganizersContent = typeof organizersDefaults;
export type VolunteerContent = typeof volunteerDefaults;
export type LegalContent = typeof legalDefaults;
export type SiteContent = typeof siteDefaults;
export type FaqContent = typeof faqPageDefaults;
export type ContactContent = typeof contactPageDefaults;

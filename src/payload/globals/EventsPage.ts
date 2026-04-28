import type { GlobalConfig } from "payload";

export const EventsPage: GlobalConfig = {
  slug: "events-page",
  label: "📅 Page Événements",
  admin: {
    description: "La page /evenements (liste filtrable). Pour ajouter un événement, va dans Événements.",
  },
  access: { read: () => true },
  versions: { drafts: true },
  fields: [
    { name: "heroTitle1", type: "text" },
    { name: "heroTitle2", type: "text", label: "Mot coloré" },
    {
      name: "heroDescription",
      type: "textarea",
      admin: { description: "Tu peux utiliser {count} pour insérer le nombre d'événements." },
    },
    { name: "searchPlaceholder", type: "text", label: "Texte barre recherche" },
    { name: "filterAllLabel", type: "text", label: "Filtre Tous" },
    { name: "filterSportLabel", type: "text", label: "Filtre Sportif" },
    { name: "filterCultureLabel", type: "text", label: "Filtre Culturel" },
    { name: "ctaTitle", type: "text", label: "Titre CTA" },
    { name: "ctaDescription", type: "textarea", label: "Description CTA" },
    { name: "ctaButton", type: "text", label: "Bouton CTA" },
  ],
};

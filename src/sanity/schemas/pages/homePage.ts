import { defineField, defineType } from "sanity";
import { HomeIcon } from "@sanity/icons";

export default defineType({
  name: "homePage",
  title: "🏠 Page Accueil",
  type: "document",
  icon: HomeIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "mission", title: "Mission" },
    { name: "pillars", title: "3 piliers" },
    { name: "banner", title: "Bandeau photo" },
    { name: "events", title: "Section événements" },
    { name: "services", title: "Covoit / Hébergement" },
    { name: "gallery", title: "Galerie" },
    { name: "testimonials", title: "Témoignages" },
    { name: "partners", title: "Partenaires" },
    { name: "cta", title: "CTA final" },
  ],
  fields: [
    // Hero
    defineField({ name: "heroBadge", title: "Badge hero", type: "string", group: "hero" }),
    defineField({ name: "heroTitle1", title: "Titre hero (partie 1)", type: "string", group: "hero" }),
    defineField({ name: "heroTitle2", title: "Titre hero (mot coloré)", type: "string", group: "hero" }),
    defineField({ name: "heroSubtitle", title: "Sous-titre hero", type: "string", group: "hero" }),
    defineField({ name: "heroDescription", title: "Description hero", type: "text", rows: 3, group: "hero" }),
    defineField({ name: "heroCtaPrimary", title: "CTA principal", type: "string", group: "hero" }),
    defineField({ name: "heroCtaSecondary", title: "CTA secondaire", type: "string", group: "hero" }),

    // Mission
    defineField({ name: "missionTitle", title: "Titre mission", type: "string", group: "mission" }),
    defineField({ name: "missionText1", title: "Mission paragraphe 1", type: "text", rows: 4, group: "mission" }),
    defineField({ name: "missionText2", title: "Mission paragraphe 2", type: "text", rows: 4, group: "mission" }),
    defineField({
      name: "missionTags",
      title: "Tags mission",
      type: "array",
      of: [{ type: "string" }],
      group: "mission",
    }),

    // Piliers
    defineField({
      name: "pillars",
      title: "Piliers",
      type: "array",
      group: "pillars",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Titre", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
            defineField({
              name: "icon",
              title: "Icône",
              type: "string",
              options: { list: ["Heart", "Users", "Handshake", "Star", "Shield", "Award"] },
            }),
            defineField({
              name: "color",
              title: "Couleur",
              type: "string",
              options: { list: ["primary", "secondary", "accent"] },
            }),
          ],
        },
      ],
    }),

    // Bandeau
    defineField({ name: "bannerText", title: "Texte bandeau photo", type: "string", group: "banner" }),
    defineField({ name: "bannerSubtext", title: "Sous-texte bandeau", type: "string", group: "banner" }),

    // Events
    defineField({ name: "eventsTitle", title: "Titre événements", type: "string", group: "events" }),
    defineField({ name: "eventsSubtitle", title: "Sous-titre événements", type: "string", group: "events" }),
    defineField({ name: "eventsLinkLabel", title: "Lien 'tous les événements'", type: "string", group: "events" }),

    // Services
    defineField({ name: "servicesBadge", title: "Badge services", type: "string", group: "services" }),
    defineField({ name: "servicesTitle", title: "Titre services", type: "string", group: "services" }),
    defineField({ name: "servicesDescription", title: "Description services", type: "text", rows: 3, group: "services" }),
    defineField({ name: "carpoolTitle", title: "Carte covoiturage - titre", type: "string", group: "services" }),
    defineField({ name: "carpoolDescription", title: "Carte covoiturage - description", type: "text", rows: 3, group: "services" }),
    defineField({ name: "housingTitle", title: "Carte hébergement - titre", type: "string", group: "services" }),
    defineField({ name: "housingDescription", title: "Carte hébergement - description", type: "text", rows: 3, group: "services" }),
    defineField({ name: "servicesCtaLabel", title: "CTA 'Découvrir'", type: "string", group: "services" }),

    // Galerie
    defineField({ name: "galleryTitle", title: "Titre galerie", type: "string", group: "gallery" }),
    defineField({ name: "gallerySubtitle", title: "Sous-titre galerie", type: "string", group: "gallery" }),

    // Témoignages
    defineField({ name: "testimonialsTitle", title: "Titre témoignages", type: "string", group: "testimonials" }),

    // Partenaires
    defineField({ name: "partnersLabel", title: "Label partenaires", type: "string", group: "partners" }),

    // CTA final
    defineField({ name: "ctaTitle", title: "CTA titre", type: "string", group: "cta" }),
    defineField({ name: "ctaDescription", title: "CTA description", type: "text", rows: 3, group: "cta" }),
    defineField({ name: "ctaPrimary", title: "CTA bouton principal", type: "string", group: "cta" }),
    defineField({ name: "ctaSecondary", title: "CTA bouton secondaire", type: "string", group: "cta" }),
  ],
  preview: { prepare: () => ({ title: "🏠 Page d'accueil" }) },
});

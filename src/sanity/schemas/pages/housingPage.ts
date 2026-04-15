import { defineField, defineType } from "sanity";

export default defineType({
  name: "housingPage",
  title: "🛏️ Page Hébergement",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "trust", title: "Bande de confiance" },
    { name: "howitworks", title: "Comment ça marche" },
    { name: "testimonial", title: "Témoignage" },
    { name: "cta", title: "CTA final" },
  ],
  fields: [
    defineField({ name: "heroBadge", title: "Badge hero", type: "string", group: "hero" }),
    defineField({ name: "heroTitle1", title: "Titre hero (partie 1)", type: "string", group: "hero" }),
    defineField({ name: "heroTitle2", title: "Titre hero (partie colorée)", type: "string", group: "hero" }),
    defineField({ name: "heroDescription", title: "Description hero", type: "text", rows: 3, group: "hero" }),
    defineField({
      name: "heroStats",
      title: "Stats hero",
      type: "array",
      group: "hero",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "value", title: "Valeur", type: "string" }),
            defineField({ name: "label", title: "Label", type: "string" }),
          ],
        },
      ],
    }),
    defineField({ name: "heroCtaPrimary", title: "CTA principal", type: "string", group: "hero" }),
    defineField({ name: "heroCtaSecondary", title: "CTA secondaire", type: "string", group: "hero" }),

    defineField({
      name: "trustItems",
      title: "Éléments de confiance",
      type: "array",
      group: "trust",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Titre", type: "string" }),
            defineField({ name: "description", title: "Description", type: "string" }),
            defineField({
              name: "icon",
              title: "Icône",
              type: "string",
              options: { list: ["Heart", "Shield", "Clock", "Star", "Users", "Zap"] },
            }),
          ],
        },
      ],
    }),

    defineField({ name: "howBadge", title: "Badge 'Comment ça marche'", type: "string", group: "howitworks" }),
    defineField({ name: "howTitle", title: "Titre section", type: "string", group: "howitworks" }),
    defineField({
      name: "howSteps",
      title: "Étapes",
      type: "array",
      group: "howitworks",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "step", title: "Numéro", type: "string" }),
            defineField({ name: "title", title: "Titre", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
            defineField({
              name: "icon",
              title: "Icône",
              type: "string",
              options: { list: ["Home", "Calendar", "Users", "BedDouble", "MapPin"] },
            }),
          ],
        },
      ],
    }),

    defineField({ name: "testimonialText", title: "Texte témoignage", type: "text", rows: 4, group: "testimonial" }),
    defineField({ name: "testimonialAuthor", title: "Auteur", type: "string", group: "testimonial" }),
    defineField({ name: "testimonialRole", title: "Rôle", type: "string", group: "testimonial" }),

    defineField({ name: "faqTitle", title: "Titre FAQ", type: "string" }),
    defineField({ name: "faqSubtitle", title: "Sous-titre FAQ", type: "string" }),

    defineField({ name: "ctaTitle", title: "Titre CTA", type: "string", group: "cta" }),
    defineField({ name: "ctaDescription", title: "Description CTA", type: "text", rows: 3, group: "cta" }),
    defineField({ name: "ctaButton", title: "Bouton CTA", type: "string", group: "cta" }),
    defineField({ name: "ctaCrossLinkTitle", title: "Titre cross-link", type: "string", group: "cta" }),
    defineField({ name: "ctaCrossLinkText", title: "Texte cross-link", type: "string", group: "cta" }),
  ],
  preview: { prepare: () => ({ title: "🛏️ Page Hébergement" }) },
});

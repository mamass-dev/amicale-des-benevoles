import { defineField, defineType } from "sanity";
import { CaseIcon } from "@sanity/icons";

export default defineType({
  name: "organizersPage",
  title: "🤝 Page Organisateurs",
  type: "document",
  icon: CaseIcon,
  description:
    "Page /organisateurs : pitch commercial pour les organisateurs d'événements. Email et téléphone affichés automatiquement depuis Paramètres du site.",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "mission", title: "Mission" },
    { name: "method", title: "Méthodologie" },
    { name: "stats", title: "Chiffres" },
    { name: "testimonials", title: "Témoignages" },
    { name: "contact", title: "Contact" },
  ],
  fields: [
    defineField({ name: "heroTitle1", title: "Titre hero (partie 1)", type: "string", group: "hero" }),
    defineField({
      name: "heroTitle2",
      title: "Titre hero (mot coloré)",
      type: "string",
      description: "Le mot affiché en orange.",
      group: "hero",
    }),
    defineField({
      name: "heroDescription",
      title: "Description hero",
      type: "text",
      rows: 4,
      group: "hero",
    }),
    defineField({
      name: "heroTags",
      title: "Tags sous le hero",
      type: "array",
      of: [{ type: "string" }],
      description: "Petits encarts orange. Ex : « De 10 à 2000 bénévoles ».",
      group: "hero",
    }),

    defineField({ name: "missionTitle", title: "Titre mission", type: "string", group: "mission" }),
    defineField({
      name: "missionSubtitle",
      title: "Sous-titre mission",
      type: "string",
      description: "Phrase forte en orange juste sous le titre.",
      group: "mission",
    }),
    defineField({
      name: "missionTagline",
      title: "Baseline mission",
      type: "string",
      description: "Texte gris court sous le sous-titre.",
      group: "mission",
    }),
    defineField({
      name: "missionPillars",
      title: "Piliers (3 cartes)",
      type: "array",
      group: "mission",
      description: "3 cartes côte à côte (Mobiliser / Encadrer / Fidéliser).",
      validation: (r) => r.min(2).max(4),
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Titre", type: "string", validation: (r) => r.required() }),
            defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
            defineField({
              name: "icon",
              title: "Icône",
              type: "string",
              options: { list: ["Target", "Users", "Handshake", "Heart", "Star"] },
            }),
            defineField({
              name: "color",
              title: "Couleur",
              type: "string",
              options: { list: ["primary", "secondary", "accent"] },
            }),
          ],
          preview: {
            select: { title: "title" },
            prepare: ({ title }) => ({ title: title || "(sans titre)" }),
          },
        },
      ],
    }),

    defineField({ name: "methodTitle", title: "Titre méthodologie", type: "string", group: "method" }),
    defineField({
      name: "phase1Title",
      title: "Titre phase 1",
      type: "string",
      description: "Ex : « Phase 1 — Construire les conditions de réussite »",
      group: "method",
    }),
    defineField({
      name: "phase1Items",
      title: "Items phase 1",
      type: "array",
      of: [{ type: "string" }],
      group: "method",
    }),
    defineField({ name: "phase2Title", title: "Titre phase 2", type: "string", group: "method" }),
    defineField({
      name: "phase2Items",
      title: "Items phase 2",
      type: "array",
      of: [{ type: "string" }],
      group: "method",
    }),

    defineField({
      name: "keyStats",
      title: "Bandeau de chiffres",
      type: "array",
      group: "stats",
      description: "Bandeau bleu marine avec 3 chiffres clés.",
      validation: (r) => r.length(3).warning("3 chiffres pour un rendu équilibré."),
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "value", title: "Valeur (ex : 95%)", type: "string" }),
            defineField({ name: "label", title: "Label", type: "string" }),
          ],
          preview: {
            select: { title: "value", subtitle: "label" },
          },
        },
      ],
    }),

    defineField({
      name: "testimonialsTitle",
      title: "Titre témoignages",
      type: "string",
      description: "Les témoignages sont gérés dans la section Témoignages.",
      group: "testimonials",
    }),

    defineField({ name: "contactTitle", title: "Titre contact", type: "string", group: "contact" }),
    defineField({
      name: "contactDescription",
      title: "Description contact",
      type: "text",
      rows: 2,
      group: "contact",
    }),
  ],
  preview: { prepare: () => ({ title: "🤝 Page Organisateurs" }) },
});

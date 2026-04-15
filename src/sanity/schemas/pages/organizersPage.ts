import { defineField, defineType } from "sanity";

export default defineType({
  name: "organizersPage",
  title: "🤝 Page Organisateurs",
  type: "document",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "mission", title: "Mission" },
    { name: "method", title: "Méthodologie" },
    { name: "stats", title: "Chiffres" },
    { name: "testimonials", title: "Témoignages" },
    { name: "contact", title: "Contact" },
  ],
  fields: [
    defineField({ name: "heroTitle1", title: "Titre hero", type: "string", group: "hero" }),
    defineField({ name: "heroTitle2", title: "Mot coloré", type: "string", group: "hero" }),
    defineField({ name: "heroDescription", title: "Description hero", type: "text", rows: 4, group: "hero" }),
    defineField({
      name: "heroTags",
      title: "Tags",
      type: "array",
      of: [{ type: "string" }],
      group: "hero",
    }),

    defineField({ name: "missionTitle", title: "Titre mission", type: "string", group: "mission" }),
    defineField({ name: "missionSubtitle", title: "Sous-titre mission", type: "string", group: "mission" }),
    defineField({ name: "missionTagline", title: "Baseline mission", type: "string", group: "mission" }),
    defineField({
      name: "missionPillars",
      title: "Piliers mission",
      type: "array",
      group: "mission",
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
              options: { list: ["Target", "Users", "Handshake", "Heart", "Star"] },
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

    defineField({ name: "methodTitle", title: "Titre méthodologie", type: "string", group: "method" }),
    defineField({ name: "phase1Title", title: "Titre phase 1", type: "string", group: "method" }),
    defineField({
      name: "phase1Items",
      title: "Éléments phase 1",
      type: "array",
      of: [{ type: "string" }],
      group: "method",
    }),
    defineField({ name: "phase2Title", title: "Titre phase 2", type: "string", group: "method" }),
    defineField({
      name: "phase2Items",
      title: "Éléments phase 2",
      type: "array",
      of: [{ type: "string" }],
      group: "method",
    }),

    defineField({
      name: "keyStats",
      title: "Chiffres clés (bandeau)",
      type: "array",
      group: "stats",
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

    defineField({ name: "testimonialsTitle", title: "Titre témoignages", type: "string", group: "testimonials" }),

    defineField({ name: "contactTitle", title: "Titre contact", type: "string", group: "contact" }),
    defineField({ name: "contactDescription", title: "Description contact", type: "text", rows: 2, group: "contact" }),
  ],
  preview: { prepare: () => ({ title: "🤝 Page Organisateurs" }) },
});

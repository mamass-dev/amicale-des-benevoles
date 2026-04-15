import { defineField, defineType } from "sanity";

export default defineType({
  name: "eventsPage",
  title: "📅 Page Événements",
  type: "document",
  fields: [
    defineField({ name: "heroTitle1", title: "Titre hero (partie 1)", type: "string" }),
    defineField({ name: "heroTitle2", title: "Titre hero (mot coloré)", type: "string" }),
    defineField({
      name: "heroDescription",
      title: "Description hero (utiliser {count} pour insérer le nombre d'événements)",
      type: "text",
      rows: 3,
    }),
    defineField({ name: "ctaTitle", title: "Titre CTA final", type: "string" }),
    defineField({ name: "ctaDescription", title: "Description CTA", type: "text", rows: 3 }),
    defineField({ name: "ctaButton", title: "Bouton CTA", type: "string" }),
  ],
  preview: { prepare: () => ({ title: "📅 Page Événements" }) },
});

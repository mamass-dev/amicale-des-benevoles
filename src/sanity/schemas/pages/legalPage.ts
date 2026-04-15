import { defineField, defineType } from "sanity";

export default defineType({
  name: "legalPage",
  title: "⚖️ Page Mentions légales",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Titre", type: "string" }),
    defineField({
      name: "body",
      title: "Contenu (Markdown/HTML basique)",
      type: "array",
      of: [
        {
          type: "object",
          name: "section",
          fields: [
            defineField({ name: "heading", title: "Titre de section", type: "string" }),
            defineField({ name: "content", title: "Contenu (HTML autorisé)", type: "text", rows: 10 }),
          ],
          preview: { select: { title: "heading" } },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "⚖️ Mentions légales" }) },
});

import { defineField, defineType } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";

export default defineType({
  name: "legalPage",
  title: "⚖️ Page Mentions légales",
  type: "document",
  icon: DocumentTextIcon,
  description:
    "Mentions légales (RGPD, hébergeur, propriété intellectuelle...). Cette page n'est volontairement pas indexée par Google.",
  fields: [
    defineField({
      name: "title",
      title: "Titre de la page",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "body",
      title: "Sections",
      type: "array",
      description:
        "Chaque section a un titre et un contenu. Le contenu accepte le HTML basique (gras avec <strong>, lien avec <a href=\"...\">, listes <ul><li>...).",
      of: [
        {
          type: "object",
          name: "section",
          fields: [
            defineField({
              name: "heading",
              title: "Titre de section",
              type: "string",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "content",
              title: "Contenu",
              type: "text",
              rows: 10,
              description: "HTML basique autorisé (<strong>, <a>, <ul>, <li>, <br />).",
              validation: (r) => r.required(),
            }),
          ],
          preview: {
            select: { title: "heading" },
            prepare: ({ title }) => ({ title: title || "(section sans titre)" }),
          },
        },
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "⚖️ Mentions légales" }) },
});

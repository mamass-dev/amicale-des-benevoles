import { defineField, defineType } from "sanity";
import { CommentIcon } from "@sanity/icons";

export default defineType({
  name: "testimonial",
  title: "Témoignage",
  type: "document",
  icon: CommentIcon,
  description: "Les témoignages d'organisateurs affichés sur la page d'accueil et la page Organisateurs.",
  fields: [
    defineField({
      name: "name",
      title: "Nom de la personne",
      type: "string",
      description: "Ex : Mathieu Kurtz",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "org",
      title: "Organisation / Événement",
      type: "string",
      description: "Ex : High Five Festival, AREMACS...",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "text",
      title: "Témoignage",
      type: "text",
      rows: 4,
      description: "Le texte du témoignage. 2-3 phrases idéalement.",
      validation: (r) => r.required().min(20).error("Le témoignage doit faire au moins 20 caractères"),
    }),
    defineField({
      name: "image",
      title: "Photo (optionnel)",
      type: "image",
      description: "Photo de la personne. Si vide, ses initiales seront affichées.",
    }),
    defineField({
      name: "order",
      title: "Position dans la liste",
      type: "number",
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "org", text: "text" },
    prepare({ title, subtitle, text }) {
      return { title: `💬 ${title}`, subtitle: `${subtitle} — "${(text || "").substring(0, 60)}..."` };
    },
  },
});

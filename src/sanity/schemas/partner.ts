import { defineField, defineType } from "sanity";
import { StarIcon } from "@sanity/icons";

export default defineType({
  name: "partner",
  title: "Partenaire",
  type: "document",
  icon: StarIcon,
  description: "Les logos des partenaires et événements affichés en bas de la page d'accueil.",
  fields: [
    defineField({
      name: "name",
      title: "Nom du partenaire",
      type: "string",
      description: "Ex : Avoriaz, Colnago GF Series...",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      description: "Format PNG ou SVG sur fond transparent recommandé.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "url",
      title: "Site web (optionnel)",
      type: "url",
      description: "Si renseigné, le logo sera cliquable.",
    }),
    defineField({
      name: "order",
      title: "Position dans la liste",
      type: "number",
      description: "1 = premier affiché.",
    }),
  ],
  orderings: [
    { title: "Position", name: "order", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name", media: "logo" },
  },
});

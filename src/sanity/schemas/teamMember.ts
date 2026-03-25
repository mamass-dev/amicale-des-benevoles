import { defineField, defineType } from "sanity";
import { UsersIcon } from "@sanity/icons";

export default defineType({
  name: "teamMember",
  title: "Membre de l'équipe",
  type: "document",
  icon: UsersIcon,
  description: "Les membres du staff et du comité directeur affichés sur la page À propos.",
  fields: [
    defineField({
      name: "name",
      title: "Prénom et nom",
      type: "string",
      description: "Ex : Quentin Willems, Anne...",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "role",
      title: "Rôle / Poste",
      type: "string",
      description: "Ex : Directeur, Présidente, Trésorière...",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Catégorie",
      type: "string",
      description: "Le staff production apparaît en grand, le comité en petit.",
      options: {
        list: [
          { title: "👔 Équipe production (grande carte)", value: "staff" },
          { title: "🏛️ Comité directeur (petite carte)", value: "board" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "focus",
      title: "Spécialité",
      type: "string",
      description: "Uniquement pour le staff. Ex : Développement & Engagement",
      hidden: ({ document }) => document?.category !== "staff",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      description: "Affiché uniquement pour le staff sur la page Organisateurs.",
      hidden: ({ document }) => document?.category !== "staff",
    }),
    defineField({
      name: "phone",
      title: "Téléphone",
      type: "string",
      hidden: ({ document }) => document?.category !== "staff",
    }),
    defineField({
      name: "image",
      title: "Photo de profil",
      type: "image",
      description: "Photo carrée recommandée. Elle sera affichée en rond.",
      options: { hotspot: true },
    }),
    defineField({
      name: "order",
      title: "Position dans la liste",
      type: "number",
      description: "1 = premier affiché. Changez ce chiffre pour réorganiser.",
    }),
  ],
  orderings: [
    { title: "Position", name: "order", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "image", category: "category" },
    prepare({ title, subtitle, media, category }) {
      const emoji = category === "staff" ? "👔" : "🏛️";
      return { title: `${emoji} ${title}`, subtitle, media };
    },
  },
});

import { defineField, defineType } from "sanity";
import { CalendarIcon } from "@sanity/icons";

export default defineType({
  name: "event",
  title: "Événement",
  type: "document",
  icon: CalendarIcon,
  description: "Les événements sportifs et culturels sur lesquels l'Amicale mobilise des bénévoles.",
  groups: [
    { name: "infos", title: "Informations", icon: CalendarIcon, default: true },
    { name: "benevoles", title: "Bénévoles" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Nom de l'événement",
      type: "string",
      description: "Ex : La SaintéLyon, High Five Festival...",
      group: "infos",
      validation: (r) => r.required().error("Le nom est obligatoire"),
    }),
    defineField({
      name: "slug",
      title: "URL de la page",
      type: "slug",
      description: "Se génère automatiquement à partir du nom. Cliquez sur « Generate ».",
      options: { source: "name", slugify: (input) => input.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "") },
      group: "infos",
      validation: (r) => r.required().error("L'URL est obligatoire — cliquez sur Generate"),
    }),
    defineField({
      name: "type",
      title: "Type d'événement",
      type: "string",
      description: "Sportif ou culturel ? Cela change la couleur du badge.",
      options: {
        list: [
          { title: "🏃 Sportif", value: "sportif" },
          { title: "🎭 Culturel", value: "culturel" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      group: "infos",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "location",
      title: "Lieu",
      type: "string",
      description: "Ville + département. Ex : Chamonix (74), Lyon (69)",
      group: "infos",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "dates",
      title: "Dates (texte affiché sur le site)",
      type: "string",
      description: "Le texte tel qu'il apparaît. Ex : 27-28 novembre 2026",
      group: "infos",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "dateStart",
      title: "Date de début",
      type: "date",
      description: "Pour le tri chronologique.",
      group: "infos",
    }),
    defineField({
      name: "dateEnd",
      title: "Date de fin",
      type: "date",
      group: "infos",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "2-3 phrases pour donner envie aux bénévoles de s'inscrire.",
      group: "infos",
    }),
    defineField({
      name: "image",
      title: "Photo de l'événement",
      type: "image",
      description: "Format paysage recommandé (16:9). Elle apparaît sur les cartes et la page de l'événement.",
      options: { hotspot: true },
      group: "infos",
    }),
    defineField({
      name: "spots",
      title: "Nombre total de places bénévoles",
      type: "number",
      description: "Combien de bénévoles sont nécessaires au total ?",
      group: "benevoles",
      validation: (r) => r.min(1).error("Au moins 1 place"),
    }),
    defineField({
      name: "spotsFilled",
      title: "Places déjà remplies",
      type: "number",
      description: "Mettez à jour ce chiffre au fur et à mesure des inscriptions. La barre de progression se calcule automatiquement.",
      group: "benevoles",
      validation: (r) => r.min(0),
    }),
  ],
  orderings: [
    { title: "Date (prochain d'abord)", name: "dateAsc", by: [{ field: "dateStart", direction: "asc" }] },
    { title: "Nom A→Z", name: "nameAsc", by: [{ field: "name", direction: "asc" }] },
  ],
  preview: {
    select: { title: "name", subtitle: "dates", media: "image", type: "type", spots: "spots", spotsFilled: "spotsFilled" },
    prepare({ title, subtitle, media, type, spots, spotsFilled }) {
      const emoji = type === "sportif" ? "🏃" : "🎭";
      const fill = spots ? `${spotsFilled || 0}/${spots} bénévoles` : "";
      return { title: `${emoji} ${title}`, subtitle: `${subtitle || ""} — ${fill}`, media };
    },
  },
});

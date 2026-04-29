import { defineField, defineType } from "sanity";
import { CommentIcon } from "@sanity/icons";

export default defineType({
  name: "review",
  title: "Avis bénévole",
  type: "document",
  icon: CommentIcon,
  description: "Avis publics laissés par les bénévoles (Google, Trustpilot...)",
  fields: [
    defineField({
      name: "authorName",
      title: "Nom de l'auteur",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      options: {
        list: [
          { title: "🔵 Google", value: "google" },
          { title: "🟢 Trustpilot", value: "trustpilot" },
        ],
        layout: "radio",
      },
      initialValue: "google",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "rating",
      title: "Note (sur 5)",
      type: "number",
      validation: (r) => r.required().min(1).max(5),
      initialValue: 5,
    }),
    defineField({
      name: "text",
      title: "Avis",
      type: "text",
      rows: 4,
      validation: (r) => r.required().min(10),
    }),
    defineField({
      name: "eventName",
      title: "Événement concerné (optionnel)",
      type: "string",
      description: "Ex : T100, UTGC, Marathon du Vercors",
    }),
    defineField({
      name: "visitedAt",
      title: "Date de l'événement",
      type: "date",
      description: "Quand l'expérience a eu lieu (mois + année).",
    }),
    defineField({
      name: "order",
      title: "Position d'affichage",
      type: "number",
      initialValue: 0,
      description: "Plus petit = en premier.",
    }),
  ],
  orderings: [
    { title: "Position", name: "order", by: [{ field: "order", direction: "asc" }] },
    { title: "Plus récent", name: "recent", by: [{ field: "visitedAt", direction: "desc" }] },
  ],
  preview: {
    select: { title: "authorName", subtitle: "text", source: "source", rating: "rating" },
    prepare({ title, subtitle, source, rating }) {
      const stars = "★".repeat(rating ?? 5);
      const sourceEmoji = source === "trustpilot" ? "🟢" : "🔵";
      return {
        title: `${sourceEmoji} ${title} ${stars}`,
        subtitle: (subtitle || "").substring(0, 80),
      };
    },
  },
});

import { defineField, defineType } from "sanity";
import { HelpCircleIcon } from "@sanity/icons";

export default defineType({
  name: "faq",
  title: "Question fréquente (FAQ)",
  type: "document",
  icon: HelpCircleIcon,
  description: "Les questions/réponses affichées en bas des pages Covoiturage et Hébergement.",
  fields: [
    defineField({
      name: "category",
      title: "Sur quelle page ?",
      type: "string",
      description: "La FAQ apparaîtra sur la page correspondante.",
      options: {
        list: [
          { title: "🚗 Page Covoiturage", value: "covoiturage" },
          { title: "🛏️ Page Hébergement", value: "hebergement" },
          { title: "📋 Général", value: "general" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "question",
      title: "Question",
      type: "string",
      description: "La question telle qu'elle sera affichée. Ex : L'hébergement est-il gratuit ?",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "answer",
      title: "Réponse",
      type: "text",
      rows: 4,
      description: "La réponse complète. Rédigez de façon claire et concise.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "order",
      title: "Position dans la liste",
      type: "number",
      description: "1 = première question affichée.",
    }),
  ],
  orderings: [
    { title: "Position", name: "order", by: [{ field: "order", direction: "asc" }] },
    { title: "Catégorie", name: "category", by: [{ field: "category", direction: "asc" }] },
  ],
  preview: {
    select: { title: "question", category: "category" },
    prepare({ title, category }) {
      const emojis: Record<string, string> = { covoiturage: "🚗", hebergement: "🛏️", general: "📋" };
      return { title: `${emojis[category] || "❓"} ${title}`, subtitle: category === "covoiturage" ? "Covoiturage" : category === "hebergement" ? "Hébergement" : "Général" };
    },
  },
});

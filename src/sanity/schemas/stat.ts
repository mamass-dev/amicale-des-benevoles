import { defineField, defineType } from "sanity";
import { TrendUpwardIcon } from "@sanity/icons";

export default defineType({
  name: "stat",
  title: "Chiffre clé",
  type: "document",
  icon: TrendUpwardIcon,
  description: "Les chiffres animés affichés sur la page d'accueil (section sombre).",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      description: "Le texte sous le chiffre. Ex : De satisfaction, Bénévoles mobilisés...",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "value",
      title: "Valeur (nombre)",
      type: "number",
      description: "Juste le nombre, sans symbole. Ex : 95, 3000, 62...",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "suffix",
      title: "Symbole après le nombre",
      type: "string",
      description: "Ex : %, +, ou laisser vide. Sera affiché juste après le nombre.",
    }),
    defineField({
      name: "order",
      title: "Position dans la liste",
      type: "number",
      description: "1 = premier affiché de gauche à droite.",
    }),
  ],
  preview: {
    select: { label: "label", value: "value", suffix: "suffix" },
    prepare({ label, value, suffix }) {
      return { title: `📊 ${value}${suffix || ""}`, subtitle: label };
    },
  },
});

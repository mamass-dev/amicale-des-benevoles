import { defineField, defineType } from "sanity";
import { UsersIcon } from "@sanity/icons";

export default defineType({
  name: "aboutPage",
  title: "ℹ️ Page À propos",
  type: "document",
  icon: UsersIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "definition", title: "Définition bénévolat" },
    { name: "history", title: "Notre histoire" },
    { name: "values", title: "Valeurs" },
    { name: "team", title: "Équipe" },
    { name: "inclusive", title: "Engagement inclusif" },
    { name: "ambassadors", title: "Ambassadeurs" },
  ],
  fields: [
    defineField({ name: "heroTitle1", title: "Titre hero (partie 1)", type: "string", group: "hero" }),
    defineField({ name: "heroTitle2", title: "Titre hero (mot coloré)", type: "string", group: "hero" }),
    defineField({ name: "heroDescription", title: "Description hero", type: "text", rows: 4, group: "hero" }),

    defineField({ name: "definitionQuote", title: "Citation définition", type: "text", rows: 4, group: "definition" }),
    defineField({ name: "definitionSource", title: "Source citation", type: "string", group: "definition" }),

    defineField({ name: "historyTitle", title: "Titre section histoire", type: "string", group: "history" }),
    defineField({
      name: "historyMilestones",
      title: "Jalons",
      type: "array",
      group: "history",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "year", title: "Année", type: "string" }),
            defineField({ name: "title", title: "Titre", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
            defineField({
              name: "color",
              title: "Couleur puce",
              type: "string",
              options: { list: ["primary", "secondary", "accent"] },
              initialValue: "primary",
            }),
          ],
        },
      ],
    }),

    defineField({ name: "valuesTitle", title: "Titre valeurs", type: "string", group: "values" }),
    defineField({
      name: "values",
      title: "Valeurs",
      type: "array",
      group: "values",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", title: "Titre", type: "string" }),
            defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
            defineField({
              name: "icon",
              title: "Icône",
              type: "string",
              options: { list: ["Heart", "Shield", "Users", "Award", "Star", "Handshake"] },
            }),
          ],
        },
      ],
    }),

    defineField({ name: "teamTitle", title: "Titre équipe", type: "string", group: "team" }),
    defineField({ name: "teamStaffTitle", title: "Sous-titre staff", type: "string", group: "team" }),
    defineField({ name: "teamBoardTitle", title: "Sous-titre comité", type: "string", group: "team" }),

    defineField({ name: "inclusiveTitle", title: "Titre engagement inclusif", type: "string", group: "inclusive" }),
    defineField({ name: "inclusiveText", title: "Texte engagement inclusif", type: "text", rows: 4, group: "inclusive" }),

    defineField({ name: "ambassadorsTitle", title: "Titre ambassadeurs", type: "string", group: "ambassadors" }),
    defineField({ name: "ambassadorsText", title: "Texte ambassadeurs", type: "text", rows: 4, group: "ambassadors" }),
    defineField({ name: "ambassadorsCta", title: "CTA ambassadeurs", type: "string", group: "ambassadors" }),
  ],
  preview: { prepare: () => ({ title: "ℹ️ Page À propos" }) },
});

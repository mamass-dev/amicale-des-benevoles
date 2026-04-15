import { defineField, defineType } from "sanity";

export default defineType({
  name: "volunteerPage",
  title: "👤 Page Espace Bénévole",
  type: "document",
  fields: [
    defineField({ name: "heroBadge", title: "Badge hero", type: "string" }),
    defineField({ name: "heroTitle1", title: "Titre hero", type: "string" }),
    defineField({ name: "heroTitle2", title: "Mot coloré", type: "string" }),
    defineField({ name: "heroDescription", title: "Description hero", type: "text", rows: 3 }),

    defineField({
      name: "features",
      title: "Fonctionnalités",
      type: "array",
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
              options: { list: ["Calendar", "Settings", "Bell", "BookOpen", "User"] },
            }),
          ],
        },
      ],
    }),

    defineField({ name: "ctaAccess", title: "Texte bouton accès", type: "string" }),
    defineField({ name: "ctaAccessNote", title: "Note sous le bouton", type: "string" }),

    defineField({ name: "registerTitle", title: "Titre 'Pas encore inscrit'", type: "string" }),
    defineField({ name: "registerDescription", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "registerButton", title: "Bouton", type: "string" }),
  ],
  preview: { prepare: () => ({ title: "👤 Page Espace Bénévole" }) },
});

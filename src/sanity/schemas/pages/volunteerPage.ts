import { defineField, defineType } from "sanity";
import { UserIcon } from "@sanity/icons";

export default defineType({
  name: "volunteerPage",
  title: "👤 Page Espace Bénévole",
  type: "document",
  icon: UserIcon,
  description: "Page /espace-benevole : redirection vers Recrewteer + guide d'utilisation + mini-FAQ.",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "features", title: "Fonctionnalités" },
    { name: "guide", title: "Guide Recrewteer" },
    { name: "support", title: "Aide rapide" },
    { name: "register", title: "Inscription" },
  ],
  fields: [
    defineField({ name: "heroBadge", title: "Badge en haut du hero", type: "string", group: "hero" }),
    defineField({ name: "heroTitle1", title: "Titre hero (partie 1)", type: "string", group: "hero" }),
    defineField({ name: "heroTitle2", title: "Titre hero (mot coloré)", type: "string", group: "hero" }),
    defineField({ name: "heroDescription", title: "Description hero", type: "text", rows: 3, group: "hero" }),

    defineField({
      name: "features",
      title: "Fonctionnalités de l'espace",
      type: "array",
      group: "features",
      description: "4 cartes affichées en grille (calendrier, dispos, newsletters, profil).",
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
          preview: {
            select: { title: "title" },
            prepare: ({ title }) => ({ title: title || "(sans titre)" }),
          },
        },
      ],
    }),

    defineField({ name: "ctaAccess", title: "Texte du bouton d'accès", type: "string", group: "features" }),
    defineField({ name: "ctaAccessNote", title: "Note sous le bouton", type: "string", group: "features" }),

    defineField({
      name: "guideKicker",
      title: "Surtitre du guide",
      type: "string",
      description: "Ex : « Guide de démarrage »",
      group: "guide",
    }),
    defineField({ name: "guideTitle", title: "Titre du guide", type: "string", group: "guide" }),
    defineField({ name: "guideDescription", title: "Description courte", type: "string", group: "guide" }),
    defineField({
      name: "guideSteps",
      title: "Étapes du guide",
      type: "array",
      group: "guide",
      description: "Suite d'étapes pour utiliser Recrewteer (4 étapes recommandées).",
      validation: (r) => r.min(2).max(6),
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "step",
              title: "Numéro",
              type: "string",
              description: "Ex : « 01 »",
              validation: (r) => r.required(),
            }),
            defineField({ name: "title", title: "Titre", type: "string", validation: (r) => r.required() }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 3,
              validation: (r) => r.required(),
            }),
          ],
          preview: {
            select: { step: "step", title: "title" },
            prepare: ({ step, title }) => ({
              title: `${step ?? "??"} — ${title ?? "(sans titre)"}`,
            }),
          },
        },
      ],
    }),

    defineField({ name: "supportTitle", title: "Titre section aide", type: "string", group: "support" }),
    defineField({
      name: "supportItems",
      title: "Mini-FAQ",
      type: "array",
      group: "support",
      description: "3-5 questions essentielles. La FAQ complète est sur la page /faq.",
      validation: (r) => r.max(8),
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "q", title: "Question", type: "string", validation: (r) => r.required() }),
            defineField({ name: "a", title: "Réponse", type: "text", rows: 3, validation: (r) => r.required() }),
          ],
          preview: {
            select: { title: "q" },
            prepare: ({ title }) => ({ title: title || "(question vide)" }),
          },
        },
      ],
    }),
    defineField({
      name: "supportLinkLabel",
      title: "Libellé bouton « Toutes les questions »",
      type: "string",
      group: "support",
    }),
    defineField({
      name: "supportContactLabel",
      title: "Libellé bouton « Nous écrire »",
      type: "string",
      group: "support",
    }),

    defineField({ name: "registerTitle", title: "Titre « Pas encore inscrit »", type: "string", group: "register" }),
    defineField({
      name: "registerDescription",
      title: "Description",
      type: "text",
      rows: 3,
      group: "register",
    }),
    defineField({ name: "registerButton", title: "Bouton", type: "string", group: "register" }),
  ],
  preview: { prepare: () => ({ title: "👤 Page Espace Bénévole" }) },
});

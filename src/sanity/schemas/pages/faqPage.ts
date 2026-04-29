import { defineField, defineType } from "sanity";
import { HelpCircleIcon } from "@sanity/icons";

export default defineType({
  name: "faqPage",
  title: "❓ Page FAQ",
  type: "document",
  icon: HelpCircleIcon,
  description: "Questions/réponses affichées sur /faq. Ces contenus alimentent aussi le schéma FAQ pour Google.",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "sections", title: "Sections de questions" },
    { name: "cta", title: "CTA final" },
  ],
  fields: [
    defineField({
      name: "heroBadge",
      title: "Badge en haut du hero",
      type: "string",
      description: "Petit texte au-dessus du titre. Ex : « Questions fréquentes »",
      group: "hero",
    }),
    defineField({
      name: "heroTitle1",
      title: "Titre hero (partie 1)",
      type: "string",
      group: "hero",
    }),
    defineField({
      name: "heroTitle2",
      title: "Titre hero (mot coloré)",
      type: "string",
      description: "Le mot mis en avant en orange dans le titre.",
      group: "hero",
    }),
    defineField({
      name: "heroDescription",
      title: "Description sous le titre",
      type: "text",
      rows: 4,
      group: "hero",
    }),

    defineField({
      name: "sections",
      title: "Sections de questions",
      type: "array",
      group: "sections",
      description:
        "Chaque section regroupe plusieurs questions par thème. Ajoute autant de sections que nécessaire.",
      of: [
        {
          type: "object",
          name: "faqSection",
          title: "Section",
          fields: [
            defineField({
              name: "title",
              title: "Titre de la section",
              type: "string",
              description: "Ex : « S'inscrire et participer », « Sur place »...",
              validation: (r) => r.required(),
            }),
            defineField({
              name: "items",
              title: "Questions de cette section",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "faqItem",
                  fields: [
                    defineField({
                      name: "question",
                      title: "Question",
                      type: "string",
                      description: "Formule la question telle qu'un visiteur pourrait la poser.",
                      validation: (r) => r.required(),
                    }),
                    defineField({
                      name: "answer",
                      title: "Réponse",
                      type: "text",
                      rows: 4,
                      description: "Réponse claire en 2-4 phrases. Évite les phrases trop longues.",
                      validation: (r) => r.required(),
                    }),
                  ],
                  preview: {
                    select: { title: "question" },
                    prepare: ({ title }) => ({ title: title || "(question vide)" }),
                  },
                },
              ],
              validation: (r) => r.min(1).error("Ajoute au moins une question"),
            }),
          ],
          preview: {
            select: { title: "title", items: "items" },
            prepare: ({ title, items }) => ({
              title: title || "(section sans nom)",
              subtitle: `${items?.length || 0} question${(items?.length || 0) > 1 ? "s" : ""}`,
            }),
          },
        },
      ],
    }),

    defineField({
      name: "ctaTitle",
      title: "Titre CTA final",
      type: "string",
      group: "cta",
    }),
    defineField({
      name: "ctaDescription",
      title: "Description CTA",
      type: "text",
      rows: 2,
      group: "cta",
    }),
    defineField({
      name: "ctaPrimary",
      title: "Bouton principal",
      type: "string",
      group: "cta",
    }),
    defineField({
      name: "ctaSecondary",
      title: "Bouton secondaire",
      type: "string",
      group: "cta",
    }),
  ],
  preview: { prepare: () => ({ title: "❓ Page FAQ" }) },
});

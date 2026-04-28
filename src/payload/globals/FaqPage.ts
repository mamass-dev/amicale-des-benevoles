import type { GlobalConfig } from "payload";

export const FaqPage: GlobalConfig = {
  slug: "faq-page",
  label: "❓ FAQ",
  admin: {
    description:
      "Questions/réponses affichées sur /faq. Le schema FAQ Google se met à jour automatiquement.",
  },
  access: { read: () => true },
  versions: { drafts: true },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          fields: [
            { name: "heroBadge", type: "text" },
            { name: "heroTitle1", type: "text" },
            { name: "heroTitle2", type: "text", label: "Mot coloré" },
            { name: "heroDescription", type: "textarea" },
          ],
        },
        {
          label: "Sections",
          fields: [
            {
              name: "sections",
              type: "array",
              label: "Sections de questions",
              minRows: 1,
              admin: {
                description:
                  "Chaque section regroupe plusieurs questions par thème. Ajoute autant de sections que nécessaire.",
              },
              fields: [
                {
                  name: "title",
                  type: "text",
                  label: "Titre de la section",
                  required: true,
                  admin: { description: "Ex : « S'inscrire et participer », « Sur place »..." },
                },
                {
                  name: "items",
                  type: "array",
                  label: "Questions",
                  minRows: 1,
                  fields: [
                    {
                      name: "question",
                      type: "text",
                      label: "Question",
                      required: true,
                      admin: { description: "Telle qu'un visiteur la poserait." },
                    },
                    {
                      name: "answer",
                      type: "textarea",
                      label: "Réponse",
                      required: true,
                      admin: { description: "2-4 phrases claires." },
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "CTA final",
          fields: [
            { name: "ctaTitle", type: "text" },
            { name: "ctaDescription", type: "textarea" },
            { name: "ctaPrimary", type: "text", label: "Bouton principal" },
            { name: "ctaSecondary", type: "text", label: "Bouton secondaire" },
          ],
        },
      ],
    },
  ],
};

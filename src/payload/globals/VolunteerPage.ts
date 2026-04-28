import type { GlobalConfig } from "payload";

export const VolunteerPage: GlobalConfig = {
  slug: "volunteer-page",
  label: "👤 Espace Bénévole",
  admin: { description: "Page /espace-benevole : redirection Recrewteer + guide + mini-FAQ." },
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
          label: "Fonctionnalités",
          fields: [
            {
              name: "features",
              type: "array",
              fields: [
                { name: "title", type: "text", required: true },
                { name: "description", type: "textarea", required: true },
                {
                  name: "icon",
                  type: "select",
                  options: ["Calendar", "Settings", "Bell", "BookOpen", "User"].map((v) => ({
                    label: v,
                    value: v,
                  })),
                },
              ],
            },
            { name: "ctaAccess", type: "text", label: "Texte bouton accès" },
            { name: "ctaAccessNote", type: "text", label: "Note sous le bouton" },
          ],
        },
        {
          label: "Guide Recrewteer",
          fields: [
            { name: "guideKicker", type: "text", label: "Surtitre" },
            { name: "guideTitle", type: "text" },
            { name: "guideDescription", type: "text" },
            {
              name: "guideSteps",
              type: "array",
              minRows: 2,
              maxRows: 6,
              fields: [
                { name: "step", type: "text", required: true },
                { name: "title", type: "text", required: true },
                { name: "description", type: "textarea", required: true },
              ],
            },
          ],
        },
        {
          label: "Mini-FAQ",
          fields: [
            { name: "supportTitle", type: "text" },
            {
              name: "supportItems",
              type: "array",
              maxRows: 8,
              fields: [
                { name: "q", type: "text", label: "Question", required: true },
                { name: "a", type: "textarea", label: "Réponse", required: true },
              ],
            },
            { name: "supportLinkLabel", type: "text" },
            { name: "supportContactLabel", type: "text" },
          ],
        },
        {
          label: "Inscription",
          fields: [
            { name: "registerTitle", type: "text" },
            { name: "registerDescription", type: "textarea" },
            { name: "registerButton", type: "text" },
          ],
        },
      ],
    },
  ],
};

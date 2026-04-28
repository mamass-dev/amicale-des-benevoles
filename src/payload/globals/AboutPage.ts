import type { GlobalConfig } from "payload";

export const AboutPage: GlobalConfig = {
  slug: "about-page",
  label: "ℹ️ À propos",
  admin: { description: "Page À propos : histoire, valeurs, équipe, engagement inclusif." },
  access: { read: () => true },
  versions: { drafts: true },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          fields: [
            { name: "heroImage", type: "upload", relationTo: "media", label: "Photo hero" },
            { name: "heroTitle1", type: "text" },
            { name: "heroTitle2", type: "text", label: "Mot coloré" },
            { name: "heroDescription", type: "textarea" },
          ],
        },
        {
          label: "Définition",
          fields: [
            { name: "definitionQuote", type: "textarea", label: "Citation" },
            { name: "definitionSource", type: "text", label: "Source" },
          ],
        },
        {
          label: "Histoire",
          fields: [
            { name: "historyTitle", type: "text" },
            {
              name: "historyMilestones",
              type: "array",
              label: "Jalons",
              fields: [
                { name: "year", type: "text", required: true },
                { name: "title", type: "text", required: true },
                { name: "description", type: "textarea", required: true },
                {
                  name: "color",
                  type: "select",
                  defaultValue: "primary",
                  options: [
                    { label: "Orange", value: "primary" },
                    { label: "Rouge corail", value: "accent" },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Valeurs",
          fields: [
            { name: "valuesTitle", type: "text" },
            {
              name: "values",
              type: "array",
              fields: [
                { name: "title", type: "text", required: true },
                { name: "description", type: "textarea", required: true },
                {
                  name: "icon",
                  type: "select",
                  options: ["Heart", "Shield", "Users", "Award", "Star", "Handshake"].map((v) => ({
                    label: v,
                    value: v,
                  })),
                },
              ],
            },
          ],
        },
        {
          label: "Équipe",
          fields: [
            { name: "teamTitle", type: "text" },
            { name: "teamStaffTitle", type: "text", label: "Sous-titre staff" },
            { name: "teamBoardTitle", type: "text", label: "Sous-titre comité" },
            {
              name: "teamGroupImage",
              type: "upload",
              relationTo: "media",
              label: "Photo de groupe",
            },
            { name: "teamPhotoCaption", type: "text", label: "Légende photo" },
          ],
        },
        {
          label: "Engagement inclusif",
          fields: [
            { name: "inclusiveTitle", type: "text" },
            { name: "inclusiveText", type: "textarea" },
            { name: "inclusiveReferentImage", type: "upload", relationTo: "media", label: "Photo référente" },
            { name: "inclusiveReferentName", type: "text" },
            { name: "inclusiveReferentRole", type: "text" },
            { name: "inclusiveContactLabel", type: "text" },
            { name: "inclusiveContactEmail", type: "email" },
          ],
        },
        {
          label: "Ambassadeurs",
          fields: [
            { name: "ambassadorsTitle", type: "text" },
            { name: "ambassadorsText", type: "textarea" },
            { name: "ambassadorsCta", type: "text" },
          ],
        },
      ],
    },
  ],
};

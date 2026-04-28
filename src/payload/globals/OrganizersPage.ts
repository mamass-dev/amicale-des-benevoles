import type { GlobalConfig } from "payload";

export const OrganizersPage: GlobalConfig = {
  slug: "organizers-page",
  label: "🤝 Organisateurs",
  admin: { description: "Page Organisateurs : pitch commercial." },
  access: { read: () => true },
  versions: { drafts: true },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          fields: [
            { name: "heroTitle1", type: "text" },
            { name: "heroTitle2", type: "text", label: "Mot coloré" },
            { name: "heroDescription", type: "textarea" },
            {
              name: "heroTags",
              type: "array",
              fields: [{ name: "label", type: "text", required: true }],
            },
          ],
        },
        {
          label: "Mission",
          fields: [
            { name: "missionTitle", type: "text" },
            { name: "missionSubtitle", type: "text" },
            { name: "missionTagline", type: "text" },
            {
              name: "missionPillars",
              type: "array",
              minRows: 2,
              maxRows: 4,
              fields: [
                { name: "title", type: "text", required: true },
                { name: "description", type: "textarea", required: true },
                {
                  name: "icon",
                  type: "select",
                  options: ["Target", "Users", "Handshake", "Heart", "Star"].map((v) => ({
                    label: v,
                    value: v,
                  })),
                },
                {
                  name: "color",
                  type: "select",
                  options: [
                    { label: "Orange", value: "primary" },
                    { label: "Bleu navy", value: "secondary" },
                    { label: "Rouge corail", value: "accent" },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Méthodologie",
          fields: [
            { name: "methodTitle", type: "text" },
            { name: "phase1Title", type: "text" },
            {
              name: "phase1Items",
              type: "array",
              fields: [{ name: "label", type: "text", required: true }],
            },
            { name: "phase2Title", type: "text" },
            {
              name: "phase2Items",
              type: "array",
              fields: [{ name: "label", type: "text", required: true }],
            },
          ],
        },
        {
          label: "Chiffres clés",
          fields: [
            {
              name: "keyStats",
              type: "array",
              minRows: 3,
              maxRows: 3,
              fields: [
                { name: "value", type: "text", required: true },
                { name: "label", type: "text", required: true },
              ],
            },
          ],
        },
        {
          label: "Témoignages & contact",
          fields: [
            { name: "testimonialsTitle", type: "text" },
            { name: "contactTitle", type: "text" },
            { name: "contactDescription", type: "textarea" },
          ],
        },
      ],
    },
  ],
};

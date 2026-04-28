import type { GlobalConfig } from "payload";

export const LegalPage: GlobalConfig = {
  slug: "legal-page",
  label: "⚖️ Mentions légales",
  admin: { description: "Pages de mentions légales (RGPD, hébergeur, propriété intellectuelle)." },
  access: { read: () => true },
  versions: { drafts: true },
  fields: [
    { name: "title", type: "text", label: "Titre", required: true },
    {
      name: "body",
      type: "array",
      label: "Sections",
      admin: {
        description:
          "Chaque section a un titre et un contenu. Le contenu accepte le HTML basique (gras, lien, listes).",
      },
      fields: [
        { name: "heading", type: "text", required: true },
        {
          name: "content",
          type: "textarea",
          required: true,
          admin: { description: "HTML autorisé : <strong>, <a>, <ul>, <li>, <br />" },
        },
      ],
    },
  ],
};

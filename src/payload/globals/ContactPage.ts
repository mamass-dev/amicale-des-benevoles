import type { GlobalConfig } from "payload";

export const ContactPage: GlobalConfig = {
  slug: "contact-page",
  label: "📬 Contact",
  admin: {
    description:
      "Page /contact. Email/téléphone affichés viennent des Paramètres du site (pas ici).",
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
            { name: "heroTitle1", type: "text" },
            { name: "heroTitle2", type: "text", label: "Mot coloré" },
            { name: "heroDescription", type: "textarea" },
          ],
        },
        {
          label: "Formulaire",
          fields: [
            { name: "formTitle", type: "text" },
            { name: "formIntro", type: "text" },
            { name: "formNote", type: "textarea", label: "Note sous le formulaire" },
          ],
        },
        {
          label: "Encart latéral",
          fields: [
            { name: "sidebarTitle", type: "text" },
            { name: "sidebarReplyLabel", type: "text", label: "Temps de réponse" },
            { name: "sidebarBoxTitle", type: "text", label: "Titre encart organisateurs" },
            { name: "sidebarBoxText", type: "textarea" },
            { name: "sidebarBoxLink", type: "text", label: "Texte lien" },
          ],
        },
      ],
    },
  ],
};

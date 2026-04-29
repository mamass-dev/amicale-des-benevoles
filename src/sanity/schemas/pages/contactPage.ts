import { defineField, defineType } from "sanity";
import { EnvelopeIcon } from "@sanity/icons";

export default defineType({
  name: "contactPage",
  title: "📬 Page Contact",
  type: "document",
  icon: EnvelopeIcon,
  description:
    "Page /contact. Pour modifier l'adresse, l'email ou le téléphone affichés dans la sidebar, va plutôt dans Paramètres du site.",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "form", title: "Formulaire" },
    { name: "sidebar", title: "Encart latéral" },
  ],
  fields: [
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
      description: "Mot mis en avant en orange.",
      group: "hero",
    }),
    defineField({
      name: "heroDescription",
      title: "Description hero",
      type: "text",
      rows: 3,
      group: "hero",
    }),

    defineField({
      name: "formTitle",
      title: "Titre du formulaire",
      type: "string",
      group: "form",
    }),
    defineField({
      name: "formIntro",
      title: "Texte d'intro du formulaire",
      type: "string",
      group: "form",
    }),
    defineField({
      name: "formNote",
      title: "Note sous le formulaire",
      type: "text",
      rows: 2,
      description:
        "Petit texte sous le bouton d'envoi. Apparaît automatiquement avec l'email destinataire.",
      group: "form",
    }),

    defineField({
      name: "sidebarTitle",
      title: "Titre encart coordonnées",
      type: "string",
      group: "sidebar",
    }),
    defineField({
      name: "sidebarReplyLabel",
      title: "Libellé temps de réponse",
      type: "string",
      description: "Ex : « Sous 48h ouvrées (lun-ven) »",
      group: "sidebar",
    }),
    defineField({
      name: "sidebarBoxTitle",
      title: "Titre encart organisateurs",
      type: "string",
      group: "sidebar",
    }),
    defineField({
      name: "sidebarBoxText",
      title: "Texte encart organisateurs",
      type: "text",
      rows: 3,
      group: "sidebar",
    }),
    defineField({
      name: "sidebarBoxLink",
      title: "Lien encart organisateurs",
      type: "string",
      group: "sidebar",
    }),
  ],
  preview: { prepare: () => ({ title: "📬 Page Contact" }) },
});

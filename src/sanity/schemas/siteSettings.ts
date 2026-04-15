import { defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons";

export default defineType({
  name: "siteSettings",
  title: "Paramètres du site",
  type: "document",
  icon: CogIcon,
  description: "Les informations générales du site : contact, adresse, réseaux sociaux...",
  groups: [
    { name: "contact", title: "📞 Contact", default: true },
    { name: "social", title: "📱 Réseaux sociaux" },
    { name: "general", title: "⚙️ Général" },
    { name: "nav", title: "🧭 Navigation" },
    { name: "footer", title: "🦶 Pied de page" },
    { name: "common", title: "🔁 Textes communs" },
  ],
  fields: [
    defineField({
      name: "siteName",
      title: "Nom du site",
      type: "string",
      initialValue: "Amicale des Bénévoles",
      group: "general",
    }),
    defineField({
      name: "siteDescription",
      title: "Description courte",
      type: "text",
      rows: 2,
      description: "Apparaît dans les résultats Google.",
      group: "general",
    }),
    defineField({
      name: "inscriptionUrl",
      title: "Lien d'inscription (bouton « Rejoindre l'Amicale »)",
      type: "url",
      description: "L'URL Recrewteer ou autre vers laquelle pointent tous les boutons d'inscription.",
      group: "general",
    }),
    defineField({
      name: "email",
      title: "Email de contact",
      type: "string",
      description: "Affiché dans le footer et la page Organisateurs.",
      group: "contact",
    }),
    defineField({
      name: "phone1",
      title: "Téléphone 1",
      type: "string",
      description: "Format : Prénom : 06 XX XX XX XX",
      group: "contact",
    }),
    defineField({
      name: "phone2",
      title: "Téléphone 2",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "address",
      title: "Adresse postale",
      type: "string",
      description: "Affichée dans le footer.",
      group: "contact",
    }),
    defineField({
      name: "rna",
      title: "Numéro RNA",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "facebookUrl",
      title: "Facebook",
      type: "url",
      description: "URL complète de la page Facebook.",
      group: "social",
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram",
      type: "url",
      group: "social",
    }),
    defineField({
      name: "linkedinUrl",
      title: "LinkedIn",
      type: "url",
      group: "social",
    }),
    defineField({
      name: "whatsappUrl",
      title: "WhatsApp (chaîne)",
      type: "url",
      group: "social",
    }),
    // Navigation
    defineField({
      name: "navLinks",
      title: "Liens de navigation",
      type: "array",
      group: "nav",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Libellé", type: "string" }),
            defineField({ name: "href", title: "URL", type: "string" }),
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        },
      ],
    }),
    defineField({ name: "navCtaLabel", title: "Libellé CTA header", type: "string", group: "nav" }),
    // Footer
    defineField({ name: "footerTagline", title: "Tagline footer", type: "text", rows: 3, group: "footer" }),
    defineField({ name: "footerNavTitle", title: "Titre section Navigation", type: "string", initialValue: "Navigation", group: "footer" }),
    defineField({ name: "footerContactTitle", title: "Titre section Contact", type: "string", initialValue: "Contact", group: "footer" }),
    defineField({ name: "footerSocialTitle", title: "Titre section Réseaux", type: "string", initialValue: "Suivez-nous", group: "footer" }),
    defineField({ name: "footerCopyright", title: "Copyright (utiliser {year})", type: "string", group: "footer" }),
    defineField({ name: "footerLegalLabel", title: "Lien mentions légales", type: "string", initialValue: "Mentions légales", group: "footer" }),
    // Common
    defineField({ name: "ctaJoinLabel", title: "Texte bouton 'Rejoindre l'Amicale'", type: "string", initialValue: "Rejoindre l'Amicale", group: "common" }),
  ],
  preview: {
    prepare() {
      return { title: "⚙️ Paramètres du site", subtitle: "Contact, réseaux sociaux, informations générales" };
    },
  },
});

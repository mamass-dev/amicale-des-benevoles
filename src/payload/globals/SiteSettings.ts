import type { GlobalConfig } from "payload";

export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "⚙️ Paramètres du site",
  admin: {
    description:
      "Coordonnées, réseaux sociaux, libellés navigation et footer. Ces infos s'appliquent partout sur le site.",
  },
  access: { read: () => true },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Identité",
          fields: [
            { name: "siteName", type: "text", label: "Nom du site", defaultValue: "Amicale des Bénévoles" },
            { name: "logo", type: "upload", relationTo: "media", label: "Logo" },
            {
              name: "siteDescription",
              type: "textarea",
              label: "Description courte",
            },
          ],
        },
        {
          label: "Contact",
          fields: [
            { name: "email", type: "email", label: "Email principal" },
            { name: "phone1", type: "text", label: "Téléphone principal" },
            { name: "phone2", type: "text", label: "Téléphone secondaire" },
            { name: "address", type: "text", label: "Adresse" },
            { name: "rna", type: "text", label: "RNA" },
            {
              name: "inscriptionUrl",
              type: "text",
              label: "Lien d'inscription Recrewteer",
              admin: {
                description: "URL du formulaire externe d'inscription bénévole.",
              },
            },
          ],
        },
        {
          label: "Réseaux sociaux",
          fields: [
            { name: "facebookUrl", type: "text", label: "Facebook" },
            { name: "instagramUrl", type: "text", label: "Instagram" },
            { name: "linkedinUrl", type: "text", label: "LinkedIn" },
            { name: "whatsappUrl", type: "text", label: "WhatsApp" },
          ],
        },
        {
          label: "Navigation",
          fields: [
            {
              name: "navLinks",
              type: "array",
              label: "Liens du menu",
              fields: [
                { name: "label", type: "text", required: true },
                { name: "href", type: "text", required: true },
              ],
            },
            { name: "navCtaLabel", type: "text", label: "Libellé bouton CTA nav", defaultValue: "Rejoindre l'Amicale" },
          ],
        },
        {
          label: "Footer",
          fields: [
            { name: "footerTagline", type: "textarea", label: "Tagline footer" },
            { name: "footerNavTitle", type: "text", label: "Titre colonne nav" },
            { name: "footerContactTitle", type: "text", label: "Titre colonne contact" },
            { name: "footerSocialTitle", type: "text", label: "Titre colonne réseaux" },
            { name: "footerCopyright", type: "text", label: "Mention copyright" },
            { name: "footerLegalLabel", type: "text", label: "Libellé mentions légales" },
          ],
        },
      ],
    },
  ],
};

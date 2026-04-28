import type { GlobalConfig } from "payload";

export const HomePage: GlobalConfig = {
  slug: "home-page",
  label: "🏠 Accueil",
  admin: { description: "Tous les contenus de la page d'accueil." },
  access: { read: () => true },
  versions: { drafts: true },
  fields: [
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          fields: [
            { name: "heroImage", type: "upload", relationTo: "media", label: "Photo de fond" },
            { name: "heroBadge", type: "text", label: "Petit badge en haut" },
            { name: "heroTitle1", type: "text", label: "Titre (partie 1)" },
            { name: "heroTitle2", type: "text", label: "Titre (mot coloré)" },
            { name: "heroSubtitle", type: "text", label: "Sous-titre" },
            { name: "heroDescription", type: "textarea", label: "Description" },
            { name: "heroCtaPrimary", type: "text", label: "Bouton principal" },
            { name: "heroCtaSecondary", type: "text", label: "Bouton secondaire" },
          ],
        },
        {
          label: "Comment ça marche",
          fields: [
            { name: "howItWorksKicker", type: "text", label: "Surtitre orange" },
            { name: "howItWorksTitle", type: "text", label: "Titre" },
            { name: "howItWorksDescription", type: "text", label: "Description" },
            {
              name: "howItWorksSteps",
              type: "array",
              label: "Étapes (3 recommandées)",
              minRows: 2,
              maxRows: 4,
              fields: [
                { name: "step", type: "text", label: "Numéro affiché", required: true },
                { name: "title", type: "text", label: "Titre", required: true },
                { name: "description", type: "textarea", label: "Description", required: true },
                {
                  name: "icon",
                  type: "select",
                  label: "Icône",
                  defaultValue: "Sparkles",
                  options: [
                    { label: "👤 Inscription", value: "UserPlus" },
                    { label: "📅 Calendrier", value: "CalendarCheck" },
                    { label: "✨ Étincelles", value: "Sparkles" },
                    { label: "❤️ Cœur", value: "Heart" },
                    { label: "👥 Groupe", value: "Users" },
                    { label: "⭐ Étoile", value: "Star" },
                    { label: "✅ Validé", value: "CheckCircle" },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "Mission",
          fields: [
            { name: "missionImage", type: "upload", relationTo: "media", label: "Photo mission" },
            { name: "missionTitle", type: "text", label: "Titre" },
            { name: "missionText1", type: "textarea", label: "Paragraphe 1" },
            { name: "missionText2", type: "textarea", label: "Paragraphe 2" },
            {
              name: "missionTags",
              type: "array",
              label: "Tags",
              fields: [{ name: "label", type: "text", required: true }],
            },
          ],
        },
        {
          label: "3 piliers",
          fields: [
            {
              name: "pillars",
              type: "array",
              minRows: 3,
              maxRows: 3,
              fields: [
                { name: "title", type: "text", required: true },
                { name: "description", type: "textarea", required: true },
                {
                  name: "icon",
                  type: "select",
                  options: [
                    { label: "Heart", value: "Heart" },
                    { label: "Users", value: "Users" },
                    { label: "Handshake", value: "Handshake" },
                    { label: "Star", value: "Star" },
                    { label: "Shield", value: "Shield" },
                    { label: "Award", value: "Award" },
                  ],
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
          label: "Bandeau photo",
          fields: [
            { name: "bannerImage", type: "upload", relationTo: "media", label: "Photo bandeau" },
            { name: "bannerText", type: "text", label: "Texte bandeau" },
            { name: "bannerSubtext", type: "text", label: "Sous-texte" },
          ],
        },
        {
          label: "Section événements",
          fields: [
            { name: "eventsTitle", type: "text", label: "Titre" },
            { name: "eventsSubtitle", type: "text", label: "Sous-titre" },
            { name: "eventsLinkLabel", type: "text", label: "Lien 'tous les événements'" },
          ],
        },
        {
          label: "Galerie",
          fields: [
            { name: "galleryTitle", type: "text", label: "Titre" },
            { name: "gallerySubtitle", type: "text", label: "Sous-titre" },
            {
              name: "mosaicImages",
              type: "array",
              label: "Mosaïque (4 photos)",
              minRows: 4,
              maxRows: 4,
              fields: [{ name: "image", type: "upload", relationTo: "media", required: true }],
            },
          ],
        },
        {
          label: "Témoignages",
          fields: [{ name: "testimonialsTitle", type: "text", label: "Titre" }],
        },
        {
          label: "Partenaires",
          fields: [{ name: "partnersLabel", type: "text", label: "Label" }],
        },
        {
          label: "CTA final",
          fields: [
            { name: "ctaImage", type: "upload", relationTo: "media", label: "Photo de fond" },
            { name: "ctaTitle", type: "text", label: "Titre" },
            { name: "ctaDescription", type: "textarea", label: "Description" },
            { name: "ctaPrimary", type: "text", label: "Bouton principal" },
            { name: "ctaSecondary", type: "text", label: "Bouton secondaire" },
          ],
        },
      ],
    },
  ],
};

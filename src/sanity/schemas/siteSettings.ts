import { defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons";

export default defineType({
  name: "siteSettings",
  title: "Paramètres du site",
  type: "document",
  icon: CogIcon,
  description: "Les informations générales du site : contact, adresse, réseaux sociaux...",
  groups: [
    // L'onglet « Pied de page » regroupe TOUT ce qui s'affiche dans le footer,
    // même les champs qui vivent aussi dans Contact / Réseaux / Navigation.
    { name: "footer", title: "🦶 Pied de page", default: true },
    { name: "contact", title: "📞 Contact" },
    { name: "social", title: "📱 Réseaux sociaux" },
    { name: "nav", title: "🧭 Navigation" },
    { name: "general", title: "⚙️ Général" },
    { name: "common", title: "🔁 Textes communs" },
  ],
  fields: [
    // ── Bloc identité (colonne 1 du footer) ──────────────────────────────
    defineField({
      name: "siteName",
      title: "Nom du site",
      type: "string",
      initialValue: "Amicale des Bénévoles",
      description: "Affiché dans le header et dans le footer (à côté du logo).",
      group: ["general", "footer"],
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      description: "Logo affiché dans le header et le footer.",
      group: ["general", "footer"],
      options: { hotspot: true },
    }),
    defineField({
      name: "footerTagline",
      title: "Tagline footer",
      type: "text",
      rows: 3,
      description: "Petit texte de présentation sous le logo, en bas de page.",
      group: "footer",
    }),
    defineField({
      name: "rna",
      title: "Numéro RNA",
      type: "string",
      description: "Affiché en petit sous la tagline du footer.",
      group: ["contact", "footer"],
    }),
    defineField({
      name: "siteDescription",
      title: "Description courte",
      type: "text",
      rows: 2,
      description: "Apparaît dans les résultats Google (SEO). Non affichée sur le site.",
      group: "general",
    }),

    // ── Colonne Navigation du footer ─────────────────────────────────────
    defineField({
      name: "footerNavTitle",
      title: "Titre de la colonne Navigation",
      type: "string",
      initialValue: "Navigation",
      group: "footer",
    }),
    defineField({
      name: "navLinks",
      title: "Liens de navigation",
      type: "array",
      description: "Liens utilisés dans le header et dans la colonne Navigation du footer.",
      group: ["nav", "footer"],
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

    // ── Colonne Contact du footer ────────────────────────────────────────
    defineField({
      name: "footerContactTitle",
      title: "Titre de la colonne Contact",
      type: "string",
      initialValue: "Contact",
      group: "footer",
    }),
    defineField({
      name: "address",
      title: "Adresse postale",
      type: "string",
      description: "Affichée dans la colonne Contact du footer.",
      group: ["contact", "footer"],
    }),
    defineField({
      name: "email",
      title: "Email de contact",
      type: "string",
      description: "Affiché dans le footer et sur la page Organisateurs.",
      group: ["contact", "footer"],
    }),
    defineField({
      name: "phone1",
      title: "Téléphone 1",
      type: "string",
      description: "Format : Prénom : 06 XX XX XX XX. Affiché dans le footer.",
      group: ["contact", "footer"],
    }),
    defineField({
      name: "phone2",
      title: "Téléphone 2",
      type: "string",
      description: "Affiché dans le footer sous le premier téléphone.",
      group: ["contact", "footer"],
    }),

    // ── Colonne Réseaux + bouton du footer ───────────────────────────────
    defineField({
      name: "footerSocialTitle",
      title: "Titre de la colonne Réseaux",
      type: "string",
      initialValue: "Suivez-nous",
      group: "footer",
    }),
    defineField({
      name: "facebookUrl",
      title: "Facebook",
      type: "url",
      description: "URL complète de la page Facebook. Icône affichée dans le footer.",
      group: ["social", "footer"],
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram",
      type: "url",
      description: "Icône affichée dans le footer.",
      group: ["social", "footer"],
    }),
    defineField({
      name: "linkedinUrl",
      title: "LinkedIn",
      type: "url",
      description: "Icône affichée dans le footer.",
      group: ["social", "footer"],
    }),
    defineField({
      name: "whatsappUrl",
      title: "WhatsApp (chaîne)",
      type: "url",
      description: "Non affiché dans le footer pour le moment.",
      group: "social",
    }),
    defineField({
      name: "navCtaLabel",
      title: "Libellé du bouton « Rejoindre l'Amicale »",
      type: "string",
      description: "Texte du bouton d'inscription dans le header et le footer.",
      group: ["nav", "footer"],
    }),
    defineField({
      name: "inscriptionUrl",
      title: "Lien d'inscription (bouton « Rejoindre l'Amicale »)",
      type: "url",
      description: "L'URL Recrewteer ou autre vers laquelle pointent tous les boutons d'inscription (header, footer, CTA mobile).",
      group: ["general", "footer"],
    }),

    // ── Barre du bas du footer ───────────────────────────────────────────
    defineField({
      name: "footerCopyright",
      title: "Copyright",
      type: "string",
      description: "Texte de copyright en bas de page. Utilisez {year} pour insérer l'année courante.",
      group: "footer",
    }),
    defineField({
      name: "footerLegalLabel",
      title: "Libellé du lien mentions légales",
      type: "string",
      initialValue: "Mentions légales",
      description: "Le lien pointe vers la page /mentions-legales.",
      group: "footer",
    }),

    // ── Textes communs ───────────────────────────────────────────────────
    defineField({
      name: "ctaJoinLabel",
      title: "Texte bouton 'Rejoindre l'Amicale'",
      type: "string",
      initialValue: "Rejoindre l'Amicale",
      group: "common",
    }),
  ],
  preview: {
    prepare() {
      return { title: "⚙️ Paramètres du site", subtitle: "Contact, réseaux sociaux, informations générales" };
    },
  },
});

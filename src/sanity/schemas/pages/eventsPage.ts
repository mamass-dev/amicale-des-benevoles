import { defineField, defineType } from "sanity";
import { CalendarIcon } from "@sanity/icons";

export default defineType({
  name: "eventsPage",
  title: "📅 Page Événements",
  type: "document",
  liveEdit: true,
  icon: CalendarIcon,
  description:
    "Page /evenements (la liste filtrable). Pour ajouter ou modifier un événement, va dans la section « Événements ».",
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "filters", title: "Libellés des filtres" },
    { name: "cta", title: "CTA final" },
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
      group: "hero",
    }),
    defineField({
      name: "heroDescription",
      title: "Description hero",
      type: "text",
      rows: 3,
      description:
        "Tu peux utiliser {count} pour insérer le nombre d'événements automatiquement.",
      group: "hero",
    }),

    defineField({
      name: "searchPlaceholder",
      title: "Texte de la barre de recherche",
      type: "string",
      group: "filters",
    }),
    defineField({
      name: "filterAllLabel",
      title: "Libellé filtre « Tous »",
      type: "string",
      group: "filters",
    }),
    defineField({
      name: "filterSportLabel",
      title: "Libellé filtre « Sportif »",
      type: "string",
      group: "filters",
    }),
    defineField({
      name: "filterCultureLabel",
      title: "Libellé filtre « Culturel »",
      type: "string",
      group: "filters",
    }),

    defineField({ name: "ctaTitle", title: "Titre CTA final", type: "string", group: "cta" }),
    defineField({
      name: "ctaDescription",
      title: "Description CTA",
      type: "text",
      rows: 3,
      group: "cta",
    }),
    defineField({ name: "ctaButton", title: "Bouton CTA", type: "string", group: "cta" }),
  ],
  preview: { prepare: () => ({ title: "📅 Page Événements" }) },
});

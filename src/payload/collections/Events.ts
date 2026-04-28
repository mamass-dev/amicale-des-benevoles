import type { CollectionConfig } from "payload";

export const Events: CollectionConfig = {
  slug: "events",
  labels: { singular: "Événement", plural: "Événements" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "type", "location", "dateStart"],
    description: "Les événements sportifs et culturels où l'Amicale mobilise des bénévoles.",
  },
  access: { read: () => true },
  fields: [
    {
      name: "name",
      type: "text",
      label: "Nom de l'événement",
      required: true,
      admin: { description: "Ex : La SaintéLyon, High Five Festival..." },
    },
    {
      name: "slug",
      type: "text",
      label: "URL (généré automatiquement)",
      required: true,
      unique: true,
      admin: {
        description: "Identifiant URL. Ex : la-saintelyon. Évite les espaces et accents.",
      },
    },
    {
      name: "type",
      type: "select",
      label: "Type",
      required: true,
      defaultValue: "sportif",
      options: [
        { label: "🏃 Sportif", value: "sportif" },
        { label: "🎭 Culturel", value: "culturel" },
      ],
    },
    {
      name: "location",
      type: "text",
      label: "Lieu",
      required: true,
      admin: { description: "Ville + département. Ex : Chamonix (74)" },
    },
    {
      name: "dates",
      type: "text",
      label: "Dates (texte affiché)",
      required: true,
      admin: { description: "Ex : 27-28 novembre 2026" },
    },
    {
      type: "row",
      fields: [
        { name: "dateStart", type: "date", label: "Date de début" },
        { name: "dateEnd", type: "date", label: "Date de fin" },
      ],
    },
    {
      name: "description",
      type: "textarea",
      label: "Description",
      admin: { description: "2-3 phrases pour donner envie aux bénévoles." },
    },
    {
      name: "image",
      type: "upload",
      relationTo: "media",
      label: "Photo de l'événement",
      admin: { description: "Format paysage (16:9) recommandé." },
    },
    {
      name: "missions",
      type: "array",
      label: "Missions possibles",
      labels: { singular: "Mission", plural: "Missions" },
      admin: { description: "Liste des missions concrètes (Accueil, Ravitaillement...)" },
      fields: [{ name: "label", type: "text", required: true }],
    },
    {
      name: "practicalInfo",
      type: "array",
      label: "Bon à savoir",
      labels: { singular: "Info", plural: "Infos" },
      admin: { description: "Encadrement, repas, hébergement, t-shirt..." },
      fields: [{ name: "label", type: "text", required: true }],
    },
    {
      name: "coordinates",
      type: "point",
      label: "Coordonnées GPS",
      admin: { description: "Position sur la carte. Format : longitude, latitude." },
    },
  ],
  versions: { drafts: true },
};

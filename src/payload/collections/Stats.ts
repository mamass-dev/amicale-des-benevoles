import type { CollectionConfig } from "payload";

export const Stats: CollectionConfig = {
  slug: "stats",
  labels: { singular: "Chiffre clé", plural: "Chiffres clés" },
  admin: {
    useAsTitle: "label",
    defaultColumns: ["label", "value", "suffix", "order"],
    description: "Stats animées sur la page d'accueil (section sombre).",
  },
  access: { read: () => true },
  fields: [
    { name: "label", type: "text", label: "Label", required: true },
    {
      name: "value",
      type: "number",
      label: "Valeur (sans symbole)",
      required: true,
    },
    {
      name: "suffix",
      type: "text",
      label: "Symbole (% / + / vide)",
      defaultValue: "",
    },
    { name: "order", type: "number", label: "Position", defaultValue: 0 },
  ],
};

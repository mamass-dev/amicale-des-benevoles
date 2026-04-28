import type { CollectionConfig } from "payload";

export const Partners: CollectionConfig = {
  slug: "partners",
  labels: { singular: "Partenaire", plural: "Partenaires" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "order"],
    description: "Logos partenaires en bas de la page d'accueil.",
  },
  access: { read: () => true },
  fields: [
    { name: "name", type: "text", label: "Nom du partenaire", required: true },
    {
      name: "logo",
      type: "upload",
      relationTo: "media",
      label: "Logo",
      required: true,
    },
    {
      name: "url",
      type: "text",
      label: "Site web (optionnel)",
      admin: { description: "Si rempli, le logo sera cliquable." },
    },
    { name: "order", type: "number", label: "Position", defaultValue: 0 },
  ],
};

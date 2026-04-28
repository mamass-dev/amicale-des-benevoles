import type { CollectionConfig } from "payload";

export const Testimonials: CollectionConfig = {
  slug: "testimonials",
  labels: { singular: "Témoignage", plural: "Témoignages" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "org", "order"],
    description: "Avis d'organisateurs (homepage + page Organisateurs).",
  },
  access: { read: () => true },
  fields: [
    { name: "name", type: "text", label: "Nom", required: true },
    {
      name: "org",
      type: "text",
      label: "Organisation / Événement",
      required: true,
    },
    {
      name: "text",
      type: "textarea",
      label: "Témoignage",
      required: true,
      minLength: 20,
    },
    { name: "image", type: "upload", relationTo: "media", label: "Photo (optionnel)" },
    { name: "order", type: "number", label: "Position", defaultValue: 0 },
  ],
  versions: { drafts: true },
};

import type { CollectionConfig } from "payload";

export const TeamMembers: CollectionConfig = {
  slug: "team-members",
  labels: { singular: "Membre", plural: "Équipe" },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "role", "category", "order"],
    description: "Staff production et comité directeur (page À propos).",
  },
  access: { read: () => true },
  fields: [
    { name: "name", type: "text", label: "Prénom et nom", required: true },
    { name: "role", type: "text", label: "Rôle / Poste", required: true },
    {
      name: "category",
      type: "select",
      label: "Catégorie",
      required: true,
      defaultValue: "staff",
      options: [
        { label: "👔 Staff production", value: "staff" },
        { label: "🏛️ Comité directeur", value: "board" },
      ],
    },
    {
      name: "focus",
      type: "text",
      label: "Spécialité",
      admin: {
        description: "Uniquement pour le staff. Ex : Développement & Engagement",
        condition: (data) => data?.category === "staff",
      },
    },
    {
      name: "email",
      type: "email",
      label: "Email",
      admin: { condition: (data) => data?.category === "staff" },
    },
    {
      name: "phone",
      type: "text",
      label: "Téléphone",
      admin: { condition: (data) => data?.category === "staff" },
    },
    { name: "image", type: "upload", relationTo: "media", label: "Photo" },
    {
      name: "order",
      type: "number",
      label: "Position (1 = premier)",
      defaultValue: 0,
    },
  ],
  versions: { drafts: true },
};

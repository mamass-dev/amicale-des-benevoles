import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemas";
import { projectId, dataset } from "./src/sanity/env";
import { structure, SINGLETON_TYPES } from "./src/sanity/structure";

export default defineConfig({
  name: "amicale-des-benevoles",
  title: "Amicale des Bénévoles",
  projectId,
  dataset,
  basePath: "/admin",
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: "2024-01-01" })],
  schema: {
    types: schemaTypes,
  },
  document: {
    // Empêche la création de doublons de singletons via le menu global « + ».
    newDocumentOptions: (prev, { creationContext }) =>
      creationContext.type === "global"
        ? prev.filter((item) => !SINGLETON_TYPES.has(item.templateId))
        : prev,
    // Retire « Dupliquer » / « Supprimer » sur les singletons pour verrouiller l'unicité.
    actions: (prev, { schemaType }) =>
      SINGLETON_TYPES.has(schemaType)
        ? prev.filter((action) => !["duplicate", "delete", "unpublish"].includes(action.action ?? ""))
        : prev,
  },
});

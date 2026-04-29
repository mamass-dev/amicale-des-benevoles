import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemas";
import { projectId, dataset } from "./src/sanity/env";

export default defineConfig({
  name: "amicale-des-benevoles",
  title: "Amicale des Bénévoles",
  projectId,
  dataset,
  basePath: "/admin",
  plugins: [structureTool(), visionTool({ defaultApiVersion: "2024-01-01" })],
  schema: {
    types: schemaTypes,
  },
});

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemas";
import { projectId, dataset } from "./src/sanity/env";
import StudioWelcome from "./src/sanity/StudioWelcome";

export default defineConfig({
  name: "amicale-des-benevoles",
  title: "Amicale des Bénévoles",
  projectId,
  dataset,
  basePath: "/admin",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Contenu du site")
          .items([
            // Page d'accueil custom
            S.listItem()
              .title("🏠 Accueil")
              .child(
                S.component(StudioWelcome).title("Bienvenue")
              ),
            S.divider(),

            // Événements
            S.listItem()
              .title("📅 Événements")
              .schemaType("event")
              .child(
                S.documentTypeList("event")
                  .title("Tous les événements")
                  .defaultOrdering([{ field: "dateStart", direction: "asc" }])
              ),

            // Équipe
            S.listItem()
              .title("👥 Équipe")
              .child(
                S.list()
                  .title("Équipe")
                  .items([
                    S.listItem()
                      .title("👔 Staff production")
                      .child(
                        S.documentList()
                          .title("Staff production")
                          .filter('_type == "teamMember" && category == "staff"')
                          .defaultOrdering([{ field: "order", direction: "asc" }])
                      ),
                    S.listItem()
                      .title("🏛️ Comité directeur")
                      .child(
                        S.documentList()
                          .title("Comité directeur")
                          .filter('_type == "teamMember" && category == "board"')
                          .defaultOrdering([{ field: "order", direction: "asc" }])
                      ),
                  ])
              ),

            // Partenaires
            S.listItem()
              .title("⭐ Partenaires")
              .schemaType("partner")
              .child(
                S.documentTypeList("partner")
                  .title("Partenaires & logos")
                  .defaultOrdering([{ field: "order", direction: "asc" }])
              ),

            // Témoignages
            S.listItem()
              .title("💬 Témoignages")
              .schemaType("testimonial")
              .child(
                S.documentTypeList("testimonial")
                  .title("Témoignages organisateurs")
                  .defaultOrdering([{ field: "order", direction: "asc" }])
              ),

            // Chiffres clés
            S.listItem()
              .title("📊 Chiffres clés")
              .schemaType("stat")
              .child(
                S.documentTypeList("stat")
                  .title("Chiffres clés")
                  .defaultOrdering([{ field: "order", direction: "asc" }])
              ),

            // FAQ
            S.listItem()
              .title("❓ FAQ")
              .child(
                S.list()
                  .title("Questions fréquentes")
                  .items([
                    S.listItem()
                      .title("🚗 FAQ Covoiturage")
                      .child(
                        S.documentList()
                          .title("FAQ Covoiturage")
                          .filter('_type == "faq" && category == "covoiturage"')
                          .defaultOrdering([{ field: "order", direction: "asc" }])
                      ),
                    S.listItem()
                      .title("🛏️ FAQ Hébergement")
                      .child(
                        S.documentList()
                          .title("FAQ Hébergement")
                          .filter('_type == "faq" && category == "hebergement"')
                          .defaultOrdering([{ field: "order", direction: "asc" }])
                      ),
                    S.listItem()
                      .title("📋 FAQ Général")
                      .child(
                        S.documentList()
                          .title("FAQ Général")
                          .filter('_type == "faq" && category == "general"')
                          .defaultOrdering([{ field: "order", direction: "asc" }])
                      ),
                  ])
              ),

            S.divider(),

            // Paramètres
            S.listItem()
              .title("⚙️ Paramètres du site")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
                  .title("Paramètres du site")
              ),
          ]),
    }),
    visionTool({ defaultApiVersion: "2024-01-01" }),
  ],
  schema: {
    types: schemaTypes,
  },
});

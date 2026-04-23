import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemas";
import { projectId, dataset } from "./src/sanity/env";
import StudioWelcome from "./src/sanity/StudioWelcome";
import { PublishButton } from "./src/sanity/actions/autoPublish";

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
              .title("🏠 Bienvenue")
              .child(
                S.component(StudioWelcome).title("Bienvenue")
              ),
            S.divider(),

            // Textes des pages (singletons)
            S.listItem()
              .title("📝 Textes des pages")
              .child(
                S.list()
                  .title("Textes des pages")
                  .items([
                    S.listItem().title("🏠 Accueil").child(
                      S.document().schemaType("homePage").documentId("homePage").title("Accueil")
                    ),
                    S.listItem().title("ℹ️ À propos").child(
                      S.document().schemaType("aboutPage").documentId("aboutPage").title("À propos")
                    ),
                    S.listItem().title("📅 Événements (page)").child(
                      S.document().schemaType("eventsPage").documentId("eventsPage").title("Page Événements")
                    ),
                    S.listItem().title("🤝 Organisateurs").child(
                      S.document().schemaType("organizersPage").documentId("organizersPage").title("Organisateurs")
                    ),
                    S.listItem().title("👤 Espace bénévole").child(
                      S.document().schemaType("volunteerPage").documentId("volunteerPage").title("Espace bénévole")
                    ),
                    S.listItem().title("⚖️ Mentions légales").child(
                      S.document().schemaType("legalPage").documentId("legalPage").title("Mentions légales")
                    ),
                  ])
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
  document: {
    actions: (prev, { schemaType }) => {
      const singletons = [
        "siteSettings",
        "homePage",
        "aboutPage",
        "eventsPage",
        "organizersPage",
        "volunteerPage",
        "legalPage",
      ];
      const filtered = singletons.includes(schemaType)
        ? prev.filter((a) => !["duplicate", "delete", "unpublish"].includes(a.action ?? ""))
        : prev;
      // Remplace l'action Publish par un bouton custom bien visible.
      return filtered.map((a) => (a.action === "publish" ? PublishButton : a));
    },
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === "global") {
        const singletons = [
          "siteSettings",
          "homePage",
          "aboutPage",
          "eventsPage",
          "organizersPage",
          "volunteerPage",
          "legalPage",
        ];
        return prev.filter((t) => !singletons.includes(t.templateId ?? ""));
      }
      return prev;
    },
  },
});

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemas";
import { projectId, dataset } from "./src/sanity/env";
import StudioWelcome from "./src/sanity/StudioWelcome";
import { PublishAction } from "./src/sanity/actions/publishAction";
import { DocumentLayout } from "./src/sanity/components/DocumentLayout";

const SINGLETONS = [
  "siteSettings",
  "homePage",
  "aboutPage",
  "eventsPage",
  "organizersPage",
  "volunteerPage",
  "faqPage",
  "contactPage",
  "legalPage",
];

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
            // Page d'accueil custom du studio
            S.listItem()
              .title("👋 Bienvenue")
              .child(
                S.component(StudioWelcome).title("Bienvenue sur ton CMS")
              ),
            S.divider(),

            // Toutes les pages (singletons) — les plus modifiées en premier
            S.listItem()
              .title("📝 Pages du site")
              .child(
                S.list()
                  .title("Pages du site")
                  .items([
                    S.listItem().title("🏠 Accueil").child(
                      S.document().schemaType("homePage").documentId("homePage").title("Accueil")
                    ),
                    S.listItem().title("📅 Page Événements").child(
                      S.document().schemaType("eventsPage").documentId("eventsPage").title("Page Événements")
                    ),
                    S.listItem().title("ℹ️ À propos").child(
                      S.document().schemaType("aboutPage").documentId("aboutPage").title("À propos")
                    ),
                    S.listItem().title("🤝 Organisateurs").child(
                      S.document().schemaType("organizersPage").documentId("organizersPage").title("Organisateurs")
                    ),
                    S.listItem().title("👤 Espace bénévole").child(
                      S.document().schemaType("volunteerPage").documentId("volunteerPage").title("Espace bénévole")
                    ),
                    S.listItem().title("❓ FAQ").child(
                      S.document().schemaType("faqPage").documentId("faqPage").title("FAQ")
                    ),
                    S.listItem().title("📬 Contact").child(
                      S.document().schemaType("contactPage").documentId("contactPage").title("Contact")
                    ),
                    S.divider(),
                    S.listItem().title("⚖️ Mentions légales").child(
                      S.document().schemaType("legalPage").documentId("legalPage").title("Mentions légales")
                    ),
                  ])
              ),
            S.divider(),

            // Événements (le contenu le plus mis à jour)
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

            // Partenaires
            S.listItem()
              .title("⭐ Partenaires & logos")
              .schemaType("partner")
              .child(
                S.documentTypeList("partner")
                  .title("Partenaires & logos")
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
    // Bannière jaune impossible à manquer en haut de chaque doc + bouton vert
    // dans la barre d'actions. Double sécurité contre l'UX confuse de Sanity 5.18.
    components: {
      unstable_layout: DocumentLayout,
    },
    actions: (prev, { schemaType }) => {
      const filtered = SINGLETONS.includes(schemaType)
        ? prev.filter((a) => !["duplicate", "delete", "unpublish"].includes(a.action ?? ""))
        : prev;
      // Remplace l'action publish par notre version "tone positive" toujours visible.
      return filtered.map((a) => (a.action === "publish" ? PublishAction : a));
    },
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === "global") {
        return prev.filter((t) => !SINGLETONS.includes(t.templateId ?? ""));
      }
      return prev;
    },
  },
});

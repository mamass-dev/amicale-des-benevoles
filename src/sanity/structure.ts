import type { StructureResolver } from "sanity/structure";
import { CogIcon } from "@sanity/icons";

/**
 * Documents « singletons » : il n'en existe qu'un seul par type.
 * On les épingle dans la structure et on bloque la création de doublons
 * (voir sanity.config.ts). L'id est fixé pour toujours éditer le même document.
 */
const SINGLETONS = [
  { id: "siteSettings", type: "siteSettings", title: "⚙️ Paramètres du site", icon: CogIcon },
  { id: "homePage", type: "homePage", title: "🏠 Page Accueil" },
  { id: "aboutPage", type: "aboutPage", title: "ℹ️ Page À propos" },
  { id: "eventsPage", type: "eventsPage", title: "📅 Page Événements" },
  { id: "organizersPage", type: "organizersPage", title: "🤝 Page Organisateurs" },
  { id: "volunteerPage", type: "volunteerPage", title: "👤 Page Espace Bénévole" },
  { id: "faqPage", type: "faqPage", title: "❓ Page FAQ" },
  { id: "contactPage", type: "contactPage", title: "📬 Page Contact" },
  { id: "legalPage", type: "legalPage", title: "⚖️ Page Mentions légales" },
] as const;

/** Types qui ne doivent jamais être dupliqués/supprimés/créés en plusieurs exemplaires. */
export const SINGLETON_TYPES = new Set<string>(SINGLETONS.map((s) => s.type));

/** Collections : plusieurs documents autorisés, affichées en liste classique. */
const COLLECTIONS = ["event", "teamMember", "partner", "testimonial", "review", "stat"];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Contenu")
    .items([
      // 1. Réglages et pages (documents uniques épinglés)
      ...SINGLETONS.map((s) => {
        const item = S.listItem()
          .title(s.title)
          .id(s.id)
          .child(S.document().schemaType(s.type).documentId(s.id));
        return "icon" in s && s.icon ? item.icon(s.icon) : item;
      }),
      S.divider(),
      // 2. Collections
      ...COLLECTIONS.map((type) => S.documentTypeListItem(type)),
    ]);

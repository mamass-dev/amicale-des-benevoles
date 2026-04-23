# Récapitulatif des actions — Amicale des Bénévoles

## Projet

Refonte complète du site [amicaledesbenevoles.org](https://amicaledesbenevoles.org/) en Next.js moderne avec CMS Sanity.

- **Dossier** : `/Users/mamass/amicale-des-benevoles`
- **Stack** : Next.js 16.2, React 19, Tailwind CSS v4, Framer Motion, Sanity CMS, Lucide Icons
- **CMS** : Sanity (project ID : `mp1jjp4v`, dataset : `production`)

---

## Étape 1 — Initialisation du projet

- Création du projet avec `create-next-app` (TypeScript, Tailwind, App Router, src/)
- Installation de `framer-motion` et `lucide-react`

## Étape 2 — Scraping du contenu existant

- Récupération de tout le contenu du site actuel (WordPress/Elementor) :
  - Navigation, textes, chiffres clés, équipe, partenaires, événements
  - 5 pages scrapées : accueil, à propos, organisateurs, événements, espace bénévole
  - Mentions légales, footer, liens sociaux

## Étape 3 — Création des pages

| Page | Route | Description |
|------|-------|-------------|
| Accueil | `/` | Hero photo, mission, 3 piliers, galerie, événements, stats, témoignages, CTA |
| À propos | `/a-propos` | Histoire (timeline), valeurs, équipe avec photos, ambassadeurs |
| Événements | `/evenements` | Liste des 18 événements 2026 (sportifs/culturels) |
| Événement détail | `/evenements/[slug]` | 16 pages SSG avec image hero, jauge remplissage |
| Organisateurs | `/organisateurs` | Offre B2B, méthodologie 2 phases, chiffres, témoignages |
| Espace bénévole | `/espace-benevole` | Lien vers Recrewteer |
| Mentions légales | `/mentions-legales` | RGPD |
| Admin CMS | `/admin` | Studio Sanity embarqué |
| Sitemap | `/sitemap.xml` | URLs dynamiques |
| Robots | `/robots.txt` | Configuration crawlers |

## Étape 5 — Récupération des images du site actuel

- 65 images téléchargées (23 Mo) depuis le site WordPress
- Organisées dans `/public/images/` :
  - `logo/` : 3 fichiers (logo quadri, logo new, logo cropped)
  - `gallery/` : 22 photos de bénévoles (frames vidéo 300x300)
  - `team/` : 10 fichiers (Jordan, Odile, Thierry, équipe, 6 membres)
  - `events/` : 17 photos d'événements
  - `partners/` : 9 logos partenaires
  - `content/` : 4 images éditoriales
- Intégration dans tous les composants (EventCard, Header, Footer, À propos, etc.)

## Étape 6 — Mise en place du CMS Sanity

### Schémas créés
| Type | Champs principaux | Modifiable par l'équipe |
|------|-------------------|----------------------|
| `event` | Nom, slug, dates, lieu, type, description, image, places | Oui |
| `teamMember` | Nom, rôle, photo, catégorie (staff/comité) | Oui |
| `partner` | Nom, logo, site web | Oui |
| `testimonial` | Nom, organisation, texte | Oui |
| `stat` | Label, valeur, suffixe | Oui |
| `siteSettings` | Email, téléphones, adresse, RS, URL inscription | Oui |

### Architecture CMS
- Studio embarqué à `/admin`
- Fallback automatique : données statiques si Sanity non configuré
- Requêtes GROQ typées avec TypeScript
- Seed script pour peupler les données initiales

### Peuplement des données
- Token API créé et données seedées via `scripts/seed-sanity.mjs`
- 16 événements, 10 membres, 2 témoignages, 5 stats, paramètres du site

## Étape 7 — Studio CMS visuel (demande client)

- Icônes et emojis sur chaque type de document et dans les previews
- Descriptions en français sur tous les champs
- Champs conditionnels (ex : email/téléphone uniquement pour le staff)
- Onglets dans les formulaires (Infos/Bénévoles pour les événements, Contact/RS/Général pour les paramètres)
- Radio buttons visuels avec emojis (🏃 Sportif / 🎭 Culturel)
- Structure de navigation organisée avec sous-menus (Équipe → Staff/Comité)
- Page d'accueil personnalisée avec guide d'utilisation en 4 étapes

## Étape 8 — Refonte palette de couleurs (demande client)

### Palette alignée sur le logo ADB
| Rôle | Avant | Après |
|------|-------|-------|
| Primary | `#e11d48` rouge rose | `#0d9488` teal/turquoise |
| Secondary | `#0ea5e9` bleu ciel | `#1e3a5f` bleu marine |
| Accent | `#f59e0b` ambre | `#e97a2b` orange chaud |
| Backgrounds | `stone-*` gris chaud | `slate-*` gris froid |

- Mise à jour de toutes les classes Tailwind dans 15+ fichiers
- Footer et stats passés en fond bleu marine (`bg-secondary`)
- Gradients mis à jour (teal/cyan au lieu de rose/sky)

## Étape 9 — Correction des images événements

- Réassignation correcte des photos aux bons événements
- Ajout de `images.remotePatterns` pour `cdn.sanity.io` dans `next.config.ts`
- Ajout de `images.formats` pour WebP et AVIF
- Clear du cache `.next/`

## Étape 10 — Homepage plus humaine (demande client)

- Hero : remplacement du fond gradient par une **vraie photo plein écran** (Swimrunman groupe) avec overlay navy
- Texte hero en blanc sur photo (plus immersif)
- Section mission : **photo de groupe à gauche** + texte à droite (layout éditorial)
- **Photo pleine largeur** intercalée entre les sections (bénévoles OpenLakes) avec stat overlay
- Galerie : **grille mosaïque** (4 grandes photos événements + carrousel miniatures)
- CTA final : **photo en background** (foule Avoriaz) au lieu d'un fond uni

## SEO

- Metadata (title, description, keywords) sur chaque page
- Open Graph + Twitter Cards
- Schema.org JSON-LD (NGO) dans le layout
- `sitemap.xml` dynamique (26 URLs)
- `robots.txt` avec lien vers sitemap
- `lang="fr"` + canonical URLs
- Pages SSG pour un chargement ultra-rapide
- Balises sémantiques (article, section, h1-h3, nav, footer)

---

## Fichiers clés

```
amicale-des-benevoles/
├── next.config.ts              # Config Next.js + images
├── sanity.config.ts            # Config Sanity Studio
├── .env.local                  # Variables d'environnement (Sanity project ID)
├── scripts/seed-sanity.mjs     # Script de peuplement CMS
├── public/images/              # 65 images du site actuel
├── src/
│   ├── app/
│   │   ├── page.tsx            # Homepage
│   │   ├── layout.tsx          # Layout global + SEO
│   │   ├── a-propos/           # Page À propos
│   │   ├── evenements/         # Liste + [slug] détail
│   │   ├── organisateurs/      # Page B2B
│   │   ├── espace-benevole/    # Lien Recrewteer
│   │   ├── mentions-legales/   # RGPD
│   │   ├── admin/[[...tool]]/  # Studio Sanity
│   │   ├── sitemap.ts          # Sitemap dynamique
│   │   └── robots.ts           # Robots.txt
│   ├── components/
│   │   ├── Header.tsx          # Navigation + logo
│   │   ├── Footer.tsx          # Footer + RS
│   │   ├── EventCard.tsx       # Carte événement avec image
│   │   ├── StatsSection.tsx    # Chiffres animés
│   │   └── Marquee.tsx         # Bandeau défilant
│   ├── lib/
│   │   └── data.ts             # Données statiques (fallback)
│   └── sanity/
│       ├── env.ts              # Variables Sanity
│       ├── StudioWelcome.tsx   # Page d'accueil admin
│       ├── schemas/            # 7 schémas CMS
│       └── lib/
│           ├── client.ts       # Client Sanity
│           ├── queries.ts      # Requêtes GROQ
│           ├── fetch.ts        # Fetchers avec fallback
│           ├── image.ts        # Helper URL images
│           └── types.ts        # Types TypeScript
```

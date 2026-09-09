import type { NextConfig } from "next";

// Redirections 301 depuis les anciennes URL WordPress (repérées dans la Search
// Console) vers les pages équivalentes du nouveau site. Sans slash final :
// Next redirige déjà `/x/` → `/x` (308) avant d'appliquer cette liste.
const legacyEventRedirects: Record<string, string> = {
  t100: "/evenements/triathlon-t100",
  "swimrunman-cote-bleue": "/evenements/swimrunman-calanques-cote-bleue",
  "swimrunman-calanques": "/evenements/swimrunman-calanques-cote-bleue",
  "la-sainte-lyon": "/evenements/la-saintelyon",
  yotta: "/evenements/yotta-xp-vichy",
  "alpine-academy": "/evenements/arcteryx-alpine-academy",
  "marathon-du-vercors": "/evenements/marathon-du-vercors",
  "swimrun-grands-lacs-de-laffrey": "/evenements/swimrunman-grands-lacs-de-laffrey",
  "triathlon-de-la-madeleine": "/evenements/triathlon-de-la-madeleine",
  "coupe-du-monde-vtt": "/evenements",
};

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    formats: ["image/webp", "image/avif"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async redirects() {
    return [
      ...Object.entries(legacyEventRedirects).map(([slug, destination]) => ({
        source: `/evenement/${slug}`,
        destination,
        permanent: true,
      })),
      // Toute autre ancienne fiche /evenement/xxx → nouvelle arborescence /evenements/xxx
      { source: "/evenement/:slug", destination: "/evenements/:slug", permanent: true },
      { source: "/etre-benevole", destination: "/espace-benevole", permanent: true },
      // Faute de frappe historique (675 impressions sur 16 mois)
      { source: "/mentions-leghales", destination: "/mentions-legales", permanent: true },
      // Fiche supprimée, signalée « soft 404 » par Google
      { source: "/evenements/course-des-lumieres-lyon", destination: "/evenements", permanent: true },
    ];
  },
};

export default nextConfig;

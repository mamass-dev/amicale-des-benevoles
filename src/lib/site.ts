// URL canonique du site. Override via NEXT_PUBLIC_SITE_URL en env var.
// Utile pour basculer entre vercel.app (preview) et le domaine custom (prod).
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ||
  "https://amicaledesbenevoles.org";

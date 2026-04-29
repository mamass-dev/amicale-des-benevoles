import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getSiteSettings } from "@/sanity/lib/fetch";
import { siteUrl } from "@/lib/site";

// Workflow Sanity standard : draft → bouton Publish → publié.
// Le site se rafraîchit automatiquement toutes les 60 secondes (ISR).
// Donc max 1 minute entre Publish et voir le changement sur le site.
export const revalidate = 60;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Amicale des Bénévoles — Bénévolat événementiel sportif & culturel",
    template: "%s | Amicale des Bénévoles",
  },
  description:
    "Association loi 1901 pour la promotion du bénévolat événementiel sportif et culturel. Rejoignez +3000 bénévoles sur des événements partout en France : SaintéLyon, High Five Festival, Lyon Street Food...",
  keywords: [
    "bénévolat",
    "bénévole événementiel",
    "association bénévoles Lyon",
    "bénévolat sportif",
    "bénévolat culturel",
    "événements sportifs bénévoles",
    "amicale des bénévoles",
    "mission bénévole",
    "engagement citoyen",
    "bénévolat France",
  ],
  authors: [{ name: "Amicale des Bénévoles" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "Amicale des Bénévoles",
    title: "Amicale des Bénévoles — Créateur d'expériences citoyennes",
    description:
      "Rejoignez +3000 bénévoles engagés sur des événements sportifs et culturels partout en France.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Amicale des Bénévoles",
    description: "Créateur d'expériences citoyennes 100% événementiel",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: siteUrl,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "NGO",
              name: "Amicale des Bénévoles",
              url: siteUrl,
              logo: `${siteUrl}/logo.png`,
              description:
                "Association loi 1901 pour la promotion et le développement du bénévolat dans le milieu événementiel sportif et culturel.",
              address: {
                "@type": "PostalAddress",
                streetAddress: "107 rue Bechevelin",
                addressLocality: "Lyon",
                postalCode: "69007",
                addressCountry: "FR",
              },
              email: "contact@amicaledesbenevoles.org",
              telephone: "+33688651960",
              foundingDate: "2019",
              sameAs: [
                "https://www.facebook.com/amicaledesbenevoles",
                "https://www.instagram.com/amicale_des_benevoles/",
                "https://www.linkedin.com/company/amicaledesbenevoles",
              ],
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <a href="#main-content" className="skip-link">
          Aller au contenu principal
        </a>
        <Header settings={settings} />
        <main id="main-content" className="flex-1 pt-16">
          {children}
        </main>
        <Footer settings={settings} />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { User, ExternalLink, ArrowRight, Calendar, LifeBuoy, Mail } from "lucide-react";
import { getVolunteerContent, getSiteSettings } from "@/sanity/lib/fetch";
import { getIcon } from "@/lib/icons";
import Breadcrumbs from "@/components/Breadcrumbs";

export const metadata: Metadata = {
  title: "Espace Bénévole | Accès à ton espace personnel",
  description:
    "Accède à ton espace bénévole personnel sur Recrewteer. Retrouve tes événements, tes disponibilités, tes informations et les newsletters de l'Amicale des Bénévoles.",
  keywords: ["espace bénévole", "compte bénévole", "inscription bénévole", "Recrewteer"],
  alternates: { canonical: "/espace-benevole" },
  openGraph: { url: "/espace-benevole" },
};

const guideSteps = [
  {
    step: "01",
    title: "Connecte-toi à Recrewteer",
    description: "Identifie-toi avec ton email et ton mot de passe. Si tu as oublié ton mot de passe, utilise le lien « Mot de passe oublié » sur la page de connexion.",
  },
  {
    step: "02",
    title: "Choisis tes événements",
    description: "Dans l'onglet Événements, parcours les missions ouvertes. Clique sur un événement pour voir le planning et les missions disponibles.",
  },
  {
    step: "03",
    title: "Renseigne tes disponibilités",
    description: "Coche les créneaux où tu peux être présent·e. Tu peux aussi indiquer tes préférences de mission (accueil, ravitaillement, sécurité…).",
  },
  {
    step: "04",
    title: "Reçois ta confirmation",
    description: "Une fois validée, tu reçois un email de confirmation avec toutes les infos pratiques : lieu, horaires, contact du chef de mission, repas, hébergement.",
  },
];

const quickFaq = [
  {
    q: "J'ai oublié mon mot de passe Recrewteer, comment faire ?",
    a: "Sur la page de connexion, clique sur « Mot de passe oublié ». Tu reçois un email pour le réinitialiser. Si tu ne reçois rien, vérifie tes spams ou contacte-nous.",
  },
  {
    q: "Mon inscription est-elle confirmée ?",
    a: "Tu reçois toujours un email de confirmation après inscription à un événement. Si tu ne le reçois pas sous 48h, contacte le chef de mission de l'événement ou écris à contact@amicaledesbenevoles.org.",
  },
  {
    q: "Comment annuler ma participation ?",
    a: "Connecte-toi à Recrewteer, va sur l'événement concerné et utilise le bouton de désinscription. Ou écris-nous directement, on s'occupe du reste.",
  },
];

export default async function EspaceBenevolePage() {
  const [content, settings] = await Promise.all([getVolunteerContent(), getSiteSettings()]);
  const joinUrl = settings.inscriptionUrl || "https://event.recrewteer.com/v2/organization/121/form/7034";
  const supportEmail = settings.email || "contact@amicaledesbenevoles.org";

  return (
    <>
      <Breadcrumbs items={[{ label: "Espace bénévole" }]} />
      <section className="relative py-12 sm:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-primary/5" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-1.5 text-sm font-medium text-secondary mb-6">
              <User className="h-4 w-4" />
              {content.heroBadge}
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              {content.heroTitle1} <span className="text-secondary">{content.heroTitle2}</span>
            </h1>
            <p className="mt-4 text-lg text-muted max-w-xl mx-auto">{content.heroDescription}</p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {content.features.map((f) => {
              const Icon = getIcon(f.icon, Calendar);
              return (
                <div key={f.title} className="p-6 rounded-2xl bg-card border border-border">
                  <div className="inline-flex p-3 rounded-xl bg-secondary/10 text-secondary mb-3">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold mb-2">{f.title}</h3>
                  <p className="text-sm text-muted">{f.description}</p>
                </div>
              );
            })}
          </div>

          <div className="max-w-lg mx-auto text-center">
            <a
              href={joinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-secondary px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-secondary/25 hover:bg-secondary-dark transition-all"
            >
              <ExternalLink className="h-5 w-5" />
              {content.ctaAccess}
            </a>
            <p className="mt-4 text-sm text-muted">{content.ctaAccessNote}</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary/[0.03] border-t border-border">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-sm font-semibold uppercase tracking-wider text-secondary mb-3">
              Guide de démarrage
            </p>
            <h2 className="text-3xl font-bold mb-3">Première utilisation de Recrewteer ?</h2>
            <p className="text-muted max-w-xl mx-auto">
              Voici comment t&apos;inscrire à un événement en 4 étapes.
            </p>
          </div>

          <ol className="grid md:grid-cols-2 gap-5">
            {guideSteps.map(({ step, title, description }) => (
              <li
                key={step}
                className="flex gap-4 p-6 rounded-2xl bg-card border border-border hover:border-secondary/30 transition-colors"
              >
                <div className="shrink-0 w-12 h-12 rounded-xl bg-secondary/10 text-secondary font-bold text-lg flex items-center justify-center">
                  {step}
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <div className="inline-flex p-2.5 rounded-xl bg-primary/10 text-primary">
              <LifeBuoy className="h-5 w-5" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold">Besoin d&apos;aide ?</h2>
          </div>

          <div className="space-y-3 mb-8">
            {quickFaq.map((item) => (
              <details
                key={item.q}
                className="group rounded-2xl bg-card border border-border overflow-hidden hover:border-primary/30 transition-colors"
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer p-5 list-none [&::-webkit-details-marker]:hidden">
                  <h3 className="font-semibold pr-2">{item.q}</h3>
                  <span
                    aria-hidden="true"
                    className="shrink-0 inline-flex items-center justify-center w-7 h-7 rounded-full bg-primary/10 text-primary transition-transform group-open:rotate-45"
                  >
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <line x1="7" y1="1" x2="7" y2="13" />
                      <line x1="1" y1="7" x2="13" y2="7" />
                    </svg>
                  </span>
                </summary>
                <p className="px-5 pb-5 -mt-1 text-muted text-sm leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/faq"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold hover:bg-card hover:border-primary/30 transition-colors"
            >
              Toutes les questions <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={`mailto:${supportEmail}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary-dark transition-colors shadow-md"
            >
              <Mail className="h-4 w-4" />
              Nous écrire
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">{content.registerTitle}</h2>
          <p className="text-muted text-lg mb-8 max-w-xl mx-auto">{content.registerDescription}</p>
          <a
            href={joinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-semibold text-white hover:bg-primary-dark transition-colors shadow-lg shadow-primary/25"
          >
            {content.registerButton} <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </section>
    </>
  );
}

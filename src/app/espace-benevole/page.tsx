import type { Metadata } from "next";
import { User, ExternalLink, ArrowRight, Calendar } from "lucide-react";
import { getVolunteerContent, getSiteSettings } from "@/sanity/lib/fetch";
import { getIcon } from "@/lib/icons";

export const metadata: Metadata = {
  title: "Espace Bénévole | Accès à ton espace personnel",
  description:
    "Accède à ton espace bénévole personnel sur Recrewteer. Retrouve tes événements, tes disponibilités, tes informations et les newsletters de l'Amicale des Bénévoles.",
  keywords: ["espace bénévole", "compte bénévole", "inscription bénévole", "Recrewteer"],
};

export default async function EspaceBenevolePage() {
  const [content, settings] = await Promise.all([getVolunteerContent(), getSiteSettings()]);
  const joinUrl = settings.inscriptionUrl || "https://event.recrewteer.com/v2/organization/121/form/7034";

  return (
    <>
      <section className="relative py-20 overflow-hidden">
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

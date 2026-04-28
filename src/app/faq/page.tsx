import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, HelpCircle } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getSiteSettings, getFaqContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "FAQ — Questions fréquentes sur le bénévolat événementiel",
  description:
    "Toutes les réponses sur le bénévolat avec l'Amicale : inscription, missions, défraiements, hébergement, mineurs, accessibilité PMR... Plus de 15 questions pour t'aider à te lancer.",
  keywords: [
    "FAQ bénévolat",
    "questions bénévolat événementiel",
    "comment devenir bénévole",
    "Amicale des Bénévoles questions",
    "inscription bénévole",
  ],
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ — Amicale des Bénévoles",
    description: "Toutes les réponses pour devenir bénévole sur un événement sportif ou culturel.",
    url: "/faq",
  },
};

export default async function FaqPage() {
  const [content, settings] = await Promise.all([getFaqContent(), getSiteSettings()]);
  const joinUrl = settings.inscriptionUrl || "https://event.recrewteer.com/v2/organization/121/form/7034";

  const allItems = content.sections.flatMap((s) => s.items);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Breadcrumbs items={[{ label: "FAQ" }]} />

      <section className="relative py-12 sm:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
            <HelpCircle className="h-4 w-4" />
            {content.heroBadge}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
            {content.heroTitle1} <span className="text-primary">{content.heroTitle2}</span>
          </h1>
          <p className="mt-4 text-lg text-muted leading-relaxed max-w-2xl">
            {content.heroDescription}
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
          {content.sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">{section.title}</h2>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <details
                    key={item.question}
                    className="group rounded-2xl bg-card border border-border overflow-hidden hover:border-primary/30 transition-colors"
                  >
                    <summary className="flex items-center justify-between gap-4 cursor-pointer p-5 sm:p-6 list-none [&::-webkit-details-marker]:hidden">
                      <h3 className="font-semibold text-base sm:text-lg pr-2">{item.question}</h3>
                      <span
                        aria-hidden="true"
                        className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary transition-transform group-open:rotate-45"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        >
                          <line x1="7" y1="1" x2="7" y2="13" />
                          <line x1="1" y1="7" x2="13" y2="7" />
                        </svg>
                      </span>
                    </summary>
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6 -mt-1 text-muted leading-relaxed">
                      {item.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">{content.ctaTitle}</h2>
          <p className="text-muted mb-8 max-w-xl mx-auto">{content.ctaDescription}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={joinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-white font-semibold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/25"
            >
              {content.ctaPrimary} <ArrowRight className="h-5 w-5" />
            </a>
            <Link
              href="/evenements"
              className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 font-semibold hover:bg-card transition-colors"
            >
              {content.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

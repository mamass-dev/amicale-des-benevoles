import type { Metadata } from "next";
import EventCard from "@/components/EventCard";
import { ArrowRight } from "lucide-react";
import { getEvents, getEventsPageContent, getSiteSettings } from "@/sanity/lib/fetch";

export const metadata: Metadata = {
  title: "Événements bénévoles 2026 | Sportifs & Culturels en France",
  description:
    "Découvrez tous les événements sportifs et culturels où vous pouvez devenir bénévole en 2026 : SaintéLyon, High Five Festival, Colnago GF Mont Ventoux, Lyon Street Food Festival...",
  keywords: [
    "événements bénévoles 2026",
    "bénévolat sportif France",
    "bénévolat culturel",
    "mission bénévole événement",
    "SaintéLyon bénévole",
    "High Five Festival bénévole",
  ],
  openGraph: {
    title: "Événements bénévoles 2026 | Amicale des Bénévoles",
    description: "18 événements sportifs et culturels en France. Trouve ta mission bénévole idéale.",
  },
};

export default async function EvenementsPage() {
  const [events, content, settings] = await Promise.all([
    getEvents(),
    getEventsPageContent(),
    getSiteSettings(),
  ]);
  const joinUrl = settings.inscriptionUrl || "https://event.recrewteer.com/v2/organization/121/form/7034";
  const description = content.heroDescription.replace("{count}", String(events.length));

  return (
    <>
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            {content.heroTitle1} <span className="text-primary">{content.heroTitle2}</span> 2026
          </h1>
          <p className="mt-4 text-lg text-muted max-w-2xl">{description}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">{content.ctaTitle}</h2>
          <p className="text-white/80 mb-8 text-lg">{content.ctaDescription}</p>
          <a
            href={joinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white text-primary px-7 py-3.5 font-semibold hover:bg-slate-100 transition-colors shadow-lg"
          >
            {content.ctaButton} <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </section>
    </>
  );
}

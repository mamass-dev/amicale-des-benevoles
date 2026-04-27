import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Calendar, ArrowLeft, ArrowRight, Clock, CheckCircle2 } from "lucide-react";
import { getEvents, getEventBySlug, getSiteSettings } from "@/sanity/lib/fetch";
import Breadcrumbs from "@/components/Breadcrumbs";
import EventCard from "@/components/EventCard";

type Props = {
  params: Promise<{ slug: string }>;
};

const baseUrl = "https://amicaledesbenevoles.org";

export async function generateStaticParams() {
  const events = await getEvents();
  return events.map((e: { slug: string }) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return { title: "Événement non trouvé" };

  const typeLabel = event.type === "sportif" ? "sportif" : "culturel";
  const title = `${event.name} — Bénévolat ${typeLabel} à ${event.location}`;
  const description = `${event.description} Deviens bénévole sur ${event.name} du ${event.dates} à ${event.location}. Inscris-toi à l'Amicale des Bénévoles.`;
  const url = `/evenements/${event.slug}`;

  return {
    title,
    description,
    keywords: [
      `bénévole ${event.name}`,
      `${event.name} ${event.location}`,
      `bénévolat ${typeLabel}`,
      `bénévolat ${event.location}`,
      "mission bénévole événement",
      "Amicale des Bénévoles",
    ],
    alternates: { canonical: url },
    openGraph: {
      title: `${event.name} | Amicale des Bénévoles`,
      description: event.description,
      url,
      type: "article",
      images: event.image ? [{ url: event.image, width: 1200, height: 630, alt: event.name }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: event.name,
      description: event.description,
      images: event.image ? [event.image] : undefined,
    },
  };
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params;
  const [event, allEvents, settings] = await Promise.all([
    getEventBySlug(slug),
    getEvents(),
    getSiteSettings(),
  ]);
  if (!event) notFound();

  const joinUrl = settings.inscriptionUrl || "https://event.recrewteer.com/v2/organization/121/form/7034";
  const similar = allEvents
    .filter((e) => e.slug !== event.slug && e.type === event.type)
    .slice(0, 3);

  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    description: event.description,
    ...(event.dateStart ? { startDate: event.dateStart } : {}),
    ...(event.dateEnd ? { endDate: event.dateEnd } : {}),
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: event.location,
      address: {
        "@type": "PostalAddress",
        addressLocality: event.location,
        addressCountry: "FR",
      },
    },
    ...(event.image ? { image: [event.image] } : {}),
    url: `${baseUrl}/evenements/${event.slug}`,
    organizer: {
      "@type": "NGO",
      name: "Amicale des Bénévoles",
      url: baseUrl,
    },
    offers: {
      "@type": "Offer",
      url: joinUrl,
      price: "0",
      priceCurrency: "EUR",
      availability: "https://schema.org/InStock",
      validFrom: event.dateStart || new Date().toISOString().split("T")[0],
      category: "Volunteer",
    },
  };

  const missions = event.missions?.length
    ? event.missions
    : [
        "Accueil et orientation des participants",
        "Ravitaillement (course / festival)",
        "Logistique et installation",
        "Sécurité et signalétique",
        "Animation et ambiance",
      ];

  const practicalInfo = event.practicalInfo?.length
    ? event.practicalInfo
    : [
        "Encadrement par les chefs de mission de l'Amicale",
        "Repas et boissons offerts pendant la mission",
        "T-shirt et accréditation fournis",
        "Aucune expérience requise — formation sur place",
      ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }}
      />
      <Breadcrumbs
        items={[
          { label: "Événements", href: "/evenements" },
          { label: event.name },
        ]}
      />

      <section className="py-8 sm:py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/evenements"
            className="inline-flex items-center gap-2 text-muted hover:text-primary mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> Retour aux événements
          </Link>

          <div className="relative aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden mb-8 shadow-lg">
            <Image
              src={event.image}
              alt={event.name}
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <div className="absolute bottom-4 left-4">
              <span
                className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                  event.type === "sportif" ? "bg-secondary/90 text-white" : "bg-accent/90 text-white"
                }`}
              >
                {event.type === "sportif" ? "Événement sportif" : "Événement culturel"}
              </span>
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
            {event.name}
          </h1>

          <div className="flex flex-wrap gap-4 sm:gap-6 mb-8">
            <div className="flex items-center gap-2 text-muted">
              <Calendar className="h-5 w-5 text-primary shrink-0" />
              <span className="text-base sm:text-lg">{event.dates}</span>
            </div>
            <div className="flex items-center gap-2 text-muted">
              <MapPin className="h-5 w-5 text-primary shrink-0" />
              <span className="text-base sm:text-lg">{event.location}</span>
            </div>
          </div>

          <p className="text-base sm:text-lg text-muted leading-relaxed mb-10">
            {event.description}
          </p>

          <div className="grid sm:grid-cols-2 gap-6 mb-10">
            <div className="p-6 rounded-2xl bg-card border border-border">
              <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                Missions possibles
              </h2>
              <ul className="space-y-2">
                {missions.map((m) => (
                  <li key={m} className="flex gap-2 text-sm text-muted">
                    <span className="text-primary mt-0.5">•</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20">
              <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Bon à savoir
              </h2>
              <ul className="space-y-3 text-sm text-muted">
                {practicalInfo.map((info) => (
                  <li key={info} className="flex gap-2">
                    <span className="text-primary mt-0.5">•</span>
                    <span>{info}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <a
              href={joinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-white font-semibold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/25"
              aria-label={`S'inscrire comme bénévole pour ${event.name}`}
            >
              S&apos;inscrire comme bénévole <ArrowRight className="h-5 w-5" />
            </a>
            <Link
              href="/evenements"
              className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 font-semibold hover:bg-primary/5 transition-colors"
            >
              Voir tous les événements
            </Link>
          </div>
        </div>
      </section>

      {similar.length > 0 && (
        <section className="py-16 bg-primary/5 border-t border-border">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8">
              Autres événements {event.type === "sportif" ? "sportifs" : "culturels"}
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {similar.map((e) => (
                <EventCard key={e.slug} event={e} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

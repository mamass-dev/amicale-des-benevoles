import Link from "next/link";
import Image from "next/image";
import { MapPin, Calendar, CalendarCheck2 } from "lucide-react";

type Event = {
  slug: string;
  name: string;
  location: string;
  dates: string;
  type: string;
  description: string;
  image: string;
  registrationUrl?: string;
};

const DEFAULT_JOIN_URL = "https://event.recrewteer.com/v2/organization/121/form/7034";

export default function EventCard({
  event,
  isPast = false,
}: {
  event: Event;
  isPast?: boolean;
}) {
  if (isPast) {
    return (
      <article className="group relative bg-card rounded-2xl border border-border overflow-hidden opacity-60 select-none">
        <span className="sr-only">Édition passée, inscriptions clôturées.</span>
        <div className="aspect-[16/9] relative overflow-hidden bg-primary/5">
          <Image
            src={event.image}
            alt={event.name}
            fill
            className="object-cover grayscale"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-black/10" />
          <div className="absolute top-3 left-3">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-slate-700/90 text-white">
              {event.type === "sportif" ? "Sportif" : "Culturel"}
            </span>
          </div>
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/95 text-slate-700 shadow-sm">
              <CalendarCheck2 className="h-3.5 w-3.5" /> Édition passée
            </span>
          </div>
        </div>

        <div className="p-5">
          <h3 className="font-bold text-lg mb-2 line-clamp-2 text-muted">
            {event.name}
          </h3>

          <div className="space-y-1.5 mb-4">
            <div className="flex items-center gap-2 text-sm text-muted">
              <Calendar className="h-4 w-4 shrink-0" />
              <span>{event.dates}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted">
              <MapPin className="h-4 w-4 shrink-0" />
              <span>{event.location}</span>
            </div>
          </div>

          <p className="text-sm text-muted line-clamp-2 mb-4">{event.description}</p>

          <div className="rounded-lg border border-dashed border-border bg-muted/5 px-4 py-2 text-center text-sm font-medium text-muted">
            Édition terminée
          </div>
        </div>
      </article>
    );
  }

  const joinUrl = event.registrationUrl || DEFAULT_JOIN_URL;

  return (
    <article className="group relative bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1">
      <div className="aspect-[16/9] relative overflow-hidden bg-primary/5">
        <Image
          src={event.image}
          alt={event.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute top-3 left-3">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
            event.type === "sportif"
              ? "bg-secondary/90 text-white"
              : "bg-accent/90 text-white"
          }`}>
            {event.type === "sportif" ? "Sportif" : "Culturel"}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {event.name}
        </h3>

        <div className="space-y-1.5 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted">
            <Calendar className="h-4 w-4 shrink-0" />
            <span>{event.dates}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted">
            <MapPin className="h-4 w-4 shrink-0" />
            <span>{event.location}</span>
          </div>
        </div>

        <p className="text-sm text-muted line-clamp-2 mb-4">{event.description}</p>

        <div className="flex flex-col sm:flex-row gap-2">
          <Link
            href={`/evenements/${event.slug}`}
            aria-label={`En savoir plus sur ${event.name}`}
            className="flex-1 text-center rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-primary/5 transition-colors after:absolute after:inset-0 after:content-['']"
          >
            En savoir plus
          </Link>
          <a
            href={joinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`S'inscrire comme bénévole pour ${event.name}`}
            className="relative z-10 flex-1 text-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark transition-colors"
          >
            S&apos;inscrire
          </a>
        </div>
      </div>
    </article>
  );
}

import Link from "next/link";
import Image from "next/image";
import { MapPin, Calendar, Users } from "lucide-react";

type Event = {
  slug: string;
  name: string;
  location: string;
  dates: string;
  type: string;
  description: string;
  image: string;
  spots: number;
  spotsFilled: number;
};

export default function EventCard({ event }: { event: Event }) {
  const fillPercent = Math.round((event.spotsFilled / event.spots) * 100);
  const isAlmostFull = fillPercent >= 80;

  return (
    <article className="group relative bg-card rounded-2xl border border-border overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-1">
      <div className="aspect-[16/9] relative overflow-hidden bg-slate-100">
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
        {isAlmostFull && (
          <div className="absolute top-3 right-3">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-primary text-white animate-pulse">
              Presque complet
            </span>
          </div>
        )}
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
          <div className="flex items-center gap-2 text-sm text-muted">
            <Users className="h-4 w-4 shrink-0" />
            <span>{event.spotsFilled}/{event.spots} bénévoles inscrits</span>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-xs text-muted mb-1">
            <span>Remplissage</span>
            <span>{fillPercent}%</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isAlmostFull ? "bg-primary" : "bg-secondary"
              }`}
              style={{ width: `${fillPercent}%` }}
            />
          </div>
        </div>

        <p className="text-sm text-muted line-clamp-2 mb-4">{event.description}</p>

        <div className="flex gap-2">
          <Link
            href={`/evenements/${event.slug}`}
            className="flex-1 text-center rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-slate-50 transition-colors"
          >
            En savoir plus
          </Link>
          <a
            href="https://event.recrewteer.com/v2/organization/121/form/7034"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-dark transition-colors"
          >
            S&apos;inscrire
          </a>
        </div>
      </div>
    </article>
  );
}

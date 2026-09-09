import Link from "next/link";
import { ArrowRight, Calendar, MapPin } from "lucide-react";
import { getEvents } from "@/sanity/lib/fetch";
import { isEventPast } from "@/lib/event-status";

// Bloc de maillage interne : liste compacte des prochaines missions avec un
// lien direct vers chaque fiche événement. Placé sur les pages « Espace
// bénévole » et « À propos » pour que les fiches reçoivent plus d'un lien
// interne (constat Search Console : SaintéLyon et Marathon d'Avignon n'en
// avaient qu'un seul).
export default async function UpcomingMissions({
  title = "Prochaines missions bénévoles",
  subtitle = "Choisis ton événement et inscris-toi en quelques clics.",
  limit = 4,
}: {
  title?: string;
  subtitle?: string;
  limit?: number;
}) {
  const events = await getEvents();
  const upcoming = events.filter((e) => !isEventPast(e)).slice(0, limit);
  if (upcoming.length === 0) return null;

  return (
    <section className="py-16 border-t border-border" aria-labelledby="upcoming-missions-title">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <h2 id="upcoming-missions-title" className="text-2xl sm:text-3xl font-bold mb-1">
              {title}
            </h2>
            <p className="text-muted">{subtitle}</p>
          </div>
          <Link
            href="/evenements"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all shrink-0"
          >
            Tous les événements <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        <ul className="grid sm:grid-cols-2 gap-4">
          {upcoming.map((event) => (
            <li key={event.slug}>
              <Link
                href={`/evenements/${event.slug}`}
                className="group flex items-start justify-between gap-4 rounded-2xl border border-border bg-card p-5 hover:border-primary/40 hover:shadow-md transition-all"
              >
                <div className="min-w-0">
                  <p className="font-bold text-base sm:text-lg group-hover:text-primary transition-colors">
                    Devenir bénévole : {event.name}
                  </p>
                  <p className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
                    <span className="inline-flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 text-primary shrink-0" /> {event.dates}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-primary shrink-0" /> {event.location}
                    </span>
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 text-muted group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0 mt-1" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

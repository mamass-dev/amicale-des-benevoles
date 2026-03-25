import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MapPin, Calendar, Users, ArrowLeft, ArrowRight, Car, BedDouble } from "lucide-react";
import { getEvents, getEventBySlug } from "@/sanity/lib/fetch";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const events = await getEvents();
  return events.map((e: { slug: string }) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return { title: "Événement non trouvé" };

  return {
    title: `${event.name} — Bénévolat ${event.type} à ${event.location}`,
    description: `${event.description} Deviens bénévole sur ${event.name} du ${event.dates} à ${event.location}. Inscris-toi à l'Amicale des Bénévoles.`,
    openGraph: {
      title: `${event.name} | Amicale des Bénévoles`,
      description: event.description,
    },
  };
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) notFound();

  const fillPercent = Math.round((event.spotsFilled / event.spots) * 100);
  const spotsLeft = event.spots - event.spotsFilled;

  return (
    <>
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <Link href="/evenements" className="inline-flex items-center gap-2 text-muted hover:text-primary mb-8 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Retour aux événements
          </Link>

          {/* Image hero */}
          <div className="relative aspect-[21/9] rounded-2xl overflow-hidden mb-8 shadow-lg">
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
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                event.type === "sportif" ? "bg-secondary/90 text-white" : "bg-accent/90 text-white"
              }`}>
                {event.type === "sportif" ? "Événement sportif" : "Événement culturel"}
              </span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">{event.name}</h1>

          <div className="flex flex-wrap gap-6 mb-8">
            <div className="flex items-center gap-2 text-muted">
              <Calendar className="h-5 w-5 text-primary" />
              <span className="text-lg">{event.dates}</span>
            </div>
            <div className="flex items-center gap-2 text-muted">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="text-lg">{event.location}</span>
            </div>
          </div>

          <p className="text-lg text-muted leading-relaxed mb-8">{event.description}</p>

          {/* Jauge */}
          <div className="p-6 rounded-2xl bg-card border border-border mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <span className="font-semibold">Bénévoles inscrits</span>
              </div>
              <span className="text-2xl font-bold text-primary">{event.spotsFilled}/{event.spots}</span>
            </div>
            <div className="h-3 bg-slate-100 rounded-full overflow-hidden mb-2">
              <div
                className={`h-full rounded-full transition-all ${fillPercent >= 80 ? "bg-primary" : "bg-secondary"}`}
                style={{ width: `${fillPercent}%` }}
              />
            </div>
            <p className="text-sm text-muted">
              {spotsLeft > 0 ? (
                <>Encore <strong>{spotsLeft} places</strong> disponibles</>
              ) : (
                <span className="text-primary font-semibold">Complet !</span>
              )}
            </p>
          </div>

          {/* CTA inscription */}
          <div className="flex flex-wrap gap-4 mb-12">
            <a
              href="https://event.recrewteer.com/v2/organization/121/form/7034"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-white font-semibold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/25"
            >
              S&apos;inscrire comme bénévole <ArrowRight className="h-5 w-5" />
            </a>
          </div>

          {/* Services */}
          <div className="grid sm:grid-cols-2 gap-6">
            <Link href="/covoiturage" className="group p-6 rounded-2xl bg-card border border-border hover:shadow-lg hover:border-secondary/50 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-secondary/10 text-secondary">
                  <Car className="h-5 w-5" />
                </div>
                <h3 className="font-bold">Besoin d&apos;un covoiturage ?</h3>
              </div>
              <p className="text-sm text-muted">
                Propose ou trouve un trajet pour te rendre sur l&apos;événement. Économique et convivial.
              </p>
            </Link>

            <Link href="/hebergement" className="group p-6 rounded-2xl bg-card border border-border hover:shadow-lg hover:border-primary/50 transition-all">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <BedDouble className="h-5 w-5" />
                </div>
                <h3 className="font-bold">Besoin d&apos;un hébergement ?</h3>
              </div>
              <p className="text-sm text-muted">
                Trouve un lit chez un bénévole local ou propose le tien à ceux qui viennent de loin.
              </p>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

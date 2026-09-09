import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Home, User } from "lucide-react";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false, follow: true },
};

// Page 404 (statut HTTP 404 réel, voir la suppression de loading.tsx qui
// provoquait des « soft 404 » côté Google).
export default function NotFound() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary mb-3">Erreur 404</p>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">Cette page n&apos;existe plus</h1>
        <p className="text-muted text-lg mb-10">
          L&apos;événement est peut-être passé ou l&apos;adresse a changé. Les prochaines missions bénévoles
          sont toutes listées sur la page des événements.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href="/evenements"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-white font-semibold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/25"
          >
            <Calendar className="h-5 w-5" /> Voir les événements <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href="/espace-benevole"
            className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 font-semibold hover:bg-primary/5 transition-colors"
          >
            <User className="h-5 w-5" /> Devenir bénévole
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 font-semibold hover:bg-primary/5 transition-colors"
          >
            <Home className="h-5 w-5" /> Accueil
          </Link>
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Car, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Covoiturage — Bientôt de retour | Amicale des Bénévoles",
  description:
    "Le service de covoiturage entre bénévoles revient bientôt. En attendant, découvrez nos événements et rejoignez l'Amicale.",
  robots: { index: false, follow: true },
};

export default function CovoituragePage() {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 via-white to-slate-50" />
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/8 rounded-full blur-[100px] -translate-y-1/3 translate-x-1/4" />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 border border-secondary/20 px-4 py-2 text-sm font-medium text-secondary mb-8">
          <Clock className="h-4 w-4" />
          Bientôt de retour
        </div>
        <div className="inline-flex p-5 rounded-2xl bg-secondary/10 text-secondary mb-6">
          <Car className="h-10 w-10" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.08]">
          Le covoiturage bénévole<br />
          <span className="bg-gradient-to-r from-secondary to-cyan-600 bg-clip-text text-transparent">
            revient prochainement
          </span>
        </h1>
        <p className="mt-6 text-lg text-muted leading-relaxed">
          Nous préparons une nouvelle version du service de covoiturage entre bénévoles. En attendant,
          découvre nos prochains événements ou rejoins l&apos;Amicale pour être informé·e dès son retour.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/evenements"
            className="inline-flex items-center gap-2 rounded-full bg-secondary px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-secondary/25 hover:shadow-xl hover:shadow-secondary/30 transition-all"
          >
            Voir les événements
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border-2 border-secondary/20 px-7 py-3.5 text-base font-semibold text-secondary hover:bg-secondary/5 transition-all"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </section>
  );
}

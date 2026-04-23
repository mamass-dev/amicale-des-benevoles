import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BedDouble, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Hébergement — Bientôt de retour | Amicale des Bénévoles",
  description:
    "L'hébergement solidaire entre bénévoles revient bientôt. En attendant, découvrez nos événements et rejoignez l'Amicale.",
  robots: { index: false, follow: true },
};

export default function HebergementPage() {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 via-white to-amber-50/30" />
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/6 rounded-full blur-[100px] -translate-y-1/4 -translate-x-1/4" />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/15 px-4 py-2 text-sm font-medium text-primary mb-8">
          <Clock className="h-4 w-4" />
          Bientôt de retour
        </div>
        <div className="inline-flex p-5 rounded-2xl bg-primary/10 text-primary mb-6">
          <BedDouble className="h-10 w-10" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-[1.08]">
          L&apos;hébergement solidaire<br />
          <span className="bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">
            revient prochainement
          </span>
        </h1>
        <p className="mt-6 text-lg text-muted leading-relaxed">
          Nous préparons une nouvelle version du service d&apos;hébergement solidaire entre bénévoles.
          En attendant, découvre nos prochains événements ou rejoins l&apos;Amicale pour être
          informé·e dès son retour.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            href="/evenements"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all"
          >
            Voir les événements
            <ArrowRight className="h-5 w-5" />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full border-2 border-primary/20 px-7 py-3.5 text-base font-semibold text-primary hover:bg-primary/5 transition-all"
          >
            Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </section>
  );
}

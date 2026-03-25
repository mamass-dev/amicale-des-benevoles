import type { Metadata } from "next";
import Image from "next/image";
import { Heart, Award, Users, Calendar, Quote, Shield, ArrowRight } from "lucide-react";
import { getTeamMembers } from "@/sanity/lib/fetch";

export const metadata: Metadata = {
  title: "À propos | Notre histoire, notre équipe, nos valeurs",
  description:
    "Découvrez l'Amicale des Bénévoles : association loi 1901 créée en 2019 à Lyon pour promouvoir le bénévolat événementiel sportif et culturel. Plus de 3000 bénévoles mobilisés en France.",
  keywords: [
    "amicale des bénévoles histoire",
    "association bénévolat Lyon",
    "bénévolat événementiel",
    "équipe amicale bénévoles",
  ],
  openGraph: {
    title: "À propos de l'Amicale des Bénévoles",
    description: "Association loi 1901 créée en 2019 à Lyon. +3000 bénévoles engagés en France.",
  },
};

export default async function AProposPage() {
  const teamMembers = await getTeamMembers();
  return (
    <>
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
                Notre <span className="text-primary">histoire</span>
              </h1>
              <p className="mt-4 text-lg text-muted leading-relaxed">
                L&apos;Amicale des Bénévoles est une association loi 1901, créée en 2019, qui œuvre pour la promotion et le développement du bénévolat dans le milieu événementiel sportif et culturel.
              </p>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <Image src="/images/events/groupe-benevoles.jpg" alt="L'équipe de l'Amicale des Bénévoles" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
          </div>
        </div>
      </section>

      {/* Définition du bénévolat */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="p-8 rounded-2xl bg-gradient-to-r from-primary/5 to-secondary/5 border border-border">
              <div className="flex gap-3 mb-4">
                <Quote className="h-8 w-8 text-primary shrink-0" />
              </div>
              <blockquote className="text-lg italic text-muted leading-relaxed">
                &laquo; Est bénévole toute personne qui s&apos;engage librement pour mener une action non salariée en direction d&apos;autrui, en dehors de son temps professionnel et familial. &raquo;
              </blockquote>
              <footer className="mt-4 text-sm font-medium">
                Conseil Économique et Social, 24 février 1993
              </footer>
            </div>
          </div>
        </div>
      </section>

      {/* Notre histoire */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">D&apos;où venons-nous ?</h2>
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">2013</div>
                <div className="w-0.5 flex-1 bg-border mt-2" />
              </div>
              <div className="pb-8">
                <h3 className="font-bold text-lg">Les racines lyonnaises</h3>
                <p className="text-muted mt-1">
                  Championnats du Monde de para-athlétisme IPC à Lyon. Les fondateurs découvrent la puissance du bénévolat événementiel.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">2015</div>
                <div className="w-0.5 flex-1 bg-border mt-2" />
              </div>
              <div className="pb-8">
                <h3 className="font-bold text-lg">L&apos;expérience se confirme</h3>
                <p className="text-muted mt-1">
                  Championnats du Monde d&apos;athlétisme Masters à Lyon. Le noyau de bénévoles se fidélise et l&apos;idée d&apos;une structure dédiée germe.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">2019</div>
                <div className="w-0.5 flex-1 bg-border mt-2" />
              </div>
              <div className="pb-8">
                <h3 className="font-bold text-lg">Création de l&apos;Amicale</h3>
                <p className="text-muted mt-1">
                  L&apos;Amicale des Bénévoles voit le jour à Lyon. Une association loi 1901 dédiée à la promotion du bénévolat événementiel sportif et culturel.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold text-sm">2026</div>
              </div>
              <div>
                <h3 className="font-bold text-lg">Aujourd&apos;hui</h3>
                <p className="text-muted mt-1">
                  Plus de 3 000 bénévoles mobilisés, 18 événements, 62% de fidélisation record, et de nouveaux services : covoiturage et hébergement solidaire.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Nos valeurs</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Heart, title: "Fraternité", desc: "Le bénévolat apporte une grande richesse humaine. Nous entretenons ce lien fraternel." },
              { icon: Shield, title: "Déontologie", desc: "100% de nos expériences respectent notre charte éthique et les principes de la loi 1901." },
              { icon: Users, title: "Intergénérationnel", desc: "Jeunes ou moins jeunes, chacun trouve sa place. La diversité fait notre force." },
              { icon: Award, title: "Excellence", desc: "95% de satisfaction bénévole. Nous visons toujours la qualité de l'expérience." },
            ].map((v) => (
              <div key={v.title} className="p-6 rounded-2xl bg-card border border-border text-center">
                <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-3">
                  <v.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold mb-2">{v.title}</h3>
                <p className="text-sm text-muted">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Équipe */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Notre équipe</h2>

          {/* Staff */}
          <div className="mb-12">
            <h3 className="text-xl font-bold mb-6">Équipe production</h3>
            <div className="grid sm:grid-cols-3 gap-6">
              {teamMembers.staff.map((m) => (
                <div key={m.name} className="p-6 rounded-2xl bg-card border border-border text-center">
                  <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden relative">
                    <Image src={m.image} alt={m.name} fill className="object-cover" sizes="80px" />
                  </div>
                  <h4 className="font-bold">{m.name}</h4>
                  <p className="text-primary text-sm font-medium">{m.role}</p>
                  <p className="text-xs text-muted mt-1">{m.focus}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Comité */}
          <div>
            <h3 className="text-xl font-bold mb-6">Comité directeur</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
              {teamMembers.board.map((m) => (
                <div key={m.name} className="p-4 rounded-xl bg-card border border-border text-center">
                  <div className="w-14 h-14 rounded-full mx-auto mb-2 overflow-hidden relative">
                    <Image src={m.image} alt={m.name} fill className="object-cover" sizes="56px" />
                  </div>
                  <h4 className="font-semibold text-sm">{m.name}</h4>
                  <p className="text-xs text-muted">{m.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Photo équipe */}
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative aspect-[2/1] rounded-3xl overflow-hidden shadow-xl">
            <Image src="/images/team/equipe.png" alt="L'équipe de l'Amicale des Bénévoles" fill className="object-cover" sizes="100vw" />
          </div>
        </div>
      </section>

      {/* Ambassadeurs */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Les ambassadeurs</h2>
            <p className="text-muted leading-relaxed mb-6">
              Nos ambassadeurs représentent l&apos;association et sont garants de ses valeurs. Ils guident et orientent les nouveaux bénévoles, apportent leurs retours d&apos;expériences, leurs idées novatrices et leurs compétences personnelles.
            </p>
            <a
              href="https://event.recrewteer.com/v2/organization/121/form/7034"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-white font-semibold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/25"
            >
              Devenir ambassadeur <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

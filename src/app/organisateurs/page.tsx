import type { Metadata } from "next";
import { Users, Target, Handshake, BarChart3, Star, CheckCircle, ArrowRight, Mail, Phone, Quote } from "lucide-react";
import { getTestimonials } from "@/sanity/lib/fetch";

export const metadata: Metadata = {
  title: "Organisateurs | Mobilisez vos bénévoles avec l'Amicale",
  description:
    "L'Amicale des Bénévoles accompagne les organisateurs d'événements sportifs et culturels dans la mobilisation, l'encadrement et la fidélisation de leurs bénévoles. 95% de satisfaction.",
  keywords: [
    "organisateur événement bénévoles",
    "recrutement bénévoles événementiel",
    "gestion bénévoles événement sportif",
    "programme bénévole événement",
    "mobilisation bénévoles",
  ],
  openGraph: {
    title: "Offre Organisateurs | Amicale des Bénévoles",
    description: "Mobilisez, encadrez et fidélisez vos bénévoles. 95% de satisfaction, 62% de fidélisation.",
  },
};

export default async function OrganisateursPage() {
  const testimonials = await getTestimonials();
  return (
    <>
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
              Ami organisateur,{" "}
              <span className="text-primary">bienvenue !</span>
            </h1>
            <p className="mt-4 text-lg text-muted leading-relaxed">
              Nous mobilisons, encadrons et fidélisons les bénévoles sur vos événements sportifs et culturels. Notre métier : concevoir des programmes bénévoles utiles et durables.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                "De 10 à 2 000 bénévoles",
                "De 1 à 15 jours",
                "Sportif & culturel",
                "Quart Sud-Est France",
              ].map((tag) => (
                <span key={tag} className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Notre mission</h2>
            <p className="text-xl text-primary font-semibold">
              Mobiliser, encadrer & fidéliser les bénévoles
            </p>
            <p className="text-muted mt-2">lors des manifestations sportives, culturelles & caritatives</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Target, title: "Mobiliser", desc: "Stratégie d'acquisition et de recrutement sur-mesure pour chaque événement.", color: "text-primary bg-primary/10" },
              { icon: Users, title: "Encadrer", desc: "Animation sur site, espace bénévoles, suivi opérationnel et accompagnement.", color: "text-secondary bg-secondary/10" },
              { icon: Handshake, title: "Fidéliser", desc: "62% de fidélisation record. On crée du lien pour que les bénévoles reviennent.", color: "text-accent bg-accent/10" },
            ].map((m) => (
              <div key={m.title} className="p-6 rounded-2xl bg-card border border-border text-center">
                <div className={`inline-flex p-3 rounded-xl ${m.color} mb-3`}>
                  <m.icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-lg mb-2">{m.title}</h3>
                <p className="text-sm text-muted">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Méthodologie */}
      <section className="py-16 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Notre méthodologie</h2>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Phase 1 */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6">
                Phase 1 — Construire les conditions de réussite
              </div>
              <ul className="space-y-4">
                {[
                  "Sécuriser et structurer le programme bénévoles (cadrage juridique, documents, masterplan)",
                  "Donner du sens et rendre le programme attractif (cause, message d'engagement, communication)",
                  "Préparer le déploiement opérationnel (logiciel, inscriptions, stratégie de mobilisation)",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Phase 2 */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary font-bold text-sm mb-6">
                Phase 2 — Animer, encadrer, fidéliser
              </div>
              <ul className="space-y-4">
                {[
                  "Animer la mobilisation bénévole (suivi inscriptions, reporting, relances)",
                  "Affecter, sécuriser et accompagner les bénévoles (analyse candidatures, affectations)",
                  "Encadrer pendant l'événement (animation sur site, espace bénévoles)",
                  "Évaluer et fidéliser la communauté (bilan, satisfaction, attestations)",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <CheckCircle className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
                    <span className="text-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Chiffres */}
      <section className="py-16 bg-secondary text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            {[
              { value: "90%", label: "Taux de couverture 2025" },
              { value: "95%", label: "Satisfaction bénévoles" },
              { value: "50-80%", label: "Fidélisation des bénévoles" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-4xl sm:text-5xl font-bold text-primary">{s.value}</div>
                <div className="mt-2 text-slate-400 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Ce que disent les organisateurs</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((t) => (
              <blockquote key={t.name} className="p-8 rounded-2xl bg-card border border-border">
                <Quote className="h-8 w-8 text-primary/20 mb-4" />
                <p className="text-muted leading-relaxed italic mb-4">&ldquo;{t.text}&rdquo;</p>
                <footer className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-accent" fill="currentColor" />
                  <Star className="h-4 w-4 text-accent" fill="currentColor" />
                  <Star className="h-4 w-4 text-accent" fill="currentColor" />
                  <Star className="h-4 w-4 text-accent" fill="currentColor" />
                  <Star className="h-4 w-4 text-accent" fill="currentColor" />
                  <span className="ml-2 font-semibold">{t.name}</span>
                  <span className="text-muted font-normal">&mdash; {t.org}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-primary text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Parlons de votre événement</h2>
          <p className="text-white/80 mb-8 text-lg">
            Contactez Quentin Willems, notre directeur, pour discuter de votre programme bénévole.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:quentin@amicaledesbenevoles.org"
              className="inline-flex items-center gap-2 rounded-full bg-white text-primary px-7 py-3.5 font-semibold hover:bg-slate-100 transition-colors shadow-lg"
            >
              <Mail className="h-5 w-5" />
              quentin@amicaledesbenevoles.org
            </a>
            <a
              href="tel:+33688651960"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-7 py-3.5 font-semibold hover:bg-white/10 transition-colors"
            >
              <Phone className="h-5 w-5" />
              06 88 65 19 60
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

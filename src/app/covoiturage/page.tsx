import type { Metadata } from "next";
import { Car, MapPin, Calendar, Users, Leaf, ArrowRight, ArrowDown, Zap, Heart, ChevronRight } from "lucide-react";
import Link from "next/link";
import { getEvents, getCarpoolContent, getSiteSettings } from "@/sanity/lib/fetch";
import CovoiturageBoard from "./CovoiturageBoard";
import FaqAccordion from "@/components/FaqAccordion";
import { getIcon } from "@/lib/icons";

export const metadata: Metadata = {
  title: "Covoiturage Bénévole | Partagez vos trajets entre bénévoles",
  description:
    "Trouvez ou proposez un covoiturage pour vous rendre sur les événements bénévoles. Économisez, réduisez votre empreinte carbone et faites connaissance avant l'événement.",
  keywords: [
    "covoiturage bénévole",
    "covoiturage événement sportif",
    "trajet bénévole",
    "covoiturage solidaire",
    "covoiturage Lyon",
  ],
  openGraph: {
    title: "Covoiturage entre bénévoles | Amicale des Bénévoles",
    description: "Partagez vos trajets vers les événements bénévoles. Économique, écologique et convivial.",
  },
};

const faqs = [
  {
    question: "Qui peut utiliser le covoiturage ?",
    answer: "Le service est ouvert à tous les bénévoles de l'Amicale. Conducteurs et passagers sont tous des membres inscrits.",
  },
  {
    question: "Comment sont partagés les frais ?",
    answer: "C'est entre vous ! On recommande un partage équitable des frais d'essence et de péage. Le conducteur peut indiquer un montant dans son annonce. Ce n'est pas commercial, c'est solidaire.",
  },
  {
    question: "Comment je contacte un conducteur ou un passager ?",
    answer: "Chaque annonce affiche les coordonnées de la personne (email et/ou téléphone). Tu la contactes directement pour organiser le trajet ensemble. L'Amicale n'intervient pas dans la mise en relation.",
  },
  {
    question: "Que se passe-t-il si un trajet est annulé ?",
    answer: "Prévenez-vous le plus tôt possible entre vous. Pensez à échanger vos numéros de téléphone pour pouvoir communiquer facilement le jour J.",
  },
  {
    question: "Le covoiturage est-il assuré ?",
    answer: "Chaque conducteur est couvert par sa propre assurance auto. On recommande de vérifier que ton contrat couvre le covoiturage (c'est le cas dans la grande majorité des contrats).",
  },
];

export default async function CovoituragePage() {
  const [events, content, settings] = await Promise.all([getEvents(), getCarpoolContent(), getSiteSettings()]);
  const joinUrl = settings.inscriptionUrl || "https://event.recrewteer.com/v2/organization/121/form/7034";

  return (
    <>
      <section className="relative min-h-[60vh] sm:min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 via-white to-slate-50" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/8 rounded-full blur-[100px] -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4" />

        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "repeating-linear-gradient(90deg, transparent, transparent 40px, #1e3a5f 40px, #1e3a5f 42px)" }} />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 border border-secondary/20 px-4 py-2 text-sm font-medium text-secondary mb-8">
                <Zap className="h-4 w-4" />
                {content.heroBadge}
              </div>
              <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.08]">
                {content.heroTitle1}<br />
                <span className="bg-gradient-to-r from-secondary to-cyan-600 bg-clip-text text-transparent">
                  {content.heroTitle2}
                </span>
              </h1>
              <p className="mt-6 text-lg text-muted max-w-lg leading-relaxed">{content.heroDescription}</p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:gap-8">
                {content.heroStats.map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl font-bold text-secondary">{s.value}</div>
                    <div className="text-xs text-muted">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#annonces"
                  className="inline-flex items-center gap-2 rounded-full bg-secondary px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-secondary/25 hover:shadow-xl hover:shadow-secondary/30 hover:bg-secondary-dark transition-all"
                >
                  {content.heroCtaPrimary}
                  <ArrowDown className="h-5 w-5" />
                </a>
                <a
                  href="#publier"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-secondary/20 px-7 py-3.5 text-base font-semibold text-secondary hover:bg-secondary/5 transition-all"
                >
                  <Car className="h-5 w-5" />
                  {content.heroCtaSecondary}
                </a>
              </div>
            </div>

            <div className="hidden lg:block relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-secondary/10 to-slate-200/20 rounded-3xl blur-2xl" />
              <div className="relative space-y-4">
                <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-secondary to-cyan-600 flex items-center justify-center text-white font-bold text-lg">L</div>
                      <div>
                        <div className="font-semibold">Laura M.</div>
                        <div className="text-xs text-muted">Conductrice &middot; 3 places</div>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-green-50 text-green-600 text-xs font-semibold border border-green-100">Disponible</span>
                  </div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-3 h-3 rounded-full border-2 border-secondary" />
                      <div className="w-0.5 h-8 bg-gradient-to-b from-secondary to-primary" />
                      <div className="w-3 h-3 rounded-full bg-primary" />
                    </div>
                    <div className="flex-1 space-y-5">
                      <div>
                        <div className="font-semibold text-sm">Lyon Part-Dieu</div>
                        <div className="text-xs text-muted">Départ &middot; 6h30</div>
                      </div>
                      <div>
                        <div className="font-semibold text-sm">Chamonix Centre</div>
                        <div className="text-xs text-muted">Arrivée &middot; ~9h30</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-secondary">15€</div>
                      <div className="text-xs text-muted">/personne</div>
                    </div>
                  </div>
                  <div className="flex gap-2 mb-4">
                    <span className="px-2.5 py-1 rounded-full bg-slate-50 text-xs text-muted border border-slate-100">Arc&apos;teryx Alpine Academy</span>
                    <span className="px-2.5 py-1 rounded-full bg-slate-50 text-xs text-muted border border-slate-100">30 juin</span>
                  </div>
                  <div className="p-3 rounded-xl bg-secondary/5 border border-secondary/10 text-xs text-secondary flex items-center gap-2">
                    <span className="inline-block w-4 h-4 rounded bg-secondary/20 shrink-0" />
                    Coordonnées visibles après clic
                  </div>
                </div>

                <div className="absolute -bottom-2 -left-6 bg-white rounded-xl shadow-lg shadow-slate-200/30 border border-slate-100 p-3 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center">
                    <Leaf className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-green-700">-67 kg CO2</div>
                    <div className="text-[10px] text-muted">Ce trajet partagé</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {content.trustItems.map((a) => {
              const Icon = getIcon(a.icon, MapPin);
              return (
                <div key={a.title} className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-secondary/8 text-secondary shrink-0 mt-0.5">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{a.title}</h3>
                    <p className="text-xs text-muted mt-0.5">{a.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50/30 to-white" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/10 text-secondary text-sm font-semibold mb-4">{content.howBadge}</span>
            <h2 className="text-3xl sm:text-4xl font-bold">{content.howTitle}</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-0 relative">
            <div className="hidden md:block absolute top-12 left-[16.6%] right-[16.6%] h-0.5 bg-gradient-to-r from-secondary/20 via-secondary to-secondary/20" />

            {content.howSteps.map((s, idx) => {
              const Icon = getIcon(s.icon, Car);
              const gradients = [
                "from-secondary to-cyan-600",
                "from-teal-500 to-secondary",
                "from-secondary to-slate-700",
              ];
              return (
                <div key={s.step} className="relative text-center px-6 py-8">
                  <div className={`relative z-10 inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br ${gradients[idx] ?? gradients[0]} text-white shadow-lg shadow-secondary/20 mb-6`}>
                    <Icon className="h-10 w-10" />
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white text-secondary font-bold text-xs flex items-center justify-center shadow border border-secondary/20">
                      {s.step}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg mb-2">{s.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{s.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 relative" id="annonces">
        <div className="absolute inset-0 bg-gradient-to-b from-stone-50 to-white" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <CovoiturageBoard events={events.map((e) => ({ slug: e.slug, name: e.name, dates: e.dates }))} />
        </div>
      </section>

      <section className="py-16 border-y border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="shrink-0">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-secondary to-cyan-600 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-secondary/20">
                {content.testimonialAuthor.charAt(0)}
              </div>
            </div>
            <blockquote>
              <p className="text-lg italic text-muted leading-relaxed">
                &ldquo;{content.testimonialText}&rdquo;
              </p>
              <footer className="mt-3 font-semibold">
                {content.testimonialAuthor} <span className="text-muted font-normal">&mdash; {content.testimonialRole}</span>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-3">{content.faqTitle}</h2>
            <p className="text-muted">{content.faqSubtitle}</p>
          </div>
          <FaqAccordion items={faqs} color="secondary" />
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-secondary to-cyan-600" />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "24px 24px" }} />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{content.ctaTitle}</h2>
              <p className="text-white/80 mb-8 text-lg leading-relaxed">{content.ctaDescription}</p>
              <a
                href={joinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-white text-secondary px-7 py-3.5 font-semibold hover:bg-slate-50 transition-colors shadow-xl"
              >
                {content.ctaButton} <ArrowRight className="h-5 w-5" />
              </a>
            </div>
            <div>
              <Link href="/hebergement" className="group block p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-white/15">
                    <Heart className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{content.ctaCrossLinkTitle}</h3>
                    <p className="text-sm text-white/70 mt-1">{content.ctaCrossLinkText}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-white/50 group-hover:text-white group-hover:translate-x-1 transition-all ml-auto" />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

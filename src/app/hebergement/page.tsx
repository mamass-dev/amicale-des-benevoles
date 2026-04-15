import type { Metadata } from "next";
import { BedDouble, Heart, MapPin, Calendar, ArrowRight, ArrowDown, Home, Users, Zap, ChevronRight } from "lucide-react";
import Link from "next/link";
import { getEvents, getHousingContent, getSiteSettings } from "@/sanity/lib/fetch";
import HebergementBoard from "./HebergementBoard";
import FaqAccordion from "@/components/FaqAccordion";
import { getIcon } from "@/lib/icons";

export const metadata: Metadata = {
  title: "Hébergement Solidaire | Logement entre bénévoles",
  description:
    "Proposez un lit ou trouvez un hébergement gratuit pour les événements bénévoles. Hébergement solidaire entre membres de l'Amicale des Bénévoles.",
  keywords: [
    "hébergement bénévole",
    "logement solidaire",
    "hébergement événement",
    "lit bénévole",
    "hébergement gratuit bénévolat",
  ],
  openGraph: {
    title: "Hébergement solidaire entre bénévoles | Amicale des Bénévoles",
    description: "Mets un lit à disposition ou trouve un hébergement pour les événements bénévoles.",
  },
};

const faqs = [
  {
    question: "L'hébergement est-il gratuit ?",
    answer: "Oui, c'est un hébergement solidaire. L'hôte ne demande aucune rémunération. Un petit geste d'attention (ramener le petit-déjeuner, aider au ménage) est toujours apprécié !",
  },
  {
    question: "Comment je contacte un hôte ou un voyageur ?",
    answer: "Chaque annonce affiche les coordonnées de la personne (email et/ou téléphone). Tu la contactes directement pour organiser le séjour. L'Amicale n'intervient pas : c'est entre vous.",
  },
  {
    question: "Quels types de logement sont acceptés ?",
    answer: "Tout est bienvenu : chambre privée, canapé-lit, matelas d'appoint, studio... L'important c'est d'avoir un toit. Précise bien ce que tu proposes dans ton annonce.",
  },
  {
    question: "Combien de temps à l'avance faut-il s'y prendre ?",
    answer: "Idéalement 2 à 3 semaines avant l'événement. Pour les gros événements (SaintéLyon, Festival de Danse), les hébergements partent vite.",
  },
  {
    question: "Je peux héberger pour un seul événement ?",
    answer: "Bien sûr ! Tu choisis l'événement et les dates. Aucune obligation de récurrence. Même une seule nuit ça aide énormément.",
  },
];

export default async function HebergementPage() {
  const [events, content, settings] = await Promise.all([getEvents(), getHousingContent(), getSiteSettings()]);
  const joinUrl = settings.inscriptionUrl || "https://event.recrewteer.com/v2/organization/121/form/7034";

  return (
    <>
      <section className="relative min-h-[60vh] sm:min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 via-white to-amber-50/30" />
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/6 rounded-full blur-[100px] -translate-y-1/4 -translate-x-1/4" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent/8 rounded-full blur-[80px] translate-y-1/4 translate-x-1/4" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/15 px-4 py-2 text-sm font-medium text-primary mb-8">
                <Heart className="h-4 w-4" fill="currentColor" />
                {content.heroBadge}
              </div>
              <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-[1.08]">
                {content.heroTitle1}<br />
                <span className="bg-gradient-to-r from-primary to-cyan-500 bg-clip-text text-transparent">
                  {content.heroTitle2}
                </span>
              </h1>
              <p className="mt-6 text-lg text-muted max-w-lg leading-relaxed">{content.heroDescription}</p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:gap-8">
                {content.heroStats.map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl font-bold text-primary">{s.value}</div>
                    <div className="text-xs text-muted">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#annonces"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:bg-primary-dark transition-all"
                >
                  {content.heroCtaPrimary}
                  <ArrowDown className="h-5 w-5" />
                </a>
                <a
                  href="#publier"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-primary/20 px-7 py-3.5 text-base font-semibold text-primary hover:bg-primary/5 transition-all"
                >
                  <Home className="h-5 w-5" />
                  {content.heroCtaSecondary}
                </a>
              </div>
            </div>

            <div className="hidden lg:block relative">
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/8 to-teal-200/15 rounded-3xl blur-2xl" />
              <div className="relative space-y-4">
                <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6">
                  <div className="flex items-center gap-4 mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20">M</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-lg">Marie</span>
                        <span className="px-2 py-0.5 rounded-full bg-green-50 text-green-600 text-xs font-semibold border border-green-100">Disponible</span>
                      </div>
                      <div className="text-sm text-muted">Lyon 7e</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-5">
                    <div className="p-3 rounded-xl bg-slate-50 text-center">
                      <BedDouble className="h-5 w-5 text-primary mx-auto mb-1" />
                      <div className="text-xs font-medium">Chambre privée</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 text-center">
                      <Users className="h-5 w-5 text-primary mx-auto mb-1" />
                      <div className="text-xs font-medium">2 places</div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 text-center">
                      <Calendar className="h-5 w-5 text-primary mx-auto mb-1" />
                      <div className="text-xs font-medium">2 nuits max</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted mb-4">
                    <MapPin className="h-4 w-4 text-primary" />
                    15 min du départ SaintéLyon
                  </div>

                  <div className="p-3 rounded-xl bg-primary/5 border border-primary/10 text-xs text-primary flex items-center gap-2">
                    <span className="inline-block w-4 h-4 rounded bg-primary/20 shrink-0" />
                    Coordonnées visibles après clic
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg shadow-slate-200/30 border border-slate-100 p-4 ml-12">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                      <Heart className="h-4 w-4 text-primary" fill="currentColor" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">2 bénévoles hébergés</div>
                      <div className="text-xs text-muted">pour la SaintéLyon chez Marie</div>
                    </div>
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
              const Icon = getIcon(a.icon, Heart);
              return (
                <div key={a.title} className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/8 text-primary shrink-0 mt-0.5">
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
        <div className="absolute inset-0 bg-gradient-to-b from-white via-teal-50/20 to-white" />
        <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">{content.howBadge}</span>
            <h2 className="text-3xl sm:text-4xl font-bold">{content.howTitle}</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-0 relative">
            <div className="hidden md:block absolute top-12 left-[16.6%] right-[16.6%] h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20" />

            {content.howSteps.map((s, idx) => {
              const Icon = getIcon(s.icon, Home);
              const gradients = [
                "from-primary to-cyan-500",
                "from-teal-400 to-cyan-500",
                "from-teal-600 to-secondary",
              ];
              return (
                <div key={s.step} className="relative text-center px-6 py-8">
                  <div className={`relative z-10 inline-flex items-center justify-center w-24 h-24 rounded-2xl bg-gradient-to-br ${gradients[idx] ?? gradients[0]} text-white shadow-lg shadow-primary/20 mb-6`}>
                    <Icon className="h-10 w-10" />
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white text-primary font-bold text-xs flex items-center justify-center shadow border border-primary/20">
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
          <HebergementBoard events={events.map((e) => ({ slug: e.slug, name: e.name, dates: e.dates }))} />
        </div>
      </section>

      <section className="py-16 border-y border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="shrink-0">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg shadow-primary/20">
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
          <FaqAccordion items={faqs} color="primary" />
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-teal-600" />
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
                className="inline-flex items-center gap-2 rounded-full bg-white text-primary px-7 py-3.5 font-semibold hover:bg-slate-50 transition-colors shadow-xl"
              >
                {content.ctaButton} <ArrowRight className="h-5 w-5" />
              </a>
            </div>
            <div>
              <Link href="/covoiturage" className="group block p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-white/15">
                    <Zap className="h-7 w-7 text-white" />
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

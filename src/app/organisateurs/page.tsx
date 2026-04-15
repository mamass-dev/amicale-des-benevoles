import type { Metadata } from "next";
import { Star, CheckCircle, Mail, Phone, Quote, Heart } from "lucide-react";
import { getTestimonials, getOrganizersContent, getSiteSettings } from "@/sanity/lib/fetch";
import { getIcon } from "@/lib/icons";

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
  const [testimonials, content, settings] = await Promise.all([
    getTestimonials(),
    getOrganizersContent(),
    getSiteSettings(),
  ]);
  const contactEmail = (settings.email as string) || "quentin@amicaledesbenevoles.org";
  const contactPhoneRaw = (settings.phone1 as string) || "Quentin : 06 88 65 19 60";
  const phoneDigits = contactPhoneRaw.match(/[\d\s]{10,}/)?.[0].replace(/\s/g, "") ?? "0688651960";
  const phoneDisplay = contactPhoneRaw.match(/[\d\s]{10,}/)?.[0].trim() ?? "06 88 65 19 60";

  return (
    <>
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
              {content.heroTitle1}{" "}
              <span className="text-primary">{content.heroTitle2}</span>
            </h1>
            <p className="mt-4 text-lg text-muted leading-relaxed">{content.heroDescription}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              {content.heroTags.map((tag) => (
                <span key={tag} className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{content.missionTitle}</h2>
            <p className="text-xl text-primary font-semibold">{content.missionSubtitle}</p>
            <p className="text-muted mt-2">{content.missionTagline}</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {content.missionPillars.map((m) => {
              const Icon = getIcon(m.icon, Heart);
              const colorClass =
                m.color === "secondary"
                  ? "text-secondary bg-secondary/10"
                  : m.color === "accent"
                  ? "text-accent bg-accent/10"
                  : "text-primary bg-primary/10";
              return (
                <div key={m.title} className="p-6 rounded-2xl bg-card border border-border text-center">
                  <div className={`inline-flex p-3 rounded-xl ${colorClass} mb-3`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{m.title}</h3>
                  <p className="text-sm text-muted">{m.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">{content.methodTitle}</h2>

          <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6">
                {content.phase1Title}
              </div>
              <ul className="space-y-4">
                {content.phase1Items.map((item, i) => (
                  <li key={i} className="flex gap-3">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 text-secondary font-bold text-sm mb-6">
                {content.phase2Title}
              </div>
              <ul className="space-y-4">
                {content.phase2Items.map((item, i) => (
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

      <section className="py-16 bg-secondary text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            {content.keyStats.map((s) => (
              <div key={s.label}>
                <div className="text-4xl sm:text-5xl font-bold text-primary">{s.value}</div>
                <div className="mt-2 text-slate-400 text-sm">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">{content.testimonialsTitle}</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((t) => (
              <blockquote key={t.name} className="p-8 rounded-2xl bg-card border border-border">
                <Quote className="h-8 w-8 text-primary/20 mb-4" />
                <p className="text-muted leading-relaxed italic mb-4">&ldquo;{t.text}&rdquo;</p>
                <footer className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-accent" fill="currentColor" />
                  ))}
                  <span className="ml-2 font-semibold">{t.name}</span>
                  <span className="text-muted font-normal">&mdash; {t.org}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">{content.contactTitle}</h2>
          <p className="text-white/80 mb-8 text-lg">{content.contactDescription}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={`mailto:${contactEmail}`}
              className="inline-flex items-center gap-2 rounded-full bg-white text-primary px-7 py-3.5 font-semibold hover:bg-slate-100 transition-colors shadow-lg"
            >
              <Mail className="h-5 w-5" />
              {contactEmail}
            </a>
            <a
              href={`tel:+33${phoneDigits.slice(1)}`}
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 px-7 py-3.5 font-semibold hover:bg-white/10 transition-colors"
            >
              <Phone className="h-5 w-5" />
              {phoneDisplay}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

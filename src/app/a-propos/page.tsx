import type { Metadata } from "next";
import Image from "next/image";
import { Heart, Quote, ArrowRight } from "lucide-react";
import { getTeamMembers, getAboutContent, getSiteSettings } from "@/sanity/lib/fetch";
import { getIcon } from "@/lib/icons";

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
  const [teamMembers, content, settings] = await Promise.all([
    getTeamMembers(),
    getAboutContent(),
    getSiteSettings(),
  ]);
  const joinUrl = settings.inscriptionUrl || "https://event.recrewteer.com/v2/organization/121/form/7034";

  return (
    <>
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
                {content.heroTitle1} <span className="text-primary">{content.heroTitle2}</span>
              </h1>
              <p className="mt-4 text-lg text-muted leading-relaxed">{content.heroDescription}</p>
            </div>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <Image src={content.heroImage} alt="L'équipe de l'Amicale des Bénévoles" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="p-8 rounded-2xl bg-gradient-to-r from-primary/5 to-secondary/5 border border-border">
              <div className="flex gap-3 mb-4">
                <Quote className="h-8 w-8 text-primary shrink-0" />
              </div>
              <blockquote className="text-lg italic text-muted leading-relaxed">
                &laquo;&nbsp;{content.definitionQuote}&nbsp;&raquo;
              </blockquote>
              <footer className="mt-4 text-sm font-medium">{content.definitionSource}</footer>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center">{content.historyTitle}</h2>
          <div className="max-w-3xl mx-auto space-y-8">
            {content.historyMilestones.map((m, idx) => {
              const isLast = idx === content.historyMilestones.length - 1;
              const colorClass = m.color === "accent" ? "bg-accent" : "bg-primary";
              return (
                <div key={idx} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full ${colorClass} text-white flex items-center justify-center font-bold text-sm`}>
                      {m.year}
                    </div>
                    {!isLast && <div className="w-0.5 flex-1 bg-border mt-2" />}
                  </div>
                  <div className={isLast ? "" : "pb-8"}>
                    <h3 className="font-bold text-lg">{m.title}</h3>
                    <p className="text-muted mt-1">{m.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">{content.valuesTitle}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.values.map((v) => {
              const Icon = getIcon(v.icon, Heart);
              return (
                <div key={v.title} className="p-6 rounded-2xl bg-card border border-border text-center">
                  <div className="inline-flex p-3 rounded-xl bg-primary/10 text-primary mb-3">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold mb-2">{v.title}</h3>
                  <p className="text-sm text-muted">{v.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">{content.teamTitle}</h2>

          <div className="mb-12">
            <h3 className="text-xl font-bold mb-6">{content.teamStaffTitle}</h3>
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

          <div>
            <h3 className="text-xl font-bold mb-6">{content.teamBoardTitle}</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
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

      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-accent/10 via-primary/5 to-accent/10 border border-accent/20">
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-accent/15 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative grid md:grid-cols-[260px_1fr] gap-8 sm:gap-12 p-8 sm:p-12 items-center">
              {content.inclusiveReferentImage && (
                <div className="flex justify-center md:justify-start">
                  <div className="relative">
                    <div className="absolute -inset-2 bg-gradient-to-br from-accent to-primary rounded-3xl opacity-20 blur-md" />
                    <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-60 md:h-60 rounded-3xl overflow-hidden ring-4 ring-white shadow-xl">
                      <Image
                        src={content.inclusiveReferentImage}
                        alt={content.inclusiveReferentName || "Référente"}
                        fill
                        className="object-cover"
                        sizes="240px"
                      />
                    </div>
                    <div className="absolute -bottom-3 -right-3 inline-flex p-3 rounded-2xl bg-accent text-white shadow-lg">
                      <Heart className="h-5 w-5" fill="currentColor" />
                    </div>
                  </div>
                </div>
              )}

              <div>
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/15 text-accent text-xs font-semibold uppercase tracking-wider mb-4">
                  <Heart className="h-3.5 w-3.5" fill="currentColor" />
                  Engagement inclusif
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 leading-tight">{content.inclusiveTitle}</h2>
                <p className="text-muted leading-relaxed mb-6">{content.inclusiveText}</p>

                {(content.inclusiveReferentName || content.inclusiveReferentRole) && (
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-4 border-t border-accent/15">
                    <div>
                      {content.inclusiveReferentName && (
                        <div className="font-bold text-foreground">{content.inclusiveReferentName}</div>
                      )}
                      {content.inclusiveReferentRole && (
                        <div className="text-sm text-muted">{content.inclusiveReferentRole}</div>
                      )}
                    </div>
                    {content.inclusiveContactEmail && (
                      <a
                        href={`mailto:${content.inclusiveContactEmail}`}
                        className="sm:ml-auto inline-flex items-center gap-2 rounded-full bg-accent text-white px-5 py-2.5 text-sm font-semibold hover:bg-accent/90 transition-colors shadow-md shadow-accent/20"
                      >
                        {content.inclusiveContactLabel || "Me contacter"}
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">{content.ambassadorsTitle}</h2>
            <p className="text-muted leading-relaxed mb-6">{content.ambassadorsText}</p>
            <a
              href={joinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-white font-semibold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/25"
            >
              {content.ambassadorsCta} <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

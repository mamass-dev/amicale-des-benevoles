import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Heart, Star } from "lucide-react";
import Marquee from "@/components/Marquee";
import StatsSection from "@/components/StatsSection";
import EventCard from "@/components/EventCard";
import {
  getEvents,
  getTestimonials,
  getPartners,
  getStats,
  getHomeContent,
  getSiteSettings,
} from "@/sanity/lib/fetch";
import { getIcon } from "@/lib/icons";

export default async function HomePage() {
  const [events, testimonials, partners, stats, content, settings] = await Promise.all([
    getEvents(),
    getTestimonials(),
    getPartners(),
    getStats(),
    getHomeContent(),
    getSiteSettings(),
  ]);
  const upcomingEvents = events.slice(0, 6);
  const joinUrl = settings.inscriptionUrl || "https://event.recrewteer.com/v2/organization/121/form/7034";

  return (
    <>
      <section className="relative min-h-[70vh] sm:min-h-[92vh] flex items-center overflow-hidden">
        <Image
          src={content.heroImage}
          alt="Bénévoles de l'Amicale en action"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/85 via-secondary/60 to-secondary/30" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur-sm border border-white/20 px-4 py-1.5 text-sm font-medium text-white mb-6">
              <Heart className="h-4 w-4" fill="currentColor" />
              {content.heroBadge}
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-white">
              {content.heroTitle1}{" "}
              <span className="text-primary-light">{content.heroTitle2}</span>
            </h1>
            <p className="mt-3 text-2xl sm:text-3xl font-light text-white/70">
              {content.heroSubtitle}
            </p>
            <p className="mt-6 text-lg text-white/80 max-w-xl leading-relaxed">
              {content.heroDescription}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={joinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/25 hover:bg-primary-dark hover:shadow-xl transition-all"
              >
                {content.heroCtaPrimary}
                <ArrowRight className="h-5 w-5" />
              </a>
              <Link
                href="/evenements"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-7 py-3.5 text-base font-semibold text-white hover:bg-white/20 transition-all"
              >
                {content.heroCtaSecondary}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Marquee />

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={content.missionImage}
                alt="Groupe de bénévoles de l'Amicale en montagne"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">{content.missionTitle}</h2>
              <p className="text-lg text-muted leading-relaxed mb-6">{content.missionText1}</p>
              <p className="text-muted leading-relaxed mb-8">{content.missionText2}</p>
              <div className="flex flex-wrap gap-3">
                {content.missionTags.map((tag) => (
                  <span key={tag} className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {content.pillars.map((pillar) => {
              const Icon = getIcon(pillar.icon, Heart);
              const colorClass =
                pillar.color === "secondary"
                  ? "text-secondary bg-secondary/10"
                  : pillar.color === "accent"
                  ? "text-accent bg-accent/10"
                  : "text-primary bg-primary/10";
              return (
                <div
                  key={pillar.title}
                  className="relative p-8 rounded-2xl bg-card border border-border hover:shadow-lg transition-all group"
                >
                  <div className={`inline-flex p-3 rounded-xl ${colorClass} mb-4`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{pillar.title}</h3>
                  <p className="text-muted leading-relaxed">{pillar.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative h-80 sm:h-96 lg:h-[28rem]">
        <Image
          src={content.bannerImage}
          alt="Bénévoles de l'Amicale au bord du lac lors de l'OpenLakes"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-8 left-0 right-0">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-white text-2xl sm:text-3xl font-bold max-w-lg">
              {content.bannerText}
            </p>
            <p className="text-white/70 mt-2">{content.bannerSubtext}</p>
          </div>
        </div>
      </section>

      <section className="py-24" id="evenements">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-2">{content.eventsTitle}</h2>
              <p className="text-muted text-lg">{content.eventsSubtitle}</p>
            </div>
            <Link
              href="/evenements"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all shrink-0"
            >
              {content.eventsLinkLabel} <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
        </div>
      </section>

      <StatsSection stats={stats} />

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-2">{content.galleryTitle}</h2>
          <p className="text-muted text-center">{content.gallerySubtitle}</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 px-2 mb-2">
          {content.mosaicImages.map((src, i) => (
            <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <Image src={src} alt={`Bénévoles en action ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 50vw, 25vw" />
            </div>
          ))}
        </div>
        <div className="flex gap-2 overflow-x-auto pb-4 px-2 snap-x snap-mandatory">
          {content.galleryImages.map((src, i) => (
            <div key={i} className="shrink-0 w-40 h-40 sm:w-48 sm:h-48 rounded-xl overflow-hidden relative snap-center">
              <Image
                src={src}
                alt={`Moment bénévole ${i + 1}`}
                fill
                className="object-cover hover:scale-110 transition-transform duration-500"
                sizes="192px"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 bg-primary/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">{content.testimonialsTitle}</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((t) => (
              <blockquote key={t.name} className="relative p-8 rounded-2xl bg-card border border-border">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-accent" fill="currentColor" />
                  ))}
                </div>
                <p className="text-muted leading-relaxed italic mb-4">&ldquo;{t.text}&rdquo;</p>
                <footer className="font-semibold">
                  {t.name} <span className="text-muted font-normal">&mdash; {t.org}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-muted text-center mb-8 uppercase tracking-wider font-medium">{content.partnersLabel}</p>
          <div className="flex flex-wrap items-center justify-center gap-10 opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            {partners.map((p) => (
              <div key={p.name} className="relative w-28 h-16">
                <Image
                  src={p.logo}
                  alt={p.name}
                  fill
                  className="object-contain"
                  sizes="112px"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 overflow-hidden">
        <Image
          src={content.ctaImage}
          alt="Foule de bénévoles lors d'un événement"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-secondary/80" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">{content.ctaTitle}</h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">{content.ctaDescription}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={joinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-white shadow-lg hover:bg-primary-dark transition-all"
            >
              {content.ctaPrimary}
              <ArrowRight className="h-5 w-5" />
            </a>
            <Link
              href="/evenements"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-7 py-3.5 text-base font-semibold text-white hover:bg-white/20 transition-colors"
            >
              {content.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Heart, Users, Handshake, Car, BedDouble, Star, ChevronRight } from "lucide-react";
import Marquee from "@/components/Marquee";
import StatsSection from "@/components/StatsSection";
import EventCard from "@/components/EventCard";
import { galleryImages } from "@/lib/data";
import { getEvents, getTestimonials, getPartners, getStats } from "@/sanity/lib/fetch";

export default async function HomePage() {
  const [events, testimonials, partners, stats] = await Promise.all([
    getEvents(),
    getTestimonials(),
    getPartners(),
    getStats(),
  ]);
  const upcomingEvents = events.slice(0, 6);

  return (
    <>
      {/* Hero avec vraie photo */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden">
        <Image
          src="/images/events/swimrunman.jpg"
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
              Association loi 1901 &mdash; Depuis 2019
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-white">
              Créateur d&apos;expériences{" "}
              <span className="text-primary-light">citoyennes</span>
            </h1>
            <p className="mt-3 text-2xl sm:text-3xl font-light text-white/70">
              100% événementielles
            </p>
            <p className="mt-6 text-lg text-white/80 max-w-xl leading-relaxed">
              Que tu sois jeune ou moins jeune, il y a forcément un événement fait pour toi. Rejoins plus de 3 000 bénévoles engagés sur des événements sportifs et culturels partout en France.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://event.recrewteer.com/v2/organization/121/form/7034"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-primary/25 hover:bg-primary-dark hover:shadow-xl transition-all"
              >
                Rejoindre l&apos;Amicale
                <ArrowRight className="h-5 w-5" />
              </a>
              <Link
                href="/evenements"
                className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-7 py-3.5 text-base font-semibold text-white hover:bg-white/20 transition-all"
              >
                Voir les événements
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Marquee />

      {/* Grande photo de groupe + mission */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/events/hero-benevoles.jpg"
                alt="Groupe de bénévoles de l'Amicale en montagne"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">Notre mission</h2>
              <p className="text-lg text-muted leading-relaxed mb-6">
                Concevoir des expériences bénévoles de qualité et donner envie aux bénévoles de poursuivre leur engagement citoyen. Le bénévolat apporte une grande richesse humaine &mdash; l&apos;association contribue à entretenir ce lien fraternel.
              </p>
              <p className="text-muted leading-relaxed mb-8">
                Les missions proposées par l&apos;Amicale sont établies avec l&apos;organisateur. Elles garantissent la qualité de l&apos;expérience et la bonne relation organisateur/bénévole. Tu t&apos;engages dans les meilleures conditions d&apos;accueil, de respect et de considération.
              </p>
              <div className="flex flex-wrap gap-3">
                {["1 à 10 jours", "Sportif & culturel", "Partout en France"].map((tag) => (
                  <span key={tag} className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* 3 piliers */}
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: "La cause",
                description: "S'engager pour une cause qui te semble juste et authentique. Chaque événement porte des valeurs qui donnent du sens à ton engagement.",
                color: "text-primary bg-primary/10",
              },
              {
                icon: Users,
                title: "La mission utile",
                description: "Sans bénévole, il n'y a pas d'événement. Tes missions sont établies avec l'organisateur pour garantir la qualité de l'expérience.",
                color: "text-secondary bg-secondary/10",
              },
              {
                icon: Handshake,
                title: "Le lien social",
                description: "Le bénévolat tout seul n'a pas de sens. Rencontre d'autres personnes engagées, crée des liens et vis des moments forts.",
                color: "text-accent bg-accent/10",
              },
            ].map((pillar) => (
              <div
                key={pillar.title}
                className="relative p-8 rounded-2xl bg-card border border-border hover:shadow-lg transition-all group"
              >
                <div className={`inline-flex p-3 rounded-xl ${pillar.color} mb-4`}>
                  <pillar.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{pillar.title}</h3>
                <p className="text-muted leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo pleine largeur — bénévoles en action */}
      <section className="relative h-80 sm:h-96 lg:h-[28rem]">
        <Image
          src="/images/events/benevoles-openlakes.webp"
          alt="Bénévoles de l'Amicale au bord du lac lors de l'OpenLakes"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-8 left-0 right-0">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-white text-2xl sm:text-3xl font-bold max-w-lg">
              Plus de 3 000 bénévoles mobilisés, 62% qui reviennent.
            </p>
            <p className="text-white/70 mt-2">C&apos;est ça, l&apos;Amicale.</p>
          </div>
        </div>
      </section>

      {/* Événements */}
      <section className="py-24" id="evenements">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-2">Prochains événements</h2>
              <p className="text-muted text-lg">
                Qu&apos;importe tes raisons, ton acte citoyen est précieux !
              </p>
            </div>
            <Link
              href="/evenements"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all shrink-0"
            >
              Tous les événements <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <EventCard key={event.slug} event={event} />
            ))}
          </div>
        </div>
      </section>

      {/* Nouveautés : Covoiturage & Hébergement */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-teal-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-4">
              Nouveau
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Facilite ta venue, partage ton trajet
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              On estime que 10% des bénévoles ne peuvent pas venir à cause du coût et de la logistique. Ces deux services sont là pour changer ça.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Link href="/covoiturage" className="group p-8 rounded-2xl bg-card border border-border hover:shadow-xl hover:border-secondary/50 transition-all">
              <div className="inline-flex p-4 rounded-xl bg-secondary/10 text-secondary mb-4 group-hover:scale-110 transition-transform">
                <Car className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Covoiturage</h3>
              <p className="text-muted leading-relaxed mb-4">
                Propose ou trouve un trajet pour te rendre sur les événements. Économise sur les frais, réduis ton impact carbone et rencontre d&apos;autres bénévoles avant même d&apos;arriver !
              </p>
              <span className="inline-flex items-center gap-1 text-secondary font-semibold group-hover:gap-2 transition-all">
                Découvrir <ChevronRight className="h-5 w-5" />
              </span>
            </Link>

            <Link href="/hebergement" className="group p-8 rounded-2xl bg-card border border-border hover:shadow-xl hover:border-primary/50 transition-all">
              <div className="inline-flex p-4 rounded-xl bg-primary/10 text-primary mb-4 group-hover:scale-110 transition-transform">
                <BedDouble className="h-8 w-8" />
              </div>
              <h3 className="text-2xl font-bold mb-3">Hébergement solidaire</h3>
              <p className="text-muted leading-relaxed mb-4">
                Tu as un lit, un canapé ou une chambre d&apos;amis ? Mets-le à disposition des bénévoles qui viennent de loin. Un geste simple qui fait toute la différence.
              </p>
              <span className="inline-flex items-center gap-1 text-primary font-semibold group-hover:gap-2 transition-all">
                Découvrir <ChevronRight className="h-5 w-5" />
              </span>
            </Link>
          </div>
        </div>
      </section>

      <StatsSection stats={stats} />

      {/* Galerie photo — mosaïque immersive */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-2">L&apos;Amicale en images</h2>
          <p className="text-muted text-center">Des moments partagés par nos bénévoles sur le terrain.</p>
        </div>
        {/* Ligne 1 — grandes photos événements */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 px-2 mb-2">
          {[
            "/images/events/event-outdoor.jpg",
            "/images/events/benevoles-saintelyon.jpg",
            "/images/events/gf-ventoux.jpg",
            "/images/events/groupe-benevoles.jpg",
          ].map((src, i) => (
            <div key={i} className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <Image src={src} alt={`Bénévoles en action ${i + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 50vw, 25vw" />
            </div>
          ))}
        </div>
        {/* Ligne 2 — galerie carrée scrollable */}
        <div className="flex gap-2 overflow-x-auto pb-4 px-2 snap-x snap-mandatory">
          {galleryImages.map((src, i) => (
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

      {/* Témoignages */}
      <section className="py-24 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Ils nous font confiance</h2>
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

      {/* Partenaires */}
      <section className="py-16 border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm text-muted text-center mb-8 uppercase tracking-wider font-medium">Nos événements et partenaires</p>
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

      {/* CTA final avec photo */}
      <section className="relative py-24 overflow-hidden">
        <Image
          src="/images/events/event-outdoor.jpg"
          alt="Foule de bénévoles lors d'un événement"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-secondary/80" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
            Prêt à vivre une expérience unique ?
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Rejoins l&apos;Amicale des Bénévoles et découvre des événements extraordinaires. Chaque raison de s&apos;engager est la bonne, puisque c&apos;est la tienne.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="https://event.recrewteer.com/v2/organization/121/form/7034"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-base font-semibold text-white shadow-lg hover:bg-primary-dark transition-all"
            >
              Rejoindre l&apos;Amicale
              <ArrowRight className="h-5 w-5" />
            </a>
            <Link
              href="/evenements"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 px-7 py-3.5 text-base font-semibold text-white hover:bg-white/20 transition-colors"
            >
              Voir les événements
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

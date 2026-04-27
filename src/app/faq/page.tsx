import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, HelpCircle } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getSiteSettings } from "@/sanity/lib/fetch";

export const metadata: Metadata = {
  title: "FAQ — Questions fréquentes sur le bénévolat événementiel",
  description:
    "Toutes les réponses sur le bénévolat avec l'Amicale : inscription, missions, défraiements, hébergement, mineurs, accessibilité PMR... Plus de 15 questions pour t'aider à te lancer.",
  keywords: [
    "FAQ bénévolat",
    "questions bénévolat événementiel",
    "comment devenir bénévole",
    "Amicale des Bénévoles questions",
    "inscription bénévole",
  ],
  alternates: { canonical: "/faq" },
  openGraph: {
    title: "FAQ — Amicale des Bénévoles",
    description: "Toutes les réponses pour devenir bénévole sur un événement sportif ou culturel.",
    url: "/faq",
  },
};

type FaqItem = { question: string; answer: string };
type FaqSection = { title: string; items: FaqItem[] };

const sections: FaqSection[] = [
  {
    title: "S'inscrire et participer",
    items: [
      {
        question: "Comment devenir bénévole avec l'Amicale ?",
        answer:
          "Crée gratuitement ton compte sur Recrewteer en 2 minutes. Tu renseignes tes coordonnées et tes disponibilités, puis tu choisis le ou les événements sur lesquels tu veux t'engager. Aucune cotisation, aucun engagement long terme.",
      },
      {
        question: "Faut-il avoir de l'expérience ou des compétences spécifiques ?",
        answer:
          "Non, aucune expérience n'est requise. Les missions sont expliquées sur place par les chefs de mission. Si une mission demande une compétence particulière (secourisme, conduite de véhicule…), c'est précisé dans la fiche de l'événement.",
      },
      {
        question: "À partir de quel âge peut-on être bénévole ?",
        answer:
          "L'âge minimum est 16 ans avec autorisation parentale. Certains événements exigent 18 ans selon les missions (sécurité, accès tardif). C'est précisé sur chaque événement.",
      },
      {
        question: "Combien de temps dois-je m'engager ?",
        answer:
          "Les missions vont de quelques heures à plusieurs jours selon l'événement. Tu choisis tes créneaux à l'inscription, en fonction de tes disponibilités. Aucune obligation au-delà de ce que tu acceptes.",
      },
    ],
  },
  {
    title: "Sur place",
    items: [
      {
        question: "Suis-je défrayé pour ma participation ?",
        answer:
          "Le bénévolat est par définition non rémunéré. Cependant, pour chaque mission tu bénéficies de repas et boissons offerts, d'un t-shirt ou tenue spécifique, d'une accréditation, et parfois d'avantages partenaires (réductions, cadeaux, lots).",
      },
      {
        question: "L'hébergement est-il fourni ?",
        answer:
          "Selon les événements et les distances, certains organisateurs proposent un hébergement collectif (camping, gymnase, dortoir). C'est précisé sur chaque événement. Pour les événements proches de chez toi, l'hébergement n'est généralement pas nécessaire.",
      },
      {
        question: "Que faire si je dois annuler ?",
        answer:
          "Préviens le plus tôt possible via ton espace bénévole Recrewteer ou par mail à contact@amicaledesbenevoles.org. Cela permet à l'Amicale de mobiliser un ou une autre bénévole à ta place.",
      },
      {
        question: "Suis-je assuré pendant ma mission ?",
        answer:
          "Oui, l'Amicale des Bénévoles a une assurance responsabilité civile qui couvre tous les bénévoles inscrits sur ses missions. Les organisateurs disposent également d'assurances spécifiques à leur événement.",
      },
    ],
  },
  {
    title: "Accessibilité et inclusion",
    items: [
      {
        question: "Le bénévolat est-il accessible aux personnes en situation de handicap ?",
        answer:
          "Oui. L'Amicale a une référente inclusive qui adapte les missions aux besoins de chaque bénévole. Contacte-la via la page À propos pour échanger sur tes besoins avant l'inscription.",
      },
      {
        question: "Puis-je venir avec un proche ou en groupe ?",
        answer:
          "Bien sûr. Beaucoup de bénévoles s'inscrivent en duo ou en groupe d'amis. Indique-le dans ton inscription Recrewteer pour qu'on essaie de vous placer sur les mêmes missions.",
      },
    ],
  },
  {
    title: "Pour les organisateurs",
    items: [
      {
        question: "Comment l'Amicale aide les organisateurs à mobiliser leurs bénévoles ?",
        answer:
          "L'Amicale prend en charge tout le processus : recrutement, inscription, planning, encadrement sur place, fidélisation post-événement. Notre objectif : 95% de satisfaction côté bénévoles, 62% qui reviennent l'année suivante.",
      },
      {
        question: "Comment vous contacter pour un partenariat ?",
        answer:
          "Rendez-vous sur la page Organisateurs ou écrivez à quentin@amicaledesbenevoles.org. On revient vers vous sous 48h ouvrées.",
      },
    ],
  },
];

export default async function FaqPage() {
  const settings = await getSiteSettings();
  const joinUrl = settings.inscriptionUrl || "https://event.recrewteer.com/v2/organization/121/form/7034";

  const allItems = sections.flatMap((s) => s.items);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Breadcrumbs items={[{ label: "FAQ" }]} />

      <section className="relative py-12 sm:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
            <HelpCircle className="h-4 w-4" />
            Questions fréquentes
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
            Tout ce que tu dois savoir avant de devenir{" "}
            <span className="text-primary">bénévole</span>
          </h1>
          <p className="mt-4 text-lg text-muted leading-relaxed max-w-2xl">
            Inscription, missions, défraiements, hébergement, accessibilité… On a regroupé ici les questions
            qui reviennent le plus. Une question manque ? Écris-nous à contact@amicaledesbenevoles.org.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
          {sections.map((section) => (
            <div key={section.title}>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">{section.title}</h2>
              <div className="space-y-3">
                {section.items.map((item) => (
                  <details
                    key={item.question}
                    className="group rounded-2xl bg-card border border-border overflow-hidden hover:border-primary/30 transition-colors"
                  >
                    <summary className="flex items-center justify-between gap-4 cursor-pointer p-5 sm:p-6 list-none [&::-webkit-details-marker]:hidden">
                      <h3 className="font-semibold text-base sm:text-lg pr-2">{item.question}</h3>
                      <span
                        aria-hidden="true"
                        className="shrink-0 inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary transition-transform group-open:rotate-45"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 14 14"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        >
                          <line x1="7" y1="1" x2="7" y2="13" />
                          <line x1="1" y1="7" x2="13" y2="7" />
                        </svg>
                      </span>
                    </summary>
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6 -mt-1 text-muted leading-relaxed">
                      {item.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Prêt·e à te lancer ?</h2>
          <p className="text-muted mb-8 max-w-xl mx-auto">
            Crée ton compte sur Recrewteer et choisis ton premier événement.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={joinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-white font-semibold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/25"
            >
              Rejoindre l&apos;Amicale <ArrowRight className="h-5 w-5" />
            </a>
            <Link
              href="/evenements"
              className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3.5 font-semibold hover:bg-card transition-colors"
            >
              Voir les événements
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

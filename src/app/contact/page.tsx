import type { Metadata } from "next";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import ContactForm from "@/components/ContactForm";
import { getSiteSettings } from "@/sanity/lib/fetch";

export const metadata: Metadata = {
  title: "Contact — Nous écrire",
  description:
    "Une question ? Une proposition d'événement ? Contactez l'Amicale des Bénévoles : email, téléphone, adresse à Lyon. Réponse sous 48h ouvrées.",
  keywords: [
    "contact Amicale des Bénévoles",
    "contacter association bénévoles",
    "Quentin Willems Amicale",
    "amicaledesbenevoles email",
  ],
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact | Amicale des Bénévoles",
    description: "Une question ou une proposition ? Contactez-nous, réponse sous 48h ouvrées.",
    url: "/contact",
  },
};

const baseUrl = "https://amicaledesbenevoles.org";

export default async function ContactPage() {
  const settings = await getSiteSettings();
  const email = settings.email || "contact@amicaledesbenevoles.org";
  const phone1 = settings.phone1 || "Quentin : 06 88 65 19 60";
  const phone2 = settings.phone2;
  const address = settings.address || "107 rue Bechevelin, 69007 Lyon";

  const phoneDigits = phone1.match(/[\d\s]{10,}/)?.[0].replace(/\s/g, "") ?? "0688651960";
  const telHref = `tel:+33${phoneDigits.slice(1)}`;

  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact — Amicale des Bénévoles",
    url: `${baseUrl}/contact`,
    mainEntity: {
      "@type": "NGO",
      name: "Amicale des Bénévoles",
      url: baseUrl,
      email,
      telephone: telHref.replace("tel:", ""),
      address: {
        "@type": "PostalAddress",
        streetAddress: "107 rue Bechevelin",
        addressLocality: "Lyon",
        postalCode: "69007",
        addressCountry: "FR",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <Breadcrumbs items={[{ label: "Contact" }]} />

      <section className="relative py-12 sm:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight leading-tight">
              Une question ? <span className="text-primary">On t&apos;écoute.</span>
            </h1>
            <p className="mt-4 text-lg text-muted leading-relaxed">
              Bénévole, organisateur, partenaire, journaliste… Quel que soit ton sujet, on revient vers toi
              sous 48h ouvrées.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_minmax(0,420px)] gap-10 lg:gap-16">
            <div>
              <h2 className="text-2xl font-bold mb-2">Nous écrire</h2>
              <p className="text-muted mb-8">
                Remplis ce formulaire, on te répond rapidement.
              </p>
              <ContactForm recipient={email} />
            </div>

            <aside className="space-y-6">
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h2 className="font-bold text-lg mb-4">Coordonnées directes</h2>
                <ul className="space-y-4 text-sm">
                  <li className="flex gap-3">
                    <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium mb-0.5">Email</div>
                      <a href={`mailto:${email}`} className="text-muted hover:text-primary transition-colors break-all">
                        {email}
                      </a>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium mb-0.5">Téléphone</div>
                      <div className="text-muted">{phone1}</div>
                      {phone2 && <div className="text-muted mt-0.5">{phone2}</div>}
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium mb-0.5">Siège</div>
                      <div className="text-muted">{address}</div>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <div className="font-medium mb-0.5">Réponse</div>
                      <div className="text-muted">Sous 48h ouvrées (lun-ven)</div>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20">
                <h3 className="font-bold mb-2">Tu es organisateur d&apos;événement ?</h3>
                <p className="text-sm text-muted mb-4">
                  Découvre comment l&apos;Amicale peut mobiliser, encadrer et fidéliser tes bénévoles.
                </p>
                <a
                  href="/organisateurs"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
                >
                  Notre offre organisateurs →
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}

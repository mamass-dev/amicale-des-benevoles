import type { Metadata } from "next";
import { getLegalContent } from "@/sanity/lib/fetch";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site amicaledesbenevoles.org. Informations sur l'éditeur, l'hébergeur et la politique RGPD.",
  robots: { index: false, follow: false },
};

export default async function MentionsLegalesPage() {
  const content = await getLegalContent();

  return (
    <section className="py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 prose prose-stone">
        <h1>{content.title}</h1>
        {content.body.map((section, idx) => (
          <div key={idx}>
            <h2>{section.heading}</h2>
            <div dangerouslySetInnerHTML={{ __html: section.content }} />
          </div>
        ))}
      </div>
    </section>
  );
}

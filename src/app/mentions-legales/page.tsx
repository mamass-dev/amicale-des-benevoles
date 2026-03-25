import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site amicaledesbenevoles.org. Informations sur l'éditeur, l'hébergeur et la politique RGPD.",
  robots: { index: false, follow: false },
};

export default function MentionsLegalesPage() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 prose prose-stone">
        <h1>Mentions légales</h1>

        <h2>Éditeur du site</h2>
        <p>
          <strong>Amicale des Bénévoles</strong><br />
          Association loi 1901<br />
          107 rue Bechevelin, 69007 Lyon<br />
          RNA : W691100560<br />
          Email : <a href="mailto:contact@amicaledesbenevoles.org">contact@amicaledesbenevoles.org</a>
        </p>

        <h2>Responsable de publication</h2>
        <p>Quentin Willems, Directeur</p>

        <h2>Hébergeur</h2>
        <p>
          Vercel Inc.<br />
          440 N Bashaw St, San Francisco, CA 94107, USA
        </p>

        <h2>Propriété intellectuelle</h2>
        <p>
          L&apos;ensemble des contenus (textes, images, vidéos, logos) présents sur ce site sont protégés par le droit de la propriété intellectuelle. Toute reproduction, même partielle, est interdite sans accord préalable.
        </p>

        <h2>Protection des données personnelles (RGPD)</h2>
        <p>
          Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez des droits suivants sur vos données personnelles :
        </p>
        <ul>
          <li><strong>Droit d&apos;accès</strong> : vous pouvez demander quelles données nous détenons sur vous.</li>
          <li><strong>Droit de rectification</strong> : vous pouvez corriger vos données inexactes.</li>
          <li><strong>Droit à l&apos;effacement</strong> : vous pouvez demander la suppression de vos données.</li>
          <li><strong>Droit d&apos;opposition</strong> : vous pouvez vous opposer au traitement de vos données.</li>
          <li><strong>Droit à la portabilité</strong> : vous pouvez récupérer vos données dans un format structuré.</li>
          <li><strong>Droit à la limitation</strong> : vous pouvez demander la limitation du traitement.</li>
        </ul>
        <p>
          Pour exercer ces droits, contactez-nous à : <a href="mailto:contact@amicaledesbenevoles.org">contact@amicaledesbenevoles.org</a>
        </p>

        <h2>Cookies</h2>
        <p>
          Ce site n&apos;utilise pas de cookies de traçage publicitaire. Des cookies techniques peuvent être utilisés pour assurer le bon fonctionnement du site.
        </p>
      </div>
    </section>
  );
}

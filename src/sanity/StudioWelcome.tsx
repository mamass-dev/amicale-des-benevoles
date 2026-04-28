"use client";

const sections = [
  {
    emoji: "📝",
    title: "Pages du site",
    desc: "Modifier les textes, images et CTA de toutes les pages : Accueil, À propos, Événements, Organisateurs, Espace bénévole, FAQ, Contact, Mentions légales.",
  },
  {
    emoji: "📅",
    title: "Événements",
    desc: "Ajouter, modifier ou supprimer un événement. Géolocaliser sur la carte. Mettre à jour les missions, infos pratiques et places.",
  },
  {
    emoji: "👥",
    title: "Équipe",
    desc: "Gérer les membres du staff et du comité directeur. Photos, rôles, ordre d'affichage.",
  },
  {
    emoji: "💬",
    title: "Témoignages",
    desc: "Ajouter ou modifier les avis d'organisateurs (page d'accueil + page Organisateurs).",
  },
  {
    emoji: "📊",
    title: "Chiffres clés",
    desc: "Mettre à jour les stats animées : satisfaction, bénévoles, fidélisation, événements...",
  },
  {
    emoji: "⭐",
    title: "Partenaires & logos",
    desc: "Ajouter ou retirer des logos partenaires affichés en bas de la page d'accueil.",
  },
  {
    emoji: "⚙️",
    title: "Paramètres du site",
    desc: "Email, téléphones, adresse, RNA, réseaux sociaux, lien Recrewteer, libellés footer/nav.",
  },
];

const tips = [
  {
    title: "Comment éditer une page ?",
    body:
      "Va dans 📝 Pages du site, choisis la page (Accueil, FAQ, Contact...), modifie les champs puis clique sur Publish (bouton vert en bas à droite). Les changements apparaissent sur le site en moins d'une minute.",
  },
  {
    title: "Comment ajouter un événement ?",
    body:
      "Dans 📅 Événements → bouton + en haut à droite. Remplis le formulaire (nom, lieu, dates, photo). N'oublie pas de cliquer sur « Generate » pour l'URL et de positionner la carte GPS.",
  },
  {
    title: "Comment changer une question dans la FAQ ?",
    body:
      "📝 Pages du site → ❓ FAQ → onglet « Sections de questions ». Tu peux ajouter, modifier, réorganiser ou supprimer chaque question. Le schéma SEO se met à jour automatiquement.",
  },
  {
    title: "Comment changer l'email/téléphone affiché partout ?",
    body:
      "Une seule modification : ⚙️ Paramètres du site. Cela met à jour automatiquement le footer, la page Contact et la page Organisateurs.",
  },
];

export default function StudioWelcome() {
  return (
    <div
      style={{
        padding: "40px 32px",
        maxWidth: 880,
        margin: "0 auto",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: 32 }}>
        <div style={{ fontSize: 48, marginBottom: 8 }}>❤️</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>Amicale des Bénévoles</h1>
        <p style={{ color: "#78716c", fontSize: 15, marginTop: 6 }}>
          Tableau de bord de gestion du contenu
        </p>
      </div>

      <h2 style={{ fontSize: 14, fontWeight: 600, color: "#78716c", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 12 }}>
        Sections disponibles
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          gap: 12,
          marginBottom: 32,
        }}
      >
        {sections.map((item) => (
          <div
            key={item.title}
            style={{
              padding: 18,
              borderRadius: 12,
              border: "1px solid #e7e5e4",
              backgroundColor: "#fff",
            }}
          >
            <div style={{ fontSize: 22, marginBottom: 6 }}>{item.emoji}</div>
            <h3 style={{ fontSize: 14, fontWeight: 600, margin: "0 0 4px" }}>{item.title}</h3>
            <p style={{ fontSize: 12.5, color: "#78716c", margin: 0, lineHeight: 1.5 }}>
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      <h2 style={{ fontSize: 14, fontWeight: 600, color: "#78716c", textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 12 }}>
        Questions fréquentes
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
        {tips.map((tip) => (
          <details
            key={tip.title}
            style={{
              padding: "14px 18px",
              borderRadius: 12,
              backgroundColor: "#fdfaf5",
              border: "1px solid #ece3d3",
            }}
          >
            <summary
              style={{
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                color: "#1f2937",
                listStyle: "none",
              }}
            >
              {tip.title}
            </summary>
            <p style={{ fontSize: 13, color: "#6b5b4f", margin: "10px 0 0", lineHeight: 1.6 }}>
              {tip.body}
            </p>
          </details>
        ))}
      </div>

      <div
        style={{
          padding: 16,
          borderRadius: 12,
          backgroundColor: "#fff7ed",
          border: "1px solid #fed7aa",
          fontSize: 13,
          color: "#9a3412",
          lineHeight: 1.6,
        }}
      >
        <strong style={{ color: "#c2410c" }}>💡 Bon à savoir :</strong> les modifications sont
        publiées automatiquement quand tu cliques sur <strong>Publish</strong>. Le site web se met à
        jour en moins d&apos;une minute. Aucune intervention technique nécessaire.
      </div>
    </div>
  );
}

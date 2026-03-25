"use client";

export default function StudioWelcome() {
  return (
    <div style={{ padding: "40px", maxWidth: 700, margin: "0 auto", fontFamily: "system-ui, sans-serif" }}>
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>❤️</div>
        <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0 }}>Amicale des Bénévoles</h1>
        <p style={{ color: "#78716c", fontSize: 16, marginTop: 8 }}>Bienvenue dans votre espace d&apos;administration</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
        {[
          { emoji: "📅", title: "Événements", desc: "Ajouter, modifier ou supprimer un événement. Mettre à jour le nombre de bénévoles inscrits." },
          { emoji: "👥", title: "Équipe", desc: "Gérer les membres du staff et du comité directeur. Ajouter des photos." },
          { emoji: "⭐", title: "Partenaires", desc: "Ajouter ou retirer des logos de partenaires sur la page d'accueil." },
          { emoji: "💬", title: "Témoignages", desc: "Ajouter des avis d'organisateurs pour la page d'accueil." },
          { emoji: "📊", title: "Chiffres clés", desc: "Mettre à jour les stats animées : satisfaction, bénévoles, fidélisation..." },
          { emoji: "❓", title: "FAQ", desc: "Gérer les questions/réponses des pages Covoiturage et Hébergement." },
        ].map((item) => (
          <div key={item.title} style={{ padding: 20, borderRadius: 12, border: "1px solid #e7e5e4", backgroundColor: "#fff" }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>{item.emoji}</div>
            <h3 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 4px" }}>{item.title}</h3>
            <p style={{ fontSize: 13, color: "#78716c", margin: 0, lineHeight: 1.5 }}>{item.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ padding: 20, borderRadius: 12, backgroundColor: "#fef2f2", border: "1px solid #fecaca" }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, margin: "0 0 8px", color: "#dc2626" }}>💡 Comment ça marche ?</h3>
        <ol style={{ fontSize: 13, color: "#78716c", margin: 0, paddingLeft: 20, lineHeight: 1.8 }}>
          <li>Cliquez sur une catégorie dans le menu de gauche</li>
          <li>Cliquez sur un élément pour le modifier, ou sur <strong>+ Create</strong> pour en ajouter un</li>
          <li>Modifiez les champs puis cliquez sur <strong>Publish</strong> (bouton vert en bas)</li>
          <li>Les changements apparaissent sur le site en quelques secondes</li>
        </ol>
      </div>
    </div>
  );
}

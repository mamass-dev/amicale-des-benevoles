// Réponse 410 « Gone » pour les chemins de l'ancien WordPress (wp-content,
// elementor-hf…) que Google continue d'explorer. Le 410 lui dit d'arrêter,
// contrairement au 403 renvoyé jusqu'ici.
export function gone() {
  return new Response("Gone", {
    status: 410,
    headers: { "Content-Type": "text/plain; charset=utf-8", "X-Robots-Tag": "noindex" },
  });
}

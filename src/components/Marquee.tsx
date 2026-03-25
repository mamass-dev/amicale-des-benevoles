export default function Marquee() {
  const items = [
    "11 bénévoles sur 10 sont super contents de leur expérience bénévole, c'est dingue non ?",
    "62% de fidélisation en 2025, un record !",
    "Plus de 3000 bénévoles mobilisés partout en France",
    "Rejoins l'Amicale et vis des expériences uniques",
    "La prochaine éclipse solaire aura lieu en France le 3 septembre 2081, ça peut toujours servir",
  ];

  const text = items.join("  ✦  ");

  return (
    <div className="bg-primary text-white py-3 overflow-hidden">
      <div className="animate-marquee whitespace-nowrap flex">
        <span className="text-sm font-medium mx-4">{text}  ✦  {text}</span>
      </div>
    </div>
  );
}

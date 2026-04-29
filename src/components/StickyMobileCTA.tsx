"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Heart } from "lucide-react";

type Props = {
  href: string;
  label: string;
};

export default function StickyMobileCTA({ href, label }: Props) {
  // Affiche le bouton flottant après ~400px de scroll, jamais sur le hero.
  const [show, setShow] = useState(false);

  useEffect(() => {
    function onScroll() {
      setShow(window.scrollY > 400);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-4 left-4 right-4 z-40 lg:hidden transition-all duration-300 ${
        show ? "translate-y-0 opacity-100" : "translate-y-24 opacity-0 pointer-events-none"
      }`}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 w-full rounded-full bg-primary py-3.5 text-base font-semibold text-white shadow-2xl shadow-primary/40 active:scale-95 transition-transform"
      >
        <Heart className="h-5 w-5" fill="currentColor" />
        {label}
        <ArrowRight className="h-5 w-5" />
      </a>
    </div>
  );
}

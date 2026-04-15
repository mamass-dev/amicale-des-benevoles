"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type NavLink = { label: string; href: string };
type HeaderProps = {
  settings: {
    siteName?: string;
    navLinks?: NavLink[];
    navCtaLabel?: string;
    inscriptionUrl?: string;
  };
};

const defaultNavLinks: NavLink[] = [
  { href: "/", label: "Accueil" },
  { href: "/a-propos", label: "À propos" },
  { href: "/evenements", label: "Événements" },
  { href: "/organisateurs", label: "Organisateurs" },
  { href: "/covoiturage", label: "Covoiturage" },
  { href: "/hebergement", label: "Hébergement" },
  { href: "/espace-benevole", label: "Espace bénévole" },
];

export default function Header({ settings }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const navLinks = settings.navLinks?.length ? settings.navLinks : defaultNavLinks;
  const ctaLabel = settings.navCtaLabel || "Rejoindre l'Amicale";
  const joinUrl = settings.inscriptionUrl || "https://event.recrewteer.com/v2/organization/121/form/7034";
  const siteName = settings.siteName || "Amicale des Bénévoles";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <Image src="/images/logo/logo-new.png" alt={siteName} width={36} height={36} className="rounded-lg" />
            <span className="font-bold text-lg tracking-tight">{siteName}</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-foreground/70 hover:text-primary rounded-lg transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <a
              href={joinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/25 hover:bg-primary-dark transition-all hover:shadow-xl hover:shadow-primary/30"
            >
              {ctaLabel}
            </a>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-border overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2.5 text-base font-medium text-foreground/70 hover:text-primary hover:bg-slate-50 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={joinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block w-full text-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary/25"
              >
                {ctaLabel}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

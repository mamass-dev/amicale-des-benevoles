"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type NavLink = { label: string; href: string };
type HeaderProps = {
  settings: {
    siteName?: string;
    logo?: string;
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
  { href: "/espace-benevole", label: "Espace bénévole" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header({ settings }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const navLinks = settings.navLinks?.length ? settings.navLinks : defaultNavLinks;
  const ctaLabel = settings.navCtaLabel || "Rejoindre l'Amicale";
  const joinUrl = settings.inscriptionUrl || "https://event.recrewteer.com/v2/organization/121/form/7034";
  const siteName = settings.siteName || "Amicale des Bénévoles";
  const logoSrc = settings.logo || "/images/logo/logo-new.png";

  const isHome = pathname === "/";
  const transparent = isHome && !scrolled && !open;

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        transparent
          ? "bg-transparent border-b border-transparent"
          : "bg-white/85 backdrop-blur-lg border-b border-border"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5" aria-label={siteName}>
            <Image
              src={logoSrc}
              alt=""
              width={36}
              height={36}
              className={`rounded-lg transition-all ${transparent ? "brightness-0 invert" : ""}`}
            />
            <span
              className={`font-bold text-lg tracking-tight transition-colors ${
                transparent ? "text-white" : "text-foreground"
              }`}
            >
              {siteName}
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Navigation principale">
            {navLinks.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    transparent
                      ? active
                        ? "text-white"
                        : "text-white/70 hover:text-white"
                      : active
                      ? "text-primary"
                      : "text-foreground/70 hover:text-primary"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span
                      aria-hidden="true"
                      className={`absolute -bottom-0.5 left-3 right-3 h-0.5 rounded-full ${
                        transparent ? "bg-white" : "bg-primary"
                      }`}
                    />
                  )}
                </Link>
              );
            })}
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
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              transparent ? "text-white hover:bg-white/10" : "text-foreground hover:bg-slate-100"
            }`}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="lg:hidden bg-white border-t border-border overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => {
                const active = isActive(pathname, link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`block px-3 py-2.5 text-base font-medium rounded-lg transition-colors ${
                      active
                        ? "bg-primary/10 text-primary"
                        : "text-foreground/70 hover:text-primary hover:bg-slate-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <a
                href={joinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block w-full text-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/25"
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

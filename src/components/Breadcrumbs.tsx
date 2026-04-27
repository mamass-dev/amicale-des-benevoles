import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

const baseUrl = "https://amicaledesbenevoles.org";

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const all: BreadcrumbItem[] = [{ label: "Accueil", href: "/" }, ...items];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.label,
      ...(item.href ? { item: `${baseUrl}${item.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Fil d'Ariane" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
          {all.map((item, idx) => {
            const isLast = idx === all.length - 1;
            return (
              <li key={`${item.label}-${idx}`} className="flex items-center gap-1.5">
                {idx > 0 && <ChevronRight className="h-3.5 w-3.5 shrink-0 text-muted/50" aria-hidden="true" />}
                {isLast || !item.href ? (
                  <span aria-current={isLast ? "page" : undefined} className="font-medium text-foreground">
                    {idx === 0 ? <Home className="h-3.5 w-3.5" aria-hidden="true" /> : item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-primary transition-colors inline-flex items-center gap-1"
                  >
                    {idx === 0 ? <Home className="h-3.5 w-3.5" aria-hidden="true" /> : item.label}
                    {idx === 0 && <span className="sr-only">Accueil</span>}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

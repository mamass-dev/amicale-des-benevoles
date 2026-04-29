"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import type { Review } from "@/sanity/lib/types";

function GoogleLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
    </svg>
  );
}

function TrustpilotLogo({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 96 96" aria-hidden="true">
      <polygon
        fill="#00b67a"
        points="48 64.7 62.6 61 68.7 79.7 48 64.7"
      />
      <polygon
        fill="#00b67a"
        points="96 35.7 59 35.7 47.5 0 36.4 35.7 0 35.7 29.6 57.6 18.1 93.3 47.5 71.4 65.7 58 96 35.7"
      />
    </svg>
  );
}

function formatDate(d?: string): string | null {
  if (!d) return null;
  const date = new Date(d);
  if (isNaN(date.getTime())) return null;
  return date.toLocaleDateString("fr-FR", { month: "long", year: "numeric" });
}

export default function ReviewsSection({ reviews }: { reviews: Review[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (reviews.length === 0) return null;

  const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
  const avgFormatted = avgRating.toFixed(1).replace(".", ",");

  function scroll(dir: "left" | "right") {
    if (!scrollRef.current) return;
    const card = scrollRef.current.firstElementChild as HTMLElement | null;
    const offset = (card?.offsetWidth ?? 320) + 16;
    scrollRef.current.scrollBy({ left: dir === "left" ? -offset : offset, behavior: "smooth" });
  }

  return (
    <section className="py-20 sm:py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${i < Math.round(avgRating) ? "text-primary fill-primary" : "text-border"}`}
              />
            ))}
            <span className="ml-2 text-2xl font-bold">{avgFormatted}</span>
            <span className="text-muted">/ 5</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">
            Ce que disent nos bénévoles
          </h2>
          <p className="text-muted max-w-xl">
            {reviews.length} avis publiés sur Google et Trustpilot par des bénévoles ayant participé à nos événements.
          </p>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Avis précédents"
            className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 items-center justify-center rounded-full bg-white border border-border shadow-md hover:bg-primary hover:text-white hover:border-primary transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Avis suivants"
            className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 items-center justify-center rounded-full bg-white border border-border shadow-md hover:bg-primary hover:text-white hover:border-primary transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 -mx-4 px-4 sm:mx-0 sm:px-0"
            style={{ scrollbarWidth: "thin" }}
          >
            {reviews.map((r, i) => {
              const dateLabel = formatDate(r.visitedAt);
              return (
                <article
                  key={`${r.authorName}-${i}`}
                  className="snap-start shrink-0 w-[300px] sm:w-[340px] p-6 rounded-2xl bg-card border border-border flex flex-col"
                >
                  <header className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, idx) => (
                        <Star
                          key={idx}
                          className={`h-4 w-4 ${idx < r.rating ? "text-primary fill-primary" : "text-border"}`}
                        />
                      ))}
                    </div>
                    {r.source === "trustpilot" ? (
                      <TrustpilotLogo className="w-5 h-5" />
                    ) : (
                      <GoogleLogo className="w-5 h-5 text-[#4285F4]" />
                    )}
                  </header>
                  <p className="text-foreground/80 leading-relaxed text-sm flex-1 mb-4">
                    &ldquo;{r.text}&rdquo;
                  </p>
                  <footer className="pt-3 border-t border-border">
                    <div className="font-semibold text-sm">{r.authorName}</div>
                    {(r.eventName || dateLabel) && (
                      <div className="text-xs text-muted mt-0.5">
                        {[r.eventName, dateLabel].filter(Boolean).join(" · ")}
                      </div>
                    )}
                  </footer>
                </article>
              );
            })}
          </div>
        </div>

        <p className="text-center text-xs text-muted mt-6">
          Note moyenne calculée sur {reviews.length} avis vérifiés.
        </p>
      </div>
    </section>
  );
}

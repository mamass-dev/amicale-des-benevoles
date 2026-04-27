"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { Search, Calendar, X, LayoutGrid, MapPin } from "lucide-react";
import EventCard from "@/components/EventCard";
import type { SanityEvent } from "@/sanity/lib/types";

type FilterType = "all" | "sportif" | "culturel";
type View = "list" | "map";

const MONTHS = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];

const EventsMap = dynamic(() => import("./EventsMap"), {
  ssr: false,
  loading: () => (
    <div
      className="rounded-2xl border border-border bg-card animate-pulse"
      style={{ height: "60vh", minHeight: 480 }}
      aria-label="Chargement de la carte"
    />
  ),
});

type Labels = {
  search?: string;
  all?: string;
  sport?: string;
  culture?: string;
};

export default function EventsExplorer({
  events,
  labels = {},
}: {
  events: SanityEvent[];
  labels?: Labels;
}) {
  const lbl = {
    search: labels.search || "Rechercher un événement, une ville...",
    all: labels.all || "Tous",
    sport: labels.sport || "Sportif",
    culture: labels.culture || "Culturel",
  };
  const [type, setType] = useState<FilterType>("all");
  const [month, setMonth] = useState<string>("all");
  const [search, setSearch] = useState("");
  const [view, setView] = useState<View>("list");

  const availableMonths = useMemo(() => {
    const months = new Set<string>();
    events.forEach((e) => {
      if (e.dateStart) {
        const m = new Date(e.dateStart).getMonth();
        months.add(String(m));
      }
    });
    return Array.from(months).sort((a, b) => Number(a) - Number(b));
  }, [events]);

  const filtered = useMemo(() => {
    return events.filter((e) => {
      if (type !== "all" && e.type !== type) return false;
      if (month !== "all" && e.dateStart) {
        const m = String(new Date(e.dateStart).getMonth());
        if (m !== month) return false;
      }
      if (search.trim()) {
        const q = search.toLowerCase().trim();
        const haystack = `${e.name} ${e.location} ${e.description}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [events, type, month, search]);

  const hasFilters = type !== "all" || month !== "all" || search.trim() !== "";

  function reset() {
    setType("all");
    setMonth("all");
    setSearch("");
  }

  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-6">
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted pointer-events-none" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={lbl.search}
            aria-label="Rechercher un événement"
            className="w-full pl-11 pr-4 py-3 rounded-full bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div role="tablist" aria-label="Filtre par type" className="inline-flex rounded-full bg-card border border-border p-1">
            {([
              { v: "all", label: lbl.all },
              { v: "sportif", label: lbl.sport },
              { v: "culturel", label: lbl.culture },
            ] as const).map((opt) => (
              <button
                key={opt.v}
                role="tab"
                aria-selected={type === opt.v}
                onClick={() => setType(opt.v as FilterType)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
                  type === opt.v
                    ? "bg-primary text-white shadow-sm"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted pointer-events-none" />
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              aria-label="Filtre par mois"
              className="appearance-none pl-9 pr-8 py-2 rounded-full bg-card border border-border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition cursor-pointer"
            >
              <option value="all">Tous les mois</option>
              {availableMonths.map((m) => (
                <option key={m} value={m}>
                  {MONTHS[Number(m)]}
                </option>
              ))}
            </select>
          </div>

          {hasFilters && (
            <button
              onClick={reset}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-muted hover:text-primary transition-colors"
            >
              <X className="h-4 w-4" /> Réinitialiser
            </button>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
        <div className="text-sm text-muted" aria-live="polite">
          {filtered.length === 0
            ? "Aucun événement ne correspond à ta recherche."
            : `${filtered.length} événement${filtered.length > 1 ? "s" : ""} trouvé${filtered.length > 1 ? "s" : ""}`}
        </div>

        <div role="tablist" aria-label="Vue" className="inline-flex rounded-full bg-card border border-border p-1">
          <button
            role="tab"
            aria-selected={view === "list"}
            onClick={() => setView("list")}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
              view === "list" ? "bg-primary text-white shadow-sm" : "text-muted hover:text-foreground"
            }`}
          >
            <LayoutGrid className="h-4 w-4" /> Liste
          </button>
          <button
            role="tab"
            aria-selected={view === "map"}
            onClick={() => setView("map")}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-full transition-colors ${
              view === "map" ? "bg-primary text-white shadow-sm" : "text-muted hover:text-foreground"
            }`}
          >
            <MapPin className="h-4 w-4" /> Carte
          </button>
        </div>
      </div>

      {view === "map" ? (
        <EventsMap events={filtered} />
      ) : filtered.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((event) => (
            <EventCard key={event.slug} event={event} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border p-10 text-center">
          <p className="text-muted mb-4">
            Pas d&apos;événement avec ces critères. Essaie autre chose.
          </p>
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-white hover:bg-primary-dark transition-colors"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </div>
  );
}

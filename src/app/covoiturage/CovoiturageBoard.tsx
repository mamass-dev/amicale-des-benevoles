"use client";

import { useState, useEffect } from "react";
import { Car, Search, Plus, MapPin, Calendar, User, Mail, Phone, MessageSquare, Send, CheckCircle, ChevronRight, ChevronDown, X, ArrowRight, Sparkles, Filter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ContactForm from "@/components/ContactForm";

type EventOption = { slug: string; name: string; dates: string };

type Listing = {
  id: string;
  type: "propose" | "cherche";
  event: string;
  eventName: string;
  cityFrom: string;
  seats?: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
};

const STORAGE_KEY = "adb-covoiturage-listings";

const defaultListings: Listing[] = [
  { id: "1", type: "propose", event: "la-saintelyon", eventName: "La SaintéLyon", cityFrom: "Paris 12e", seats: 3, name: "Laura M.", email: "laura.m@email.com", phone: "06 12 34 56 78", message: "Départ vendredi 27 nov. à 6h de Paris Bercy. Retour dimanche soir. Participation frais : 35€/pers.", createdAt: "2026-03-20" },
  { id: "2", type: "cherche", event: "arcteryx-alpine-academy", eventName: "Arc'teryx Alpine Academy", cityFrom: "Lyon", seats: undefined, name: "Thomas R.", email: "thomas.r@email.com", phone: "07 98 76 54 32", message: "Je cherche un trajet Lyon → Chamonix le 30 juin. Flexible sur les horaires.", createdAt: "2026-03-22" },
  { id: "3", type: "propose", event: "colnago-gf-mont-ventoux", eventName: "Colnago GF Mont Ventoux", cityFrom: "Marseille", seats: 2, name: "Sophie D.", email: "sophie.d@email.com", phone: "06 45 67 89 01", message: "Départ Marseille centre le 4 juin tôt le matin. Coffre spacieux pour vélos.", createdAt: "2026-03-23" },
  { id: "4", type: "cherche", event: "lyon-street-food-festival", eventName: "Lyon Street Food Festival", cityFrom: "Grenoble", seats: undefined, name: "Maxime P.", email: "maxime.p@email.com", phone: "", message: "Cherche covoiturage Grenoble → Lyon du 11 au 14 juin. On peut se relayer.", createdAt: "2026-03-24" },
  { id: "5", type: "propose", event: "festival-danse-avoriaz", eventName: "Festival de Danse d'Avoriaz", cityFrom: "Annecy", seats: 4, name: "Claire B.", email: "claire.b@email.com", phone: "06 23 45 67 89", message: "Grand monospace, 4 places dispo. Départ Annecy le 21 août à 8h.", createdAt: "2026-03-24" },
];

export default function CovoiturageBoard({ events }: { events: EventOption[] }) {
  const [listings, setListings] = useState<Listing[]>(defaultListings);
  const [showForm, setShowForm] = useState(false);
  const [filterEvent, setFilterEvent] = useState("");
  const [filterType, setFilterType] = useState<"all" | "propose" | "cherche">("all");
  const [submitted, setSubmitted] = useState(false);
  const [formType, setFormType] = useState<"propose" | "cherche">("propose");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as Listing[];
        setListings([...defaultListings, ...parsed]);
      } catch { /* ignore */ }
    }
  }, []);

  const filtered = listings.filter((l) => {
    if (filterEvent && l.event !== filterEvent) return false;
    if (filterType !== "all" && l.type !== filterType) return false;
    return true;
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const newListing: Listing = {
      id: Date.now().toString(),
      type: formType,
      event: data.get("event") as string,
      eventName: events.find((ev) => ev.slug === data.get("event"))?.name || "",
      cityFrom: data.get("cityFrom") as string,
      seats: formType === "propose" ? Number(data.get("seats")) : undefined,
      name: data.get("name") as string,
      email: data.get("email") as string,
      phone: data.get("phone") as string,
      message: data.get("message") as string,
      createdAt: new Date().toISOString().split("T")[0],
    };

    const saved = localStorage.getItem(STORAGE_KEY);
    const existing = saved ? JSON.parse(saved) : [];
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...existing, newListing]));

    setListings((prev) => [...prev, newListing]);
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setShowForm(false); }, 3000);
  };

  return (
    <div>
      {/* Header du board */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold">Tableau d&apos;annonces</h2>
          <p className="text-muted mt-1">Consultez les annonces ou publiez la vôtre. Contactez-vous directement.</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setSubmitted(false); }}
          id="publier"
          className="inline-flex items-center gap-2 rounded-full bg-secondary px-6 py-3 text-white font-semibold shadow-lg shadow-secondary/20 hover:bg-secondary-dark transition-all shrink-0"
        >
          <Plus className="h-5 w-5" />
          Publier une annonce
        </button>
      </div>

      {/* Filtres */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="flex items-center gap-2 flex-1">
          <Filter className="h-4 w-4 text-muted shrink-0" />
          <select
            value={filterEvent}
            onChange={(e) => setFilterEvent(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary"
          >
            <option value="">Tous les événements</option>
            {events.map((e) => (
              <option key={e.slug} value={e.slug}>{e.name}</option>
            ))}
          </select>
        </div>
        <div className="flex rounded-xl border border-slate-200 p-0.5 bg-white">
          {[
            { value: "all" as const, label: "Toutes" },
            { value: "propose" as const, label: "Proposent" },
            { value: "cherche" as const, label: "Cherchent" },
          ].map((f) => (
            <button
              key={f.value}
              onClick={() => setFilterType(f.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filterType === f.value
                  ? "bg-secondary text-white shadow-sm"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Liste des annonces */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-16 text-muted">
            <Car className="h-12 w-12 mx-auto mb-4 opacity-30" />
            <p className="font-semibold mb-1">Aucune annonce pour ce filtre</p>
            <p className="text-sm">Sois le premier à publier une annonce !</p>
          </div>
        )}
        {filtered.map((l) => (
          <div key={l.id} className="p-5 rounded-2xl bg-white border border-slate-200 hover:shadow-lg hover:border-secondary/30 transition-all">
            {/* Badge type */}
            <div className="flex items-center justify-between mb-3">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                l.type === "propose"
                  ? "bg-green-50 text-green-700 border border-green-100"
                  : "bg-blue-50 text-blue-700 border border-blue-100"
              }`}>
                {l.type === "propose" ? `🚗 Propose ${l.seats} place${(l.seats || 0) > 1 ? "s" : ""}` : "🔍 Cherche un trajet"}
              </span>
              <span className="text-[10px] text-slate-400">{l.createdAt}</span>
            </div>

            {/* Itinéraire */}
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="h-4 w-4 text-secondary shrink-0" />
              <span className="font-semibold text-sm">{l.cityFrom}</span>
              <ArrowRight className="h-3 w-3 text-muted" />
              <span className="font-semibold text-sm text-secondary">{l.eventName}</span>
            </div>

            {/* Message */}
            {l.message && (
              <p className="text-sm text-muted mb-4 line-clamp-2">{l.message}</p>
            )}

            {/* Contact — formulaire de mise en relation */}
            <ContactForm
              posterName={l.name}
              posterEmail={l.email}
              listingType="covoiturage"
              context={`${l.cityFrom} → ${l.eventName}`}
              color="secondary"
            />
          </div>
        ))}
      </div>

      {/* Modal formulaire */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={(e) => { if (e.target === e.currentTarget) setShowForm(false); }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
            >
              {submitted ? (
                <div className="p-10 text-center">
                  <div className="w-20 h-20 rounded-full bg-green-50 mx-auto mb-6 flex items-center justify-center">
                    <CheckCircle className="h-10 w-10 text-green-500" />
                  </div>
                  <h3 className="text-2xl font-bold mb-3">Annonce publiée !</h3>
                  <p className="text-muted max-w-sm mx-auto">
                    Ton annonce est visible par tous les bénévoles. Ils te contacteront directement par email ou téléphone.
                  </p>
                </div>
              ) : (
                <div className="p-4 sm:p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold">Nouvelle annonce</h3>
                    <button onClick={() => setShowForm(false)} className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Toggle type */}
                  <div className="flex rounded-xl bg-slate-100 p-1 mb-6">
                    <button
                      onClick={() => setFormType("propose")}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                        formType === "propose" ? "bg-secondary text-white shadow" : "text-muted"
                      }`}
                    >
                      <Car className="h-4 w-4" /> Je propose
                    </button>
                    <button
                      onClick={() => setFormType("cherche")}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                        formType === "cherche" ? "bg-secondary text-white shadow" : "text-muted"
                      }`}
                    >
                      <Search className="h-4 w-4" /> Je cherche
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium mb-1.5">
                        <Calendar className="h-4 w-4 text-secondary" /> Événement
                      </label>
                      <select name="event" required className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary focus:bg-white transition-all">
                        <option value="">Sélectionne</option>
                        {events.map((e) => <option key={e.slug} value={e.slug}>{e.name} — {e.dates}</option>)}
                      </select>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium mb-1.5">
                          <MapPin className="h-4 w-4 text-secondary" /> Ville de départ
                        </label>
                        <input name="cityFrom" required placeholder="Ex : Lyon" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary focus:bg-white transition-all" />
                      </div>
                      {formType === "propose" && (
                        <div>
                          <label className="flex items-center gap-2 text-sm font-medium mb-1.5">
                            <User className="h-4 w-4 text-secondary" /> Places dispo
                          </label>
                          <input name="seats" type="number" min="1" max="7" required placeholder="3" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary focus:bg-white transition-all" />
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium mb-1.5">
                          <User className="h-4 w-4 text-secondary" /> Prénom
                        </label>
                        <input name="name" required placeholder="Ton prénom" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary focus:bg-white transition-all" />
                      </div>
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium mb-1.5">
                          <Mail className="h-4 w-4 text-secondary" /> Email
                        </label>
                        <input name="email" type="email" required placeholder="ton@email.com" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary focus:bg-white transition-all" />
                      </div>
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium mb-1.5">
                        <Phone className="h-4 w-4 text-secondary" /> Téléphone (recommandé)
                      </label>
                      <input name="phone" type="tel" placeholder="06 12 34 56 78" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary focus:bg-white transition-all" />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium mb-1.5">
                        <MessageSquare className="h-4 w-4 text-secondary" /> Détails
                      </label>
                      <textarea name="message" rows={3} placeholder="Horaires, point de RDV, participation frais, bagages..." className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-secondary/30 focus:border-secondary focus:bg-white transition-all resize-none" />
                    </div>

                    <div className="p-3 rounded-xl bg-teal-50 border border-teal-100 text-xs text-teal-700">
                      Tes coordonnées seront masquées par défaut. Seuls les bénévoles qui cliquent volontairement pour te contacter pourront les voir.
                    </div>

                    <button type="submit" className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-secondary text-white font-semibold hover:bg-secondary-dark transition-all shadow-lg shadow-secondary/20">
                      <Send className="h-4 w-4" />
                      Publier mon annonce
                    </button>
                  </form>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

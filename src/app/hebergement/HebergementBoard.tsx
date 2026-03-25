"use client";

import { useState, useEffect } from "react";
import { BedDouble, Search, Plus, MapPin, Calendar, User, Mail, Phone, MessageSquare, Send, CheckCircle, X, Home, Moon, Users, Filter, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import RevealContact from "@/components/RevealContact";

type EventOption = { slug: string; name: string; dates: string };

type Listing = {
  id: string;
  type: "propose" | "cherche";
  event: string;
  eventName: string;
  city: string;
  bedType?: string;
  spots?: number;
  nights?: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
};

const STORAGE_KEY = "adb-hebergement-listings";

const bedTypeLabels: Record<string, string> = {
  chambre: "Chambre privée",
  canape: "Canapé-lit",
  matelas: "Matelas",
  studio: "Studio",
};

const bedTypeEmojis: Record<string, string> = {
  chambre: "🛏️",
  canape: "🛋️",
  matelas: "🛌",
  studio: "🏠",
};

const defaultListings: Listing[] = [
  { id: "1", type: "propose", event: "la-saintelyon", eventName: "La SaintéLyon", city: "Lyon 7e", bedType: "chambre", spots: 2, nights: 2, name: "Marie D.", email: "marie.d@email.com", phone: "06 12 34 56 78", message: "Chambre privée avec salle de bain, 15 min du départ à pied. Draps fournis. WiFi disponible.", createdAt: "2026-03-18" },
  { id: "2", type: "propose", event: "arcteryx-alpine-academy", eventName: "Arc'teryx Alpine Academy", city: "Chamonix", bedType: "canape", spots: 1, nights: 5, name: "Pierre L.", email: "pierre.l@email.com", phone: "07 98 76 54 32", message: "Canapé-lit confortable dans le salon. 5 min à pied du centre. Petit-déjeuner inclus !", createdAt: "2026-03-20" },
  { id: "3", type: "cherche", event: "festival-danse-avoriaz", eventName: "Festival de Danse d'Avoriaz", city: "Avoriaz", spots: 1, nights: 4, name: "Lucas T.", email: "lucas.t@email.com", phone: "", message: "Cherche un lit pour 4 nuits pendant le festival. Discret, propre, je pars tôt le matin.", createdAt: "2026-03-21" },
  { id: "4", type: "propose", event: "colnago-gf-mont-ventoux", eventName: "Colnago GF Ventoux", city: "Vaison-la-Romaine", bedType: "chambre", spots: 3, nights: 3, name: "Françoise M.", email: "francoise.m@email.com", phone: "06 45 67 89 01", message: "Grande maison au centre. 1 chambre double + 1 matelas. Garage pour les vélos. Jardin.", createdAt: "2026-03-22" },
  { id: "5", type: "propose", event: "high-five-festival", eventName: "High Five Festival", city: "Annecy", bedType: "studio", spots: 2, nights: 3, name: "Sophie R.", email: "sophie.r@email.com", phone: "06 23 45 67 89", message: "Studio complet avec cuisine, 10 min du festival en bus. Clé remise la veille.", createdAt: "2026-03-23" },
  { id: "6", type: "cherche", event: "la-saintelyon", eventName: "La SaintéLyon", city: "Lyon", spots: 2, nights: 1, name: "Camille & Alex", email: "camille.a@email.com", phone: "07 11 22 33 44", message: "On est 2, on cherche juste un endroit pour dormir la nuit de la course (samedi). On repartira tôt dimanche.", createdAt: "2026-03-24" },
];

export default function HebergementBoard({ events }: { events: EventOption[] }) {
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
      city: data.get("city") as string,
      bedType: formType === "propose" ? (data.get("bedType") as string) : undefined,
      spots: Number(data.get("spots")) || 1,
      nights: Number(data.get("nights")) || 1,
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold">Tableau d&apos;annonces</h2>
          <p className="text-muted mt-1">Consultez les annonces ou publiez la vôtre. Contactez-vous directement.</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setSubmitted(false); }}
          id="publier"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-white font-semibold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all shrink-0"
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
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
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
                  ? "bg-primary text-white shadow-sm"
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
            <BedDouble className="h-12 w-12 mx-auto mb-4 opacity-30" />
            <p className="font-semibold mb-1">Aucune annonce pour ce filtre</p>
            <p className="text-sm">Sois le premier à publier une annonce !</p>
          </div>
        )}
        {filtered.map((l) => (
          <div key={l.id} className="p-5 rounded-2xl bg-white border border-slate-200 hover:shadow-lg hover:border-primary/30 transition-all">
            {/* Badge */}
            <div className="flex items-center justify-between mb-3">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                l.type === "propose"
                  ? "bg-green-50 text-green-700 border border-green-100"
                  : "bg-blue-50 text-blue-700 border border-blue-100"
              }`}>
                {l.type === "propose"
                  ? `${l.bedType ? bedTypeEmojis[l.bedType] || "🏠" : "🏠"} Propose ${l.spots} place${(l.spots || 0) > 1 ? "s" : ""}`
                  : `🔍 Cherche ${l.spots || 1} place${(l.spots || 0) > 1 ? "s" : ""}`
                }
              </span>
              <span className="text-[10px] text-slate-400">{l.createdAt}</span>
            </div>

            {/* Infos */}
            <div className="space-y-1.5 mb-3">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-primary shrink-0" />
                <span className="font-semibold">{l.city}</span>
                <span className="text-muted">&middot;</span>
                <span className="text-sm text-primary font-medium">{l.eventName}</span>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted">
                {l.bedType && (
                  <span className="flex items-center gap-1">
                    <BedDouble className="h-3.5 w-3.5" />
                    {bedTypeLabels[l.bedType] || l.bedType}
                  </span>
                )}
                {l.nights && (
                  <span className="flex items-center gap-1">
                    <Moon className="h-3.5 w-3.5" />
                    {l.nights} nuit{l.nights > 1 ? "s" : ""}
                  </span>
                )}
              </div>
            </div>

            {/* Message */}
            {l.message && (
              <p className="text-sm text-muted mb-4 line-clamp-2">{l.message}</p>
            )}

            {/* Contact — masqué par défaut */}
            <RevealContact name={l.name} email={l.email} phone={l.phone} color="primary" />
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
                    Ton annonce est visible. Les bénévoles intéressés te contacteront directement par email ou téléphone.
                  </p>
                </div>
              ) : (
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold">Nouvelle annonce</h3>
                    <button onClick={() => setShowForm(false)} className="p-2 rounded-lg hover:bg-slate-100 transition-colors">
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Toggle */}
                  <div className="flex rounded-xl bg-slate-100 p-1 mb-6">
                    <button
                      onClick={() => setFormType("propose")}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                        formType === "propose" ? "bg-primary text-white shadow" : "text-muted"
                      }`}
                    >
                      <Home className="h-4 w-4" /> Je propose un lit
                    </button>
                    <button
                      onClick={() => setFormType("cherche")}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                        formType === "cherche" ? "bg-primary text-white shadow" : "text-muted"
                      }`}
                    >
                      <Search className="h-4 w-4" /> Je cherche un lit
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium mb-1.5">
                        <Calendar className="h-4 w-4 text-primary" /> Événement
                      </label>
                      <select name="event" required className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary focus:bg-white transition-all">
                        <option value="">Sélectionne</option>
                        {events.map((e) => <option key={e.slug} value={e.slug}>{e.name} — {e.dates}</option>)}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium mb-1.5">
                          <MapPin className="h-4 w-4 text-primary" /> Ville
                        </label>
                        <input name="city" required placeholder="Ex : Lyon 7e" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary focus:bg-white transition-all" />
                      </div>
                      {formType === "propose" && (
                        <div>
                          <label className="flex items-center gap-2 text-sm font-medium mb-1.5">
                            <BedDouble className="h-4 w-4 text-primary" /> Type de couchage
                          </label>
                          <select name="bedType" required className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary focus:bg-white transition-all">
                            <option value="">Sélectionne</option>
                            <option value="chambre">🛏️ Chambre privée</option>
                            <option value="canape">🛋️ Canapé-lit</option>
                            <option value="matelas">🛌 Matelas</option>
                            <option value="studio">🏠 Studio</option>
                          </select>
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium mb-1.5">
                          <Users className="h-4 w-4 text-primary" /> {formType === "propose" ? "Places dispo" : "Personnes"}
                        </label>
                        <input name="spots" type="number" min="1" max="6" required placeholder="2" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary focus:bg-white transition-all" />
                      </div>
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium mb-1.5">
                          <Moon className="h-4 w-4 text-primary" /> {formType === "propose" ? "Nuits max" : "Nuits souhaitées"}
                        </label>
                        <input name="nights" type="number" min="1" max="14" required placeholder="2" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary focus:bg-white transition-all" />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium mb-1.5">
                          <User className="h-4 w-4 text-primary" /> Prénom
                        </label>
                        <input name="name" required placeholder="Ton prénom" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary focus:bg-white transition-all" />
                      </div>
                      <div>
                        <label className="flex items-center gap-2 text-sm font-medium mb-1.5">
                          <Mail className="h-4 w-4 text-primary" /> Email
                        </label>
                        <input name="email" type="email" required placeholder="ton@email.com" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary focus:bg-white transition-all" />
                      </div>
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium mb-1.5">
                        <Phone className="h-4 w-4 text-primary" /> Téléphone (recommandé)
                      </label>
                      <input name="phone" type="tel" placeholder="06 12 34 56 78" className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary focus:bg-white transition-all" />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 text-sm font-medium mb-1.5">
                        <MessageSquare className="h-4 w-4 text-primary" /> Détails
                      </label>
                      <textarea name="message" rows={3} placeholder={formType === "propose" ? "Accès, commodités, distance de l'événement, règles..." : "Vos besoins, horaires d'arrivée, allergies..."} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary focus:bg-white transition-all resize-none" />
                    </div>

                    <div className="p-3 rounded-xl bg-teal-50 border border-teal-100 text-xs text-teal-700">
                      Tes coordonnées seront masquées par défaut. Seuls les bénévoles qui cliquent volontairement pour te contacter pourront les voir.
                    </div>

                    <button type="submit" className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-primary text-white font-semibold hover:bg-primary-dark transition-all shadow-lg shadow-primary/20">
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

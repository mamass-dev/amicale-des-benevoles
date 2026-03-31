"use client";

import { useState } from "react";
import { Send, User, CheckCircle, MessageSquare, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  posterName: string;
  posterEmail: string;
  listingType: "covoiturage" | "hebergement";
  context?: string; // ex: "Dijon → La SaintéLyon" ou "Chambre privée à Lyon"
  color?: "primary" | "secondary";
};

export default function ContactForm({ posterName, posterEmail, listingType, context, color = "primary" }: Props) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const accentBg = color === "secondary" ? "bg-secondary" : "bg-primary";
  const accentBgLight = color === "secondary" ? "bg-teal-50 border-teal-100" : "bg-teal-50/60 border-teal-100";
  const accentHover = color === "secondary" ? "hover:bg-secondary-dark" : "hover:bg-primary-dark";
  const accentRing = color === "secondary" ? "focus:ring-secondary/30" : "focus:ring-primary/30";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !email || !message) return;
    setStatus("sending");

    try {
      const res = await fetch("/api/contact-relay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          posterName,
          posterEmail,
          senderName: name,
          senderEmail: email,
          senderMessage: message,
          listingType,
          context,
        }),
      });

      if (res.ok) {
        setStatus("sent");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  // Message envoyé
  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-4 rounded-xl ${accentBgLight} border text-center`}
      >
        <CheckCircle className="h-6 w-6 text-green-500 mx-auto mb-2" />
        <p className="text-sm font-semibold text-foreground">Message envoyé !</p>
        <p className="text-xs text-muted mt-1">
          {posterName} recevra votre message par email et pourra vous répondre directement.
        </p>
      </motion.div>
    );
  }

  // Bouton initial
  if (!open) {
    return (
      <div className={`p-3 rounded-xl ${accentBgLight} border`}>
        <div className="flex items-center gap-2 text-sm font-semibold mb-2">
          <User className="h-3.5 w-3.5 text-primary" />
          {posterName}
        </div>
        <p className="text-xs text-muted mb-3">
          Coordonnées protégées — envoyez un message via le formulaire
        </p>
        <button
          onClick={() => setOpen(true)}
          className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg ${accentBg} text-white text-xs font-semibold ${accentHover} transition-colors cursor-pointer`}
        >
          <MessageSquare className="h-3.5 w-3.5" />
          Contacter {posterName.split(" ")[0]}
        </button>
      </div>
    );
  }

  // Formulaire ouvert
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-4 rounded-xl ${accentBgLight} border`}
      >
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-foreground">
            Envoyer un message à {posterName.split(" ")[0]}
          </p>
          <button onClick={() => setOpen(false)} className="text-muted hover:text-foreground transition cursor-pointer">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-2.5">
          <input
            type="text"
            required
            placeholder="Votre nom"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 ${accentRing} transition`}
          />
          <input
            type="email"
            required
            placeholder="Votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 ${accentRing} transition`}
          />
          <textarea
            required
            rows={3}
            placeholder={`Bonjour ${posterName.split(" ")[0]}, je suis intéressé(e) par votre annonce...`}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 ${accentRing} transition resize-none`}
          />

          {status === "error" && (
            <p className="text-xs text-red-500">Erreur d&apos;envoi. Réessayez.</p>
          )}

          <button
            type="submit"
            disabled={status === "sending"}
            className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg ${accentBg} text-white text-xs font-semibold ${accentHover} transition-colors cursor-pointer disabled:opacity-60`}
          >
            {status === "sending" ? (
              <span className="inline-block w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Send className="h-3.5 w-3.5" />
            )}
            {status === "sending" ? "Envoi..." : "Envoyer le message"}
          </button>

          <p className="text-[10px] text-muted text-center">
            Votre email sera partagé avec {posterName.split(" ")[0]} pour qu&apos;il/elle puisse vous répondre.
          </p>
        </form>
      </motion.div>
    </AnimatePresence>
  );
}

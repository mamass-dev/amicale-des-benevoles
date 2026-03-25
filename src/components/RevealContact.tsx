"use client";

import { useState } from "react";
import { Eye, Mail, Phone, User, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  name: string;
  email: string;
  phone?: string;
  color?: "primary" | "secondary";
};

export default function RevealContact({ name, email, phone, color = "primary" }: Props) {
  const [revealed, setRevealed] = useState(false);

  const accentText = color === "secondary" ? "text-secondary" : "text-primary";
  const accentBg = color === "secondary" ? "bg-secondary" : "bg-primary";
  const accentBgLight = color === "secondary" ? "bg-teal-50 border-teal-100" : "bg-teal-50/60 border-teal-100";
  const accentHover = color === "secondary" ? "hover:bg-secondary-dark" : "hover:bg-primary-dark";

  if (!revealed) {
    return (
      <div className={`p-3 rounded-xl ${accentBgLight} border`}>
        <div className="flex items-center gap-2 text-sm font-semibold mb-2">
          <User className={`h-3.5 w-3.5 ${accentText}`} />
          {name}
        </div>
        <div className="flex items-center gap-2 text-xs text-muted mb-3">
          <Lock className="h-3 w-3" />
          Coordonnées masquées pour protéger la vie privée
        </div>
        <button
          onClick={() => setRevealed(true)}
          className={`w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg ${accentBg} text-white text-xs font-semibold ${accentHover} transition-colors`}
        >
          <Eye className="h-3.5 w-3.5" />
          Voir les coordonnées pour le contacter
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1.5"
    >
      <div className="flex items-center gap-2 text-sm font-semibold">
        <User className={`h-3.5 w-3.5 ${accentText}`} />
        {name}
      </div>
      <div className="flex items-center gap-2 text-sm text-muted">
        <Mail className="h-3.5 w-3.5" />
        <a href={`mailto:${email}`} className={`${accentText} hover:underline`}>{email}</a>
      </div>
      {phone && (
        <div className="flex items-center gap-2 text-sm text-muted">
          <Phone className="h-3.5 w-3.5" />
          <a href={`tel:${phone.replace(/\s/g, "")}`} className={`${accentText} hover:underline`}>{phone}</a>
        </div>
      )}
    </motion.div>
  );
}

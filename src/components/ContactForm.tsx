"use client";

import { useState } from "react";
import { Send } from "lucide-react";

const subjects = [
  { value: "benevole", label: "Je suis bénévole (ou je veux le devenir)" },
  { value: "organisateur", label: "Je représente un événement / organisateur" },
  { value: "partenariat", label: "Partenariat ou sponsoring" },
  { value: "presse", label: "Presse / média" },
  { value: "autre", label: "Autre demande" },
];

export default function ContactForm({ recipient }: { recipient: string }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState(subjects[0].value);
  const [message, setMessage] = useState("");

  const subjectLabel = subjects.find((s) => s.value === subject)?.label ?? "Contact";
  const mailto = (() => {
    const params = new URLSearchParams({
      subject: `[${subjectLabel}] ${name || "Contact site"}`.slice(0, 200),
      body: `Bonjour,\n\n${message}\n\n— ${name}\n${email}`,
    });
    return `mailto:${recipient}?${params.toString()}`;
  })();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        window.location.href = mailto;
      }}
      className="space-y-5"
    >
      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1.5">
            Nom <span className="text-accent">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1.5">
            Email <span className="text-accent">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
            autoComplete="email"
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium mb-1.5">
          Sujet
        </label>
        <select
          id="subject"
          name="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
        >
          {subjects.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1.5">
          Message <span className="text-accent">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-card border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition resize-y"
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-white font-semibold hover:bg-primary-dark transition-colors shadow-lg shadow-primary/25"
      >
        Envoyer le message <Send className="h-4 w-4" />
      </button>

      <p className="text-xs text-muted">
        Le formulaire ouvrira ton client mail avec un message pré-rempli. Si tu préfères, écris-nous directement à{" "}
        <a href={`mailto:${recipient}`} className="underline hover:text-primary">
          {recipient}
        </a>
        .
      </p>
    </form>
  );
}

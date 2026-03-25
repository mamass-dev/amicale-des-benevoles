"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type FaqItem = { question: string; answer: string };

export default function FaqAccordion({
  items,
  color = "primary",
}: {
  items: FaqItem[];
  color?: "primary" | "secondary";
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const ringColor = color === "secondary" ? "ring-secondary/20" : "ring-primary/20";
  const borderActive = color === "secondary" ? "border-secondary/30" : "border-primary/30";
  const bgActive = color === "secondary" ? "bg-teal-50/50" : "bg-teal-50/50";
  const textColor = color === "secondary" ? "text-secondary" : "text-primary";

  return (
    <div className="space-y-3">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className={`rounded-2xl border transition-all ${
              isOpen
                ? `${borderActive} ${bgActive} shadow-sm`
                : "border-slate-200 bg-white hover:border-stone-300"
            }`}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className={`w-full flex items-center justify-between p-5 text-left focus:outline-none focus-visible:ring-2 ${ringColor} rounded-2xl`}
            >
              <span className="font-semibold pr-4">{item.question}</span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="shrink-0"
              >
                <ChevronDown className={`h-5 w-5 transition-colors ${isOpen ? textColor : "text-slate-400"}`} />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-5 text-muted leading-relaxed text-[15px]">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

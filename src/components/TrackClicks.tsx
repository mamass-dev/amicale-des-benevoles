"use client";

import { useEffect } from "react";
import { track } from "@/lib/track";

/**
 * Délégation globale des clics : un seul écouteur (phase de capture) qui nomme
 * les clics sur les liens tel:/mailto:, réseaux sociaux et CTA externes.
 * `location` = data-track-location le plus proche, sinon header/footer/main.
 */
const SOCIAL: Array<[RegExp, string]> = [
  [/facebook\.com/, "facebook"],
  [/instagram\.com/, "instagram"],
  [/linkedin\.com/, "linkedin"],
  [/youtube\.com/, "youtube"],
  [/tiktok\.com/, "tiktok"],
];

function locationOf(el: Element): string {
  const tagged = el.closest<HTMLElement>("[data-track-location]");
  if (tagged?.dataset.trackLocation) return tagged.dataset.trackLocation;
  if (el.closest("header")) return "header";
  if (el.closest("footer")) return "footer";
  return "main";
}

export default function TrackClicks() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const target = e.target as Element | null;
      const a = target?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      const location = locationOf(a);

      if (href.startsWith("tel:")) {
        track("contact_click", { channel: "phone", location });
        return;
      }
      if (href.startsWith("mailto:")) {
        track("contact_click", { channel: "email", location });
        return;
      }
      for (const [re, network] of SOCIAL) {
        if (re.test(href)) {
          track("social_click", { network, location });
          return;
        }
      }
      if (/recrewteer\.com/.test(href)) {
        track("inscription_click", { location });
        return;
      }
    }
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}

import type { SanityEvent } from "@/sanity/lib/types";

export function isEventPast(
  event: Pick<SanityEvent, "dateStart" | "dateEnd">,
  now: Date = new Date()
): boolean {
  const ref = event.dateEnd || event.dateStart;
  if (!ref) return false;
  const today = now.toISOString().split("T")[0];
  return ref < today;
}

export function sortEventsUpcomingFirst<
  T extends Pick<SanityEvent, "dateStart" | "dateEnd">
>(events: T[], now: Date = new Date()): T[] {
  const upcoming: T[] = [];
  const past: T[] = [];
  for (const e of events) {
    if (isEventPast(e, now)) past.push(e);
    else upcoming.push(e);
  }
  upcoming.sort((a, b) => (a.dateStart || "").localeCompare(b.dateStart || ""));
  past.sort((a, b) => (b.dateStart || "").localeCompare(a.dateStart || ""));
  return [...upcoming, ...past];
}

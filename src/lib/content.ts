// Source de vérité du contenu.
// - Si DATABASE_URI est défini : utilise Payload CMS (Postgres + Vercel Blob)
// - Sinon : tombe sur les données statiques (data.ts + content-defaults.ts)
//   Cela garantit que le site fonctionne en dev sans DB.

import {
  events as staticEvents,
  teamMembers as staticTeam,
  partners as staticPartners,
  testimonials as staticTestimonials,
  stats as staticStats,
} from "@/lib/data";
import {
  homeDefaults,
  aboutDefaults,
  eventsPageDefaults,
  organizersDefaults,
  volunteerDefaults,
  legalDefaults,
  siteDefaults,
  faqPageDefaults,
  contactPageDefaults,
  type HomeContent,
  type AboutContent,
  type EventsPageContent,
  type OrganizersContent,
  type VolunteerContent,
  type LegalContent,
  type SiteContent,
  type FaqContent,
  type ContactContent,
} from "@/lib/content-defaults";
import type {
  Event,
  TeamMembers,
  Partner,
  Testimonial,
  Stat,
  StaffMember,
  BoardMember,
} from "@/lib/content-types";

export type SiteSettings = SiteContent & {
  siteName?: string;
  siteDescription?: string;
  email?: string;
  phone1?: string;
  phone2?: string;
  address?: string;
  rna?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  whatsappUrl?: string;
  inscriptionUrl?: string;
};

const siteFallback: SiteSettings = {
  ...siteDefaults,
  siteName: "Amicale des Bénévoles",
  email: "contact@amicaledesbenevoles.org",
  phone1: "Quentin : 06 88 65 19 60",
  address: "107 rue Bechevelin, 69007 Lyon",
  rna: "W691100560",
  facebookUrl: "https://www.facebook.com/amicaledesbenevoles",
  instagramUrl: "https://www.instagram.com/amicale_des_benevoles/",
  linkedinUrl: "https://www.linkedin.com/company/amicaledesbenevoles",
  inscriptionUrl: "https://event.recrewteer.com/v2/organization/121/form/7034",
};

// ─── Payload connection (lazy) ───────────────────────────────────────────────

const payloadEnabled = !!process.env.DATABASE_URI;

type PayloadInstance = Awaited<ReturnType<typeof import("payload").getPayload>>;
let payloadPromise: Promise<PayloadInstance> | null = null;

async function getPayloadInstance(): Promise<PayloadInstance | null> {
  if (!payloadEnabled) return null;
  if (!payloadPromise) {
    const { getPayload } = await import("payload");
    const config = (await import("@payload-config")).default;
    payloadPromise = getPayload({ config });
  }
  try {
    return await payloadPromise;
  } catch (err) {
    console.error("[content] Payload init failed:", err);
    return null;
  }
}

// ─── Mappers Payload → types front ───────────────────────────────────────────

type MediaLike = string | number | { url?: string } | null | undefined;
function mediaUrl(m: MediaLike, fallback = ""): string {
  if (!m) return fallback;
  if (typeof m === "object" && "url" in m && m.url) return m.url;
  return fallback;
}

type CoordLike = [number, number] | { coordinates?: [number, number] } | null | undefined;
function pointToCoords(p: CoordLike): { lat: number; lng: number } | undefined {
  if (!p) return undefined;
  const arr = Array.isArray(p) ? p : p.coordinates;
  if (!arr || arr.length !== 2) return undefined;
  return { lng: arr[0], lat: arr[1] };
}

function mapEventDoc(doc: Record<string, unknown>): Event {
  return {
    slug: String(doc.slug ?? ""),
    name: String(doc.name ?? ""),
    type: String(doc.type ?? "sportif"),
    location: String(doc.location ?? ""),
    dates: String(doc.dates ?? ""),
    dateStart: String(doc.dateStart ?? ""),
    dateEnd: String(doc.dateEnd ?? ""),
    description: String(doc.description ?? ""),
    image: mediaUrl(doc.image as MediaLike),
    missions: Array.isArray(doc.missions)
      ? (doc.missions as Array<{ label?: string }>).map((m) => m.label ?? "").filter(Boolean)
      : undefined,
    practicalInfo: Array.isArray(doc.practicalInfo)
      ? (doc.practicalInfo as Array<{ label?: string }>).map((m) => m.label ?? "").filter(Boolean)
      : undefined,
    coordinates: pointToCoords(doc.coordinates as CoordLike),
    _updatedAt: doc.updatedAt ? String(doc.updatedAt) : undefined,
  };
}

function mapTeamDoc(doc: Record<string, unknown>): StaffMember | BoardMember {
  const base = {
    name: String(doc.name ?? ""),
    role: String(doc.role ?? ""),
    image: mediaUrl(doc.image as MediaLike),
  };
  if (doc.category === "staff") {
    return {
      ...base,
      focus: String(doc.focus ?? ""),
      email: doc.email ? String(doc.email) : undefined,
      phone: doc.phone ? String(doc.phone) : undefined,
    } as StaffMember;
  }
  return base as BoardMember;
}

// ─── API publique ────────────────────────────────────────────────────────────

export async function getEvents(): Promise<Event[]> {
  const p = await getPayloadInstance();
  if (!p) return staticEvents as Event[];
  const result = await p.find({
    collection: "events",
    limit: 100,
    sort: "dateStart",
    depth: 2,
  });
  return result.docs.map((d) => mapEventDoc(d as unknown as Record<string, unknown>));
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  const p = await getPayloadInstance();
  if (!p) {
    return (staticEvents as Event[]).find((e) => e.slug === slug) ?? null;
  }
  const result = await p.find({
    collection: "events",
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
  });
  const doc = result.docs[0];
  return doc ? mapEventDoc(doc as unknown as Record<string, unknown>) : null;
}

export async function getTeamMembers(): Promise<TeamMembers> {
  const p = await getPayloadInstance();
  if (!p) return staticTeam;
  const result = await p.find({
    collection: "team-members",
    limit: 100,
    sort: "order",
    depth: 2,
  });
  const staff: StaffMember[] = [];
  const board: BoardMember[] = [];
  for (const d of result.docs as unknown as Record<string, unknown>[]) {
    const m = mapTeamDoc(d);
    if (d.category === "staff") staff.push(m as StaffMember);
    else board.push(m as BoardMember);
  }
  return { staff, board };
}

export async function getPartners(): Promise<Partner[]> {
  const p = await getPayloadInstance();
  if (!p) return staticPartners;
  const result = await p.find({
    collection: "partners",
    limit: 100,
    sort: "order",
    depth: 2,
  });
  return result.docs.map((d: unknown) => {
    const doc = d as Record<string, unknown>;
    return {
      name: String(doc.name ?? ""),
      logo: mediaUrl(doc.logo as MediaLike),
      url: doc.url ? String(doc.url) : undefined,
    };
  });
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const p = await getPayloadInstance();
  if (!p) return staticTestimonials;
  const result = await p.find({
    collection: "testimonials",
    limit: 100,
    sort: "order",
    depth: 2,
  });
  return result.docs.map((d: unknown) => {
    const doc = d as Record<string, unknown>;
    return {
      name: String(doc.name ?? ""),
      org: String(doc.org ?? ""),
      text: String(doc.text ?? ""),
      image: doc.image ? mediaUrl(doc.image as MediaLike) || undefined : undefined,
    };
  });
}

export async function getStats(): Promise<Stat[]> {
  const p = await getPayloadInstance();
  if (!p) return staticStats;
  const result = await p.find({
    collection: "stats",
    limit: 100,
    sort: "order",
  });
  return result.docs.map((d: unknown) => {
    const doc = d as Record<string, unknown>;
    return {
      label: String(doc.label ?? ""),
      value: Number(doc.value ?? 0),
      suffix: String(doc.suffix ?? ""),
    };
  });
}

// ─── Globals (pages) ─────────────────────────────────────────────────────────

async function getGlobal<T extends Record<string, unknown>>(slug: string, fallback: T): Promise<T> {
  const p = await getPayloadInstance();
  if (!p) return fallback;
  try {
    const doc = await p.findGlobal({ slug, depth: 2 });
    return mergeWithFallback(fallback, doc as unknown as Partial<T>);
  } catch {
    return fallback;
  }
}

function mergeWithFallback<T extends Record<string, unknown>>(
  fallback: T,
  data: Partial<T> | null | undefined
): T {
  if (!data) return fallback;
  const result: Record<string, unknown> = { ...fallback };
  for (const key of Object.keys(fallback)) {
    const incoming = (data as Record<string, unknown>)[key];
    if (incoming === undefined || incoming === null) continue;
    if (Array.isArray(incoming) && incoming.length === 0) continue;
    if (typeof incoming === "string" && incoming.trim() === "") continue;
    result[key] = incoming;
  }
  return result as T;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const p = await getPayloadInstance();
  if (!p) return siteFallback;
  try {
    const doc = (await p.findGlobal({ slug: "site-settings", depth: 2 })) as Record<string, unknown>;
    return { ...siteFallback, ...doc, logo: mediaUrl(doc.logo as MediaLike, siteFallback.logo) } as SiteSettings;
  } catch {
    return siteFallback;
  }
}

export async function getHomeContent(): Promise<HomeContent> {
  return getGlobal<HomeContent>("home-page", homeDefaults);
}

export async function getAboutContent(): Promise<AboutContent> {
  return getGlobal<AboutContent>("about-page", aboutDefaults);
}

export async function getEventsPageContent(): Promise<EventsPageContent> {
  return getGlobal<EventsPageContent>("events-page", eventsPageDefaults);
}

export async function getOrganizersContent(): Promise<OrganizersContent> {
  return getGlobal<OrganizersContent>("organizers-page", organizersDefaults);
}

export async function getVolunteerContent(): Promise<VolunteerContent> {
  return getGlobal<VolunteerContent>("volunteer-page", volunteerDefaults);
}

export async function getLegalContent(): Promise<LegalContent> {
  return getGlobal<LegalContent>("legal-page", legalDefaults);
}

export async function getFaqContent(): Promise<FaqContent> {
  return getGlobal<FaqContent>("faq-page", faqPageDefaults);
}

export async function getContactContent(): Promise<ContactContent> {
  return getGlobal<ContactContent>("contact-page", contactPageDefaults);
}

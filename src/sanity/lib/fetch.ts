import { client, sanityEnabled } from "./client";
import {
  eventsQuery,
  eventBySlugQuery,
  teamMembersQuery,
  partnersQuery,
  testimonialsQuery,
  statsQuery,
  faqQuery,
  siteSettingsQuery,
  homePageQuery,
  aboutPageQuery,
  carpoolPageQuery,
  housingPageQuery,
  eventsPageQuery,
  organizersPageQuery,
  volunteerPageQuery,
  legalPageQuery,
} from "./queries";
import type { SanityEvent, TeamMembers, Partner, Testimonial, Stat, FaqItem } from "./types";
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
  carpoolDefaults,
  housingDefaults,
  eventsPageDefaults,
  organizersDefaults,
  volunteerDefaults,
  legalDefaults,
  siteDefaults,
  type HomeContent,
  type AboutContent,
  type CarpoolContent,
  type HousingContent,
  type EventsPageContent,
  type OrganizersContent,
  type VolunteerContent,
  type LegalContent,
  type SiteContent,
} from "@/lib/content-defaults";

async function query<T>(groq: string, params?: Record<string, string>): Promise<T | null> {
  if (!sanityEnabled || !client) return null;
  try {
    if (params) {
      return await client.fetch<T>(groq, params);
    }
    return await client.fetch<T>(groq);
  } catch {
    return null;
  }
}

function mergeDefaults<T extends Record<string, unknown>>(defaults: T, data: Partial<T> | null | undefined): T {
  if (!data) return defaults;
  const result: Record<string, unknown> = { ...defaults };
  for (const key of Object.keys(defaults)) {
    const incoming = (data as Record<string, unknown>)[key];
    if (incoming === undefined || incoming === null) continue;
    if (Array.isArray(incoming) && incoming.length === 0) continue;
    if (typeof incoming === "string" && incoming.trim() === "") continue;
    result[key] = incoming;
  }
  return result as T;
}

export async function getEvents(): Promise<SanityEvent[]> {
  return (await query<SanityEvent[]>(eventsQuery)) ?? staticEvents;
}

export async function getEventBySlug(slug: string): Promise<SanityEvent | null> {
  return (await query<SanityEvent>(eventBySlugQuery, { slug })) ?? staticEvents.find((e) => e.slug === slug) ?? null;
}

export async function getTeamMembers(): Promise<TeamMembers> {
  return (await query<TeamMembers>(teamMembersQuery)) ?? staticTeam;
}

export async function getPartners(): Promise<Partner[]> {
  return (await query<Partner[]>(partnersQuery)) ?? staticPartners;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return (await query<Testimonial[]>(testimonialsQuery)) ?? staticTestimonials;
}

export async function getStats(): Promise<Stat[]> {
  return (await query<Stat[]>(statsQuery)) ?? staticStats;
}

export async function getFaqs(category: string): Promise<FaqItem[]> {
  return (await query<FaqItem[]>(faqQuery, { category })) ?? [];
}

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

export async function getSiteSettings(): Promise<SiteSettings> {
  const raw = (await query<Record<string, unknown>>(siteSettingsQuery)) ?? {};
  return { ...siteDefaults, ...mergeDefaults(siteDefaults, raw as Partial<SiteContent>), ...raw } as SiteSettings;
}

export async function getHomeContent(): Promise<HomeContent> {
  return mergeDefaults(homeDefaults, await query<Partial<HomeContent>>(homePageQuery));
}

export async function getAboutContent(): Promise<AboutContent> {
  return mergeDefaults(aboutDefaults, await query<Partial<AboutContent>>(aboutPageQuery));
}

export async function getCarpoolContent(): Promise<CarpoolContent> {
  return mergeDefaults(carpoolDefaults, await query<Partial<CarpoolContent>>(carpoolPageQuery));
}

export async function getHousingContent(): Promise<HousingContent> {
  return mergeDefaults(housingDefaults, await query<Partial<HousingContent>>(housingPageQuery));
}

export async function getEventsPageContent(): Promise<EventsPageContent> {
  return mergeDefaults(eventsPageDefaults, await query<Partial<EventsPageContent>>(eventsPageQuery));
}

export async function getOrganizersContent(): Promise<OrganizersContent> {
  return mergeDefaults(organizersDefaults, await query<Partial<OrganizersContent>>(organizersPageQuery));
}

export async function getVolunteerContent(): Promise<VolunteerContent> {
  return mergeDefaults(volunteerDefaults, await query<Partial<VolunteerContent>>(volunteerPageQuery));
}

export async function getLegalContent(): Promise<LegalContent> {
  return mergeDefaults(legalDefaults, await query<Partial<LegalContent>>(legalPageQuery));
}

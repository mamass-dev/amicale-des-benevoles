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
} from "./queries";
import type { SanityEvent, TeamMembers, Partner, Testimonial, Stat, FaqItem } from "./types";
import {
  events as staticEvents,
  teamMembers as staticTeam,
  partners as staticPartners,
  testimonials as staticTestimonials,
  stats as staticStats,
} from "@/lib/data";

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

export async function getSiteSettings() {
  return await query(siteSettingsQuery);
}

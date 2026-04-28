// Source de vérité du contenu.
// Aujourd'hui : données statiques dans @/lib/data + @/lib/content-defaults.
// Demain : sera connecté à Payload CMS (mêmes signatures).

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

export async function getEvents(): Promise<Event[]> {
  return staticEvents as Event[];
}

export async function getEventBySlug(slug: string): Promise<Event | null> {
  return (staticEvents as Event[]).find((e) => e.slug === slug) ?? null;
}

export async function getTeamMembers(): Promise<TeamMembers> {
  return staticTeam;
}

export async function getPartners(): Promise<Partner[]> {
  return staticPartners;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return staticTestimonials;
}

export async function getStats(): Promise<Stat[]> {
  return staticStats;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return siteFallback;
}

export async function getHomeContent(): Promise<HomeContent> {
  return homeDefaults;
}

export async function getAboutContent(): Promise<AboutContent> {
  return aboutDefaults;
}

export async function getEventsPageContent(): Promise<EventsPageContent> {
  return eventsPageDefaults;
}

export async function getOrganizersContent(): Promise<OrganizersContent> {
  return organizersDefaults;
}

export async function getVolunteerContent(): Promise<VolunteerContent> {
  return volunteerDefaults;
}

export async function getLegalContent(): Promise<LegalContent> {
  return legalDefaults;
}

export async function getFaqContent(): Promise<FaqContent> {
  return faqPageDefaults;
}

export async function getContactContent(): Promise<ContactContent> {
  return contactPageDefaults;
}

import type { MetadataRoute } from "next";
import { getEvents } from "@/lib/content";

const baseUrl = "https://amicaledesbenevoles.org";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const events = await getEvents();
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/a-propos`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/evenements`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/organisateurs`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/espace-benevole`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${baseUrl}/mentions-legales`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const eventPages: MetadataRoute.Sitemap = events.map((event) => ({
    url: `${baseUrl}/evenements/${event.slug}`,
    lastModified: event._updatedAt ? new Date(event._updatedAt) : now,
    changeFrequency: "weekly" as const,
    priority: 0.7,
    images: event.image ? [event.image] : undefined,
  }));

  return [...staticPages, ...eventPages];
}

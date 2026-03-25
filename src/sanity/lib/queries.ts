import { groq } from "next-sanity";

export const eventsQuery = groq`
  *[_type == "event"] | order(dateStart asc) {
    "slug": slug.current,
    name,
    type,
    location,
    dates,
    dateStart,
    dateEnd,
    description,
    "image": image.asset->url,
    spots,
    spotsFilled
  }
`;

export const eventBySlugQuery = groq`
  *[_type == "event" && slug.current == $slug][0] {
    "slug": slug.current,
    name,
    type,
    location,
    dates,
    dateStart,
    dateEnd,
    description,
    "image": image.asset->url,
    spots,
    spotsFilled
  }
`;

export const teamMembersQuery = groq`{
  "staff": *[_type == "teamMember" && category == "staff"] | order(order asc) {
    name, role, focus, email, phone, "image": image.asset->url
  },
  "board": *[_type == "teamMember" && category == "board"] | order(order asc) {
    name, role, "image": image.asset->url
  }
}`;

export const partnersQuery = groq`
  *[_type == "partner"] | order(order asc) {
    name, "logo": logo.asset->url, url
  }
`;

export const testimonialsQuery = groq`
  *[_type == "testimonial"] | order(order asc) {
    name, org, text, "image": image.asset->url
  }
`;

export const statsQuery = groq`
  *[_type == "stat"] | order(order asc) {
    label, value, suffix
  }
`;

export const faqQuery = groq`
  *[_type == "faq" && category == $category] | order(order asc) {
    question, answer
  }
`;

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    siteName, siteDescription, email, phone1, phone2,
    address, rna, facebookUrl, instagramUrl, linkedinUrl,
    whatsappUrl, inscriptionUrl
  }
`;

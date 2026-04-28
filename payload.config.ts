import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

import { Users } from "./src/payload/collections/Users";
import { Media } from "./src/payload/collections/Media";
import { Events } from "./src/payload/collections/Events";
import { TeamMembers } from "./src/payload/collections/TeamMembers";
import { Testimonials } from "./src/payload/collections/Testimonials";
import { Partners } from "./src/payload/collections/Partners";
import { Stats } from "./src/payload/collections/Stats";

import { SiteSettings } from "./src/payload/globals/SiteSettings";
import { HomePage } from "./src/payload/globals/HomePage";
import { AboutPage } from "./src/payload/globals/AboutPage";
import { EventsPage } from "./src/payload/globals/EventsPage";
import { OrganizersPage } from "./src/payload/globals/OrganizersPage";
import { VolunteerPage } from "./src/payload/globals/VolunteerPage";
import { FaqPage } from "./src/payload/globals/FaqPage";
import { ContactPage } from "./src/payload/globals/ContactPage";
import { LegalPage } from "./src/payload/globals/LegalPage";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    meta: {
      titleSuffix: " — Amicale des Bénévoles",
    },
  },
  collections: [Users, Media, Events, TeamMembers, Testimonials, Partners, Stats],
  globals: [
    SiteSettings,
    HomePage,
    AboutPage,
    EventsPage,
    OrganizersPage,
    VolunteerPage,
    FaqPage,
    ContactPage,
    LegalPage,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "amicale-des-benevoles-dev-secret-change-me",
  typescript: {
    outputFile: path.resolve(dirname, "src/payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
  }),
  sharp,
  plugins: [
    vercelBlobStorage({
      enabled: !!process.env.BLOB_READ_WRITE_TOKEN,
      collections: { media: true },
      token: process.env.BLOB_READ_WRITE_TOKEN || "",
    }),
  ],
});

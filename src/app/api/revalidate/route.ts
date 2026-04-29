import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

// Webhook appelé par Sanity à chaque publication.
// Configure dans Sanity Manage → API → Webhooks :
//   - URL : https://amicale-des-benevoles.vercel.app/api/revalidate
//   - Trigger : Create / Update / Delete (sur tous les types)
//   - HTTP method : POST
//   - HTTP Headers : x-secret = <SANITY_REVALIDATE_SECRET>
//   - Dataset : production

const SECRET = process.env.SANITY_REVALIDATE_SECRET;

const PATHS_BY_TYPE: Record<string, string[]> = {
  event: ["/", "/evenements", "/evenements/[slug]"],
  homePage: ["/"],
  aboutPage: ["/a-propos"],
  eventsPage: ["/evenements"],
  organizersPage: ["/organisateurs"],
  volunteerPage: ["/espace-benevole"],
  faqPage: ["/faq"],
  contactPage: ["/contact"],
  legalPage: ["/mentions-legales"],
  siteSettings: ["/", "/a-propos", "/evenements", "/organisateurs", "/espace-benevole", "/faq", "/contact"],
  teamMember: ["/a-propos"],
  partner: ["/"],
  testimonial: ["/", "/organisateurs"],
  stat: ["/"],
};

function unauthorized(message: string) {
  return NextResponse.json({ revalidated: false, message }, { status: 401 });
}

export async function POST(req: NextRequest) {
  if (!SECRET) {
    return NextResponse.json(
      { revalidated: false, message: "SANITY_REVALIDATE_SECRET non configuré" },
      { status: 500 }
    );
  }

  const headerSecret = req.headers.get("x-secret");
  if (headerSecret !== SECRET) {
    return unauthorized("Secret invalide");
  }

  let body: { _type?: string; slug?: { current?: string } | string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ revalidated: false, message: "JSON invalide" }, { status: 400 });
  }

  const docType = body?._type;
  const slugRaw = body?.slug;
  const slug = typeof slugRaw === "string" ? slugRaw : slugRaw?.current;

  if (!docType) {
    // Pas de type → on revalide tout par sécurité
    revalidatePath("/", "layout");
    return NextResponse.json({ revalidated: true, paths: ["/"], scope: "layout" });
  }

  const paths = PATHS_BY_TYPE[docType] ?? [];
  const revalidated: string[] = [];

  for (const path of paths) {
    if (path.includes("[slug]") && slug) {
      const target = path.replace("[slug]", slug);
      revalidatePath(target);
      revalidated.push(target);
    } else if (!path.includes("[slug]")) {
      revalidatePath(path);
      revalidated.push(path);
    }
  }

  return NextResponse.json({ revalidated: true, docType, slug, paths: revalidated });
}

export async function GET() {
  return NextResponse.json({
    message: "Webhook revalidation Sanity → Next.js. Utilise POST avec header x-secret.",
  });
}

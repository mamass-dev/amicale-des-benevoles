// Compare les clés de content-defaults.ts avec ce qui est dans Sanity.
import { createClient } from "@sanity/client";
import { readFile } from "node:fs/promises";

const client = createClient({
  projectId: "mp1jjp4v",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

// Parse les clés de chaque bloc `export const xxxDefaults = { ... }`
const src = await readFile("src/lib/content-defaults.ts", "utf8");

function extractKeys(blockName) {
  const re = new RegExp(`export const ${blockName} = \\{([\\s\\S]*?)\\n\\};`);
  const m = src.match(re);
  if (!m) return [];
  const body = m[1];
  const keys = new Set();
  let depth = 0;
  let currentKey = "";
  let inString = false;
  let stringChar = "";
  let atTopLevel = true;
  let i = 0;
  // Simple line-based parser: top-level keys start at indent of 2 spaces, followed by ":"
  for (const line of body.split("\n")) {
    const trimmed = line.trimStart();
    const leadingSpaces = line.length - trimmed.length;
    if (leadingSpaces === 2 && /^[a-zA-Z_][a-zA-Z0-9_]*\s*:/.test(trimmed)) {
      const key = trimmed.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*:/)[1];
      keys.add(key);
    }
  }
  return [...keys];
}

const pairs = [
  ["homePage", "homeDefaults"],
  ["aboutPage", "aboutDefaults"],
  ["eventsPage", "eventsPageDefaults"],
  ["organizersPage", "organizersDefaults"],
  ["volunteerPage", "volunteerDefaults"],
  ["legalPage", "legalDefaults"],
  ["siteSettings", "siteDefaults"],
];

for (const [id, block] of pairs) {
  const doc = await client.fetch(`*[_id == "${id}"][0]`);
  const sanityKeys = new Set(Object.keys(doc || {}).filter((k) => !k.startsWith("_")));
  const defaultKeys = extractKeys(block);
  const missing = defaultKeys.filter((k) => !sanityKeys.has(k));
  const extra = [...sanityKeys].filter((k) => !defaultKeys.includes(k));
  console.log(`\n=== ${id} (${block}) ===`);
  console.log(`  Sanity: ${sanityKeys.size} champs | Defaults: ${defaultKeys.length}`);
  if (missing.length) console.log(`  MANQUE dans Sanity: ${missing.join(", ")}`);
  if (extra.length) console.log(`  EN PLUS dans Sanity: ${extra.join(", ")}`);
  if (!missing.length && !extra.length) console.log(`  OK synchro.`);
}

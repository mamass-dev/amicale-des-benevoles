// Vide toutes les collections Payload (sauf users) pour permettre un re-import propre.
// Usage : node scripts/cleanup-payload.mjs <email> <password>

const [, , email, password] = process.argv;
if (!email || !password) {
  console.error("Usage : node scripts/cleanup-payload.mjs <email> <password>");
  process.exit(1);
}

const API = "http://localhost:3000/api";

const loginRes = await fetch(`${API}/users/login`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password }),
});
const { token } = await loginRes.json();
if (!token) {
  console.error("❌ Login failed");
  process.exit(1);
}
const auth = { Authorization: `JWT ${token}` };
console.log("✓ Logged in");

const collections = ["events", "team-members", "testimonials", "partners", "stats", "media"];

for (const slug of collections) {
  console.log(`\n🗑  Cleaning ${slug}...`);
  while (true) {
    const res = await fetch(`${API}/${slug}?limit=100`, { headers: auth });
    const data = await res.json();
    if (!data.docs || data.docs.length === 0) break;
    for (const doc of data.docs) {
      await fetch(`${API}/${slug}/${doc.id}`, { method: "DELETE", headers: auth });
    }
    console.log(`  ✓ ${data.docs.length} supprimés`);
    if (data.docs.length < 100) break;
  }
}

console.log("\n✅ Cleanup terminé.");

# Migration Sanity → Payload — Guide d'installation

## 1. Créer la base de données Neon (gratuit, illimité)

1. Va sur https://neon.tech, créer un compte
2. **New Project** → nom : `amicale-des-benevoles`, région : `Europe (Frankfurt)` ou la plus proche
3. Copier la **Connection string** (format `postgresql://user:pass@host/db?sslmode=require`)

## 2. Créer le store Vercel Blob

1. Dashboard Vercel → projet `amicale-des-benevoles` → **Storage** → **Connect Store**
2. Choisir **Blob** → **Create New** → nom : `amicale-media`
3. Onglet **`.env.local` Variables** → copier la valeur de `BLOB_READ_WRITE_TOKEN`

## 3. Configurer les env vars en local

```bash
cp .env.example .env.local
# Remplir DATABASE_URI, PAYLOAD_SECRET, BLOB_READ_WRITE_TOKEN
```

Pour générer le secret :
```bash
openssl rand -base64 32
```

## 4. Initialiser le schema Payload (crée les tables)

```bash
npm run dev
# Ouvrir http://localhost:3000/admin → créer le premier utilisateur
# (Payload détecte qu'il n'y a pas de user et propose la création)
```

Cela crée automatiquement les tables Postgres au premier démarrage.

## 5. Migrer les données depuis le backup Sanity

```bash
# Le backup est dans sanity-backup/<timestamp>/
npx tsx scripts/migrate-to-payload.mjs sanity-backup/2026-04-28T08-08-38-283Z
```

Ce script :
- Upload les 58 images vers Vercel Blob
- Crée les 16 events, 10 membres équipe, 8 partenaires, 4 stats, 2 témoignages
- Pousse les contenus des 9 pages globales (Accueil, À propos, FAQ, Contact, etc.)

## 6. Configurer les env vars sur Vercel

Dashboard Vercel → projet → Settings → Environment Variables :

- `DATABASE_URI` (la même que Neon)
- `PAYLOAD_SECRET` (la même que local)
- `BLOB_READ_WRITE_TOKEN` (déjà ajouté à l'étape 2 normalement)

**Important** : cocher "Production", "Preview" et "Development".

## 7. Déployer

```bash
git push origin main
```

Vercel redéploie automatiquement.

## 8. Vérifier

- `https://amicale-des-benevoles.vercel.app` — site fonctionne
- `https://amicale-des-benevoles.vercel.app/admin` — studio Payload (login)

## En cas de problème

- Site cassé : vérifier les env vars Vercel + redéployer
- Studio inaccessible : vérifier `DATABASE_URI` (Neon doit accepter les connexions SSL)
- Images manquantes : `BLOB_READ_WRITE_TOKEN` correct ?
- Voir les logs Vercel pour les erreurs runtime

## Rollback (si besoin)

```bash
git revert HEAD~5..HEAD  # adapter le nombre de commits
git push origin main
```

Les données Sanity sont préservées dans `sanity-backup/` (gitignored).

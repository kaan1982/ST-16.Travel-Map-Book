# App Growth Desk

A private ASO (App Store Optimization) intelligence dashboard for a single iOS developer/account. This is **not** a public SaaS — there is no signup flow, billing, team plans, or marketplace. One owner account, configured entirely via environment variables.

## Phase 1 scope (this build)

This first pass wires up the full data model and the core single-app workflow with mock data, plus a real (but currently sandbox-blocked-in-CI) Apple lookup integration:

- Single-owner email/password auth (JWT session cookie)
- App import via App Store ID/URL (`src/server/apple/lookup.ts`, hits the public iTunes Lookup API)
- App detail, keyword tracker (mocked rank history), metadata editor with character-limit/duplicate-word warnings
- AI ASO audit (calls an OpenAI-compatible endpoint if configured, otherwise returns a structured mock result)
- Competitor comparison and keyword overlap (mock data)
- CSV export
- Full Prisma schema for all planned models (App Store Connect, Apple Ads, reviews, localization, notifications), even though only the Phase 1 features above are wired to real queries today

Later phases (App Store Connect push-updates, Apple Ads reporting, scheduled crawlers, PDF reports) are scaffolded as stub pages/routes but not implemented.

## Setup

```bash
cd app-growth-desk
npm install --ignore-scripts   # Prisma's postinstall engine download can fail in sandboxed/offline environments
npx prisma generate
```

Copy `.env.example` to `.env` and fill in:

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `OWNER_EMAIL` | The single account's email |
| `OWNER_PASSWORD_HASH` | bcrypt hash of the owner's password — see gotcha below |
| `AUTH_SECRET` | JWT signing secret |
| `CREDENTIALS_ENCRYPTION_KEY` | Key used to AES-256-GCM-encrypt App Store Connect / Apple Ads credentials at rest |
| `AI_API_KEY` / `AI_BASE_URL` / `AI_MODEL` | OpenAI-compatible chat completions provider for the AI ASO Audit. Omit `AI_API_KEY` to fall back to a mocked audit response. |
| `RANKING_PROVIDER` | Which keyword-rank data source to use — see below |
| `REDIS_URL` | For future background job scheduling (not yet wired up in Phase 1) |

### Gotcha: bcrypt hashes in `.env` files

Next.js's env loader does dotenv-style `$VAR` expansion. A bcrypt hash like `$2b$10$abc...` will have `$2b`, `$10`, etc. silently expanded to empty strings, corrupting the hash and breaking login. Escape every `$` as `\$` when writing the hash into `.env`/`.env.local`, e.g.:

```
OWNER_PASSWORD_HASH=\$2b\$10\$abcdefghijklmnopqrstuv
```

Generate a hash with:

```bash
node -e "console.log(require('bcryptjs').hashSync('your-password', 10))"
```

### Database

```bash
npx prisma migrate dev --name init
npm run db:seed   # creates the owner user + one sample app/keyword
```

### Run

```bash
npm run dev
```

## Connecting App Store Connect

The Settings page (`/settings`) posts issuer ID, key ID, and the `.p8` private key to `POST /api/settings/app-store-connect`. Credentials are encrypted with AES-256-GCM (`src/server/crypto.ts`) before storage — wire the route's `TODO` to persist the encrypted blob via the `AppleAdsAccount`/equivalent Prisma model once App Store Connect API calls (push metadata updates, pull reviews) are implemented in Phase 2.

## Connecting Apple Ads

The `/apple-ads` page is currently a stub. Phase 3 work is to add an `AppleAdsAccount` credential flow (same encryption pattern as App Store Connect) and populate `AppleAdsCampaign`/`AppleAdsKeywordReport` via the Apple Ads API.

## Swapping the ranking data provider

Keyword rank lookups go through the `RankingProvider` interface in `src/server/ranking/provider.ts`:

```typescript
interface RankingProvider {
  lookupRank(params: RankLookupParams): Promise<RankLookupResult>;
}
```

Three implementations are stubbed: `AppleSearchRankingProvider`, `ThirdPartyAsoRankingProvider`, `InternalCrawlerRankingProvider`. Select one via `RANKING_PROVIDER` (e.g. `apple-search`, `third-party`, `internal-crawler`) and implement its `lookupRank` body. `getActiveRankingProvider()` reads the env var and returns the configured instance — call sites never need to know which provider is active. If no rank data is available yet for a keyword, the UI shows "not checked yet" rather than fabricating a number.

## Notes

- `prisma generate`'s engine download requires network access to Prisma's CDN; if that's blocked, install with `--ignore-scripts` and run `npx prisma generate` manually once network access is available.
- The Apple public lookup (`https://itunes.apple.com/lookup`) requires outbound network access to `itunes.apple.com`; some sandboxed environments block this host.

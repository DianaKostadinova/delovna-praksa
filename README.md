# Zegin Health Hub

A full-stack recreation of a Stitch-designed pharmacy/health platform mockup, built with a
React + TypeScript frontend and an ASP.NET Core Web API backend, for a school assignment to
redesign [zegin.com.mk](https://zegin.com.mk) (a real pharmacy chain in North Macedonia).

This is a **school project** — not affiliated with the real Zegin pharmacy, not real medical
advice, and it does not process real payments. All content (articles, products, team members,
blog posts) is original or fictional seed data written for this project — **no text, images,
or other content was copied from zegin.com.mk or any other site**; only the general page
layout/structure was used as a design reference, which the assignment called for.

## What's included

A client-facing site — most pages are backed by a real API call (not hard-coded UI); the one
deliberate exception is Meet the Team, which is static in-code data (see note below). There is
no internal admin/staff area; this app is scoped to what a pharmacy customer would use:

- **Home** — a health-content hub (trending article, health tips, spotlight interview, "Did You
  Know?" facts, health hub originals, newsletter signup, featured products) — every card,
  button, and link opens something real: articles open their own page, "Did You Know?" cycles
  through the health facts, "View Archive" and "Featured Products" link to the Blog/Pharmacy.
- **Blog** — recreates the layout of zegin.com.mk's real `/mk/blog` page (post grid, newsletter
  sidebar, recipes list, pagination) with 9 original blog posts and 4 recipe stubs, all written
  from scratch for this project. Every post links to its own article page.
- **Pharmacy** — a product catalog with search, category quick-filters, pagination, and an
  in-memory cart.
- **AI Checker** — a symptom-description form. Wired to a small **keyword-matching rules
  engine** on the backend (clearly labeled as a mock, not a real clinical AI) that returns a
  suggested urgency level, recommendations, and OTC products.
- **Meet the Team** — a directory of Zegin's fictional Skopje pharmacy branches: head-office
  support staff and branch pharmacists, each with a contact email/phone and role. Linked from
  the main nav and from a teaser card on the Home page.

  > This data lives in `client/src/data/team.ts` as a plain static array — **not** in the
  > database. It never changes at runtime, so there's nothing to gain from a DB round-trip, and
  > it sidesteps a real bug we hit: the API used `EnsureCreated()`, which only builds the schema
  > the *first* time a local `.db` file is created — it doesn't add new tables/columns to an
  > existing one. Anyone who'd run the API before this feature existed and then pulled latest
  > code without deleting their local `server/zeginhealthhub.db` would get a 500 on `/api/team`
  > (missing table). Moving static data out of the DB entirely removes that failure mode for
  > good, for this feature at least — the same risk still applies to any *other* new
  > DB-backed feature, so if that happens again, delete `server/zeginhealthhub.db` and restart.
- **English / Macedonian toggle** — an EN/МК switch in the top nav (persisted in
  `localStorage`) translates every static label plus the seeded demo content (articles,
  products, team members). The AI Checker's rules engine also matches Macedonian symptom
  keywords, so it works end-to-end in either language.
- **Cookie consent + first-party analytics** — a compact bottom-left card asks for consent on
  first visit. Only after accepting does the app track anonymous page views (a random per-browser
  id, the path, and the language — no accounts, no IP address, nothing shared with third
  parties); declining tracks nothing. There's no admin UI for this data (see note below), but you
  can inspect it directly at `GET /api/analytics/summary` while the API is running.

## Tech stack

- **Frontend:** React 19 + TypeScript, Vite, React Router, Tailwind CSS 4
- **Backend:** ASP.NET Core Web API (.NET 10), EF Core
- **Database:** SQLite by default (a single file, created and seeded automatically on first
  run — no database server to install), or PostgreSQL when a `DATABASE_URL` is supplied. The
  provider is chosen from the connection string at startup; the app code is identical either
  way.
- **Deployment:** Docker Compose for the full stack locally; Vercel (frontend) + Render (API)
  + Neon (Postgres) when deployed

## Prerequisites

Either install the toolchain:

- [.NET SDK 10](https://dotnet.microsoft.com/download) or later
- [Node.js](https://nodejs.org/) 20+ and npm

…or just [Docker](https://docs.docker.com/get-docker/), and skip straight to
[Running it with Docker](#running-it-with-docker).

## Running it locally

**1. Start the API** (from the `server` folder):

```bash
cd server
dotnet run
```

This starts the API at `http://localhost:5159`, creates `zeginhealthhub.db` next to the
project if it doesn't exist yet, and seeds it with demo data.

**2. Start the frontend** (from the `client` folder, in a second terminal):

```bash
cd client
npm install
npm run dev
```

This starts the Vite dev server at `http://localhost:5173` and proxies `/api/*` requests to the
backend, so open **http://localhost:5173** in your browser.

## Running it with Docker

`docker compose up --build`, then open **http://localhost:8080**. That brings up three
containers — Postgres, the API, and the built frontend behind nginx — and nothing else needs to
be installed, not even the .NET SDK or Node.

Unlike the `dotnet run` flow above, this one runs against **PostgreSQL rather than SQLite**, on
purpose: it's the same database the deployed app uses, so a query that works here works there.

Useful variations:

```bash
docker compose up --build -d          # in the background
docker compose logs -f api            # follow the API logs
docker compose --profile cron up -d cron   # also run the nightly cleanup job (see below)
docker compose down                   # stop everything (keeps the database volume)
docker compose down -v                # stop and delete the database too
```

Ports are configurable — copy `.env.example` to `.env` if `8080` or `5432` is already taken on
your machine:

| Variable | Default | What it is |
| --- | --- | --- |
| `WEB_PORT` | `8080` | The site |
| `API_PORT` | `5159` | The API directly, for `curl`/Swagger-style pokes |
| `POSTGRES_PORT` | `5432` | Postgres, for psql or a GUI client |
| `MAINTENANCE_TOKEN` | a dev placeholder | Shared secret for the maintenance endpoints |
| `ANALYTICS_RETENTION_DAYS` | `90` | How long page-view rows are kept |

The API is reachable from the browser at `/api/...` on the same origin, because nginx proxies
it — exactly like the Vite dev proxy does locally. Nothing in the frontend code changes between
the two.

## Configuration

Both apps read their environment rather than hard-coding hosts, which is what makes the same
build work locally, in Docker, and deployed.

**API** (environment variables, or `appsettings.json`):

| Variable | Default | Notes |
| --- | --- | --- |
| `DATABASE_URL` / `ConnectionStrings__Default` | SQLite file | A `postgres://…` URL switches the app to PostgreSQL automatically; anything else is treated as SQLite |
| `CORS_ALLOWED_ORIGINS` | localhost dev ports | Comma-separated. One leading wildcard label is allowed, e.g. `https://*.vercel.app`, so Vercel preview deploys keep working |
| `MAINTENANCE_TOKEN` | *(unset)* | Shared secret for `/api/maintenance/*`. **While unset those endpoints return 503** rather than being publicly callable |
| `Maintenance__RetentionDays` | `90` | Age at which page-view rows are deleted |
| `PORT` | `8080` in the container | Container hosts inject this; the app binds to it |

**Frontend** (`client/.env.local`, or the host's env screen — see `client/.env.example`):

| Variable | Default | Notes |
| --- | --- | --- |
| `VITE_API_BASE_URL` | empty | Leave empty whenever the API is same-origin (dev proxy, Docker). Set it to the API's origin when the frontend is hosted separately. Vite inlines it **at build time**, so changing it needs a rebuild, not just a restart |

## Deploying

Three pieces, three hosts, all on free tiers: the frontend is static files (Vercel), the API
is a long-running container (Render), and the database is managed Postgres (Neon).

### 1. The database (Neon)

Any Postgres works, but [Neon](https://neon.tech)'s free tier is the pragmatic choice here:
unlike Render's free Postgres it **doesn't expire after 30 days**, and it needs no card.

1. Create a project, pick a region near the API (e.g. Frankfurt if the API is in `frankfurt`).
2. Copy the connection string — take the **pooled** one, the host ending in `-pooler`. It looks
   like `postgresql://neondb_owner:...@ep-xxx-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require`.
3. That's it — no schema step. The API creates and seeds the tables on first boot.

Nothing in the app needs configuring for Neon specifically: the URL is parsed into an Npgsql
connection string at startup, `sslmode=require` and escaped passwords included. The pooled
endpoint is PgBouncer in transaction mode, which would break server-side prepared statements —
Npgsql leaves those off by default (`MaxAutoPrepare=0`), so it works as-is.

> Free Neon compute **suspends after ~5 minutes idle** and wakes on the next query, so the
> first request after a quiet spell pays a short cold start. The API already retries transient
> connection failures (`EnableRetryOnFailure`), so this shows up as latency, not an error.
> Quotas change — check Neon's current free-plan limits rather than trusting this paragraph.

If you'd rather keep everything on one provider, Render's managed Postgres works too: create it
with **New > PostgreSQL**, copy the **Internal Database URL**, and use that as `DATABASE_URL`
below. Just note the 30-day expiry on the free plan (`basic-256mb` and up don't expire).

### 2. The API on Render

The repo has a `render.yaml` blueprint: in Render, **New > Blueprint**, pick this repo, apply.
It creates the `zegin-api` web service and prompts for the secrets it won't store in git.

Doing it by hand instead — **New > Web Service**, connect the repo, then set:

- Runtime **Docker**, Dockerfile path `./server/Dockerfile`, Docker context `./server`
- Health check path `/health`
- Environment variables:
  - `DATABASE_URL` — the Neon pooled URL from step 1
  - `MAINTENANCE_TOKEN` — generate one with `openssl rand -hex 32` and keep it

Deploy, then check `https://<your-api>.onrender.com/health`. It should report
`"database":"PostgreSQL"` — if it says `"SQLite"`, `DATABASE_URL` didn't reach the container.

`CORS_ALLOWED_ORIGINS` is left blank for now; you need the Vercel URL first.

> A free Render web service **sleeps after 15 minutes idle** and takes 30–60s to wake. The
> keep-alive job below covers that.

### 3. The frontend on Vercel

1. **Add New > Project**, import the repo.
2. Set **Root Directory** to `client`. Vercel then detects Vite and reads `client/vercel.json`
   (which handles the SPA rewrite — without it a refresh on `/blog` would 404).
3. Add an environment variable `VITE_API_BASE_URL` = `https://<your-api>.onrender.com`
   (no trailing slash), for Production **and** Preview.
4. Deploy.

### 4. Point them at each other

Back in Render, set the API's `CORS_ALLOWED_ORIGINS` to your Vercel domains and redeploy:

```
https://<your-project>.vercel.app,https://*.vercel.app
```

The second entry covers Vercel's per-commit preview URLs. Without this step every API call from
the deployed site fails as a CORS error, while the API itself looks perfectly healthy — that
symptom almost always means this variable.

### 5. The scheduled job

Page-view rows are the one table that grows forever, so a nightly job trims anything past the
retention window: `POST /api/maintenance/cleanup` with an `X-Maintenance-Token` header. There's
also `POST /api/maintenance/ping`, a no-op used to keep a sleeping free instance warm.

Render Cron Jobs have **no free plan** (minimum $1 per job per month), so `render.yaml`
deliberately leaves the schedule out. Two free ways to run it instead:

**[cron-job.org](https://cron-job.org)** — no repo changes at all. Create two jobs, both
**POST**, both with an `X-Maintenance-Token` header:

| URL | Schedule |
| --- | --- |
| `https://<your-api>.onrender.com/api/maintenance/ping` | every 14 minutes |
| `https://<your-api>.onrender.com/api/maintenance/cleanup` | daily, 03:00 |

Fourteen minutes because a free Render service sleeps after fifteen. Note that this stores the
maintenance token on a third-party service — acceptable here, where the worst case is deleting
analytics rows that were due for deletion anyway.

**`.github/workflows/scheduled-maintenance.yml`** — already in the repo, runs the same cleanup
nightly plus the keep-alive ping during the day. Add two repository secrets under
**Settings > Secrets and variables > Actions**:

- `API_BASE_URL` — `https://<your-api>.onrender.com`
- `MAINTENANCE_TOKEN` — the same value the API has

If you use cron-job.org instead, **disable this workflow** (Actions tab > *Scheduled
maintenance* > ⋯ > Disable workflow) — otherwise it runs on schedule without its secrets and
emails you a failure every night.

You can run it by hand from the Actions tab to check it works. To test the endpoint directly:

```bash
curl -X POST https://<your-api>.onrender.com/api/maintenance/cleanup -H "X-Maintenance-Token: <token>"
```

## Project structure

```
server/                 ASP.NET Core Web API
  Models/                domain models (Article, Product, PageViewEvent, ...)
  Data/                  EF Core DbContext + seed data
  Services/              SymptomCheckerService (mock rules engine)
  Controllers/           API endpoints (/api/articles incl. /api/articles/{id},
                         /api/products, /api/symptomcheck, /api/analytics/*)

  Dockerfile             container image for the API

client/                 React + TypeScript app (Vite)
  src/api/               typed fetch client
  src/components/        shared layout (nav + footer), icon set, cookie consent card
  src/data/               static in-code data (team.ts) — not DB-backed, see note above
  src/i18n/               EN/MK translation dictionaries + content overlays
  src/analytics.ts        consent-gated page-view tracking helper
  src/pages/              Home, Blog, ArticleDetail, Pharmacy, KBeauty, Cart, AiChecker, Team
  Dockerfile              build + nginx image for the frontend
  nginx.conf              SPA fallback + /api proxy
  vercel.json             Vercel build settings + SPA rewrite

docker-compose.yml      the whole stack: Postgres + API + frontend (+ optional cron)
render.yaml             Render blueprint for the API web service
.github/workflows/      scheduled cleanup + keep-alive (free cron alternative)
.env.example            compose overrides (ports, maintenance token, retention)
```

## Notes for building on this

- To reset the database, stop the API and delete `server/zeginhealthhub.db` — it will be
  recreated and reseeded on the next `dotnet run`. Under Docker the equivalent is
  `docker compose down -v`.
- Schema creation still uses `EnsureCreated()`, which builds the schema once and never alters
  it afterwards. That's fine while the model is append-only seed data, but adding a column to
  an existing table will need EF Core migrations rather than a redeploy — on a deployed
  Postgres instance you can't just delete the file.
- CORS is pre-configured on the API for the usual local ports (`5173` dev, `4173` preview,
  `8080` the Docker frontend) in case you run the frontend without the Vite proxy. Deployed
  origins are added through `CORS_ALLOWED_ORIGINS` — see [Configuration](#configuration).
- The AI Checker's backend logic lives in `server/Services/SymptomCheckerService.cs` — it's a
  small keyword-to-recommendation table, easy to extend with more conditions.
- There is deliberately no admin/staff area (an earlier "Pharmacist Dashboard" with a patient
  lookup and prescription verification was removed) — this project is scoped to the
  client-facing pharmacy site only. Every article/blog card opens a real page at
  `/articles/:id`, backed by `GET /api/articles/{id}`.

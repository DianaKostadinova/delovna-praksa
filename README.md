# Zegin Health Hub

A full-stack recreation of a Stitch-designed pharmacy/health platform mockup, built with a
React + TypeScript frontend and an ASP.NET Core Web API backend, for a school assignment to
redesign [zegin.com.mk](https://zegin.com.mk) (a real pharmacy chain in North Macedonia).

This is a **school project** — not affiliated with the real Zegin pharmacy, not real medical
advice, and it does not process real patient data or payments. All content (articles, products,
team members, patients, prescriptions, blog posts) is original or fictional seed data written
for this project — **no text, images, or other content was copied from zegin.com.mk or any
other site**; only the general page layout/structure was used as a design reference, which the
assignment called for.

## What's included

Six screens. Most are backed by a real API call (not hard-coded UI) — the one deliberate
exception is Meet the Team, which is static in-code data (see note below):

- **Home** — a health-content hub (trending article, health tips, spotlight interview, "Did You
  Know?" facts, health hub originals, newsletter signup, featured products).
- **Pharmacy** — a product catalog with search, category quick-filters, pagination, and an
  in-memory cart.
- **AI Checker** — a symptom-description form. Wired to a small **keyword-matching rules
  engine** on the backend (clearly labeled as a mock, not a real clinical AI) that returns a
  suggested urgency level, recommendations, and OTC products.
- **Dashboard (Pharmacist Portal)** — an internal-admin-style view: prescription "verification"
  against seeded RX records, and a patient lookup.
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
- **Blog** — recreates the layout of zegin.com.mk's real `/mk/blog` page (post grid, newsletter
  sidebar, recipes list, pagination) with 9 original blog posts and 4 recipe stubs, all written
  from scratch for this project.
- **English / Macedonian toggle** — an EN/МК switch in the top nav (persisted in
  `localStorage`) translates every static label plus the seeded demo content (articles,
  products, patients, prescriptions). The AI Checker's rules engine also matches Macedonian
  symptom keywords, so it works end-to-end in either language.

  > The original design's "Patient SSN Lookup" field is implemented here as a lookup by a
  > fictitious **Patient ID** (e.g. `992-BA-01`) against seeded demo patients — never a real
  > Social Security Number. Looking patients up by SSN is a pattern real systems should avoid;
  > this app follows the design's layout while swapping in a safer identifier.

- **Cookie consent + first-party analytics** — a compact bottom-left card asks for consent on
  first visit. Only after accepting does the app track anonymous page views (a random per-browser
  id, the path, and the language — no accounts, no IP address, nothing shared with third
  parties); declining tracks nothing. The Pharmacist Dashboard has a **Site Analytics** panel
  showing the live totals and a per-page breakdown, so the tracking is actually visible, not
  just theoretical.

## Tech stack

- **Frontend:** React 19 + TypeScript, Vite, React Router, Tailwind CSS 4
- **Backend:** ASP.NET Core Web API (.NET 10), EF Core
- **Database:** SQLite (a single file, created and seeded automatically on first run — no
  database server to install)

## Prerequisites

- [.NET SDK 10](https://dotnet.microsoft.com/download) or later
- [Node.js](https://nodejs.org/) 20+ and npm

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

## Project structure

```
server/                 ASP.NET Core Web API
  Models/                domain models (Article, Product, Patient, Prescription, ...)
  Data/                  EF Core DbContext + seed data
  Services/              SymptomCheckerService (mock rules engine)
  Controllers/           API endpoints (/api/articles, /api/products, /api/symptomcheck,
                         /api/dashboard/*, /api/analytics/*)

client/                 React + TypeScript app (Vite)
  src/api/               typed fetch client
  src/components/        shared layout (nav + footer), icon set, cookie consent card
  src/data/               static in-code data (team.ts) — not DB-backed, see note above
  src/i18n/               EN/MK translation dictionaries + content overlays
  src/analytics.ts        consent-gated page-view tracking helper
  src/pages/              Home, Pharmacy, AiChecker, Dashboard, Team
```

## Notes for building on this

- To reset the database, stop the API and delete `server/zeginhealthhub.db` — it will be
  recreated and reseeded on the next `dotnet run`.
- CORS is pre-configured on the API for `http://localhost:5173` in case you run the frontend
  without the Vite proxy.
- The AI Checker's backend logic lives in `server/Services/SymptomCheckerService.cs` — it's a
  small keyword-to-recommendation table, easy to extend with more conditions.

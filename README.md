# Zegin Health Hub

A full-stack recreation of a Stitch-designed pharmacy/health platform mockup, built with a
React + TypeScript frontend and an ASP.NET Core Web API backend.

This is a **demo/portfolio project** — not a real pharmacy, not real medical advice, and it
does not process real patient data or payments. All content (articles, products, patients,
prescriptions) is fictional seed data.

## What's included

Four screens, each backed by a real API call (not hard-coded UI):

- **Home** — a health-content hub (trending article, health tips, spotlight interview, "Did You
  Know?" facts, health hub originals, newsletter signup, featured products).
- **Pharmacy** — a product catalog with search, category quick-filters, pagination, and an
  in-memory cart.
- **AI Checker** — a symptom-description form. Wired to a small **keyword-matching rules
  engine** on the backend (clearly labeled as a mock, not a real clinical AI) that returns a
  suggested urgency level, recommendations, and OTC products.
- **Dashboard (Pharmacist Portal)** — an internal-admin-style view: prescription "verification"
  against seeded RX records, and a patient lookup.

  > The original design's "Patient SSN Lookup" field is implemented here as a lookup by a
  > fictitious **Patient ID** (e.g. `992-BA-01`) against seeded demo patients — never a real
  > Social Security Number. Looking patients up by SSN is a pattern real systems should avoid;
  > this app follows the design's layout while swapping in a safer identifier.

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
  Controllers/           API endpoints (/api/articles, /api/products, /api/symptomcheck, /api/dashboard/*)

client/                 React + TypeScript app (Vite)
  src/api/               typed fetch client
  src/components/        shared layout (nav + footer)
  src/pages/              Home, Pharmacy, AiChecker, Dashboard
```

## Notes for building on this

- To reset the database, stop the API and delete `server/zeginhealthhub.db` — it will be
  recreated and reseeded on the next `dotnet run`.
- CORS is pre-configured on the API for `http://localhost:5173` in case you run the frontend
  without the Vite proxy.
- The AI Checker's backend logic lives in `server/Services/SymptomCheckerService.cs` — it's a
  small keyword-to-recommendation table, easy to extend with more conditions.

# Anusha Jewellers — Shop System

Staff system for **order taking**, **billing**, **pawning**, **lockers** and **barcode labels**.
Built with Next.js 16, MongoDB Atlas and Tailwind CSS; deploys to Vercel.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000 and sign in with `ADMIN_USERNAME` / `ADMIN_PASSWORD` from `.env.local`.

## Environment variables

See `.env.example`. `.env.local` holds the real values and is never committed.

| Variable | Purpose |
|---|---|
| `MONGODB_URI` | Atlas connection string (no `< >` around user/password) |
| `MONGODB_DB` | Database name, default `anusha_jewellers` |
| `ADMIN_USERNAME`, `ADMIN_PASSWORD` | Staff login |
| `SESSION_SECRET` | 32+ random characters used to sign logins |
| `MONGODB_DNS_SERVERS` | Local Windows only — leave unset on Vercel |

## Deploy to Vercel

1. Push this folder to a GitHub repository and import it in Vercel.
2. In **Project → Settings → Environment Variables** add the variables above (not `MONGODB_DNS_SERVERS`).
3. In MongoDB Atlas → **Network Access**, allow `0.0.0.0/0` (Vercel has no fixed IP).

## How it works

- **Orders**: delivery highlight — yellow ≤ 7 days, orange ≤ 3 days, red today/overdue; no highlight once completed.
  Completing an order records final weight, carats and price. Payments can be made in parts (advance, installments, final).
- **Lockers**: named places (safes, trays, display units) that admins add on the Lockers page, each holding any number
  of items. Every stock item, order and pawn records its locker and a position inside it ("Tray 2, slot 5"); the Lockers
  page finds any piece by its barcode. Putting a completed order in a locker generates its barcode (`OR000001`).
- **Pawning**: ticket number = barcode (`PW000001`). Interest = principal × monthly rate × days ÷ 30 since interest was last paid.
- **Labels** print at 34 × 25 mm (shop name, barcode, code, locker and weight in grams). Bills print on A4 as a customer copy and a shop copy; pawn tickets print at 80 mm width.
- **Barcode scanners**: any USB scanner that types like a keyboard works in the Quick Finder / Billing search boxes.

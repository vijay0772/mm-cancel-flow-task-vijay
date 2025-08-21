# mm-cancel-flow-task-vijay

## What I built
I implemented a complete subscription cancellation flow for Migrate Mate. It’s pixel‑perfect on desktop and mobile, includes deterministic A/B testing, and persists everything securely to Supabase.

### Highlights
- Progressive, branched journey (found‑job vs still‑looking) with the exact spacing/visuals
- Deterministic A/B downsell (50/50) assigned server‑side and reused on return
- Server endpoints that mark a subscription `pending_cancellation` and persist the latest cancellation `reason` + `accepted_downsell`
- Secure server‑only Supabase calls (service role) + basic CSRF Origin check + UUID validation
- Redux Toolkit for state; cookie persistence + SSR hydration to avoid hydration mismatches
- I deliberately use plain `<img>` to match the provided designs exactly
- Tiny toast system to show one‑line success/error messages (top‑right)

## Tech I used
- Next.js (App Router), React, TypeScript
- Tailwind CSS
- Redux Toolkit
- Supabase (Postgres) with RLS

## How the project is organized
- `src/app/`
  - `found-job/` – Step 1 → Step 2 → branches (mm‑yes/mm‑no) → final screens
  - `still-looking/` – Offer → usage → reason → detail pages → final screen
  - `api/cancellations/start` – assigns A/B, creates `cancellations` row, sets `pending_cancellation`
  - `api/cancellations/reason` – finalizes (reason + accepted_downsell)
- `src/store/` – Redux slices + cookie persistence middleware
- `src/lib/supabase.ts` – Supabase anon client + service‑role client (server only)
- `src/lib/cancelApi.ts` – Client helpers that call my API routes and show toasts
- `src/lib/toast.tsx` – Minimal toast container + `showToast()`

## My A/B approach
- On first entry, the server assigns `A` or `B` (secure RNG) and stores it in `cancellations.downsell_variant`.
- I reuse the same variant on subsequent visits and set an httpOnly cookie (`downsell_variant`).
- For B, I only change the numbers in the offer (e.g., $25→$15, $29→$19); I don’t touch layout.

## Security in this app
- All DB writes run server‑side with `SUPABASE_SERVICE_ROLE_KEY`.
- I check the request `Origin` against `NEXT_PUBLIC_APP_ORIGIN`.
- I validate UUIDs/booleans in payloads.
- RLS is enabled for `users`, `subscriptions`, `cancellations` in `seed.sql`.
- `downsell_variant` is httpOnly (SameSite=Lax).

## Cookies & state
- Client cookies for continuity: `hasFoundJob`, `cancelStep1`, `cancelStep2`, `cancelStep3`.
- I hydrate Redux on the server from cookies to avoid hydration mismatches.
- The A/B variant is returned from `/api/cancellations/start` and also stored as an httpOnly cookie.

## Environment variables (.env.local)
Create a `.env.local` file in the project root:

```
# Origin allow‑list for CSRF
NEXT_PUBLIC_APP_ORIGIN=http://localhost:3000

# Supabase project (the one you seed with seed.sql)
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>

# Demo wiring for UI → API (these IDs must exist in your DB)
NEXT_PUBLIC_DEMO_USER_ID=<uuid-from-users-table>
NEXT_PUBLIC_DEMO_SUBSCRIPTION_ID=<uuid-from-subscriptions-table-for-that-user>
```

`.env.local` is ignored by git.

## Database setup
Run the SQL in `seed.sql` on your Supabase project. It:
- Creates `users`, `subscriptions`, `cancellations`
- Enables RLS policies
- Seeds a few users and active subscriptions ($25 and $29 plans)

My API routes and UI helpers assume the two `NEXT_PUBLIC_DEMO_*` IDs point to real rows in this project.

## How to run it locally
1) Install dependencies
```
npm install
```

2) Create `.env.local` (see above) and make sure your Supabase project has the `seed.sql` schema/data

3) Start dev server
```
npm run dev
```
- Go to `http://localhost:3000`
- Open the modal on the profile page to enter the flow
- Entry pages POST `/api/cancellations/start` automatically
- Final screens POST `/api/cancellations/reason`
- You’ll see a green toast on success and a red toast on failure

4) (Optional) Curl tests
- Start:
```
curl -i -X POST http://localhost:3000/api/cancellations/start \
  -H 'Origin: http://localhost:3000' \
  -H 'Content-Type: application/json' \
  -d '{"user_id":"<real-user-uuid>","subscription_id":"<real-subscription-uuid>"}'
```
- Finalize:
```
curl -i -X POST http://localhost:3000/api/cancellations/reason \
  -H 'Origin: http://localhost:3000' \
  -H 'Content-Type: application/json' \
  -d '{"user_id":"<real-user-uuid>","subscription_id":"<real-subscription-uuid>","reason":"Too expensive","accepted_downsell":false}'
```

## Build
```
npm run build
```
I intentionally use `<img>` to keep the visuals exactly like the designs, so Next may warn about using `next/image`—that’s expected.

## What I delivered (high‑level)
- UI: all screens for both branches, with mobile/desktop parity, back/progress/close behavior as specified
- State: Redux slices + cookie middleware, SSR hydration to avoid mismatches
- Backend:
  - `/api/cancellations/start` → origin + payload validation → assign A/B → insert `cancellations` → set `pending_cancellation` → set httpOnly cookie
  - `/api/cancellations/reason` → origin + payload validation → update latest `cancellations` row with reason + acceptance
- Security: origin allow‑list, UUID checks, RLS, httpOnly cookie for A/B
- QA: one‑line toasts on success/failure (no layout changes)

## Notes from me
- To test different IDs without touching code, just change `NEXT_PUBLIC_DEMO_USER_ID` and `NEXT_PUBLIC_DEMO_SUBSCRIPTION_ID` and restart `npm run dev`.
- In production, keep your service role key server‑only and set a strict `NEXT_PUBLIC_APP_ORIGIN`.

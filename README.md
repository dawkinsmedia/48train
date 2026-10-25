# Saturday Morning Workout — Conway, SC

Mobile-first landing page for Ethan Ford's free men's Saturday workout at Heritage Preserve (Conway, South Carolina).

## Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Recommended for production | Canonical URL for share links and metadata (no trailing slash). |
| `LEAD_NOTIFICATION_EMAIL` | Optional | Inbox for new interest forms (default `thefords526@gmail.com`). |
| `RESEND_API_KEY` | **Required for email** | [Resend](https://resend.com) API key; sends each submission to Ethan. |
| `RESEND_FROM_EMAIL` | **Required for email** | Verified sender in Resend, e.g. `Saturday Workout <hello@yourdomain.com>`. |
| `GHL_WEBHOOK_URL` | Optional | GoHighLevel (or compatible) inbound webhook URL. |
| `GHL_WEBHOOK_BEARER_TOKEN` | Optional | Bearer token sent to the webhook if your workflow requires it. |
| `INTEREST_RATE_LIMIT_MAX` | Optional | Max form submissions per IP per window (default `5`). |
| `INTEREST_RATE_LIMIT_WINDOW_MS` | Optional | Rate limit window in ms (default `900000` = 15 min). |

Leads are appended to `data/leads.jsonl` on the server filesystem when writable. **Serverless hosts (e.g. Vercel) do not persist local files** — configure `GHL_WEBHOOK_URL` for durable lead capture in production, or deploy to a Node host with persistent disk.

## Email notifications

Each successful interest form submission triggers an email to **Ethan** (`LEAD_NOTIFICATION_EMAIL`, default `thefords526@gmail.com`) via Resend. The visitor’s email is set as `reply_to` so Ethan can respond directly.

1. Create a Resend account and add/verify your sending domain (or use Resend’s test domain while developing).
2. Create an API key and set `RESEND_API_KEY` in your host’s environment.
3. Set `RESEND_FROM_EMAIL` to a verified From address.

Leads are still saved to `data/leads.jsonl` when the server has a writable disk. The API returns `emailNotified: true` when Resend accepts the message.

## GoHighLevel integration

1. Create an inbound webhook workflow in GHL.
2. Set `GHL_WEBHOOK_URL` to that URL.
3. Optionally set `GHL_WEBHOOK_BEARER_TOKEN`.
4. Adjust field mapping in `src/lib/integrations/ghl.ts` if your workflow expects different keys.

The API response includes `ghlSynced: true` when the webhook succeeds. The success message shown to users does not claim an SMS or email was sent.

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — run production build locally

## Deployment checklist

- [ ] Set `NEXT_PUBLIC_SITE_URL` to the live domain
- [ ] Set `RESEND_API_KEY` and `RESEND_FROM_EMAIL` so Ethan receives form emails
- [ ] Set `GHL_WEBHOOK_URL` (optional; useful on serverless for CRM backup)
- [ ] Confirm Google Maps search link opens the correct area for Heritage Preserve pool parking
- [ ] Test interest form end-to-end on mobile
- [ ] Share a link and verify Open Graph preview (`/opengraph-image`)

## Photos

Workout photography lives in `public/images/` and is used in the hero, gallery, and social preview.

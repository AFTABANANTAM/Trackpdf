# TrackPDF
Share PDFs. Know who accessed them.

## Setup
1. `npm install`
2. `cp .env.example .env` and fill it in (Google OAuth redirect URI: `{APP_URL}/api/auth/callback/google`; R2 bucket + API token)
3. `npx prisma migrate dev --name init`
4. `npm run dev`

Viewer identity comes only from our own "Continue with Google" flow. Nothing is inferred from IP, fingerprints or other cookies.

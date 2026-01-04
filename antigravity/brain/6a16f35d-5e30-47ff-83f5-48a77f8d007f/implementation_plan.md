# Secure Admin Page

Secure the `/admin` route so that only users with a valid ID and Password can access it.

## User Review Required
> [!IMPORTANT]
> You will need to manage your **Admin ID** and **Password** in Vercel's Environment Variables.

## Proposed Changes

### Root Directory
#### [NEW] [middleware.js](file:///C:/Users/kouki/.gemini/hifuu-kou-club/middleware.js)
- Create a middleware file to intercept requests to `/admin`.
- If a user is not logged in (no session token), redirect them to the login page.
- This ensures "random people" cannot even see the admin dashboard.

## Verification Plan

### Manual Verification
1. Open an Incognito window (or sign out).
2. Access `/admin`.
3. Verify you are redirected to the Login page.
4. Enter credentials (defined in Vercel or default `renko`/`merry`).
5. Verify access is granted.

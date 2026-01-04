# UI and Navigation Refinement Plan

## Goal Description
Update the website's UI text to be more concise and consistently English, and fix layout issues with the logo in the navigation bar.

## Proposed Changes

### UI Text Updates
#### [MODIFY] [Navigation.js](file:///c:/Users/kouki/.gemini/hifuu-kou-club/components/Navigation.js)
- Update menu items to English:
    - "ホーム" -> "HOME"
    - "ニュース" -> "NEWS"
    - "作品" -> "CONTENT" (or "WORKS" - user asked for CONTENT in context of section title, will stick to CONTENT for consistency or clarify)
    - "キャラクター" -> "CHARACTERS"
    - "日記" -> "DIARY"
- Ensure specific styling for the Logo text "秘封工倶楽部" to prevent wrapping.

#### [MODIFY] [page.js](file:///c:/Users/kouki/.gemini/hifuu-kou-club/app/page.js)
- Change section header "MUSIC VIDEO / CONTENT" to "CONTENT".

### Layout Fixes
#### [MODIFY] [globals.css](file:///c:/Users/kouki/.gemini/hifuu-kou-club/app/globals.css)
- Add utility class or modify existing styles to ensure the logo text `whitespace-nowrap` if not already handled in Tailwind classes within the component.

## Verification Plan
### Manual Verification
- Check the Navigation bar to ensure all links are in English.
- Resize the browser window to verify the logo text does not wrap or break layout.
- Verify the main page section title reads "CONTENT".

## Supabase Migration Plan

### Goal Description
Migrate local JSON data persistence to Supabase to enable production deployment on Vercel (which is read-only for filesystem).

### User Review Required
> [!IMPORTANT]
> **Credentials Needed**: verification of this plan usually requires Supabase credentials.
> Please provide:
> 1. **Project URL**
> 2. **API Key (anon/public)**
> 3. **Service Role Key** (for reliable admin writes, or we can use Row Level Security with just Anon key if preferred, but Service Role is easier for Admin API routes).

### Proposed Changes
#### [NEW] [.env](file:///c:/Users/kouki/.gemini/hifuu-kou-club/.env)
- Add `NEXT_PUBLIC_SUPABASE_URL`
- Add `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Add `SUPABASE_SERVICE_ROLE_KEY`

#### [NEW] [lib/supabase.js](file:///c:/Users/kouki/.gemini/hifuu-kou-club/lib/supabase.js)
- Create Supabase client initialization.

#### [MODIFY] API Routes
Refactor the following routes to read/write from Supabase tables (`news`, `diary`, `videos`, `characters`) instead of `data/*.json`:
- `app/api/news/route.js`
- `app/api/diary/route.js`
- `app/api/videos/route.js`
- `app/api/characters/route.js`
- `app/api/upload/route.js` (Use Supabase Storage)

### Verification Plan
- Manually test each section (News, Diary, etc.) to ensure data loads from Supabase.
- Test Admin upload functionality.

# Character Image Upload Fix Implementation Plan

## Goal Description
Fix the issue where character standing pictures (t立ち絵) cannot be uploaded in the admin panel's character management section.

## User Review Required
None identified yet.

## Proposed Changes
## Proposed Changes
### Admin Panel
- `app/admin/page.js`:
    - [ ] **Fix Bug**: Change `c.image` to `c.image_url` in the character list mapping.
    - [ ] **Fix Bug**: Change `char.image` to `char.image_url` in `handleEditChar`.

### API Routes
- `app/api/upload/route.js`:
    - [ ] **Fix Upload Logic**: Import and use `supabaseAdmin` instead of `supabase` to bypass RLS, ensuring uploads work for authenticated admins.
    - [ ] Add fallback: If `supabaseAdmin` is null (missing env var), log error or try standard `supabase` (though likely to fail if RLS is strict).
- `app/api/characters/route.js`:
    - [ ] No changes needed if data structure remains `image_url`.

## Verification Plan
### Manual Verification
- Attempt to upload an image for a new and existing character via the admin panel.
- Verify the image appears in the list and on the public site (if applicable).

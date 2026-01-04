ëimport { withAuth } from "next-auth/middleware"

export default withAuth({
    callbacks: {
        authorized: ({ token }) => !!token,
    },
})

// Match nothing so /admin is NOT protected by default
// We handle protection inside the page component (UI hiding) and API (logic check)
export const config = { matcher: ["/admin/private-dummy-route"] }
ë"(788653eedf86c4069476e1aa8301ce02c35f75382;file:///C:/Users/kouki/.gemini/hifuu-kou-club/middleware.js:file:///C:/Users/kouki/.gemini
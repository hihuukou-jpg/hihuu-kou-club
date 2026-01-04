ëimport { withAuth } from "next-auth/middleware"

export default withAuth({
    callbacks: {
        authorized: ({ token }) => !!token,
    },
})

// Match nothing so /admin is NOT protected by default
// We handle protection inside the page component (UI hiding) and API (logic check)
export const config = { matcher: ["/admin/private-dummy-route"] }
› ›¨*cascade08
¨Ó ÓÖ*cascade08
ÖØ Øå*cascade08
åë "(2c72ffd3aeae82c266dcae70e69d8b449a82651e2;file:///C:/Users/kouki/.gemini/hifuu-kou-club/middleware.js:file:///C:/Users/kouki/.gemini
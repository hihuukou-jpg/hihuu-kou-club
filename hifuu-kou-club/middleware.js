import { withAuth } from "next-auth/middleware"

export default withAuth({
    callbacks: {
        authorized: ({ token }) => !!token,
    },
})

// Match nothing so /admin is NOT protected by default
// We handle protection inside the page component (UI hiding) and API (logic check)
export const config = { matcher: ["/admin/private-dummy-route"] }

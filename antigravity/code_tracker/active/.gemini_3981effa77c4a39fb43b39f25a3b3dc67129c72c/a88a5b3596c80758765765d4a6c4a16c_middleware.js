Ñimport { withAuth } from "next-auth/middleware"

export default withAuth({
    callbacks: {
        authorized: ({ token }) => !!token,
    },
})

export const config = { matcher: ["/admin/:path*"] }
*cascade08	 	*cascade08 *cascade08/ /—*cascade08
—Í ÍÎ*cascade08
ÎÑ "(3981effa77c4a39fb43b39f25a3b3dc67129c72c2;file:///C:/Users/kouki/.gemini/hifuu-kou-club/middleware.js:file:///C:/Users/kouki/.gemini
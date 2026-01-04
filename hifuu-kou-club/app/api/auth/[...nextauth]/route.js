import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Admin Login",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "admin" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                // Simple environment variable check (Fallback for demo)
                const user = process.env.ADMIN_USER || "renko";
                const pass = process.env.ADMIN_PASS || "merry";

                if (credentials.username === user && credentials.password === pass) {
                    return { id: "1", name: "Hifuu Admin", email: "admin@hifuu.club" };
                }
                return null;
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

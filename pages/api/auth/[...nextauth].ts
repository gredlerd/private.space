import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { loginUser } from "../loginUser";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      credentials: {
        identifier: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const user = await loginUser({
            identifier: credentials?.identifier ?? "",
            password: credentials?.password ?? "",
          });

          if (user) {
            return Promise.resolve(user);
          } else {
            return Promise.resolve(null);
          }
        } catch (error) {
          console.error("Fehler bei der Autorisierung:", error);
          throw new Error(
            "Anmeldung fehlgeschlagen. Bitte versuchen Sie es erneut."
          );
        }
      },
    }),
  ],
  session: {
    maxAge: 36 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  jwt: {
    maxAge: 365 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log("JWT Token:", token); // Loggen Sie den JWT-Token vor der Verarbeitung

      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      console.log("Session:", session); // Loggen Sie die Sitzungsinformationen vor der Verarbeitung

      if (token) {
        // @ts-ignore
        session.user.id = token.id;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);

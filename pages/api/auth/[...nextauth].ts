import NextAuth, { DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import { loginUser } from "../loginUser";

// Erweitern Sie die Session-Typen
declare module "next-auth" {
  interface Session extends DefaultSession {
    jwt: string;
    user: {
      id: number;
      username: string;
      email: string;
      firstname: string;
      lastname: string;
      isAdmin: boolean;
      birthdate: string;
    } & DefaultSession["user"];
  }

  interface User {
    jwt: string;
    id: number;
    username: string;
    email: string;
    firstname: string;
    lastname: string;
    isAdmin: boolean;
    birthdate: string;
  }
}

// Erweitern Sie den JWT-Typ
declare module "next-auth/jwt" {
  interface JWT {
    jwt: string;
    id: number;
    username: string;
    email: string;
    firstname: string;
    lastname: string;
    isAdmin: boolean;
    birthdate: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identifier: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.identifier || !credentials?.password) {
          return null;
        }
        try {
          const user = await loginUser({
            identifier: credentials.identifier,
            password: credentials.password,
          });

          if (user && user.user) {
            return {
              ...user.user,
              jwt: user.jwt,
            };
          } else {
            return null;
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
    strategy: "jwt",
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
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.jwt = user.jwt;
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
        token.firstname = user.firstname;
        token.lastname = user.lastname;
        token.isAdmin = user.isAdmin;
        token.birthdate = user.birthdate;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      session.jwt = token.jwt;
      session.user = {
        id: token.id,
        username: token.username,
        email: token.email,
        firstname: token.firstname,
        lastname: token.lastname,
        isAdmin: token.isAdmin,
        birthdate: token.birthdate,
      };
      return session;
    },
  },
};

export default NextAuth(authOptions);

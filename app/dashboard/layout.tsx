"use client";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import AuthGuard from "../components/auth/AuthGuard";
import { Pagefooter } from "../components/Pagefooter";
import { Pageheader } from "../components/Pageheader";
import ClientProvider from "../components/react-query/ClientProvider";
import "../globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>
          <AuthGuard>
            <ClientProvider>
              <Pageheader />
              {children}
              <Pagefooter />
            </ClientProvider>
          </AuthGuard>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}

function SessionProviderWrapper({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}

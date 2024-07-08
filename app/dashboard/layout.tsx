"use client";
import { SessionProvider } from "next-auth/react";
import "../globals.css";
import { ReactNode } from "react";
import { Pageheader } from "../components/Pageheader";
import { Pagefooter } from "../components/Pagefooter";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProviderWrapper>
          <Pageheader />
          {children}
          <Pagefooter />
        </SessionProviderWrapper>
      </body>
    </html>
  );
}

function SessionProviderWrapper({ children }: { children: ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}

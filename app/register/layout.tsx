import type { Metadata } from "next";
import { Pageheader } from "../components/Pageheader";
import "../globals.css";
import ClientProvider from "../components/react-query/ClientProvider";

export const metadata: Metadata = {
  title: "Registrieren",
  description: "Registrierung für die Anwendung",
};

export default function RegisterLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <ClientProvider>
        <body>
          <Pageheader />
          {children}
        </body>
      </ClientProvider>
    </html>
  );
}

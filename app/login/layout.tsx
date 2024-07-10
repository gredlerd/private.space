import type { Metadata } from "next";
import { Pageheader } from "../components/Pageheader";
import "../globals.css";
import ClientProvider from "../components/react-query/ClientProvider";

export const metadata: Metadata = {
  title: "Login",
  description: "Login for users",
};

export default function LoginLayout({
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

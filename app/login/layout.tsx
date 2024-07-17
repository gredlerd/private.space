import type { Metadata } from "next";
import { Pageheader } from "../components/Pageheader";
import "../globals.css";
import ClientProvider from "../components/react-query/ClientProvider";
import Image from "next/image";

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
          {" "}
          <div className="p-5 z-40 sticky bg-white top-0 left-0 w-full">
            <div className="flex justify-center">
              <div className="flex justify-center items-center">
                <button>
                  <Image
                    width={60}
                    height={60}
                    src="/diamir_icon.svg"
                    alt="diamir logo"
                  />
                </button>
              </div>
            </div>
          </div>
          {children}
        </body>
      </ClientProvider>
    </html>
  );
}

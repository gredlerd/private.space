import { setAuthToken } from "@/config/axios-config";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { useEffect } from "react";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  useEffect(() => {
    setAuthToken();
  }, [session]);

  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;

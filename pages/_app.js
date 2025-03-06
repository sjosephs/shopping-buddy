import Layout from "@/components/Layout";
import GlobalStyle from "../styles";
import { SWRConfig } from "swr";
import { SessionProvider, useSession } from "next-auth/react";
import Login from "@/components/Login";

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <SWRConfig value={{ fetcher }}>
        <GlobalStyle />
        <AuthWrapper>
          <Component {...pageProps} />
        </AuthWrapper>
      </SWRConfig>
    </SessionProvider>
  );
}

function AuthWrapper({ children }) {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;

  return session ? <Layout>{children}</Layout> : <Login>{children}</Login>;
}

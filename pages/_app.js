import Layout from "@/components/Layout";
import GlobalStyle from "../styles";
import NavBar from "@/components/NavBar";
import { SWRConfig } from "swr";
import { SessionProvider } from "next-auth/react";
import Login from "@/components/Login";

const fetcher = (url) => fetch(url).then((response) => response.json());
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <SWRConfig
        value={{
          fetcher,
        }}
      >
        <Layout>
          <Login />
          <GlobalStyle />
          <NavBar />
          <Component {...pageProps} />
        </Layout>
      </SWRConfig>
    </SessionProvider>
  );
}

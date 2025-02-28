import Layout from "@/components/Layout";
import GlobalStyle from "../styles";
import NavBar from "@/components/NavBar";
import { SWRConfig } from "swr";

const fetcher = (url) => fetch(url).then((response) => response.json());
export default function App({ Component, pageProps }) {
  return (
    <SWRConfig
      value={{
        fetcher,
      }}
    >
      <Layout>
        <GlobalStyle />
        <NavBar />
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  );
}

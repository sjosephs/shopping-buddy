import Layout from "@/components/Layout";
import GlobalStyle from "../styles";
import NavBar from "@/components/NavBar";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <GlobalStyle />
      <NavBar />
      <Component {...pageProps} />
    </Layout>
  );
}

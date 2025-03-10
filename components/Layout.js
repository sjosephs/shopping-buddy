import TitleBar from "./TitleBar";
import styled from "styled-components";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { faDolly } from "@fortawesome/free-solid-svg-icons";

const faDollySvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="32" height="32"><path d="${faDolly.icon[4]}" /></svg>`;

const Main = styled.main`
  display: grid;
  position: relative;
  width: 100%;
  padding: 80px 50px;
`;

export default function Layout({ children }) {
  const { data: session } = useSession();

  return (
    <>
      <Head>
        <link
          rel="icon"
          href={`data:image/svg+xml;base64,${btoa(faDollySvg)}`}
        />
        <title>Shopping Buddy</title>
      </Head>
      {session && <TitleBar />}
      <Main>{children}</Main>
    </>
  );
}

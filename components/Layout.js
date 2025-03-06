import TitleBar from "./TitleBar";
import styled from "styled-components";
import Head from "next/head";
import { useSession } from "next-auth/react";

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
        <title>Shopping Buddy</title>
      </Head>
      {session && <TitleBar />}
      <Main>{children}</Main>
    </>
  );
}

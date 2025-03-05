import TitleBar from "./TitleBar";
import Login from "./Login";
import styled from "styled-components";
import Head from "next/head";
import { useSession } from "next-auth/react";

const Main = styled.main`
  display: grid;
  position: relative;
  width: 100%;
  padding: ${({ isLoginComponent }) => (isLoginComponent ? "0" : "80px 50px")};
`;

export default function Layout({ children }) {
  const { data: session } = useSession();
  const isLoginComponent = children?.type === Login;

  return (
    <>
      <Head>
        <title>Shopping Buddy</title>
      </Head>
      {!isLoginComponent && session && <TitleBar />}
      <Main isLoginComponent={isLoginComponent}>{children}</Main>
    </>
  );
}

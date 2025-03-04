import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  min-height: 100vh;
`;
const ImageContainer = styled.div`
  flex: 1;
  position: relative;
`;

const LoginContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 40px;
`;
const Header = styled.h1`
  margin-bottom: 0;
`;

export default function Login({ children }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
        {children}
      </>
    );
  }
  return (
    <Container>
      <ImageContainer>
        <Image
          src="https://images.unsplash.com/photo-1537130508986-20f4fd870b4e?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D "
          alt="shopping bag with lemons"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        ></Image>
      </ImageContainer>
      <LoginContainer>
        <Header>Personal Shopping Made Easy</Header>
        <h4>Create Your Personal Shopping List And Keep Track </h4>
        <button onClick={() => signIn()}>Sign in</button>
      </LoginContainer>
    </Container>
  );
}

import { useSession, signIn } from "next-auth/react";
import Image from "next/image";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
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
  font-family: "Inter", sans-serif;
  font-size: 36px;
  color: #024b3b;
  letter-spacing: -1px;
  margin-bottom: 0;
`;

const SubHeader = styled.h3`
  font-family: "Inter", sans-serif;
  color: #000000;
  margin: 16;
`;

const Button = styled.button`
  font-family: "Inter", sans-serif;
  background-color: #024b3b;
  color: white;
  font-size: 16px;
  font-weight: bold;
  padding: 15px 80px 15px 80px;
  margin-top: 20px;
  border: none;
  border-radius: 40px;
  cursor: pointer;

  &:hover {
    background-color: #4d8175;
  }
`;

export default function Login({ children }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (session) {
    return <>{children}</>;
  }
  return (
    <Container>
      <ImageContainer>
        <Image
          src="https://images.unsplash.com/photo-1537130508986-20f4fd870b4e?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D "
          alt="shopping bag with lemons"
          layout="fill"
          objectFit="cover"
          objectPosition="bottom"
        ></Image>
      </ImageContainer>
      <LoginContainer>
        <Header>Take the Hassle Out of Shopping</Header>
        <SubHeader>Plan, shop, and save time in the aisle.</SubHeader>
        <Button onClick={() => signIn()}>Sign in</Button>
      </LoginContainer>
    </Container>
  );
}

Login.displayName = "Login";

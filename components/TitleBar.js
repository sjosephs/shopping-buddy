import { useRouter } from "next/router";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDolly,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: "Inter", sans-serif;
  background: #ffffff;
  position: fixed;
  top: 0;
  width: 100%;
  height: 70px;
  z-index: 1000;
  padding: 0 50px;
`;

const AppName = styled.h1`
  font-family: "Inter", sans-serif;
  font-size: 24px;
  color: #024b3b;
  background: #ffffff;
  letter-spacing: -px;
`;

const Logo = styled.div`
  gap: 10px;
  display: flex;
  align-items: center;
  font-size: 30px; /* Adjusts size of the icon */
  color: #024b3b;
`;

const NavLinks = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
  gap: 40px;
  padding-right: 0px;

  a {
    font-size: 18px;
    color: #024b3b;
    text-decoration: none;
    font-weight: bold;

    &.active {
      text-decoration: underline;
      text-decoration-thickness: 2px;
      text-underline-offset: 4px;
    }

    &:hover {
      color: #4d8175;
    }
  }
`;

const SignOutContainer = styled.div`
  font-size: 24px;
  color: #024b3b;
  cursor: pointer;
  margin-right: 20px;

  &:hover {
    color: #4d8175;
  }
`;

export default function TitleBar({ children }) {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <>
      <Header>
        <Logo>
          <FontAwesomeIcon icon={faDolly} />
          <AppName>ShoppingBuddy</AppName>
        </Logo>
        <NavLinks>
          <Link href="/" className={router.pathname === "/" ? "active" : ""}>
            Home
          </Link>
          <Link
            href="/purchased"
            className={router.pathname === "/purchased" ? "active" : ""}
          >
            Purchased
          </Link>
        </NavLinks>
        {session && (
          <SignOutContainer onClick={() => signOut()}>
            <FontAwesomeIcon icon={faArrowRightFromBracket} />
          </SignOutContainer>
        )}
      </Header>
      {children}
    </>
  );
}

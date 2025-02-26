import Link from "next/link";
import styled from "styled-components";

const StyledNavBar = styled.nav`
  z-index: 1;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 1rem 0;
  background-color: #000000;
  a {
    color: #ffffff;
    text-decoration: none;
  }
`;

export default function NavBar() {
  return (
    <>
      <StyledNavBar>
        <Link href="/">Home</Link>
        <Link href="/purchased">Purchased</Link>
      </StyledNavBar>
    </>
  );
}

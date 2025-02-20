import { useRouter } from "next/router";
import styled from "styled-components";

const Headline = styled.h1`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: white;
  margin: 0;
  padding: 20px;
  text-align: center;
  z-index: 1;
`;

const BackLink = styled.a`
  color: black;
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  text-decoration: none;
  font-weight: bold;
  color: black;
  cursor: pointer;
`;

export default function TitleBar() {
  const router = useRouter();

  let title = "Shopping Buddy";
  let showBackLink = false;

  if (router.pathname.startsWith("/items/")) {
    title = "Details";
    showBackLink = true;
  } else if (router.pathname === "/") {
    title = "Home";
  }

  return (
    <Headline>
      {showBackLink && (
        <BackLink onClick={() => router.back()}>← Back</BackLink>
      )}
      {title}
    </Headline>
  );
}

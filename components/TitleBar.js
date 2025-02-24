import { useRouter } from "next/router";
import styled from "styled-components";
import { useState, useEffect } from "react";

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
  cursor: pointer;
`;

export default function TitleBar() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [showBackLink, setShowBackLink] = useState(false);
  useEffect(() => {
    if (router.pathname.startsWith("/items/")) {
      setTitle("Details");
      setShowBackLink(true);
    } else if (router.pathname === "/") {
      setTitle("Shopping Buddy");
      setShowBackLink(false);
    }
  }, [router.pathname]);

  return (
    <Headline>
      {showBackLink && (
        <BackLink onClick={() => router.back()}>← Back</BackLink>
      )}
      {title}
    </Headline>
  );
}

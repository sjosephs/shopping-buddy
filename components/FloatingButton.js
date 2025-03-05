import styled from "styled-components";

const FloatingButton = styled.button`
  text-align: center;
  position: fixed;
  bottom: 50px;
  left: 50px;
  font-family: "Inter", sans-serif;
  background-color: #024b3b;
  color: white;
  font-size: 16px;
  font-weight: bold;
  padding: 15px 40px 15px 40px;
  margin-top: 20px;
  border: none;
  border-radius: 40px;
  transition: color 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: #4d8175;
  }
`;

export default FloatingButton;

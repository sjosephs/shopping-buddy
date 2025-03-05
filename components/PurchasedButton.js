import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardCheck,
  faCartPlus,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const StyledButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 30px;
  color: ${({ isPurchasable }) =>
    isPurchasable ? "#1E4A3C" : "#6b7280"}; /* Green when active */
  transition: color 0.3s ease;

  &:hover {
    color: ${({ isPurchasable }) =>
      isPurchasable ? "#4d8175" : "#4d4d4d"}; /* Lighter on hover */
  }
`;

export default function PurchasedButton({
  isPurchasable,
  handleTogglePurchase,
}) {
  console.log("isPurchasable:", isPurchasable);

  function handleClick(event) {
    event.preventDefault();
    handleTogglePurchase();
  }

  return (
    <StyledButton onClick={handleClick} isPurchasable={isPurchasable}>
      <FontAwesomeIcon icon={isPurchasable ? faCartPlus : faClipboardCheck} />
    </StyledButton>
  );
}

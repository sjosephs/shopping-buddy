import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const StyledDeleteButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  padding: 0;
  color: #d9534f; /* Red color */
  transition: color 0.3s ease;

  &:hover {
    color: #b52b27; /* Darker red on hover */
  }
`;

export default function DeleteButton({ cardId, handleDeleteItem }) {
  return (
    <StyledDeleteButton onClick={() => handleDeleteItem(cardId)}>
      <FontAwesomeIcon icon={faTrash} />
    </StyledDeleteButton>
  );
}

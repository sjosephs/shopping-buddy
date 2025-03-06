import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const StyledFilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  transition: color 0.3s ease;

  &:hover {
    color: #414a4c;
  }
`;

export default function FilterButton({ handleFilterToggle }) {
  return (
    <StyledFilterButton onClick={() => handleFilterToggle()}>
      <h4>Filter</h4>
      <FontAwesomeIcon icon={faFilter} />
    </StyledFilterButton>
  );
}

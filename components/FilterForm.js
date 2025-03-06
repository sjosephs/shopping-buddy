import { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const FilterContainer = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  width: 320px;
  position: relative; /* Ensures absolute positioning works inside */
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const Title = styled.h2`
  font-family: "Inter", sans-serif;
  font-size: 24px;
  font-weight: bold;
  margin-top: 8px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1rem;
  cursor: pointer;
  position: absolute;
  top: 32px;
  right: 24px;
  padding: 0px;
`;

const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 0;
  cursor: pointer;

  span {
    font-family: "Inter", sans-serif;
    font-size: 16px;
    font-weight: 400;
  }
`;

const CheckboxInput = styled.input`
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid black;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;

  &:hover {
    background-color: #e6edeb;
  }

  &:checked {
    background-color: #0f5132;
    border-color: #0f5132;
    position: relative;
  }

  &:checked::after {
    content: "✔";
    font-size: 12px;
    color: white;
    position: absolute;
    top: 2px;
    left: 4px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: right;
  gap: 16px;
  margin-top: 20px;
`;

const ResetButton = styled.button`
  font-family: "Inter", sans-serif;
  font-size: 16px;
  font-weight: bold;
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    color: #414a4c;
  }
`;

const ApplyButton = styled.button`
  font-family: "Inter", sans-serif;
  background-color: #024b3b;
  color: white;
  font-size: 16px;
  font-weight: bold;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    background-color: #4d8175;
  }
`;

const itemCategories = ["Meat", "Dairy", "Vegetables", "Bakery", "Fruits"];

export default function FilterForm({
  selectedCategories,
  onCategorySelect,
  closeModal,
}) {
  const [categories, setCategories] = useState([...selectedCategories]);

  const handleCategoryChange = (category) => {
    setCategories((currentCategories) =>
      currentCategories.includes(category)
        ? currentCategories.filter((c) => c !== category)
        : [...currentCategories, category]
    );
  };

  const handleApplyFilter = (event) => {
    event.preventDefault();
    onCategorySelect(categories);
    closeModal();
  };

  return (
    <Overlay onClick={closeModal}>
      <FilterContainer onClick={(e) => e.stopPropagation()}>
        <Header>
          <Title>Filter</Title>
          <CloseButton onClick={closeModal}>
            <FontAwesomeIcon icon={faXmark} style={{ fontSize: "1.75rem" }} />
          </CloseButton>
        </Header>
        <form onSubmit={handleApplyFilter}>
          <div>
            {itemCategories.map((category) => (
              <CheckboxContainer key={category}>
                <CheckboxInput
                  type="checkbox"
                  checked={categories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
                <span>{category}</span>
              </CheckboxContainer>
            ))}
          </div>
          <ButtonGroup>
            <ResetButton type="button" onClick={() => setCategories([])}>
              Reset All
            </ResetButton>
            <ApplyButton type="submit">Apply</ApplyButton>
          </ButtonGroup>
        </form>
      </FilterContainer>
    </Overlay>
  );
}

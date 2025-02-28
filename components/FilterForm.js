import styled from "styled-components";
import { useState } from "react";

const FilterContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
  z-index: 1001; /* Make sure it's above other content */
`;

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
  z-index: 1000; /* Make sure it's above other content */
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const itemCategories = ["Dairy", "Bakery", "Meat", "Fruits", "Vegetables"];

export default function FilterForm({
  selectedCategories,
  onCategorySelect,
  closeModal,
}) {
  const [categories, setCategories] = useState([...selectedCategories]);

  const handleCategoryChange = (event) => {
    const { name, checked } = event.target;
    setCategories((currentCategories) =>
      checked
        ? [...currentCategories, name]
        : currentCategories.filter((category) => category !== name)
    );
  };

  const handleApplyFilter = (event) => {
    event.preventDefault();
    onCategorySelect(categories);
    closeModal();
  };

  return (
    <>
      <Overlay onClick={closeModal}>
        <FilterContainer onClick={(e) => e.stopPropagation()}>
          <h2>Filter</h2>
          <CloseButton onClick={closeModal}>&times;</CloseButton>
          <form onSubmit={handleApplyFilter}>
            <button
              type="button"
              onClick={() => {
                setCategories([]);
              }}
            >
              Reset all
            </button>
            {itemCategories.map((category) => (
              <div key={category}>
                <input
                  type="checkbox"
                  name={category}
                  id={category.toLowerCase()}
                  checked={categories.includes(category)}
                  onChange={handleCategoryChange}
                />
                <label htmlFor={category.toLowerCase()}>{category}</label>
              </div>
            ))}
            <button type="submit">Apply Filters</button>
          </form>
        </FilterContainer>
      </Overlay>
    </>
  );
}

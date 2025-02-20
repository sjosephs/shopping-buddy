import { Fragment, useState } from "react";
import styled from "styled-components";

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #f9f9f9;
  padding: 1rem;
  border-radius: 8px;
`;

const ToggleButton = styled.button`
  font-size: 1.5rem;
  background-color: lightgray;
  border: 1px solid black;
  cursor: pointer;
  margin-bottom: 1rem;
`;

export const StyledButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 0.6rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export default function Form({ onSubmit }) {
  const [isOpen, setIsOpen] = useState(false);
  const handleToggle = () => setIsOpen(!isOpen);

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    await onSubmit(data); // Call the onSubmit function passed from parent
    event.target.reset();
    setIsOpen(false);
  }

  return (
    <Fragment>
      <ToggleButton onClick={handleToggle}>
        {isOpen ? "- Collapse" : "+ Add item"}
      </ToggleButton>
      {isOpen && (
        <FormContainer onSubmit={handleSubmit}>
          <label htmlFor="name">Item Name</label>
          <input
            name="name"
            type="text"
            placeholder="Enter item name"
            required
          />

          <label htmlFor="quantity">Quantity</label>
          <input
            name="quantity"
            type="number"
            min="1"
            placeholder="Enter quantity"
            required
          />

          <label htmlFor="category">Category</label>
          <select name="category" defaultValue="" required>
            <option value="" disabled>
              Please select a category
            </option>
            <option value="Dairy">Dairy</option>
            <option value="Meat">Meat</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Bakery">Bakery</option>
            <option value="Fruits">Fruits</option>
          </select>

          <label htmlFor="imageUrl">Image URL</label>
          <input
            name="imageUrl"
            type="url"
            placeholder="Enter image URL"
            required
          />

          <label htmlFor="comment">Comment</label>
          <textarea
            name="comment"
            cols="30"
            rows="10"
            placeholder="Optional comment"
          ></textarea>
          <StyledButton type="submit">Submit</StyledButton>
        </FormContainer>
      )}
    </Fragment>
  );
}

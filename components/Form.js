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

export const DEFAULT_VALUES = {
  name: "",
  quantity: 1,
  category: "",
  imageUrl: "",
  comment: "",
};

export default function Form({
  onSubmit,
  values = DEFAULT_VALUES,
  isEditMode = false,
  formName,
}) {
  const [isOpen, setIsOpen] = useState(isEditMode); // Open by default if editing
  const handleToggle = () => setIsOpen(!isOpen);

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    try {
      await onSubmit(data); // Call the onSubmit function passed from parent
      if (!isEditMode) {
        event.target.reset();
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Submission failed. Please try again.");
    }
  }

  return (
    <Fragment>
      {!isEditMode && (
        <ToggleButton onClick={handleToggle}>
          {isOpen ? "- Collapse" : "+ Add item"}
        </ToggleButton>
      )}
      {(isOpen || isEditMode) && (
        <FormContainer onSubmit={handleSubmit}>
          <h1>{isEditMode ? "Edit Shopping Item" : "Add New Shopping Item"}</h1>

          <label htmlFor="name">Item Name</label>
          <input
            name="name"
            type="text"
            defaultValue={values.name}
            placeholder="Enter item name"
            required
          />

          <label htmlFor="quantity">Quantity</label>
          <input
            name="quantity"
            type="number"
            min="1"
            defaultValue={values.quantity}
            placeholder="Enter quantity"
            required
          />

          <label htmlFor="category">Category</label>
          <select name="category" defaultValue={values.category} required>
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
            defaultValue={values.imageUrl}
            placeholder="Enter image URL (optional)"
          />

          <label htmlFor="comment">Comment</label>
          <textarea
            name="comment"
            cols="30"
            rows="10"
            defaultValue={values.comment}
            placeholder="Optional comment"
          ></textarea>
          <StyledButton type="submit">
            {isEditMode ? "Save Changes" : "Submit"}
          </StyledButton>
        </FormContainer>
      )}
    </Fragment>
  );
}

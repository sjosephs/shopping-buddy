import { Fragment } from "react";
import styled from "styled-components";

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #f9f9f9;
  padding: 1rem;
  border-radius: 8px;
`;

export const StyledButton = styled.button`
  background-color: rgb(84, 90, 97);
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
  buttonName,
}) {
  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    await onSubmit(data); // Call the onSubmit function passed from parent
    event.target.reset();
  }

  return (
    <Fragment>
      <FormContainer onSubmit={handleSubmit}>
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
        <StyledButton type="submit">{buttonName}</StyledButton>
      </FormContainer>
    </Fragment>
  );
}

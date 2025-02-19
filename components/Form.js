import styled from "styled-components";

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: #f9f9f9;
  padding: 1rem;
  border-radius: 8px;
`;

export const Input = styled.input`
  padding: 0.5rem;
  font-size: inherit;
  border: 1px solid black;
  border-radius: 0.5rem;
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const Label = styled.label`
  font-weight: bold;
`;

export const Textarea = styled.textarea`
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
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
  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    await onSubmit(data); // Call the onSubmit function passed from parent
    event.target.reset();
  }

  return (
    <FormContainer onSubmit={handleSubmit}>
      <Label htmlFor="name">Item Name</Label>
      <Input name="name" type="text" placeholder="Enter item name" required />
      <Label htmlFor="quantity">Quantity</Label>
      <Input
        name="quantity"
        type="number"
        min="1"
        placeholder="Enter quantity"
        required
      />
      <Label htmlFor="category">Category</Label>
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

      <Label htmlFor="comment">Comment</Label>
      <Textarea
        name="comment"
        cols="30"
        rows="10"
        placeholder="Optional comment"
      ></Textarea>
      <StyledButton type="submit">Submit</StyledButton>
    </FormContainer>
  );
}

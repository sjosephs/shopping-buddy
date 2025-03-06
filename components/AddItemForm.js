import { useState, useEffect } from "react";
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

export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  width: 320px;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0px;
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

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const StyledInput = styled.input`
  appearance: none;
  width: 100%;
  padding: 10px;
  border: 2px solid black;
  border-radius: 6px;
  font-size: 16px;
  transition: background 0.3s ease;

  &:hover {
    background-color: #e6edeb;
  }

  &:focus {
    outline: none;
    border-color: #0f5132;
    background-color: #f0fdfa;
  }
`;

const StyledSelect = styled.select`
  appearance: none;
  width: 100%;
  padding: 10px;
  border: 2px solid black;
  border-radius: 6px;
  font-size: 16px;
  background-color: white;
  transition: background 0.3s ease;

  &:hover {
    background-color: #e6edeb;
  }

  &:focus {
    outline: none;
    border-color: #0f5132;
    background-color: #f0fdfa;
  }
`;

const StyledTextarea = styled.textarea`
  appearance: none;
  width: 100%;
  padding: 10px;
  border: 2px solid black;
  border-radius: 6px;
  font-size: 16px;
  transition: background 0.2s ease, border-color 0.2s ease;

  &:hover {
    background-color: #e6edeb;
  }

  &:focus {
    outline: none;
    border-color: #0f5132;
    background-color: #f0fdfa;
  }
`;

const StyledButton = styled.button`
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

export default function AddItemForm({ onSubmit, closeModal, initialValues }) {
  const [formData, setFormData] = useState({
    name: "",
    quantity: 1,
    category: "",
    imageUrl: "",
    comment: "",
  });

  useEffect(() => {
    if (initialValues) {
      setFormData({
        name: initialValues.name || "",
        quantity: initialValues.quantity || 1,
        category: initialValues.category || "",
        imageUrl: initialValues.imageUrl || "",
        comment: initialValues.comment || "",
      });
    }
  }, [initialValues]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSubmit(formData);
    closeModal();
  };

  return (
    <Overlay onClick={closeModal}>
      <FormContainer
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
      >
        <Header>
          <Title>Filter</Title>
          <CloseButton onClick={closeModal}>
            <FontAwesomeIcon icon={faXmark} style={{ fontSize: "1.75rem" }} />
          </CloseButton>
        </Header>

        <InputGroup>
          <label htmlFor="name">Item Name</label>
          <StyledInput
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </InputGroup>

        <InputGroup>
          <label htmlFor="quantity">Quantity</label>
          <StyledInput
            name="quantity"
            type="number"
            min="1"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </InputGroup>

        <InputGroup>
          <label htmlFor="category">Category</label>
          <StyledSelect
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Please select a category
            </option>
            <option value="Dairy">Dairy</option>
            <option value="Meat">Meat</option>
            <option value="Vegetables">Vegetables</option>
            <option value="Bakery">Bakery</option>
            <option value="Fruits">Fruits</option>
          </StyledSelect>
        </InputGroup>

        <InputGroup>
          <label htmlFor="imageUrl">Image URL</label>
          <StyledInput
            name="imageUrl"
            type="url"
            value={formData.imageUrl}
            onChange={handleChange}
          />
        </InputGroup>

        <InputGroup>
          <label htmlFor="comment">Comment</label>
          <StyledTextarea
            name="comment"
            cols="30"
            rows="4"
            value={formData.comment}
            onChange={handleChange}
          ></StyledTextarea>
        </InputGroup>
        <StyledButton type="submit">Save Item</StyledButton>
      </FormContainer>
    </Overlay>
  );
}

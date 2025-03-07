import { useState } from "react";
import Image from "next/image";
import AddItemForm from "@/components/AddItemForm";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 80vh;
  background-color: white;
  padding: 0;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }
`;

const ImageContainer = styled.div`
  flex: 0 0 40%;
  position: relative;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 100%;
    height: 300px;
    justify-content: center;
  }
`;

const CurvedImage = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: cover;
  clip-path: ellipse(100% 80% at 0% 50%);

  @media (max-width: 768px) {
    clip-path: none;
    height: auto;
  }
`;

const DetailsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 16px;
  height: 100%;
  padding-left: 100px;

  @media (max-width: 768px) {
    padding-left: 0;
    text-align: center;
    align-items: center;
    height: auto;
  }
`;

const StyledParagraph = styled.p`
  font-size: 20px;
  margin: 0;
`;

const EditButton = styled.button`
  background-color: #024b3b;
  color: white;
  font-size: 16px;
  font-weight: bold;
  padding: 10px 20px;
  margin-top: 32px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.3s ease;
  width: 140px;

  &:hover {
    background-color: #4d8175;
  }
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
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  width: 320px;
  position: relative;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
`;

export default function ShoppingItemDetails({ item, id, mutate }) {
  const [isEditing, setIsEditing] = useState(false);

  async function handleEditItem(updatedData) {
    const response = await fetch(`/api/items/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      console.error("Update failed:", response.status);
      return;
    }

    setIsEditing(false);
    await mutate();
  }

  return (
    <>
      <Container>
        <ImageContainer>
          <CurvedImage
            src={item.imageUrl}
            alt={item.name}
            width={600}
            height={400}
            objectFit="cover"
          />
        </ImageContainer>

        <DetailsContainer>
          <h1 style={{ marginTop: 0, marginBottom: 40, fontSize: 48 }}>
            {item.name}
          </h1>
          <StyledParagraph>
            <strong>Quantity:</strong> {item.quantity}
          </StyledParagraph>
          <StyledParagraph>
            <strong>Category:</strong> {item.category}
          </StyledParagraph>
          <StyledParagraph>
            <strong>Comment:</strong> {item.comment}
          </StyledParagraph>
          <EditButton onClick={() => setIsEditing(true)}>Edit</EditButton>
        </DetailsContainer>
      </Container>

      {isEditing && (
        <Overlay onClick={() => setIsEditing(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={() => setIsEditing(false)}>✖</CloseButton>
            <AddItemForm
              onSubmit={handleEditItem}
              closeModal={() => setIsEditing(false)}
              initialValues={item}
            />
          </ModalContent>
        </Overlay>
      )}
    </>
  );
}

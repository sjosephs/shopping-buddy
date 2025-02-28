import Form from "@/components/Form";
import ShoppingList from "@/components/ShoppingList";
import useSWR from "swr";
import { useState } from "react";
import styled from "styled-components";

const ToggleButton = styled.button`
  font-size: 1.5rem;
  background-color: lightgray;
  border: 1px solid black;
  cursor: pointer;
  margin-bottom: 1rem;
`;

export default function HomePage() {
  const { data, mutate } = useSWR("/api/items");
  const shoppingItems = data?.filter((item) => !item.isPurchasable);

  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  async function handleSubmit(data) {
    const response = await fetch("/api/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      console.error("Failed to add Item");
      return;
    }
    mutate();
  }

  if (!shoppingItems) return <p>Loading items...</p>;
  if (shoppingItems.error) return <p>Failed to load items.</p>;

  return (
    <>
      <ToggleButton onClick={handleToggle}>
        {isOpen ? "- Collapse" : "+ Add item"}
      </ToggleButton>
      {isOpen && (
        <Form
          onSubmit={(data) => {
            handleSubmit(data);
            setIsOpen(false);
          }}
          buttonName="Submit"
        />
      )}
      <ShoppingList shoppingItemData={shoppingItems} isPurchasable />
    </>
  );
}

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

  const [isFormOpen, setIsFormOpen] = useState(false);

 function handleFormToggle(){
  setIsFormOpen(!isFormOpen);
  }

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

  return (
    <>
      <ToggleButton onClick={handleFormToggle}>
        {isFormOpen ? "- Collapse" : "+ Add item"}
      </ToggleButton>
      {isFormOpen && (
        <Form
          onSubmit={(data) => {
            handleSubmit(data);
            setIsFormOpen(false);
          }}
          buttonName="Submit"
        />
      )}

      {shoppingItems?.length === 0 && <p>No items found.</p>}
      {shoppingItems?.error && <p>Failed to load items</p>}
      <ShoppingList shoppingItemData={shoppingItems} />
    </>
  );
}

import Form from "@/components/Form";
import ShoppingList from "@/components/ShoppingList";
import useSWR from "swr";
import { useState } from "react";
import FloatingButton from "@/components/FloatingButton";

export default function HomePage() {
  const { data, mutate, error } = useSWR("/api/items");
  const shoppingItems = data?.filter((item) => !item.isPurchasable);

  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleFormToggle = () => setIsFormOpen(!isFormOpen);

  if (error) return <p>Failed to load items</p>;

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
      {shoppingItems?.length === 0 && <p>No items found.</p>}
      <ShoppingList shoppingItemData={shoppingItems} />
      <FloatingButton onClick={handleFormToggle}>
        {isFormOpen ? "- Collapse" : "+ Add Item"}
      </FloatingButton>
      {isFormOpen && (
        <Form
          onSubmit={(data) => {
            handleSubmit(data);
            setIsFormOpen(false);
          }}
          buttonName="Submit"
        />
      )}
    </>
  );
}

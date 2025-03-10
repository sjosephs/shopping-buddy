import AddItemForm from "@/components/AddItemForm";
import LoadingSpinner from "@/components/LoadingSpinner";
import ShoppingList from "@/components/ShoppingList";
import useSWR from "swr";
import { useState } from "react";
import FloatingButton from "@/components/FloatingButton";

export default function HomePage() {
  const { data, mutate, error, isValidating } = useSWR("/api/items");
  const shoppingItems = data?.filter((item) => !item.isPurchasable);

  const [isFormVisible, setIsFormVisible] = useState(false);

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

  if (error) return <p>Failed to load items</p>;

  return (
    <>
      {isValidating && <LoadingSpinner />}
      <ShoppingList shoppingItemData={shoppingItems} />
      {shoppingItems?.length === 0 && <p>No items found.</p>}
      <FloatingButton onClick={() => setIsFormVisible(true)}>
        + Add Item
      </FloatingButton>

      {isFormVisible && (
        <AddItemForm
          onSubmit={(data) => {
            handleSubmit(data);
            setIsFormVisible(false);
          }}
          closeModal={() => setIsFormVisible(false)}
        />
      )}
    </>
  );
}

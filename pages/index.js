import Form from "@/components/Form";
import ShoppingList from "@/components/ShoppingList";
import useSWR from "swr";
import { Fragment, useState } from "react";
import styled from "styled-components";
import FilterForm from "@/components/FilterForm";

const ToggleButton = styled.button`
  font-size: 1.5rem;
  background-color: lightgray;
  border: 1px solid black;
  cursor: pointer;
  margin-bottom: 1rem;
`;

const fetcher = (url) => fetch(url).then((response) => response.json());

export default function HomePage() {
  const { data, mutate } = useSWR("/api/items", fetcher);
  const shoppingItems = data?.filter((item) => !item.isPurchasable);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

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
  async function handleDeleteItem(cardId) {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!isConfirmed) return;
    const response = await fetch(`/api/items/${cardId}`, { method: "DELETE" });
    if (!response.ok) {
      console.log(response.status);
      return;
    }
    mutate();
  }

  async function handleTogglePurchase(id) {
    const item = shoppingItems.find((item) => item._id === id);

    if (!item) return;

    const response = await fetch(`/api/items/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isPurchasable: !item.isPurchasable }),
    });
    if (!response.ok) {
      console.error("Failed to update item");
      return;
    }
    mutate();
  }

  async function handleCategoryFilter(event) {
    setSelectedCategories(event.target.values);
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
      <ShoppingList
        onDeleteItem={handleDeleteItem}
        shoppingItemData={shoppingItems}
        onTogglePurchase={handleTogglePurchase}
        isPurchasable
      />

      {isOpen && (
        <Form
          onSubmit={(data) => {
            handleCategoryFilter(data);
            setIsOpen(false);
          }}
        />
      )}
    </>
  );
}

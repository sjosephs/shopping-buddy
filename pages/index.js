import Form from "@/components/Form";
import ShoppingList from "@/components/ShoppingList";
import useSWR from "swr";
import { useState } from "react";
import styled from "styled-components";
import FilterForm from "@/components/FilterForm";

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
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleFormToggle = () => setIsFormOpen(!isFormOpen);
  const handleFilterToggle = () => setIsFilterOpen(!isFilterOpen);

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

  const handleCategoryFilter = setSelectedCategories;
  console.log("Handle Category Filter", setSelectedCategories);

  const filteredItems = data?.filter(
    (item) =>
      !item.isPurchasable &&
      (selectedCategories.length === 0 ||
        selectedCategories.includes(item.category))
  );

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
      {isFilterOpen && (
        <FilterForm
          selectedCategories={selectedCategories}
          onCategorySelect={handleCategoryFilter}
          closeModal={() => setIsFilterOpen(false)}
        />
      )}
      {shoppingItems.length === 0 && <p>No items found.</p>}
      {shoppingItems.error && <p>Failed to load items</p>}
      <ShoppingList
        onDeleteItem={handleDeleteItem}
        shoppingItemData={filteredItems}
        onTogglePurchase={handleTogglePurchase}
        toggleFilterDialog={handleFilterToggle}
        isPurchasable
      />
    </>
  );
}

import Form from "@/components/Form";
import ShoppingList from "@/components/ShoppingList";
import useSWR from "swr";
import { Fragment, useState } from "react";

const fetcher = (url) => fetch(url).then((response) => response.json());
export default function HomePage() {
  const { data: shoppingItems, mutate } = useSWR("/api/items", fetcher);
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
  //console.log("shoppingItems", shoppingItems);

  if (!shoppingItems) return <p>Loading items...</p>;

  return (
    <Fragment>
      <button onClick={handleToggle}>
        {isOpen ? "- Collapse" : "+ Add item"}
      </button>
      {isOpen && (
        <Form
          onSubmit={(data) => {
            handleSubmit(data);
            setIsOpen(false);
          }}
          buttonName="Submit"
        />
      )}
      <ShoppingList shoppingItemData={shoppingItems} />
    </Fragment>
  );
}

import Form from "@/components/Form";
import ShoppingList from "@/components/ShoppingList";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((response) => response.json());
export default function HomePage() {
  const { data: shoppingItems, mutate } = useSWR("/api/items", fetcher);

  async function handleSubmit(data) {
    console.log(data);

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
  console.log("shoppingItems", shoppingItems);

  if (!shoppingItems) return <p>Loading items...</p>;

  return (
    <div>
      <Form onSubmit={handleSubmit} />
      <ShoppingList shoppingItemData={shoppingItems} />
    </div>
  );
}

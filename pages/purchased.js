import ShoppingList from "@/components/ShoppingList";
import useSWR from "swr";


export default function PurchasedPage() {
  const { data, mutate } = useSWR("/api/items");
  const purchasedItems = data?.filter((item) => item.isPurchasable) || [];

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
    const item = purchasedItems.find((item) => item._id === id);

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

  return (
    <ShoppingList
      onTogglePurchase={handleTogglePurchase}
      onDeleteItem={handleDeleteItem}
      shoppingItemData={purchasedItems}
    />
  );
}

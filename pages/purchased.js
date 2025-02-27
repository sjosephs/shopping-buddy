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

  return (
    <ShoppingList
      onDeleteItem={handleDeleteItem}
      shoppingItemData={purchasedItems}
    />
  );
}

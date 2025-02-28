import ShoppingList from "@/components/ShoppingList";
import useSWR from "swr";

export default function PurchasedPage() {
  const { data, mutate } = useSWR("/api/items");
  const purchasedItems = data?.filter((item) => item.isPurchasable) || [];

  return <ShoppingList shoppingItemData={purchasedItems} />;
}

import ShoppingList from "@/components/ShoppingList";
import LoadingSpinner from "@/components/LoadingSpinner";
import useSWR from "swr";

export default function PurchasedPage() {
  const { data, isValidating } = useSWR("/api/items");
  const purchasedItems = data?.filter((item) => item.isPurchasable) || [];

  return (
    <>
      {isValidating && <LoadingSpinner />}
      <ShoppingList shoppingItemData={purchasedItems} />
    </>
  );
}

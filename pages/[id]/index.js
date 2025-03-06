import { useRouter } from "next/router";
import useSWR from "swr";
import ShoppingItemDetails from "@/components/ShoppingItemDetails";
import FloatingButton from "@/components/FloatingButton";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function DetailsPage() {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: item,
    error,
    isLoading,
    mutate,
  } = useSWR(id ? `/api/items/${id}` : null, fetcher);

  if (!id || isLoading) return <h2>Loading...</h2>;
  if (error) return <h2>Error loading item.</h2>;

  return (
    <>
      <ShoppingItemDetails item={item} id={id} mutate={mutate} />
      <FloatingButton onClick={() => router.back()}>⟵ Back</FloatingButton>
    </>
  );
}

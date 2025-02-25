import useSWR from "swr";
import { useRouter } from "next/router";
import Form from "@/components/Form";
import Link from "next/link";
import ShoppingList from "@/components/ShoppingList";

const fetcher = (url) => fetch(url).then((response) => response.json());
export default function ItemPage() {
  const router = useRouter();
  const { id } = router.query;
  const {
    data: item,
    isLoading,
    error,
    mutate,
  } = useSWR(id ? `/api/items/${id}` : null, fetcher);

  async function handleEditItem(updatedData) {
    console.log("Updated data", updatedData);

    const response = await fetch(`/api/items/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      console.error("Update failed:", response.status);
      return;
    }

    await mutate();

    router.push("/"); // redirect back to the list after saving changes
  }

  if (isLoading || error) return <h2>Loading item...</h2>;
  if (!item) return <p>No item found.</p>;

  return (
    <>
      <h2 id="edit-item">Edit Shopping Item</h2>
      <Link href={"/"}>Back to List</Link>
      <Form
        onSubmit={handleEditItem}
        formName={"edit-item"}
        values={item}
        isEditMode={true}
      />
    </>
  );
}

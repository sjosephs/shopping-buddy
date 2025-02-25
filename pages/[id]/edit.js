import useSWR from "swr";
import { useRouter } from "next/router";
import Form from "@/components/Form";
import { Fragment } from "react";

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
    <Fragment>
      <Form onSubmit={handleEditItem} values={item} buttonName="Save Changes" />
    </Fragment>
  );
}

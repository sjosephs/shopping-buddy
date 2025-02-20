import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function DetailsPage() {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: item,
    error,
    isLoading,
  } = useSWR(id ? `/api/items/${id}` : null, fetcher);

  if (!id || isLoading) return <h2>Loading...</h2>;
  if (error) return <h2>Error loading item.</h2>;

  return (
    <div>
      <img src={item.imageUrl} alt={item.name} width="300" height="200" />
      <h1>{item.name}</h1>
      <p>Price: {item.quantity} EUR / piece</p>
      <p>Category: {item.category}</p>
      <p>{item.comment}</p>
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";

export default function ShoppingItemDetails({ item, id }) {
  return (
    <div>
      <Image src={item.imageUrl} alt={item.name} width={400} height={300} />
      <h1>{item.name}</h1>
      <p>Quantity: {item.quantity}</p>
      <p>Category: {item.category}</p>
      <p>Comment: {item.comment}</p>
      <Link href={`/${id}/edit`}>Edit</Link>
    </div>
  );
}

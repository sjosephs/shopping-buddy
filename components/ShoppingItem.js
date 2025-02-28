import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";
import { mutate } from "swr";

const Article = styled.article`
  border: 1px solid black;
  border-radius: 0.8rem;
  padding: 0.5rem;
`;

export default function ShoppingItem({
  cardImage,
  cardTitle,
  cardQuantity,
  cardCategory,
  cardId,
  isPurchasable,
}) {
  async function handleDeleteItem() {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (!isConfirmed) return;
    const response = await fetch(`/api/items/${cardId}`, { method: "DELETE" });
    if (!response.ok) {
      console.log(response.status);
      return;
    }
    mutate("/api/items");
  }

  async function handleTogglePurchase() {
    const response = await fetch(`/api/items/${cardId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isPurchasable: !isPurchasable }),
    });
    if (!response.ok) {
      console.error("Failed to update item");
      return;
    }
    mutate("/api/items");
  }

  return (
    <Article>
      <Link href={`/${cardId}`}>
        <Image
          src={
            cardImage ||
            "https://plus.unsplash.com/premium_photo-1661332019368-5feafaba06aa?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZmFsbGJhY2slMjBpbWFnZSUyMGZvciUyMHNob3BwaW5nJTIwbGlzdHxlbnwwfHwwfHx8MA%3D%3D"
          }
          alt={cardTitle || "Shopping Item Image"}
          width={400}
          height={300}
        />
      </Link>
      <p>{cardTitle}</p>
      <p>{cardQuantity}</p>
      <p>{cardCategory}</p>

      <button onClick={handleTogglePurchase}>
        {isPurchasable ? "Move to Shopping List" : "Mark as Purchased"}
      </button>

      <button onClick={handleDeleteItem}>DELETE</button>
    </Article>
  );
}

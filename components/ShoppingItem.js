import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import PurchasedButton from "./PurchasedButton";
import { mutate } from "swr";

const Article = styled.article`
  background-color: #f3f4f6;
  border-radius: 1rem;
  padding: 1rem;
`;

const ImageContainer = styled.div`
  position: relative;
  height: 10rem;
  margin-bottom: 20px;
`;

const Figure = styled.figure`
  color: black;
  position: relative;
  margin: 0;
  padding: 0;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
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
        <Figure>
          <ImageContainer>
            <Image
              src={cardImage}
              fill
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
              alt=""
              style={{
                objectFit: "cover", // Fix object-fit
                borderRadius: "10px", // Fix border-radius
              }}
            />
          </ImageContainer>
          <TitleRow>
            <figcaption>
              <strong>
                {cardTitle} (x{cardQuantity})
              </strong>
            </figcaption>
            <PurchasedButton
              handleTogglePurchase={handleTogglePurchase}
              isPurchasable={isPurchasable}
            />
          </TitleRow>
          <p>{cardCategory}</p>
          <DeleteButton handleDeleteItem={handleDeleteItem} cardId={cardId} />
        </Figure>
      </Link>
    </Article>
  );
}

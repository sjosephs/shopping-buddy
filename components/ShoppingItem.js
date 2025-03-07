import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBox } from "@fortawesome/free-solid-svg-icons";
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
  margin-bottom: 0px;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding-bottom: 0;
`;

const Figure = styled.figure`
  color: black;
  position: relative;
  margin: 0;
  padding: 0;
`;

const Header = styled.h2`
  font-family: "Inter", sans-serif;
  font-size: 24px;
  font-weight: bold;
`;

const QuantityRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1rem;
`;

const DeleteLink = styled.button`
  font-size: 16px;
  font-weight: bold;
  background: none;
  border: none;
  padding: 0;
  margin-top: 16px;
  color: #b90000;
  text-decoration: none;
  cursor: pointer;
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
            <Header>{cardTitle}</Header>
            <PurchasedButton
              handleTogglePurchase={handleTogglePurchase}
              isPurchasable={isPurchasable}
            />
          </TitleRow>
          <QuantityRow>
            <FontAwesomeIcon icon={faBox} style={{ fontSize: 20 }} />
            <span style={{ fontSize: 18, fontWeight: 500 }}>
              {cardQuantity} ({cardCategory})
            </span>
          </QuantityRow>
          <DeleteLink onClick={handleDeleteItem}>Delete Item</DeleteLink>
        </Figure>
      </Link>
    </Article>
  );
}

import Image from "next/image";
import styled from "styled-components";

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
  onDeleteItem,
  cardId,
}) {
  return (
    <Article>
      <Image src={cardImage} alt={cardTitle} width={400} height={300}></Image>

      <p>{cardTitle}</p>
      <p>{cardQuantity}</p>
      <p>{cardCategory}</p>
      <button onClick={() => onDeleteItem(cardId)}>DELETE</button>
    </Article>
  );
}

import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";

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
}) {
  return (
    <Article>
      <Link href={`items/${cardId}`}>
        <Image src={cardImage} alt={cardTitle} width={400} height={300}></Image>

        <p>{cardTitle}</p>
        <p>{cardQuantity}</p>
        <p>{cardCategory}</p>
      </Link>
    </Article>
  );
}

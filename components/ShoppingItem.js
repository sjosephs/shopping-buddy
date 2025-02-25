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
  onDeleteItem,
  cardId,
}) {
  return (
    <Article>
      <Link href={`/${cardId}`}>
        <Image
          src={
            cardImage ||
            "https://plus.unsplash.com/premium_photo-1661332019368-5feafaba06aa?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZmFsbGJhY2slMjBpbWFnZSUyMGZvciUyMHNob3BwaW5nJTIwbGlzdHxlbnwwfHwwfHx8MA%3D%3D"
          }
          alt={cardTitle}
          width={400}
          height={300}
        ></Image>
      </Link>
      <p>{cardTitle}</p>
      <p>{cardQuantity}</p>
      <p>{cardCategory}</p>
      <button onClick={() => onDeleteItem(cardId)}>DELETE</button>
    </Article>
  );
}

import Image from "next/image";
import styled from "styled-components";
import Link from "next/link";

const Article = styled.article`
  border: 1px solid black;
  border-radius: 0.8rem;
  padding: 0.5rem;
  transition: opacity 0.3s ease;
`;

const ItemName = styled.p`
  text-decoration: ${({ $purchased }) =>
    $purchased ? "line-through" : "none"};
  font-weight: bold;
`;

const ImageWrapper = styled.div`
  opacity: ${({ $purchased }) => ($purchased ? 0.5 : 1)};
`;

export default function ShoppingItem({
  cardImage,
  cardTitle,
  cardQuantity,
  cardCategory,
  onDeleteItem,
  cardId,
  purchased,
  onTogglePurchase,
  showPurchase,
}) {
  return (
    <Article $purchased={purchased}>
      <Link href={`/${cardId}`}>
        <ImageWrapper $purchased={purchased}>
          <Image
            src={
              cardImage ||
              "https://plus.unsplash.com/premium_photo-1661332019368-5feafaba06aa?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8ZmFsbGJhY2slMjBpbWFnZSUyMGZvciUyMHNob3BwaW5nJTIwbGlzdHxlbnwwfHwwfHx8MA%3D%3D"
            }
            alt={cardTitle || "Shopping Item Image"}
            width={400}
            height={300}
          />
        </ImageWrapper>
      </Link>
      <ItemName $purchased={purchased}>{cardTitle}</ItemName>
      <p>{cardQuantity}</p>
      <p>{cardCategory}</p>
      <button onClick={() => onTogglePurchase(cardId)}>
        {purchased ? "Purchased" : "Mark as Purchased"}
      </button>
      <button onClick={() => onDeleteItem(cardId)}>DELETE</button>
      {showPurchase && <div>hello Peter</div>}
    </Article>
  );
}

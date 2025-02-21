import ShoppingItem from "./ShoppingItem";
import styled from "styled-components";

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
`;

export default function ShoppingList({ shoppingItemData }) {
  if (shoppingItemData?.length === 0) return <p>No items found.</p>;

  return (
    <>
      <StyledList>
        {shoppingItemData.map((item) => (
          <li key={item._id}>
            <ShoppingItem
              cardImage={item.imageUrl}
              cardTitle={item.name}
              cardQuantity={item.quantity}
              cardCategory={item.category}
            />
          </li>
        ))}
      </StyledList>
    </>
  );
}

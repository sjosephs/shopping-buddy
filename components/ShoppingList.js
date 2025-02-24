import ShoppingItem from "./ShoppingItem";
import styled from "styled-components";

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
`;

export default function ShoppingList({ onDeleteItem, shoppingItemData }) {
  if (!shoppingItemData?.length) return <p>No items found.</p>;

  return (
    <>
      <StyledList>
        {shoppingItemData.map((item) => (
          <li key={item._id}>
            <ShoppingItem
              cardId={item._id}
              onDeleteItem={onDeleteItem}
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

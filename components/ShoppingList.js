import { Fragment } from "react";
import ShoppingItem from "./ShoppingItem";
import styled from "styled-components";

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
`;

const Header = styled.div`
  text-align: left;
  margin-bottom: 1rem;
  font-style: italic;
`;

export default function ShoppingList({
  onDeleteItem,
  shoppingItemData,
  onTogglePurchase,
}) {
  if (!shoppingItemData?.length === 0) return <p>No items found.</p>;

  const totalItems = shoppingItemData.length;
  const purchasedItems = shoppingItemData.filter(
    (item) => item.purchased
  ).length;

  return (
    <Fragment>
      <Header>
        <h4>Shopping List ({totalItems} items)</h4>
        {purchasedItems === totalItems && (
          <p>🎉 All items have been purchased!</p>
        )}
      </Header>
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
              purchased={item.purchased}
              onTogglePurchase={onTogglePurchase}
            />
          </li>
        ))}
      </StyledList>
    </Fragment>
  );
}

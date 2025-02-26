import { Fragment } from "react";
import ShoppingItem from "./ShoppingItem";
import styled from "styled-components";

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Header = styled.div`
  text-align: left;
  margin-bottom: 1rem;
  font-style: italic;
  font-size: x-small;
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

export default function ShoppingList({
  onDeleteItem,
  shoppingItemData,
  onTogglePurchase,
  showPurchase,
}) {
  if (!shoppingItemData?.length === 0) return <p>No items found.</p>;

  const totalItems = shoppingItemData.length;
  const purchasedItems = shoppingItemData.filter((item) => item.purchased);

  const notPurchasedItems = shoppingItemData.filter((item) => !item.purchased);

  return (
    <Fragment>
      <Header>
        <h2>Shopping List ({totalItems} items)</h2>
        {purchasedItems === totalItems && (
          <p>🎉 All items have been purchased!</p>
        )}
      </Header>

      <Section>
        <h3>Not Purchased ({notPurchasedItems.length}) </h3>
        <StyledList>
          {notPurchasedItems.map((item) => (
            <li key={item._id} style={{ margin: 16 }}>
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
      </Section>

      <Section>
        <h3>Purchased ({purchasedItems.length})</h3>
        <StyledList>
          {purchasedItems.map((item) => (
            <li key={item._id} style={{ margin: 16 }}>
              <ShoppingItem
                cardId={item._id}
                onDeleteItem={onDeleteItem}
                cardImage={item.imageUrl}
                cardTitle={item.name}
                cardQuantity={item.quantity}
                cardCategory={item.category}
                purchased={item.purchased}
                onTogglePurchase={onTogglePurchase}
                showPurchase={showPurchase}
              />
            </li>
          ))}
        </StyledList>
      </Section>
    </Fragment>
  );
}

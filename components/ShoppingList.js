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

export default function ShoppingList({
  onDeleteItem,
  shoppingItemData,
  onTogglePurchase,
  isPurchasable,
}) {
  if (!shoppingItemData?.length === 0) return <p>No items found.</p>;

  return (
    <>
      <Header>
        <h2>({shoppingItemData.length} items)</h2>
      </Header>

      <StyledList>
        {shoppingItemData.map((item) => (
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
              isPurchasable={isPurchasable}
            />
          </li>
        ))}
      </StyledList>
    </>
  );
}

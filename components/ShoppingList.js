import ShoppingItem from "./ShoppingItem";
import styled from "styled-components";

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export default function ShoppingList({
  onDeleteItem,
  shoppingItemData,
  onTogglePurchase,
  isPurchasable,
  toggleFilterDialog,
}) {
  if (!shoppingItemData?.length === 0) return <p>No items found.</p>;

  return (
    <>
      <Header>
        <h2>({shoppingItemData.length} items)</h2>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            toggleFilterDialog();
          }}
        >
          Filter
        </a>
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

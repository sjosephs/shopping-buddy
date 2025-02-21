import ShoppingItem from "./ShoppingItem";

export default function ShoppingList({ onDeleteItem, shoppingItemData }) {
  if (!shoppingItemData?.length) return <p>No items found.</p>;

  return (
    <>
      <ul style={{ listStyle: "none", padding: 0 }}>
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
      </ul>
    </>
  );
}

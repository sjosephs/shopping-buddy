import ShoppingItem from "./ShoppingItem";

export default function ShoppingList({ shoppingItemData }) {
  return (
    <>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {shoppingItemData?.map((item) => (
          <li key={item._id}>
            <ShoppingItem
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

export default function ShoppingItemDetails({ item }) {
  return (
    <div>
      <img src={item.imageUrl} alt={item.name} width="300" height="200" />
      <h1>{item.name}</h1>
      <p>Quantity: {item.quantity}</p>
      <p>Category: {item.category}</p>
      <p>Comment: {item.comment}</p>
    </div>
  );
}

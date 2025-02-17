import { Fragment } from "react";
import { useState } from "react";
import Image from "next/image";
import styled from "styled-components";

const Article = styled.article`
  border: 1px solid black;
  border-radius: 0.8rem;
  padding: 0.5rem;
`;

export default function ShoppingItem() {
  const [shoppingItems, setShoppingItems] = useState([
    {
      id: "1",
      name: "Milk",
      imageUrl:
        "https://images.unsplash.com/photo-1528825871115-3581a5387919?q=80&w=2791&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      quantity: 2,
      category: "Dairy",
      comment: "Low-fat, 1 litre each, prefer brand A",
    },
    {
      id: "2",
      name: "Bread",
      imageUrl:
        "https://images.unsplash.com/photo-1528825871115-3581a5387919?q=80&w=2791&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      quantity: 1,
      category: "Bakery",
      comment: "Whole grain, large loaf, no seeds",
    },
    {
      id: "3",
      name: "Apples",
      imageUrl:
        "https://images.unsplash.com/photo-1528825871115-3581a5387919?q=80&w=2791&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      quantity: 6,
      category: "Fruits",
      comment: "Organic, medium size, prefer Gala variety",
    },
    {
      id: "4",
      name: "Carrots",
      imageUrl:
        "https://images.unsplash.com/photo-1528825871115-3581a5387919?q=80&w=2791&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      quantity: 5,
      category: "Vegetables",
      comment: "Fresh, large size, from local farm if possible",
    },
  ]);
  return shoppingItems.map((item) => (
    <Article key={item.id}>
      <Image
        src={item.imageUrl}
        alt={item.name}
        width={400}
        height={300}
      ></Image>

      <p>{item.name}</p>
      <p>{item.quantity}</p>
      <p>{item.category}</p>
      <p>{item.comment}</p>
    </Article>
  ));
}

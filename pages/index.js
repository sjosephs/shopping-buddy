import styled from "styled-components";
import { useState } from "react";

const StyledHeading = styled.h1`
  text-align: center;
  position: fixed;
  z-index: 1;
`;

export default function HomePage() {
  const [shoppingItems, setShoppingItems] = useState([
    {
      id: "1",
      name: "Milk",
      imageUrl: "",
      quantity: 2,
      category: "Dairy",
      comment: "Low-fat, 1 litre each, prefer brand A",
    },
    {
      id: "2",
      name: "Bread",
      imageUrl: "",
      quantity: 1,
      category: "Bakery",
      comment: "Whole grain, large loaf, no seeds",
    },
    {
      id: "3",
      name: "Apples",
      imageUrl: "",
      quantity: 6,
      category: "Fruits",
      comment: "Organic, medium size, prefer Gala variety",
    },
    {
      id: "4",
      name: "Carrots",
      imageUrl: "",
      quantity: 5,
      category: "Vegetables",
      comment: "Fresh, large size, from local farm if possible",
    },
  ]);

  return (
    <div>
      <StyledHeading>Shopping Buddy</StyledHeading>
    </div>
  );
}

import ShoppingItem from "./ShoppingItem";
import styled from "styled-components";
import { useState } from "react";
import FilterForm from "@/components/FilterForm";

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

export default function ShoppingList({ shoppingItemData }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleFilterToggle = () => setIsFilterOpen(!isFilterOpen);

  const handleCategoryFilter = setSelectedCategories;
  console.log("Handle Category Filter", setSelectedCategories);

  const filteredItems = shoppingItemData?.filter(
    (item) =>
      selectedCategories.length === 0 ||
      selectedCategories.includes(item.category)
  );

  if (!filteredItems?.length === 0) return <p>No items found.</p>;

  return (
    <>
      {isFilterOpen && (
        <FilterForm
          selectedCategories={selectedCategories}
          onCategorySelect={handleCategoryFilter}
          closeModal={() => setIsFilterOpen(false)}
        />
      )}

      <Header>
        <h2>({filteredItems?.length} items)</h2>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleFilterToggle();
          }}
        >
          Filter
        </a>
      </Header>
      <StyledList>
        {filteredItems?.map((item) => (
          <li key={item._id} style={{ margin: 16 }}>
            <ShoppingItem
              cardId={item._id}
              cardImage={item.imageUrl}
              cardTitle={item.name}
              cardQuantity={item.quantity}
              cardCategory={item.category}
              isPurchasable={item.isPurchasable}
            />
          </li>
        ))}
      </StyledList>
    </>
  );
}

import ShoppingItem from "./ShoppingItem";
import styled from "styled-components";
import { useState } from "react";
import FilterForm from "@/components/FilterForm";
import FilterButton from "./FilterButton";

const StyledList = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  width: 100%;
  padding: 0;
  margin: 0;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0px;
`;

const ItemCounter = styled.h3`
  display: flex;
  align-items: center;
  margin: 0;
`;

export default function ShoppingList({ shoppingItemData }) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleFilterToggle = () => setIsFilterOpen(!isFilterOpen);

  const handleCategoryFilter = (categories) =>
    setSelectedCategories(categories);

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
        <ItemCounter>({filteredItems?.length} items)</ItemCounter>
        <FilterButton handleFilterToggle={handleFilterToggle}>
          Filter
        </FilterButton>
      </Header>
      <StyledList>
        {filteredItems?.map((item) => (
          <li key={item._id}>
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

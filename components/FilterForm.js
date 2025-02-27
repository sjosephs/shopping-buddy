import styled from "styled-components";

const FilterContainer = styled.div`
  background-color: gray;
`;

export default async function FilterForm(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const data = Object.fromEntries(formData);

  await onSubmit(data);
  event.target.reset();

  return (
    <>
      <FilterContainer onSubmit={handleFilter}>
        <h4>Filter</h4>
        <button>x</button>
        <button>Reset all</button>
        <input type="checkbox" name="dairy">
          Dairy
        </input>
        <input type="checkbox" name="bakery">
          Bakery
        </input>
        <input type="checkbox" name="meat">
          Meat
        </input>
        <input type="checkbox" name="fruits">
          Fruits
        </input>
        <input type="checkbox" name="vegetables">
          Vegetables
        </input>
        <button type="submit">Apply Filters</button>
      </FilterContainer>
    </>
  );
}

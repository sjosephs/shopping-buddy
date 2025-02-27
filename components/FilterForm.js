import styled from "styled-components";

const FilterContainer = styled.div`
  background-color: gray;
`;

export default function FilterForm({ onFilter }) {
  const handleFilter = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    await onFilter(Object.keys(data));
    event.target.reset();
  };

  return (
    <>
      <FilterContainer>
        <h4>Filter</h4>
        <button>x</button>
        <form onSubmit={handleFilter}>
          <button type="button" onClick={() => onFilter([])}>
            Reset all
          </button>
          <input type="checkbox" name="Dairy" id="dairy" />
          <label htmlFor="dairy">Dairy</label>
          <input type="checkbox" name="Bakery" id="bakery" />
          <label htmlFor="bakery">Bakery</label>
          <input type="checkbox" name="Meat" id="meat" />
          <label htmlFor="meat">Meat</label>
          <input type="checkbox" name="Fruits" id="fruits" />
          <label htmlFor="fruits">Fruits</label>
          <input type="checkbox" name="Vegetables" id="vegetables" />
          <label htmlFor="vegetables">Vegetables</label>
          <button type="submit">Apply Filters</button>
        </form>
      </FilterContainer>
    </>
  );
}

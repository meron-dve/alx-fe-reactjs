

import { useRecipeStore } from "./recipeStore";

const SearchBar = () => {
  const setSearchTerm = useRecipeStore((state) => state.setSearchTerm);
  const setMaxPrepTime = useRecipeStore((state) => state.setMaxPrepTime);
  const setIngredientFilter = useRecipeStore((state) => state.setIngredientFilter);

  return (
    <div style={{ marginBottom: '20px' }}>
      <input
        type="text"
        placeholder="Search by title..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <br /><br />

      <input
        type="text"
        placeholder="Filter by ingredient..."
        onChange={(e) => setIngredientFilter(e.target.value)}
      />

      <br /><br />

      <input
        type="number"
        placeholder="Max Prep Time (minutes)"
        onChange={(e) => setMaxPrepTime(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;
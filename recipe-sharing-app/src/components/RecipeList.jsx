
import { Link } from 'react-router-dom';
import { useRecipeStore } from './recipeStore';

const RecipeList = () => {
  const filteredRecipes = useRecipeStore((state) =>
    state.getFilteredRecipes()
  );

  if (filteredRecipes.length === 0) {
    return <p>No matching recipes found.</p>;
  }

  return (
    <div>
      <h2>Recipes</h2>
      {filteredRecipes.map((recipe) => (
        <div key={recipe.id}>
          <h3>
            <Link to={`/recipe/${recipe.id}`}>
              {recipe.title}
            </Link>
          </h3>
          <p>Prep Time: {recipe.prepTime} mins</p>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import recipesData from "../data.json";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const foundRecipe = recipesData.find(
      (recipe) => recipe.id === parseInt(id)
    );
    setRecipe(foundRecipe);
  }, [id]);

  if (!recipe) {
    return (
      <div className="text-center mt-10 text-xl font-semibold">
        Recipe not found
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Image */}
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-80 object-cover rounded-lg shadow-md mb-6"
      />

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold mb-4">
        {recipe.title}
      </h1>

      {/* Summary */}
      <p className="text-gray-600 mb-8 text-lg">
        {recipe.summary}
      </p>

      {/* Ingredients */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          Ingredients
        </h2>
        <ul className="list-disc list-inside space-y-2">
          {recipe.ingredients.map((item, index) => (
            <li key={index} className="text-gray-700">
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* Instructions */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">
          Cooking Instructions
        </h2>
        <ol className="list-decimal list-inside space-y-3">
          {recipe.instructions.map((step, index) => (
            <li key={index} className="text-gray-700">
              {step}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default RecipeDetail;

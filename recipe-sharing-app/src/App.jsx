import SearchBar from "./components/SearchBar";
import RecipeList from "./components/RecipeList";
import SearchBar from "./components/SearchBar";

import AddRecipeForm from "./components/AddRecipeForm";
function App() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-center mb-6">
        Recipe Sharing App
      </h1>
<AddRecipeForm />

      <SearchBar />
      <RecipeList />
    </div>
  );
}

export default App;

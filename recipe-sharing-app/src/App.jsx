import SearchBar from "./components/SearchBar";
import RecipeList from "./components/RecipeList";
import SearchBar from "./components/SearchBar";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FavoritesList from "./components/FavoritesList";
import RecommendationsList from "./components/RecommendationsList";


import AddRecipeForm from "./components/AddRecipeForm";
function App() {
  return (
   


        <Routes>
          {/* Main page: add recipes + search + list */}
          <Route
            path="/"
            element={
              <>
                <AddRecipeForm />
                <SearchBar />
                <RecipeList />
                <FavoritesList />
                <RecommendationsList />
              </>
            }
          />

          {/* Recipe detail page */}
          <Route
            path="/recipe/:id"
            element={<RecipeDetails />}
          />
 
        </Routes>
        )
      }



export default App;

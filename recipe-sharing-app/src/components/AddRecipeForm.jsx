import { useState } from 'react';
  import { useRecipeStore } from './recipeStore';
  

  const AddRecipeForm = () => {
    const addRecipe = useRecipeStore(state => state.addRecipe);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

   addRecipe({
  id: Date.now(),
  title,
  description,
  ingredients: ingredients.split(',').map(i => i.trim()),
  prepTime: Number(prepTime),
});

    const [ingredients, setIngredients] = useState('');
const [prepTime, setPrepTime] = useState('');
    return (
      <><input
        type="text"
        placeholder="Ingredients (comma separated)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)} /><br /><br /><input
          type="number"
          placeholder="Preparation Time (minutes)"
          value={prepTime}
          onChange={(e) => setPrepTime(e.target.value)} /></>







     
    );
};
export default AddRecipeForm;

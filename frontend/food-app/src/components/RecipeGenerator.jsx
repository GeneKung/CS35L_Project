import { useState } from "react";
import generateRecipe from "../generateRecipe"

export default function RecipeGenerator() {
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState('');

  const handleGenerateRecipe = async () => {
    try {
      const generatedRecipe = await generateRecipe(ingredients);
      setRecipe(generatedRecipe);
    } catch (error) {
      console.error('Failed to generate recipe:', error);
      // Handle the error appropriately
    }
  };

  return (
    <div>
      <input
        type="text"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Enter ingredients"
      />
      <button onClick={handleGenerateRecipe}>Generate Recipe</button>
      {recipe && <div><h3>Generated Recipe:</h3><p>{recipe}</p></div>}
    </div>
  );
}

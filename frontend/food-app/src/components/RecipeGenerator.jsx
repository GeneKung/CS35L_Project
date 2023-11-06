import { useState } from "react";
import generateRecipe from "../generateRecipe"

export default function RecipeGenerator() {
  const [ingredients, setIngredients] = useState('');
  const [recipe, setRecipe] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateClick = async () => {
    setIsLoading(true);
    try {
      const generatedRecipe = await generateRecipe(ingredients);
      setRecipe(generatedRecipe);
    } catch (error) {
      console.error("Failed to generate recipe:", error);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <h1>Recipe Generator</h1>
      <textarea
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
        placeholder="Enter ingredients, separated by commas"
        rows={5}
        style={{ width: '100%' }}
      />
      <button onClick={handleGenerateClick} disabled={isLoading}>
        {isLoading ? 'Generating...' : 'Generate Recipe'}
      </button>
      <div>
        {recipe && (
          <>
            <h2>Generated Recipe</h2>
            <p>{recipe}</p>
          </>
        )}
      </div>
    </div>
  );
};
import "./SavedRecipies.css";
import React, { useEffect, useState } from 'react';
import { getAllRecipes } from "../../database/recipes";

export default function SavedRecipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Use the getAllRecipes function to fetch recipes when the component mounts
    const fetchRecipes = async () => {
      try {
        const recipesData = await getAllRecipes();
        setRecipes(recipesData);
      } catch (error) {
        console.error("Error fetching recipes: ", error);
      }
    };

    fetchRecipes(); // Call the function

    // Optionally, you can set up a timer or other triggers to refresh the data
    // Example: const intervalId = setInterval(fetchRecipes, 60000); // Refresh every minute

    // Clean up the timer or other resources when the component unmounts
    // return () => clearInterval(intervalId);
  }, []); // Empty dependency array means it runs once when the component mounts

  return (
    <body>
      <header>
        <h1>Saved Recipes</h1>
      </header>
      <div className="container">
        {recipes?.map((recipe, index) => (
          <div className="recipe" key={index}>
            {/* Assuming recipeTitle is Markdown content */}
            <h2 dangerouslySetInnerHTML={{ __html: recipe.recipeTitle }} />
            {/* Render ingredients */}
            <h3>Ingredients:</h3>
            <ul>
              {recipe.recipeIngredients?.map((ingredient, i) => (
                <li key={i}>{ingredient}</li>
              ))}
            </ul>
            {/* Render instructions */}
            <h3>Instructions:</h3>
            <ol>
              {recipe.recipeInstructions?.map((instruction, i) => (
                <li key={i}>{instruction}</li>
              ))}
            </ol>
            {/* Assuming recipeNote is Markdown content */}
            {recipe.recipeNote && <p dangerouslySetInnerHTML={{ __html: recipe.recipeNote }} />}
          </div>
        ))}
      </div>
    </body>
  );
}

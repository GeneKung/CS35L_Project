import "./SavedRecipies.css";
import React, { useEffect, useState } from 'react';
import { getAllRecipes, deleteRecipe } from "../../database/recipes";
import ReactMarkdown from 'react-markdown';

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

    fetchRecipes(); 

  }, []); 

  const handleDeleteRecipe = async (recipeID) => {
    try {
      await deleteRecipe(recipeID);
      // Refetch recipes after deletion
      const updatedRecipes = await getAllRecipes();
      setRecipes(updatedRecipes);
    } catch (error) {
      console.error("Error deleting recipe: ", error);
    }
  }

  return (
    <body>
      <header>
        <h1>Saved Recipes</h1>
      </header>
      <div className="container">
        {recipes?.map((recipe, index) => (
          <div className="recipe" key={index}>
            <ReactMarkdown children={recipe.generatedRecipe} />
            <button onClick={() => handleDeleteRecipe(recipe.id)}>Delete Recipe</button>
          </div>
        ))}
      </div>
    </body>
  );
}

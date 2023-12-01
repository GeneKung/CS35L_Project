import "./SavedRecipies.css";
import React, { useEffect, useState } from 'react';
import { getAllRecipes, deleteRecipe, updateRecipe } from "../../database/recipes";
import ReactMarkdown from 'react-markdown';

export default function SavedRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [editingRecipeContent, setEditingRecipeContent] = useState("");

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

  const handleEditRecipe = (recipe) => {
    setEditingRecipe(recipe);
    setEditingRecipeContent(recipe.generatedRecipe);
  }

  const handleSaveEdit = async () => {
    try {
      if(editingRecipe) {
        await updateRecipe(editingRecipe.id, editingRecipeContent);
        const updatedRecipe = await getAllRecipes();
        setRecipes(updatedRecipe);
        setEditingRecipe(null);
        setEditingRecipeContent("");
      }
    } catch (error) {
      console.error("Error saving edited recipe: ", error);
    }
  }
  const handleCancelEdit = () => {
    setEditingRecipe(null);
    setEditingRecipeContent("");
  }

  return (
    <body>
      <header>
        <h1>Saved Recipes</h1>
      </header>
      <div className="container">
        {recipes?.map((recipe, index) => (
          <div className="recipe" key={index}>
            {editingRecipe === recipe ? (
              <>
                <textarea
v                 value={String(editingRecipeContent)}
                  onChange={(e) => setEditingRecipeContent(e.target.value)}
                />
                <button onClick={handleSaveEdit}>Save Changes</button>
                <button onClick={handleCancelEdit}>Cancel</button>
              </>
            ) : (
              <>
                <ReactMarkdown children={recipe.generatedRecipe} />
                <button onClick={() => handleDeleteRecipe(recipe.id)}>Delete Recipe</button>
                <button onClick={() => handleEditRecipe(recipe)}>Edit Recipe</button>
              </>
            )}
          </div>
        ))}
      </div>
    </body>
  );
}

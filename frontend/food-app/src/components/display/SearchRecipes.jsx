import "./SearchRecipes.css";
import React, { useEffect, useState } from 'react';
import getAllRecipes from "../../database/recipes";
import ReactMarkdown from 'react-markdown';
import * as emoji from 'node-emoji'

/*
function generateTitleEmojis(recipeTitle){
  let words = recipeTitle.split(" ");
  for (let i = 0; i < words.length; i++) {
    if(emoji.has(words[i].toLowerCase())) {
      recipeTitle += emoji.get(words[i].toLowerCase());
    }
    if(emoji.has(words[i].toLowerCase().slice(0,-1))) {
      recipeTitle += emoji.get(words[i].toLowerCase().slice(0,-1));
    }
  }
  return recipeTitle;
}

export default function SearchRecipes( {inputData} ) {
  const [recipes, setRecipes] = useState([]);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [editingRecipeContent, setEditingRecipeContent] = useState("");
  const [showDisplayCard, setShowDisplayCard] = useState(-1);
  const [searchResults, setSearchResults] = useState([-1]);

  useEffect(() => {
    // Use the getAllRecipes function to fetch recipes when the component mounts
    const fetchRecipes = async () => {
      try {
        const recipesData = await getSharedRecipes();
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
      const updatedRecipes = await getSharedRecipes();
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
        const updatedRecipe = await getSharedRecipes();
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

  const handleSearch = (query) => {
    query = query.toLowerCase();
    let results = [];
    for(let i = 0; i < recipes.length; i++) {
      if(recipes[i].generatedRecipe.split('\n')[0].toLowerCase().includes(query)) {
        results.push(i);
      }
    }
    setSearchResults(results);
  }

  
  return (
    <body>
      <header className="saved-header">
        <h1 style={{fontSize: "50px", textShadow: "5px 5px 10px rgba(0,0,0,0.5)"}}>Search Recipes</h1>
      </header>
      <div className="saved-search-bar">
        <p style={{fontSize:"15px"}}>Search for Recipes: </p>
        <input type="text" placeholder="Type a recipe name" style={{width: "50%"}} onChange={(e) => handleSearch(e.target.value)}/>
      </div>
      <div className="container">
        {(searchResults.length === 0) ? (
            <h1>No Recipes Found</h1>
        ) : null}
        {recipes?.map((recipe, index) => (
          <>
          {(searchResults.includes(index) || searchResults.includes(-1)) ? (
            <div className="recipe" onClick={() => setShowDisplayCard(index)} key={index}>
              <ReactMarkdown className="recipe-card" children={generateTitleEmojis(recipe.generatedRecipe.split('\n')[0])}/>
            </div>
          ) : null}
          {(showDisplayCard===index) ? (
            <div className="popup-card">
              <div className="popup-card-inner">
                    {editingRecipe === recipe ? (
                      <>
                        <textarea
                        value={String(editingRecipeContent)}
                        onChange={(e) => setEditingRecipeContent(e.target.value)}
                        />
                        <button onClick={handleSaveEdit}>Save Changes</button>
                        <button onClick={handleCancelEdit}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <div className="popup-content">
                          <ReactMarkdown children={recipe.generatedRecipe} />
                        </div>
                        <button id = "deleteBtn" onClick={() => handleDeleteRecipe(recipe.id)}>Delete Recipe</button>
                        <button onClick={() => handleEditRecipe(recipe)}>Edit Recipe</button>
                        <button onClick={() => setShowDisplayCard(-1)}>Close</button>
                      </>
                    )}
                  
              </div>
            </div>
          ) : null}
          </>
        ))}
        
      </div>
    </body>
  );

}
*/
import "./SavedRecipes.css";
import React, { useEffect, useState } from "react";
import {
  getAllRecipes,
  deleteRecipe,
  updateRecipe,
  saveSharedRecipe,
} from "../../database/recipes";
import ReactMarkdown from "react-markdown";
import * as emoji from "node-emoji";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faTrash, faShare, faPencilAlt, faSave } from '@fortawesome/free-solid-svg-icons';

function generateTitleEmojis(recipeTitle) {
  let words = recipeTitle.split(" ");
  for (let i = 0; i < words.length; i++) {
    if (emoji.has(words[i].toLowerCase())) {
      recipeTitle += emoji.get(words[i].toLowerCase());
    }
    if (emoji.has(words[i].toLowerCase().slice(0, -1))) {
      recipeTitle += emoji.get(words[i].toLowerCase().slice(0, -1));
    }
  }
  return recipeTitle;
}

export default function SavedRecipies({ inputData }) {
  const [recipes, setRecipes] = useState([]);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [editingRecipeContent, setEditingRecipeContent] = useState("");
  const [showDisplayCard, setShowDisplayCard] = useState(-1);
  const [searchResults, setSearchResults] = useState([-1]);

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
  };

  const handleEditRecipe = (recipe) => {
    setEditingRecipe(recipe);
    setEditingRecipeContent(recipe.generatedRecipe);
  };

  const handleSaveEdit = async () => {
    try {
      if (editingRecipe) {
        await updateRecipe(editingRecipe.id, editingRecipeContent);
        const updatedRecipe = await getAllRecipes();
        setRecipes(updatedRecipe);
        setEditingRecipe(null);
        setEditingRecipeContent("");
      }
    } catch (error) {
      console.error("Error saving edited recipe: ", error);
    }
  };
  const handleCancelEdit = () => {
    setEditingRecipe(null);
    setEditingRecipeContent("");
  };

  const handleSearch = (query) => {
    query = query.toLowerCase();
    let results = [];
    for (let i = 0; i < recipes.length; i++) {
      if (
        recipes[i].generatedRecipe.split("\n")[0].toLowerCase().includes(query)
      ) {
        results.push(i);
      }
    }
    setSearchResults(results);
  };
  const handleShareSaveRecipe = async (recipeID, recipe, tags) => {
    try {
      await saveSharedRecipe(recipeID, recipe, tags);
    } catch (error) {
      console.error("Error shared saved recipe: ", error);
    }
  };

  return (
    <body>
      <header className="saved-header">
        <h1
          style={{
            fontSize: "50px",
            textShadow: "5px 5px 10px rgba(0,0,0,0.5)",
          }}
        >
          Saved Recipes
        </h1>
      </header>
      <div className="saved-search-bar">
        <p style={{ fontSize: "15px" }}>Search for Recipes: </p>
        <input
          type="text"
          placeholder="Type a recipe name"
          style={{ width: "50%" }}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div className="container">
        {searchResults.length === 0 ? <h1>No Recipes Found</h1> : null}
        {recipes?.map((recipe, index) => (
          <>
            {searchResults.includes(index) || searchResults.includes(-1) ? (
              <div
                className="recipe"
                onClick={() => setShowDisplayCard(index)}
                key={index}
              >
                <ReactMarkdown
                  className="recipe-card"
                  children={generateTitleEmojis(
                    recipe.generatedRecipe.split("\n")[0]
                  )}
                />
              </div>
            ) : null}
            {showDisplayCard === index ? (
              <div className="popup-card">
                <div className="popup-card-inner">
                  {editingRecipe === recipe ? (
                    <>
                      <textarea
                        value={String(editingRecipeContent)}
                        onChange={(e) =>
                          setEditingRecipeContent(e.target.value)
                        }
                      />
                      <button 
                        onClick={handleSaveEdit}
                        className="tooltip-btn" 
                        data-tooltip="Save"
                      >
                        <FontAwesomeIcon icon={faSave} />
                      </button>
                      <button 
                        onClick={handleCancelEdit}
                        className="tooltip-btn" 
                        data-tooltip="Close"
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    </>
                  ) : (
                    <>
                      <div className="popup-content">
                        <ReactMarkdown children={recipe.generatedRecipe} />
                      </div>
                      <button
                        id="deleteBtn"
                        onClick={() => handleDeleteRecipe(recipe.id)}
                        className="tooltip-btn"
                        data-tooltip="Delete"
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                      <button 
                        onClick={() => handleEditRecipe(recipe)} 
                        className="tooltip-btn" 
                        data-tooltip="Edit"
                      >
                        <FontAwesomeIcon icon={faPencilAlt} />
                      </button>

                      <button
                        onClick={() =>
                          handleShareSaveRecipe(
                            recipe.id,
                            recipe.generatedRecipe,
                            recipe.tags
                          )
                        }
                        className="tooltip-btn" 
                        data-tooltip="Share"
                      >
                        <FontAwesomeIcon icon={faShare} />
                      </button>

                      <button 
                        onClick={() => setShowDisplayCard(-1)} 
                        className="close-icon" 
                        data-tooltip="Close"
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                      
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

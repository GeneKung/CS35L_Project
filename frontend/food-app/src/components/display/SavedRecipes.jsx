import "./SavedRecipes.css";
import { useState } from 'react';
import { myRecipeList } from "./ExampleSavedRecipes.js"

function ListItem({recipeInfo, setShowDisplayCard}) {
  return (
    <div className="recipe" onClick={() => setShowDisplayCard(recipeInfo.id)}>
      <img src="ImagePlaceholder.jpg" alt="Image Placeholder  " />
        <div className="recipe-info">
          <h2>{recipeInfo.Name}</h2>
          <p>
            {recipeInfo.Description}
          </p>
        </div>
    </div>
  )
}

function PopupDisplayCard( {recipeInfo, showDisplayCard, setShowDisplayCard} ) {
  let i = 0
  for (i = 0; i < recipeInfo.length; i++) 
    if(recipeInfo[i].id === showDisplayCard)
      break;
  return (showDisplayCard) ? (
    <div className="popup-card">
      <div className="popup-card-inner">
        <div className="popup-content">
          <h1>{recipeInfo[i].Name}</h1>
          <p>{recipeInfo[i].Description}</p>
        </div>
        <div className="popup-buttons">
          <div className="row">
            <div className="column"> <button className="popup-remove-btn">Remove from Saved Recipes</button></div>
            <div className="column"> <button className="popup-close-btn" onClick={() => setShowDisplayCard(false)}>Close</button></div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

export default function SavedRecipies( {inputData} ) {

  const [showDisplayCard, setShowDisplayCard] = useState(0);
  
  // Example recipe cards
  const recipeList = myRecipeList();
  // This state variable stores the information for
  // all the user's saved recipes.
  const [recipeData, setRecipeData] = useState(recipeList);

  function removeRecipe(id) {
    // TODO
    // Remove the recipe with the specified id from the user's
    // saved recipe list.
    return;
  }

  const col1Cards = [];
  const col2Cards = [];
  for (let i = 0; i < recipeData.length; i++) {
    if(i%2===0)
      col1Cards.push(<ListItem recipeInfo={recipeData[i]} setShowDisplayCard={setShowDisplayCard}/>);
    else
      col2Cards.push(<ListItem recipeInfo={recipeData[i]} setShowDisplayCard={setShowDisplayCard}/>);
  }
  return (
    <body>
      <header>
        <h1>Saved Recipes</h1>
      </header>
      <div className="container">
        <div class="column">
            {col1Cards}
        </div>
        <div class="column">
            {col2Cards}
        </div>
      </div>

      <PopupDisplayCard recipeInfo={recipeData} showDisplayCard={showDisplayCard} setShowDisplayCard={setShowDisplayCard}></PopupDisplayCard>
    </body>
  );
}

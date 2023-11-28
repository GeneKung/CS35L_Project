import "./SavedRecipes.css";
import { useState } from 'react';

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
        <h1>{recipeInfo[i].Name}</h1>
        <p>{recipeInfo[i].Description}</p>
        <div className="row">
          <div className="column"> <button className="popup-remove-btn">Remove from Saved Recipes</button></div>
          <div className="column"> <button className="popup-close-btn" onClick={() => setShowDisplayCard(false)}>Close</button></div>
        </div>
      </div>
    </div>
  ) : null;
}

export default function SavedRecipies( {inputData} ) {

  const [showDisplayCard, setShowDisplayCard] = useState(0);
  
  // Example recipe cards
  // This state variable stores the information for
  // all the user's saved recipes.
  const [recipeData, setRecipeData] = useState( 
  [
    {
      id: 1,
      Name: "Pumkin Pie",
      Description: "Costco's pumpkin pie is a delectable and generously-sized dessert, boasting a velvety smooth pumpkin filling with the perfect blend of autumn spices, all nestled in a flaky, golden crust."
    },
    {
      id: 2,
      Name: "Banana",
      Description: "Single banana."
    },
    {
      id: 3,
      Name: "Trader Joes Lasagna",
      Description: "Trader Joe's lasagna is a delicious and convenient frozen Italian dish, featuring layers of pasta, ricotta, mozzarella, and flavorful marinara sauce, creating a satisfying and easy-to-prepare meal."
    },
    {
      id: 4,
      Name: "Egg Tart",
      Description: "85 Degrees Bakery's egg tart is a delightful and flaky pastry filled with a rich and creamy egg custard, offering a perfect balance of sweetness and velvety texture in every bite."
    }
  ]);

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

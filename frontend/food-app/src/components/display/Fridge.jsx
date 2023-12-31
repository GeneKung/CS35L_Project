import { useState, useEffect } from "react";
import { auth } from "../../firebase.js";
import generateRecipe from "../../generateRecipe";
import "./Fridge.css";
import ReactMarkdown from "react-markdown";
import { saveRecipe } from "../../database/recipes";
import {
  getFridgeIngredients,
  updateFridgeInFirestore,
} from "../../database/fridgeFirestore.js";

function Fridge(props) {
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [ingr, setIngr] = useState([]);
  const [inputValue1, setInputValue1] = useState("");
  const [recipe, setRecipe] = useState("");
  const [tagLine, setTagLine] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = auth.currentUser;

  // Gets ingredients data on render if currentUser has changed since last render
  useEffect(() => {
    if (currentUser) {
      getFridgeIngredients(currentUser).then((ingredients) => {
        setIngr(ingredients);
      });
    } else {
      console.error("Fridge component rendered wihout a currentUser");
    }
  }, [currentUser]);

  function addIngredient(e) {
    e.preventDefault();
    if (inputValue1 === "") return;

    // direct state update might cause problems
    const updatedIngr = [...ingr, inputValue1];
    setIngr(updatedIngr);

    // Update the fridge doc
    if (currentUser) {
      const fridgeUpdateObj = { ingredients: updatedIngr };
      updateFridgeInFirestore(currentUser, fridgeUpdateObj);
    } else {
      console.error("Can't update fridge doc wihout a currentUser");
    }

    setInputValue1(""); // Clear input value after adding
  }

  function deleteIngredient(indexToDelete) {
    // direct state update might cause problems
    const updatedIngr = ingr.filter(
      (ingredient, index) => index !== indexToDelete
    );
    setIngr(updatedIngr);

    // Update the fridge doc
    if (currentUser) {
      const fridgeUpdateObj = { ingredients: updatedIngr };
      updateFridgeInFirestore(currentUser, fridgeUpdateObj);
    } else {
      console.error("Can't update fridge doc wihout a currentUser");
    }
  }

  const handleGenerateClick = async () => {
    setIsLoading(true);
    try {
      const [generatedRecipe, generatedTagLine] = await generateRecipe(
        ingr,
        props.diet,
        props.allergy
      );
      setRecipe(generatedRecipe);
      setTagLine(generatedTagLine);
    } catch (error) {
      console.error("Failed to generate recipe:", error);
    }
    setIsLoading(false);
  };

  const handleSaveClick = () => {
    try {
      if (recipe !== "") {
        saveRecipe(recipe, tagLine);
        setSaveSuccess(true);

        // Reset saveSuccess after 3 seconds
        setTimeout(() => {
          setSaveSuccess(false);
        }, 3000);
      }
    } catch (e) {
      console.error("Error saving recipie: ", e);
    }
  };

  return (
    <>
      <form onSubmit={addIngredient}>
        <label>
          <h3>New Ingredients</h3>
          <input
            placeholder="Enter your ingredient"
            className="input-text"
            type="text"
            value={inputValue1}
            onChange={(e) => setInputValue1(e.target.value)}
          />
          <button className="add-button" type="submit">
            Add
          </button>
        </label>
      </form>
      <button
        className="generate-button"
        onClick={handleGenerateClick}
        disabled={isLoading}
      >
        {isLoading ? "Generating..." : "Generate Recipe"}
      </button>
      <h3>Saved Ingredients:</h3>
      {ingr.map((item1, index) => (
        <button
          className="ingredients-button"
          onClick={() => deleteIngredient(index)}
        >
          {item1}
        </button>
      ))}
      <div>
        {recipe && (
          <>
          <div style={{border: '3px solid black'}}>
            <ReactMarkdown children={recipe} />
            <div className="save-container">
              <button onClick={handleSaveClick}>Save Recipe</button>
              {saveSuccess && <span>✅ Recipe saved successfully!</span>}
            </div> 
          </div>
          </>
        )}
      </div>
    </>
  );
}

export default Fridge;

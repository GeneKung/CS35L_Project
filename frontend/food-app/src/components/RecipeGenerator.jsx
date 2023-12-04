import { useState } from "react";
import generateRecipe from "../generateRecipe";
import ReactMarkdown from "react-markdown";
import { saveRecipe } from "../database/recipes";
import "./RecipeGenerator.css"

export default function RecipeGenerator() {
  const [ingr, setIngr] = useState([]);
  const [allergies, setAllergies] = useState([]);
  const [dietary, setDietary] = useState([]);
  const [recipe, setRecipe] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue1, setInputValue1] = useState("");
  const [inputValue2, setInputValue2] = useState("");
  const [inputValue3, setInputValue3] = useState("");

  const handleGenerateClick = async () => {
    setIsLoading(true);
    try {
      const generatedRecipe = await generateRecipe(ingr, dietary, allergies);
      setRecipe(generatedRecipe);
    } catch (error) {
      console.error("Failed to generate recipe:", error);
    }
    setIsLoading(false);
  };

  // TODO delete
  const handleSaveClick = () => {
    try {
      if (recipe !== "") {
        saveRecipe(recipe);
      }
    } catch (e) {
      console.error("Error saving recipie: ", e);
    }
  };

  function addIngredient(e) {
    e.preventDefault();
    if (inputValue1 === "") return;
    setIngr((prev) => [...prev, inputValue1]);
    setInputValue1(""); // Clear input value after adding
  }

  function addDietary(e) {
    e.preventDefault();
    if (inputValue3 === "") return;
    setDietary((prev) => [...prev, inputValue3]);
    setInputValue3(""); // Clear input value after adding
  }

  function addAllergy(e) {
    e.preventDefault();
    if (inputValue2 === "") return;
    setAllergies((prev) => [...prev, inputValue2]);
    setInputValue2(""); // Clear input value after adding
  }

  function deleteItem(indexToDelete, num) {
    // direct state update might cause problems
    if (num === 1){
      const updatedIngr = ingr.filter(
        (ingredient, index) => index !== indexToDelete
      );
      setIngr(updatedIngr);
    }
    else if (num === 2){
      const updatedAllergy = allergies.filter(
        (allergy, index) => index !== indexToDelete
      );
      setAllergies(updatedAllergy);
    }
    else if (num === 3){
      const updatedDiet = dietary.filter(
        (diet, index) => index !== indexToDelete
      );
      setDietary(updatedDiet);
    }
  }

  return (
    <>
    <div className="whole-container">
      <form onSubmit={addIngredient} className="third-section">
        <h3>Ingredients</h3>
          <input
            type="text"
            value={inputValue1}
            onChange={(e) => setInputValue1(e.target.value)}
            placeholder="Enter new ingredient"
            style = {{width: '250px'}}
          />
        <button type="submit">Add</button>
        {ingr.map((item1, index) => (
        <li
        onClick={() => deleteItem(index, 1)}
        onMouseOver={(e) => {
          e.target.style.color = "rgb(192, 45, 26)";
          e.target.style.cursor = "pointer";
        }}
        onMouseOut={(e) => {
          e.target.style.color = "initial";
          e.target.style.cusor = "initial";
        }}
        >
        {item1}
        </li>
      ))}
      </form>
      <form onSubmit={addAllergy} className="third-section">
        <h3>Allergies</h3>
          <input
            type="text"
            value={inputValue2}
            onChange={(e) => setInputValue2(e.target.value)}
            placeholder="Enter new allergy"
            style = {{width: '250px'}}
          />
        <button type="submit">Add</button>
        {allergies.map((item2, index) => (
        <li
        onClick={() => deleteItem(index, 2)}
        onMouseOver={(e) => {
          e.target.style.color = "rgb(192, 45, 26)";
          e.target.style.cursor = "pointer";
        }}
        onMouseOut={(e) => {
          e.target.style.color = "initial";
          e.target.style.cusor = "initial";
        }}
        >
        {item2}
        </li>
      ))}
      </form>
      <form onSubmit={addDietary} className="third-section">
        <h3>Dietary Restrictions</h3>
          <input
            type="text"
            value={inputValue3}
            onChange={(e) => setInputValue3(e.target.value)}
            placeholder="Enter new dietary restriction"
            style = {{width: '250px'}}
          />
        <button type="submit">Add</button>
        {dietary.map((item3, index) => (
        <li
        onClick={() => deleteItem(index, 3)}
        onMouseOver={(e) => {
          e.target.style.color = "rgb(192, 45, 26)";
          e.target.style.cursor = "pointer";
        }}
        onMouseOut={(e) => {
          e.target.style.color = "initial";
          e.target.style.cusor = "initial";
        }}
        >
        {item3}
        </li>
      ))}
      </form>
    </div>
    <div className="center-container">
      <button onClick={handleGenerateClick} disabled={isLoading}>
        {isLoading ? "Generating..." : "Generate Recipe"}
      </button>
    </div>
      
        {recipe && (
          <>
          <div style={{border: '3px solid black'}}>
            <ReactMarkdown children={recipe} />
            <div className="center-container">
              <button onClick={handleSaveClick} style={{marginTop: '0px'}}>Save Recipe</button>
            </div>
          </div>
          </>
        )}
    </>
  );
}

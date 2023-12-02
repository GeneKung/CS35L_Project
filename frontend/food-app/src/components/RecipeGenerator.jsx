import { useState } from "react";
import generateRecipe from "../generateRecipe";
import ReactMarkdown from "react-markdown";
import { saveRecipe } from "../database/recipes";

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

  return (
    <>
      <form onSubmit={addIngredient}>
        <label>
          New Ingredient:
          <input
            type="text"
            value={inputValue1}
            onChange={(e) => setInputValue1(e.target.value)}
          />
        </label>
        <button type="submit">Add</button>
      </form>
      <form onSubmit={addAllergy}>
        <label>
          New Allergy:
          <input
            type="text"
            value={inputValue2}
            onChange={(e) => setInputValue2(e.target.value)}
          />
        </label>
        <button type="submit">Add</button>
      </form>
      <form onSubmit={addDietary}>
        <label>
          New Dietary Restriction:
          <input
            type="text"
            value={inputValue3}
            onChange={(e) => setInputValue3(e.target.value)}
          />
        </label>
        <button type="submit">Add</button>
      </form>

      <button onClick={handleGenerateClick} disabled={isLoading}>
        {isLoading ? "Generating..." : "Generate Recipe"}
      </button>

      <button onClick={handleSaveClick}>Save Recipe</button>

      <h3>Ingredients:</h3>
      {ingr.map((item1) => (
        <div>{item1}</div>
      ))}

      <h3>Allergies:</h3>
      {allergies.map((item2) => (
        <div>{item2}</div>
      ))}

      <h3>Dietary Restrictions:</h3>
      {dietary.map((item3) => (
        <div>{item3}</div>
      ))}

      <div>
        {recipe && (
          <>
            <h2>Generated Recipe</h2>
            <ReactMarkdown children={recipe} />
          </>
        )}
      </div>
    </>
  );
}

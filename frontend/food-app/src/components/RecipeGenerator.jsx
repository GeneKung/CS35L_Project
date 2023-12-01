import { useState } from "react";
import generateRecipe from "../generateRecipe";
import ReactMarkdown from 'react-markdown';
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

  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);
  const [note, setNote] = useState('');
  
  const handleGenerateClick = async () => {
    setIsLoading(true);
    try {
      const generatedRecipe = await generateRecipe(ingr, dietary, allergies);
      setRecipe(generatedRecipe);

      // Split the recipe content by newline characters
      const sections = generatedRecipe.split('\n');

      // Extract title (first line)
      const title = sections[0].trim();

      // Extract ingredients (array from the contents after "**Ingredients:**")
      const ingredientsIndex = sections.indexOf('**Ingredients:**');
      const instructionsIndex = sections.indexOf('**Instructions:**');
      const noteIndex = sections.indexOf('**Note:**');

      const ingredients = sections
        .slice(ingredientsIndex + 1, instructionsIndex)
        .map(item => item.trim())
        .filter(item => item !== '' && /^\d+\./.test(item));

      // Extract instructions (array from the contents after "**Instructions:**")
      const instructions = sections
        .slice(instructionsIndex + 1, noteIndex > -1 ? noteIndex : undefined)
        .map(item => item.trim())
        .filter(item => item !== '' && /^\d+\./.test(item));

      // Extract note (if present)
      const note = noteIndex > -1 ? sections.slice(noteIndex).join('\n').trim() : null;

      setTitle(title);
      console.log("title: " , title);
      setIngredients(ingredients);
      console.log("ingredients: ", ingredients);
      setInstructions(instructions);
      console.log("instructions: ", instructions);
      setNote(note);
      console.log("note: ", note);

    } catch (error) {
      console.error("Failed to generate recipe:", error);
    }
    setIsLoading(false);
  };
  
  // TODO delete
  const handleSaveClick = () => {
    try {
      const userIngredient = [...ingr];
      console.log("ingredients: " , userIngredient);
      const userAllergies = [...allergies];
      console.log("allergies: " , userAllergies);
      const userDietary = [...dietary];
      console.log("dietary: " , userDietary);
      const recipeTitle = title;
      console.log("title: ", recipeTitle);
      const recipeIngredients = [...ingredients];
      console.log("Recipe-Ingredients: ", recipeIngredients);
      const recipeInstructions = [...instructions];
      console.log("Instructions: ", recipeInstructions);
      const recipeNote = note;
      console.log("Note: ", recipeNote);

      saveRecipe(userIngredient, userAllergies, userDietary, recipeTitle, recipeIngredients, recipeInstructions, recipeNote);
    } catch (e) {
      console.error("Error saving recipie: " , e);
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
         {isLoading ? 'Generating...' : 'Generate Recipe'}
      </button>

      <button onClick={handleSaveClick}>
          Save Recipe (Test Function)
      </button>

      <h3>Ingredients:</h3>
      {ingr.map(item1 =>( 
        <div>{item1}</div>
      ))}

      <h3>Allergies:</h3>
      {allergies.map(item2 =>( 
        <div>{item2}</div>
      ))}

      <h3>Dietary Restrictions:</h3>
      {dietary.map(item3 =>( 
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

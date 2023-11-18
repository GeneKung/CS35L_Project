import { useState } from "react";
import generateRecipe from "../../generateRecipe";
import ReactMarkdown from 'react-markdown';

function Fridge(props) {
  const [ingr, setIngr] = useState([]);
  const [inputValue1, setInputValue1] = useState("");
  const [recipe, setRecipe] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function addIngredient(e){
    e.preventDefault();
    if (inputValue1 === "") return;
    setIngr((prev) => [...prev, inputValue1]);
    setInputValue1(""); // Clear input value after adding
  }

  const handleGenerateClick = async () => {
    setIsLoading(true);
    try {
      const generatedRecipe = await generateRecipe(ingr, props.diet, props.allergy);
      setRecipe(generatedRecipe);
    } catch (error) {
      console.error("Failed to generate recipe:", error);
    }
    setIsLoading(false);
  };
  
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
    <button onClick={handleGenerateClick} disabled={isLoading}>
        {isLoading ? 'Generating...' : 'Generate Recipe'}
    </button>
    <h3>Saved Ingredients:</h3>
    {ingr.map(item1 =>( 
      <div>{item1}</div>
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
  )
}

export default Fridge;

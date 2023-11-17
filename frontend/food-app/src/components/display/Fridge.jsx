import { useState } from "react";
import generateRecipe from "../../generateRecipe";

function Fridge(props) {
  const [ingr, setIngr] = useState([]);
  const [inputValue1, setInputValue1] = useState("");

  function addIngredient(e){
    e.preventDefault();
    if (inputValue1 === "") return;
    setIngr((prev) => [...prev, inputValue1]);
    setInputValue1(""); // Clear input value after adding
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
    <h3>Ingredients:</h3>
    {ingr.map(item1 =>( 
      <div>{item1}</div>
    ))}
    </>
  )
}

export default Fridge;

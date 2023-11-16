import { useRef, useState } from "react"

function Fridge(props) {
  const [ingr, setIngr] = useState([]);
  const inputRef = useRef();
 
  function addIngredient(e){
    e.preventDefault() //prevents deafault behavior of submitting (refresh page)
    const value = inputRef.current.value
    if (value === "") return
    setIngr(prev => { //appends new array value after previous values in ingr list
      return [...prev, value]
    })
    inputRef.current.value = "" //set back to empty string so search term disappears
  }
  
  function generateRecipe(){
    const data = {
      ingredientList: ingr,
      dietaryList: props.diet,
      allergyList: props.allergy
    };
    console.log(data);
  }

  return (
    <>
    <form onSubmit={addIngredient}>
      New Ingredient: <input ref={inputRef} type="text" />
      <button type="submit">Add</button>
      <button onClick={() => generateRecipe()}>Generate</button>
    </form>
    <h3>Ingredients:</h3>
    {ingr.map(item =>( //loop through ingr list with item representing each element
      <div>{item}</div>
    ))}
    </>
  )
}

export default Fridge;

import { useState, useRef} from "react"
import '../templates/Preference.css'
import Fridge from './Fridge'

function Preference(){
    //initial diet restriction
    const initialDiet = [
        { name: 'Lactose Intolerant', checked: false },
        { name: 'Gluten Intolerant', checked: false },
        { name: 'Vegetarian', checked: false },
        { name: 'Vegan', checked: false },
        { name: 'Kosher', checked: false },
        { name: 'Keto', checked: false },
        { name: 'Diabetes', checked: false },
        { name: 'Dairy Free', checked: false },
        { name: 'Low Carb', checked: false },
    ];
    
    const[diet, setDiet] = useState(initialDiet);
    const[allergy, setAllergy] = useState([]);
    const inputRef = useRef();

    //given input dietName, check previousdiet and SetDiet to original or change checkbox if name matches dietName
    function changeDiet(dietName){
        setDiet((prevDiet) => 
            prevDiet.map((checkbox) => checkbox.name === dietName ? {...checkbox, checked: !checkbox.checked} : checkbox))
    }
    function sendDiet(){
      const listOfRestrictions = []
      for (const dict of diet){
        if (dict.checked){
          listOfRestrictions.push(dict.name);
        }
      }
      return listOfRestrictions;
    }

    //add input to allergy string
    function changeAllergy(e){
        e.preventDefault()
        const value = inputRef.current.value
        if (value === "") return
        setAllergy(prev => { //appends new array value after previous values in ingr list
            return [...prev, value]
        })
        inputRef.current.value = "" //set back to empty string so search term disappears
    }

    return (
        <>
        <Fridge diet={sendDiet()} allergy={allergy}/>
        <div className="diet-container">
          <div className="diet-section">
          <h3>Diet</h3>
            <div className="checkbox-group">
            {diet.map((checkbox) => ( //loop through each element in diet
              <label key={checkbox.name}> 
                <input
                  type="checkbox" 
                  checked={checkbox.checked}
                  onChange={() => changeDiet(checkbox.name)}
                />
                {checkbox.name} 
              </label>
            ))}
            </div> 
          </div>
          <div className="allergy-section">
          <form onSubmit={changeAllergy}> 
              <input ref={inputRef} type="text" placeholder="Enter your allergies" />
              <button type="submit">Add</button>
          </form>
          
          {allergy.map(item =>( //loop through allergy list and output item
          <div>{item}</div> 
          ))}
          </div>
        </div>
        </>
      );
}

export default Preference

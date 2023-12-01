import { useState, useRef} from "react"
import './Preference.css'
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
    function deleteAllergy(indexToDelete){
      const updatedAllergy= allergy.filter((allergy, index) => index !== indexToDelete);
      setAllergy(updatedAllergy);
    }

    return (
      <div className="whole-container">
        <div className="left-section">
          <Fridge diet={sendDiet()} allergy={allergy}/>
        </div>
        <div className="middle-section">
          <div className="allergy-container">
          <h3>Saved Allergies:</h3>
          {allergy.map((item, index) => (
            <li
            onClick={() => deleteAllergy(index)}
            onMouseOver={(e) => {e.target.style.color = 'rgb(192, 45, 26)'; e.target.style.cursor = "pointer";}}
            onMouseOut={(e) => {e.target.style.color = 'initial'; e.target.style.cusor = "initial";}}
          >
            {item}
          </li>
          ))}
          </div>
        </div>
        <div className="right-section">
          <div className="diet-container">
            <div className="diet-section">
              <h3>Diet</h3>
              <div className="checkbox-group">
                {diet.map((checkbox) => (
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
              <h3>Allergies</h3>
              <form onSubmit={changeAllergy}> 
                <input ref={inputRef} type="text" placeholder="Enter your allergy" />
                <button type="submit">Add</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
    
}

export default Preference

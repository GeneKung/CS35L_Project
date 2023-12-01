import { useState, useEffect } from "react";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase.js";
import setUpUser from "../../database/setUpUserFiles.js";
import generateRecipe from "../../generateRecipe";
import ReactMarkdown from "react-markdown";

function Fridge(props) {
  const [ingr, setIngr] = useState([]);
  const [inputValue1, setInputValue1] = useState("");
  const [recipe, setRecipe] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = auth.currentUser;

  useEffect(() => {
    const getFridgeData = async () => {
      if (currentUser) {
        const uid = currentUser.uid;
        let userDocRef = doc(db, "users", uid);
        let userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) {
          console.log("Setting up user");
          setUpUser();
          userDocRef = doc(db, "users", uid);
          userDocSnap = await getDoc(userDocRef);

          if (!userDocSnap.exists()) {
            console.log("ERROR - USER DOC SHOULD EXIST BY NOW");
          }
        }

        const userData = userDocSnap.data();
        console.log(userData);
        const fridgeId = userData.fid;

        const fridgeDocRef = doc(db, "fridges", fridgeId);
        const fridgeDocSnap = await getDoc(fridgeDocRef);

        if (fridgeDocSnap.exists()) {
          const fridgeData = fridgeDocSnap.data();
          setIngr(fridgeData.ingredients || []); // Assuming ingredients are stored in 'ingredients'
        }
      }
    };

    getFridgeData();
  }, [currentUser]);

  async function updateFridgeInFirestore(newIngredientList) {
    if (currentUser) {
      const uid = currentUser.uid;
      const userDocRef = doc(db, "users", uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const fridgeId = userData.fid;

        const fridgeDocRef = doc(db, "fridges", fridgeId);
        await updateDoc(fridgeDocRef, { ingredients: newIngredientList });
        console.log("updated doc fridge");
        console.log(newIngredientList);

        // const fridgeDocSnap = await getDoc(fridgeDocRef);

        // if (fridgeDocSnap.exists()) {
        //   const fridgeData = fridgeDocSnap.data();
        //   setIngr(fridgeData.ingredients || []); // Assuming ingredients are stored in 'ingredients'
        //   console.log("updated client fridge");
        //   console.log(fridgeData.ingredients);
        // }
      }
    }
  }

  function addIngredient(e) {
    e.preventDefault();
    if (inputValue1 === "") return;
    const newIngredients = [...ingr, inputValue1];
    setIngr(newIngredients);
    updateFridgeInFirestore(newIngredients);
    setInputValue1(""); // Clear input value after adding
  }

  const handleGenerateClick = async () => {
    setIsLoading(true);
    try {
      const generatedRecipe = await generateRecipe(
        ingr,
        props.diet,
        props.allergy
      );
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
        {isLoading ? "Generating..." : "Generate Recipe"}
      </button>
      <h3>Saved Ingredients:</h3>
      {ingr.map((item1) => (
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
  );
}

export default Fridge;

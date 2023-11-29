import { useState, useEffect } from "react";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase.js";
import { useAuth } from "../auth/AuthContext";
import generateRecipe from "../../generateRecipe";
import ReactMarkdown from "react-markdown";

function Fridge(props) {
  const [ingr, setIngr] = useState([]);
  const [inputValue1, setInputValue1] = useState("");
  const [recipe, setRecipe] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const currentUser = useAuth();

  useEffect(() => {
    const getFridgeData = async () => {
      if (currentUser) {
        const userDocRef = doc(db, "users", currentUser.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          const fridgeId = userData.fridgeId;

          const fridgeDocRef = doc(db, "fridges", fridgeId);
          const fridgeDocSnap = await getDoc(fridgeDocRef);

          if (fridgeDocSnap.exists()) {
            const fridgeData = fridgeDocSnap.data();
            setIngr(fridgeData.ingredients || []); // Assuming ingredients are stored in 'ingredients'
          }
        }
      }
    };

    getFridgeData();
  }, [currentUser]);

  async function updateFridgeInFirestore(newIngredientList) {
    if (currentUser) {
      const userDocRef = doc(db, "users", currentUser.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const fridgeId = userData.fridgeId;

        const fridgeDocRef = doc(db, "fridges", fridgeId);
        await updateDoc(fridgeDocRef, { ingredients: newIngredientList });

        if (fridgeDocSnap.exists()) {
          const fridgeData = fridgeDocSnap.data();
          setIngr(fridgeData.ingredients || []); // Assuming ingredients are stored in 'ingredients'
        }
      }
    }
  }

  function addIngredient(e) {
    e.preventDefault();
    if (inputValue1 === "") return;
    setIngr((prev) => [...prev, inputValue1]);
    updateFridgeInFirestore(ingr);
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

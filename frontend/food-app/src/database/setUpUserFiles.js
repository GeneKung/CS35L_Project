import { auth, db } from "../firebase.js";
import { doc, updateDoc, setDoc } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";

export default async function setUpUser() {
  try {
    const user = auth.currentUser;
    const uid = user.uid;
    console.log(uid);
    await setDoc(doc(db, "users", uid), {});

    const fridgeRef = await addDoc(collection(db, "fridges"), {
      ingredients: [],
      allergies: [],
      diet: {
        lactoseIntolerant: false,
        glutenIntolerant: false,
        vegetarian: false,
        vegan: false,
        kosher: false,
        keto: false,
        diabetes: false,
        dairyFree: false,
        lowCarb: false,
      },
    });
    const fridge_id = fridgeRef.id;

    const recipeRef = await addDoc(collection(db, "recipes"), {
      recipes: [],
    });
    const recipe_id = recipeRef.id;

    const userRef = doc(db, "users", uid);
    await updateDoc(userRef, {
      fid: fridge_id,
      rid: recipe_id,
    });
  } catch (e) {
    console.error("Error setting up user files: ", e);
  }
}

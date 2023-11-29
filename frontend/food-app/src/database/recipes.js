import { addDoc, getDoc, collection, deleteDoc, setDoc, doc, updateDoc, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase.js";

export async function saveRecipe(ingredients, allergies, dietary, recipeTitle, recipeIngredients, recipeInstructions, recipeNote) {
    try {
        const currentUser = auth.currentUser;

        if (currentUser) {
            const uid = currentUser.uid;
            const userRef = doc(db, "users", uid);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                const recipe_id = userDoc.data().rid;
                if(recipe_id) {
                    const recipeRef = doc(db, "recipes", recipe_id);
                    // Create a new recipe document within a subcollection
                    const recipesCollectionRef = collection(recipeRef, "recipes");
                    const newRecipeRef = doc(recipesCollectionRef);
                    // Use setDoc to create a new document for the recipe
                    await setDoc(newRecipeRef, {
                        ingredients,
                        allergies,
                        dietary,
                        recipeTitle,
                        recipeIngredients,
                        recipeInstructions,
                        recipeNote,
                    });
                    console.log("Recipe document successfully created");
                } else {
                    console.log("User does not have a recipe document.");
                }
            } else {
                console.log('User document not found');
            }
        } else {
            console.log('User not authenticated');
        }
    } catch (e) {
        console.error("Error saving recipe: ", e);
    }
}

export async function getAllRecipes() {
    try {
        const currentUser = auth.currentUser;

        if (currentUser) {
            const uid = currentUser.uid;
            const userRef = doc(db, "users", uid);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                const recipe_id = userDoc.data().rid;
                if (recipe_id) {
                    // Reference to the user's specific recipe document
                    const recipeRef = doc(db, "recipes", recipe_id);

                    // Reference to the 'recipes' subcollection within the user's recipe document
                    const recipesCollectionRef = collection(recipeRef, "recipes");

                    // Use getDocs to retrieve all documents within the 'recipes' subcollection
                    const querySnapshot = await getDocs(recipesCollectionRef);

                    // Extract data from each document
                    const recipes = querySnapshot.docs.map(doc => doc.data());

                    return recipes;
                } else {
                    console.log("User does not have a recipe document.");
                }
            } else {
                console.log('User document not found');
            }
        } else {
            console.log('User not authenticated');
        }
    } catch (e) {
        console.error("Error getting recipes: ", e);
    }
}

/*
export async function saveRecipe(ingredients, allergies, dietary, recipeTitle, recipeIngredients, recipeInstructions, recipeNote) {
    try {
        const currentUser = auth.currentUser;

        if(currentUser) {
            const uid = currentUser.uid;
            const userRef = doc(db, "users", uid);
            const userDoc = await getDoc(userRef);

            if(userDoc.exists()) {
                // Check if the user has a recipe ID
                const recipe_id = userDoc.data().rid;
                if(recipe_id) {
                    const recipeRef = doc(db, "recipes", recipe_id);
                    await updateDoc(recipeRef, {
                        ingredients: ingredients,
                        allergies: allergies,
                        dietary: dietary,
                        recipeTitle: recipeTitle,
                        recipeIngredients: recipeIngredients, 
                        recipeInstructions: recipeInstructions,
                        recipeNote: recipeNote,
                    });
                    console.log("Recipe document successfully updated with new data");
                } else {
                    console.log("User does not have a recipe document.");
                }
            } else {
                console.log('User document not found');
            }
        } else {
            console.log('User not authenticated');
        }
    } catch (e) {
        console.error("Error saving recipe: ", e);
    }
}



export async function getRecipe() {
    try {
      const currentUser = auth.currentUser;
  
      if (currentUser) {
        const uid = currentUser.uid;
        const userRef = doc(db, "users", uid);
        const userDoc = await getDoc(userRef);
  
        if (userDoc.exists()) {
          // Check if the user has a recipe ID
          const recipe_id = userDoc.data().rid;
          if (recipe_id) {
            const recipeRef = doc(db, "recipes", recipe_id);
            const recipeDoc = await getDoc(recipeRef);
  
            if (recipeDoc.exists()) {
              // Return the recipe data
              return recipeDoc.data();
            } else {
              console.log("Recipe document not found.");
            }
          } else {
            console.log("User does not have a recipe document.");
          }
        } else {
          console.log("User document not found");
        }
      } else {
        console.log("User not authenticated");
      }
    } catch (e) {
      console.error("Error getting recipe: ", e);
    }
  }
*/

/*
export async function saveRcipe(ingredients, allergies, dietary) {
    try {
        const { currentUser } = useAuth();

        if(currentUser) {
            const userRef = doc(db, "users", auth.currentUser.uid);
            const userDoc = await getDoc(userRef);

            if(userDoc.exists()) {
                // Check if the user has a recipe ID
                const recipe_id = userDoc.data().rid;
                if(recipe_id) {
                    const recipeRef = doc(db, "recipes", recipe_id);
                    await updateDoc(recipeRef, {
                        ingredients: ingredients,
                        allergies: allergies,
                        dietary: dietary,
                    });
                    console.log("Recipe document successfully updated with new data");
                } else {
                    console.log("User does not have a recipe document.");
                }
            } else {
                console.log('User document not found');
            }
        } else {
            console.log('User not authenticated');
        }
    } catch (e) {
        console.error("Error saving recipe: ", e);
    }
}


export async function saveRcipe(recipeData) {
    try {
        const docRef = await addDoc(collection(db, "recipes"), recipeData);
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export async function getRecipe(recipeID) {
    try {
        const docSnap = await getDoc(doc(db, "recipes", recipeID));
        if(docSnap.exists()) {
            console.log("Recipe data:", docSnap.data());
            return docSnap.data();
        } else {
            console.log("No such document!");
        }
    } catch (e) {
        console.error("Error getting document: ", e);
    }
}

export async function updateRecipe(recipeID, updatedRecipe) {
    try {
        const { currentUser } = useAuth();

        if(currentUser) {
            const userRef = doc(db, "users", currentUser.uid);

            const userDoc = await getDoc(userRef);
            if(userDoc.exists()) {
                await setDoc(doc(db, "recipes", recipeID), updatedRecipe, {merge: true});
                console.log("Document successfully updated!");
            } else {
                console.log('User document not found');
            }
        } else {
            console.log('User not authenticated');
        }
    } catch (e) {
        console.error("Error updating document: ", e);
    }
}

export async function deleteRecipe(recipeID) {
    try {
        const { currentUser } = useAuth();

        if(currentUser) {
            const userRef = doc(db, "users", currentUser.uid);

            const userDoc = await getDoc(userRef);
            if(userDoc.exists()) {
                await deleteDoc(doc(db, "recipes", recipeID));
                console.log("Document successfully deleted!");
            } else {
                console.log('User document not found');
            }
        } else {
            console.log('User not authenticated');
        }
    } catch (e) {
        console.error("Error deleting document: " , e);
    }
}


*/
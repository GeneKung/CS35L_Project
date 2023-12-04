import { getDoc, collection, deleteDoc, setDoc, doc, updateDoc, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase.js";

export async function saveRecipe(generatedRecipe) {
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
                        generatedRecipe,
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
  
            // Extract data and IDs from each document
            const recipesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            console.log("data: ", recipesData);
  
            return recipesData;
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

export async function searchSharedRecipes_List(tags) {
    const lowerTags = tags.map(string => string.toLowerCase());
    const resultList = []

    for (let i = 0; i < tags.length; i++) {
        await resultList.append(searchSharedRecipes(tags[i]));
    }

    const unionArray = [...new Set(resultList.flat())];
    const recipesData = [];

    for (const docId of unionArray) {
        const recipeRef = doc(db, "sharedRecipes", docId);
        recipesData.append({ id: recipeRef.id, ...recipeRef.data() });
        console.log("data: ", recipesData);
    }

    return recipesData;
}

export async function searchSharedRecipes(tag) {
    const lowerTag = tag.toLowerCase();
    const sharedRef = collection(db, "sharedRecipes");
    const query = sharedRef.where('tags', 'array-contains', lowerTag);

    query.get()
        .then(snapshot => {
            if (snapshot.empty) {
                console.log('No matching documents.');
                return [];
            }
            
            snapshot.forEach(doc => {
                const matchingIds = [];
                matchingIds.push(doc.id);
                return matchingIds;
            });
        })
        .catch(error => {
            console.log('Error getting documents', error);
            return [];
        });

}

export async function deleteRecipe(recipeID) {
    try {
        const currentUser = auth.currentUser;
        if (currentUser) {
            const uid = currentUser.uid;
            const userRef = doc(db, "users", uid);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                console.log("ID: ", recipeID);

                const recipeRef = doc(db, "recipes", userDoc.data().rid, "recipes", recipeID);
                const recipeDoc = await getDoc(recipeRef);

                if (recipeDoc.exists()) {
                    const result = await deleteDoc(recipeRef);
                    console.log("Delete result: ", result);
                    console.log("Recipe document successfully deleted.");
                } else {
                    console.log("Recipe document not found.");
                }
            } else {
                console.log("User document not found.");
            }
        } else {
            console.log("User not authenticated.");
        }
    } catch (e) {
        console.error("Error deleting recipe: ", e);
    }
}

export async function updateRecipe(recipeID, updatedRecipe) {
    try {
        const currentUser = auth.currentUser;
        if (currentUser) {
            const uid = currentUser.uid;
            const userRef = doc(db, "users", uid);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                const recipeRef = doc(db, "recipes", userDoc.data().rid, "recipes", recipeID);
                const recipeDoc = await getDoc(recipeRef);

                if (recipeDoc.exists()) {
                    await updateDoc(recipeRef, {
                        generatedRecipe: updatedRecipe,
                    });
                    console.log("Recipe updated successfully");
                } else {
                    console.log("Recipe document not found.");
                }
            } else {
                console.log("User document not found.");
            }
        } else {
            console.log("user not authenticated");
        }
    } catch (e) {
        console.error("Error updating recipe: ", e);
    }
}

export async function saveSharedRecipe(recipeID, recipeData) {
    try {
        const currentUser = auth.currentUser;

        if (currentUser) {
            const uid = currentUser.uid;

            // Reference to the sharedRecipes collection
            const sharedRecipesCollectionRef = collection(db, "sharedRecipes");

            // Use setDoc to create a new document for the shared recipe
            await setDoc(doc(sharedRecipesCollectionRef, recipeID), {
                sharedBy: uid,
                sharedAt: new Date(),
                recipeData: recipeData,
            });

            console.log("Shared recipe document successfully created");
        } else {
            console.log('User not authenticated');
        }
    } catch (e) {
        console.error("Error saving shared recipe: ", e);
    }
}

export async function getAllSharedRecipes() {
    try {
        const currentUser = auth.currentUser;
        
        if (currentUser) {
            const sharedRecipeRef = doc(db, "sharedRecipes");
            const querySnapshot = await getDocs(sharedRecipeRef);

            const sharedRecipes = [];
            querySnapshot.forEach((doc) => {
                // Access data from each document
                const recipeData = doc.data();
                sharedRecipes.push({
                    recipeID: doc.id,
                    sharedBy: recipeData.sharedBy,
                    sharedAt: recipeData.sharedAt.toDate(), // Convert timestamp to Date object
                    recipeData: recipeData.recipeData,
                });
            });
            console.log("All shared recipes successfully retrieved:", sharedRecipes);
            return sharedRecipes;
        } else {
            console.log("User not authenticated.");
        }
    } catch (e) {
        console.error("Error getting shared recipes: ", e);
    }
}


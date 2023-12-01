import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase.js";
import setUpUser from "./setUpUserFiles.js";

// This document fridgeFirestore includes helper functiosn for Fridge and Preference components to interact with Firebase.
// "fridge" refers to the entire fridge composed of "Fridge" and "Preference" components

// Gets currentUser's fridge document data
async function getFridgeData(currentUser) {
  try {
    if (!currentUser) {
      console.error("No current user found");
    } else {
      // Get the user's "users" doc data
      const uid = currentUser.uid;
      let userDocRef = doc(db, "users", uid);
      let userDocSnap = await getDoc(userDocRef);

      // If there is no matching doc in "users" collection, initalize the user's docs
      if (!userDocSnap.exists()) {
        setUpUser();
        userDocRef = doc(db, "users", uid);
        userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) {
          console.error(
            "Couldn't find user's \"users\" doc, even after attempting setup"
          );
        }
      }

      // Get the user's "fridges" doc data and return it as an object
      const userData = userDocSnap.data();
      const fridgeId = userData.fid;

      const fridgeDocRef = doc(db, "fridges", fridgeId);
      const fridgeDocSnap = await getDoc(fridgeDocRef);

      if (!fridgeDocSnap.exists()) {
        console.error("Couldn't find user's \"fridges\" doc");
      }

      const fridgeData = fridgeDocSnap.data();
      return fridgeData;
    }
  } catch (error) {
    console.error("An error ocurred while getting fridge:", error);
  }
}

// Updates currentUser's fridge document data, newFridgeData is an object consisting of document fields and updated field values
export async function updateFridgeInFirestore(currentUser, newFridgeData) {
  try {
    if (!currentUser) {
      console.error("No current user found");
    } else {
      // Get the user's "users" doc data
      const uid = currentUser.uid;
      let userDocRef = doc(db, "users", uid);
      let userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        console.error("Couldn't find user's \"users\" doc");
      }

      // Update the user's "fridges" doc
      const userData = userDocSnap.data();
      const fridgeId = userData.fid;

      const fridgeDocRef = doc(db, "fridges", fridgeId);
      const fridgeDocSnap = await getDoc(fridgeDocRef);

      if (!fridgeDocSnap.exists()) {
        console.error("Couldn't find user's \"fridges\" doc");
      }

      await updateDoc(fridgeDocRef, newFridgeData);
    }
  } catch (error) {
    console.error("An error ocurred while updating fridge:", error);
  }
}

// Gets fridge ingredients data
export async function getFridgeIngredients(currentUser) {
  const fridgeData = getFridgeData(currentUser);
  return fridgeData.ingredients;
}

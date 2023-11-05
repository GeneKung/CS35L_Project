import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.js";

export default function SignUpPrompt() {
  const [email, setEmail] = useState("test@gmail.com");
  const [password, setPassword] = useState("testpass");

  const handleSignup = async () => {
    // // First check that email and password are valid (meets length requirements, has special chars, etc.)
    // try {
    //   const userCredential = await createUserWithEmailAndPassword(
    //     auth,
    //     email,
    //     password
    //   );
    //   // Handle successful signup
    //   console.log("Signed up user:", userCredential.user);
    // } catch (error) {
    //   // Error handling
    //   console.error("Error signing up:", error);
    // }
  };

  return <button onClick={handleSignup}>Sign Up</button>;
}

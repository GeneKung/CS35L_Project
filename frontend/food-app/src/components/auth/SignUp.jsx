import { useState } from "react";
import "./SignIn.css";
import { auth } from "../../firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

export default function LoginPrompt() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSignup = async () => {
    // First check that email and password are valid (meets length requirements, has special chars, etc.)
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        username,
        password
      );
      // Handle successful signup
      console.log("Signed up user:", userCredential.user);
      try {
        await signInWithEmailAndPassword(auth, username, password);
        // User is signed in.
        console.log("User," , username, "is signed in");
        navigate("/", { replace: true });
      } catch (error) {
        handleFireBaseError(error);
        console.error(error);
      }
    } catch (error) {
      // Error handling
      handleFireBaseError(error);
      console.error("Error signing up:", error);
    }
  };

  const handleFireBaseError = (error) => {
    // Map Firebase authentication errors to user-friendly messages
    switch (error.code) {
      case "auth/invalid-email":
        setError("Invalid email address. Please provide a valid email.");
        break;
      case "auth/user-not-found":
        setError("User not found. Please sign up before logging in.");
        break;
      case "auth/wrong-password":
        setError("Wrong password. Please check your password.");
        break;
      // Add more cases for other Firebase error codes as needed
      default:
        setError("An error occurred. Please try again later.");
        break;
    }
  };

  return (
    <div className="Login-prompt">
      <div className="Login-text">
        <label htmlFor="uname">
          <b>Username</b>
        </label>
        <br />
        <input
          className="login-textbox"
          type="text"
          placeholder="Enter Username"
          name="uname"
          onInput={(e) => setUsername(e.target.value)}
        />
        <br />

        <label htmlFor="psw">
          <b>Password</b>
        </label>
        <br />
        <input
          className="login-textbox"
          type="password"
          placeholder="Enter Password"
          name="psw"
          onInput={(e) => setPassword(e.target.value)}
        />
        <br />

        <button className="button login-button" type="submit" onClick={() => handleSignup()}>
          Sign Up and Login
        </button>

        <p>
          Already have an account? <Link to="/signin">Sign In</Link>
        </p>

        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
}

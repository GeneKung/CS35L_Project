import { useState } from "react";
import "./SignIn.css";
import { auth, db } from "../../firebase.js";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";
import setUpUser from "../../database/setUpUserFiles.js";

export default function LoginPrompt() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const login = async () => {
    console.log("Username: " + username);
    console.log("Password: " + password);
    try {
      await signInWithEmailAndPassword(auth, username, password);
      console.log("User is signed in.");

      // Get the user's "users" doc data
      console.log("Checking that user has been setup properly.");
      try {
        const uid = auth.currentUser.uid;
        let userDocRef = doc(db, "users", uid);
        let userDocSnap = await getDoc(userDocRef);

        if (!userDocSnap.exists()) {
          console.log("Couldn't find user's \"users\" doc. Setting up.");
          await setUpUser();
        }
      } catch (error) {
        console.error(error);
        await signOut(auth);
        setError("Unable to login. Please try again later.");
      }

      // Navigate to Home
      console.log("User is signed in and is properly setup.");
      navigate("/", { replace: true });
    } catch (error) {
      handleFireBaseError(error);
      console.error(error);
    }
  };

  const handleFireBaseError = (error) => {
    // Map Firebase authentication errors to user-friendly messages
    switch (error.code) {
      case "auth/invalid-login-credentials":
        setError("Invalid username or password");
        break;
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

        <button
          className="button login-button"
          type="submit"
          onClick={() => login()}
        >
          Login
        </button>

        <label>
          <input type="checkbox" name="remember" /> Remember me <br />
        </label>

        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>

        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
}

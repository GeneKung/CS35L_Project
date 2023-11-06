import { useState } from "react";
import "./SignIn.css";
import { auth } from "../../firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function LoginPrompt() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const login = async () => {
    console.log("Username: " + username);
    console.log("Password: " + password);
    try {
     await signInWithEmailAndPassword(auth, username, password);
      // User is signed in.
      console.log("User is signed in.");
    } catch (error) {
      setError(error.message);
      console.error(error);
    }
  }

  return (
    <div className="Login-prompt">
      <div className="Login-text">
        <label htmlFor="uname">
          <b>Username</b>
        </label>
        <br />
        <input
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
          type="password"
          placeholder="Enter Password"
          name="psw"
          onInput={(e) => setPassword(e.target.value)}
        />
        <br />

        <button type="submit" onClick={() => login()}>
          Login
        </button>

        <label>
          <input type="checkbox" name="remember" /> Remember me <br />
        </label>

        <span className="psw">
          Forgot <a href="#">password?</a>
        </span>

        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
}

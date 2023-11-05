import { useState } from "react";
import "./SignIn.css";

export default function LoginPrompt() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  function login() {
    console.log("Username: " + username);
    console.log("Password: " + password);
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
      </div>
    </div>
  );
}

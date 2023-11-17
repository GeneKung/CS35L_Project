import { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import { signOut } from 'firebase/auth'; 
import { auth } from "../../firebase.js";
import { useNavigate } from "react-router-dom";

export default function Header() {

  const navigate = useNavigate();
  const handleLogOut = async () => {
    signOut(auth)
      .then(() => {
        console.log("User logged out");
        navigate("/", { replace: true });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="Header">
      <div className="Logo">
        <h1>Food-App</h1>
      </div>
      <div className="Right">
        <div className="Tabs">
        <Link to="/" style={{ textDecoration: "none" }}>
            <div className="Menu-Item">
              <button className="Menu-Button">Home</button>
            </div>
          </Link>
          <Link to="/fridge" style={{ textDecoration: "none" }}>
            <div className="Menu-Item">
              <button className="Menu-Button">My Fridge</button>
            </div>
          </Link>
          <Link to="/saved" style={{ textDecoration: "none" }}>
            <div className="Menu-Item">
              <button className="Menu-Button">Saved Recipes</button>
            </div>
          </Link>
        </div>
        <div className="Login">
          <button class="Login-Button" onClick={() => handleLogOut()}>Log Out</button>
        </div>
      </div>
    </div>
  );
}

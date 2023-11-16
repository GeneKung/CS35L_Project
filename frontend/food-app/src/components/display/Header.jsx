import { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="Header">
      <div className="Logo">
        <h1>Food-App</h1>
      </div>
      <div className="Right">
        <div className="Tabs">
          <Link to="/fridge" style={{ textDecoration: "none" }}>
            <div className="Menu-Item">
              <button className="Menu-Button">My Fridge</button>
            </div>
          </Link>
          <Link to="/saved" style={{ textDecoration: "none" }}>
            <div className="Menu-Item">
              <button className="Menu-Button">Saved Recipies</button>
            </div>
          </Link>
        </div>
        <div className="Login">
          <button class="Login-Button">Log In</button>
        </div>
      </div>
    </div>
  );
}

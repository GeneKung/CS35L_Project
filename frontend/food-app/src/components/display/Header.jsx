import { useState } from "react";
import "./Header.css";

export default function Header() {
  return (
    <div className="Header">
      <div className="Logo">
        <h1>Food-App</h1>
      </div>
      <div className="Right">
        <div className="Tabs">
          <div className="Menu-Item">
            <button className="Menu-Button">My Fridge</button>
          </div>
          <div className="Menu-Item">
            <button className="Menu-Button">Saved Recipies</button>
          </div>
        </div>
        <div className="Login">
          <button class="Login-Button">Log In</button>
        </div>
      </div>
    </div>
  );
}

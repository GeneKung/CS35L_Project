import "./Header.css";
import { Link } from "react-router-dom";
import { signOut } from 'firebase/auth'; 
import { auth } from "../../firebase.js";
import { useNavigate } from "react-router-dom";
import React, { useState } from 'react';
import logo from "../../images/food-app-logo.png";

export default function Header() {
  const [currentPage, setCurrentPage] = useState("home");

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

  console.log(currentPage);
  return (
    <div className="Header">
      <div className="Logo">
        <Link to="/" style={{ textDecoration: "none" }}>
          <div className="Menu-Item">
            <img src={logo} alt="Logo" className="styled-image" onClick={() => setCurrentPage("home")}/>
            <button className="Menu-Button" onClick={() => setCurrentPage("home")}><h1>Food-App.AI</h1></button>
          </div>
        </Link>
      </div>
      <div className="Right">
        <div className="Tabs">
        <Link to="/" style={{ textDecoration: "none" }}>
            <div className="Menu-Item">
              {currentPage === "home" ? 
              (<button className="Menu-Button" style={{color: "black", fontWeight: "1000"}}>Home</button>) : 
              (<button className="Menu-Button" onClick={() => setCurrentPage("home")}>Home</button>)}
            </div>
          </Link>
          <Link to="/fridge" style={{ textDecoration: "none" }}>
            <div className="Menu-Item">
            {currentPage === "fridge" ? 
              (<button className="Menu-Button" style={{color: "black", fontWeight: "1000"}}>My Fridge</button>) : 
              (<button className="Menu-Button" onClick={() => setCurrentPage("fridge")}>My Fridge</button>)}
            </div>
          </Link>
          <Link to="/saved" style={{ textDecoration: "none" }}>
            <div className="Menu-Item">
            {currentPage === "saved" ? 
              (<button className="Menu-Button" style={{color: "black", fontWeight: "1000"}}>Saved Recipes</button>) : 
              (<button className="Menu-Button" onClick={() => setCurrentPage("saved")}>Saved Recipes</button>)}
            </div>
          </Link>
          <Link to="/search" style={{ textDecoration: "none" }}>
            <div className="Menu-Item">
            {currentPage === "search" ? 
              (<button className="Menu-Button" style={{color: "black", fontWeight: "1000"}}>Search Reccipes</button>) : 
              (<button className="Menu-Button" onClick={() => setCurrentPage("search")}>Search Recipes</button>)}
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

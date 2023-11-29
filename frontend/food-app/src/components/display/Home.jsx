import "./Home.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <div className="opening">
        <div className="open-text">
          <h1>Generate Recipes with AI</h1>
          <p> Welcome to Food-App! This is a website where you can generate recipes based on the ingredients you have available, as well as your dietary restrictions and allergies!</p>  
          <Link to="/fridge"><button className="open-button">Get Started</button></Link>
        </div>
        <div className="open-image-container">
          <img className="open-image" src={require("../../images/kitchen.png")} alt=""></img>
        </div>
      </div>

      <div className="home-menu">
        <div className="home-menu-container">
          <div className="home-menu-grid">
            <Link to="/fridge" style={{ textDecoration: "none" }}>
            <div className="home-menu-card">
              <h2>Fridge</h2>
              <p>Visit your fridge, where you can keep a log of the ingredients you have available</p>
            </div>
            </Link>
            <Link to="/generate" style={{ textDecoration: "none" }}>
              <div className="home-menu-card">
                <h2>Generate Recipes</h2>
                <p>Generate a recipe from scratch by entering ingredients and other details</p>
              </div>
            </Link>
            <Link to="/saved" style={{ textDecoration: "none" }}>
              <div className="home-menu-card">
                <h2>Saved Recipes</h2>
                <p>View previous recipes that you saved for later!</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

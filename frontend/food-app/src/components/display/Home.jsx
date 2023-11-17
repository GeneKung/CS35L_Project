import "./Home.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <h1>Generate Recipes with AI</h1>
      <p> Welcome to Food-App! This is a website where you can generate recipes based on the ingredients you have available, as well as your dietary restrictions and allergies!</p>
      <div className="container">
        <div className="grid">
          {/* <Link to="/ingredients" style={{ textDecoration: "none" }}> */}
          <div className="card">
            <h2>Fridge</h2>
            <p>Visit your fridge, where you can keep a log of the ingredients you have available</p>
          </div>
          {/* </Link> */}
          <Link to="/generate" style={{ textDecoration: "none" }}>
            <div className="card">
              <h2>Generate Recipes</h2>
              <p>Generate a recipe from scratch by entering ingredients and other details</p>
            </div>
          </Link>
          <Link to="/saved" style={{ textDecoration: "none" }}>
            <div className="card">
              <h2>Saved Recipes</h2>
              <p>View previous recipes that you saved for later!</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

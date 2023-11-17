import "./Home.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <h1>Generate Recipes with AI</h1>
      <div className="container">
        <div className="grid">
          {/* <Link to="/ingredients" style={{ textDecoration: "none" }}> */}
          <div className="card">
            <h2>Add Ingredients</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </div>
          {/* </Link> */}
          <Link to="/generate" style={{ textDecoration: "none" }}>
            <div className="card">
              <h2>Generate Recipes</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </Link>
          <Link to="/saved" style={{ textDecoration: "none" }}>
            <div className="card">
              <h2>Save Recipes</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}

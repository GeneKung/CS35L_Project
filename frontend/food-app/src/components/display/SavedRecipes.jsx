import "./SavedRecipies.css";

export default function SavedRecipies() {
  return (
    <body>
      <header>
        <h1>Saved Recipes</h1>
      </header>
      <div className="container">
        <div className="recipe">
          <img src="recipe1.jpg" alt="Recipe 1" />
          <div className="recipe-info">
            <h2>Recipe 1</h2>
            <p>
              This is a delicious recipe that you saved for later. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>
        <div className="recipe">
          <img src="recipe2.jpg" alt="Recipe 2" />
          <div className="recipe-info">
            <h2>Recipe 2</h2>
            <p>
              Another amazing recipe you want to try. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit.
            </p>
          </div>
        </div>
      </div>
    </body>
  );
}

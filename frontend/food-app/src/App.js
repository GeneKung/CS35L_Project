import "./App.css";
import SignIn from "./components/auth/SignIn";
import RecipeGenerator from "./components/RecipeGenerator.jsx"

function App() {
  return (
    <div className="App">
      <SignIn />
      <RecipeGenerator />
    </div>

    // Just for testing sign-up button
  );
}

export default App;

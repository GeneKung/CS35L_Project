import "./App.css";
import SignIn from "./components/auth/SignIn";
import RecipeGenerator from "./components/RecipeGenerator.jsx"
import SignUp from "./components/auth/SignUp";

function App() {
  return (
    <div className="App">
      <SignIn />
      <SignUp />
      <RecipeGenerator />
    </div>

  );
}

export default App;

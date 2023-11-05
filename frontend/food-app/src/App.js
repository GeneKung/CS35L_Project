import "./App.css";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";

function App() {
  return (
    <div className="App">
      <SignIn />
      <SignUp />
    </div>

    // Just for testing sign-up button
  );
}

export default App;

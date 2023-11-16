import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";

import { AuthProvider } from "./components/auth/AuthContext";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Home from "./components/display/Home";

// NOTE: NEED TO CREATE SEPARATE LOGIN AND SIGNUP PAGES
// They can use the same child components (like Header, emailInput, passwordInput, etc.) but want each route to be connected to a single component

// Routing
const router = createBrowserRouter([
  {
    // ProtectedRoute will only display the child component if currentUser is not null (i.e. the user has signed in), else it will redirect to login
    path: "/",
    element: (
      //<ProtectedRoute>
        <Home />
      //</ProtectedRoute>
    ),
  },
  {
    path: "signin",
    element: <SignIn />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
]);

// App Component
function App() {
  // AuthProvider wraps the entire application so that all components have access to currentUser state variable
  return (
    //<AuthProvider>
      <RouterProvider router={router} />
    //</AuthProvider>
  );
}

export default App;

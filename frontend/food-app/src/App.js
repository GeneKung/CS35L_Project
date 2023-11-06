import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./App.css";

import { AuthProvider } from "./components/auth/AuthContext";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import SignIn from "./components/auth/SignIn";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute></ProtectedRoute>,
  },
  {
    path: "login",
    element: <SignIn />,
  },
  {
    path: "signup",
    element: <SignIn />,
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;

import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext"; // Adjust the import path as needed

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  console.log(currentUser);
  if (!currentUser) {
    return <Navigate to="/signin" replace />;
  }
  return children;
};

export default ProtectedRoute;

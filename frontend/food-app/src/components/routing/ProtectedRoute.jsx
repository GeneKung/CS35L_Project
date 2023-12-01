import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useAuth();
  console.log(currentUser);
  if (!currentUser) {
    return <Navigate to="/signin" replace={true} />;
  }
  return children;
};

export default ProtectedRoute;

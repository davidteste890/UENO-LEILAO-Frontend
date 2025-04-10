import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../hooks/useAuth";

export default function PrivateRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" replace />;
}

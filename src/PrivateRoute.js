import { useNavigate } from "react-router-dom";
import { auth } from "./config/firebase";

export const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  return auth.currentUser ? children : navigate("/auth");
};

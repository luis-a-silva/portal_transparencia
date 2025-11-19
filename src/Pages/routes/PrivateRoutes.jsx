import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();

  // Se não está logado → volta para login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Está logado → libera acesso
  return children;
}

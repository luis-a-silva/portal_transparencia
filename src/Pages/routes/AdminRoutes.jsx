import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminRoute({ children }) {
  const { isAuthenticated, user } = useAuth();

  // 1️⃣ Não está logado → login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 2️⃣ Está logado, mas não é admin → bloqueado
  if (!user || user.role?.toLowerCase() !== "admin") {
    return <Navigate to="/unauthorized" replace />;
  }

  // 3️⃣ É admin → libera a rota
  return children;
}

// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("user")); // hoặc kiểm tra từ context/auth

  if (!user) {
    return <Navigate to="/signup" replace />;
  }

  return children;
}

export default ProtectedRoute;

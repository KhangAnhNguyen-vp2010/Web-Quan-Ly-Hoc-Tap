import { Navigate } from "react-router-dom";
import { useAuthCheck } from "../Hooks/Auth/useAuthCheck";

function ProtectedRoute({ children }) {
  const { user, loading } = useAuthCheck();

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/signup" replace />;

  return children;
}

export default ProtectedRoute;

import { Navigate } from "react-router-dom";
import { useAuthCheck } from "../Hooks/Auth/useAuthCheck";
import { ClipLoader } from "react-spinners"; // Import spinner

function ProtectedRoute({ children }) {
  const { user, loading } = useAuthCheck();

  if (loading) return <ClipLoader color="#3498db" size={50} />;
  if (!user) return <Navigate to="/signup" replace />;

  return children;
}

export default ProtectedRoute;

import { Navigate } from "react-router-dom";
import { useAuthCheck } from "../Hooks/Auth/useAuthCheck";
import { ClipLoader } from "react-spinners"; // Import spinner

function ProtectedRoute({ children }) {
  const { user, loading } = useAuthCheck();

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "300px",
        }}
      >
        <ClipLoader color="#3498db" size={50} />
        <p style={{ marginTop: "10px", color: "#3498db", fontWeight: "500" }}>
          Loading...
        </p>
      </div>
    );
  if (!user) return <Navigate to="/signup" replace />;

  return children;
}

export default ProtectedRoute;

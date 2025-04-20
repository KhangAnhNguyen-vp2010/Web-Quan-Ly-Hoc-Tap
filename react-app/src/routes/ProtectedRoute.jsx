// src/components/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function ProtectedRoute({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // tránh gọi refresh nhiều lần
  const location = useLocation();

  const fetchUser = async () => {
    try {
      const res = await axios.get("https://localhost:7233/api/Users/userinfo", {
        withCredentials: true,
      });
      setUser(res.data);
      if (res.data.role === "Student" && location.pathname !== "/student") {
        return window.location.replace("/student");
      }
      if (
        res.data.role === "Instructor" &&
        location.pathname !== "/instructor"
      ) {
        return window.location.replace("/instructor");
      }
    } catch (error) {
      if (error.response?.status === 401 && !refreshing) {
        console.log("Access token hết hạn. Đang làm mới...");

        setRefreshing(true);
        try {
          await axios.post(
            "https://localhost:7233/api/Auth/refresh-token",
            null,
            {
              withCredentials: true,
            }
          );

          console.log("Đã làm mới token");
          await fetchUser(); // gọi lại sau khi refresh xong
        } catch (refreshErr) {
          console.log("Refresh token thất bại:", refreshErr);
        } finally {
          setRefreshing(false);
        }
      } else {
        console.log("Không tìm thấy người dùng", error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/signup" replace />;

  return children;
}

export default ProtectedRoute;

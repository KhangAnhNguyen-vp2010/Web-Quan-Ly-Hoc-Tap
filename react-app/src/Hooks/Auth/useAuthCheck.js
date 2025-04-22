// src/hooks/useAuthCheck.js
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export const useAuthCheck = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "https://localhost:7233/api/Users/userinfo",
          {
            withCredentials: true,
          }
        );
        const data = res.data;
        setUser(data);

        // Điều hướng dựa vào vai trò
        if (data.role === "Student" && location.pathname !== "/student") {
          navigate("/student", { replace: true });
        }
        if (data.role === "Instructor" && location.pathname !== "/instructor") {
          navigate("/instructor", { replace: true });
        }
      } catch (error) {
        console.log("Lỗi xác thực người dùng", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [location.pathname, navigate]);

  return { user, loading };
};

// src/hooks/useAuthCheck.js
import { useState, useEffect } from "react";
import axiosClient from "../../api/axiosClient";
import { useLocation, useNavigate } from "react-router-dom";

export const useAuthCheck = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLoading, setShowLoading] = useState(true); // state mới để kiểm soát loading
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Đảm bảo loading hiển thị ít nhất 3 giây
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 1500); // Đặt delay là 3000ms (3 giây)

    return () => clearTimeout(timer); // Dọn dẹp timer khi component unmount
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosClient.get("/Users/userinfo", {
          withCredentials: true,
        });
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

  if (loading || showLoading) {
    return { user: null, loading: true }; // Trả về loading nếu chưa xong
  }

  return { user, loading }; // Trả về thông tin người dùng khi đã xong
};

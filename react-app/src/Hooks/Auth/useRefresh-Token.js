import axios from "axios";
import { useEffect } from "react";
export const useRefreshToken = () => {
  useEffect(() => {
    const refreshToken = async () => {
      const now = Date.now();
      const lastRefresh = localStorage.getItem("lastRefresh");

      // Nếu chưa từng gọi hoặc đã hơn 25 phút thì mới gọi
      if (!lastRefresh || now - parseInt(lastRefresh, 10) > 25 * 60 * 1000) {
        console.log("👉 Gọi refresh-token vì đã quá 25 phút hoặc lần đầu");

        try {
          await axios.post(
            "https://localhost:7233/api/Auth/refresh-token",
            null,
            {
              withCredentials: true,
            }
          );
          localStorage.setItem("lastRefresh", now.toString());
          console.log("✅ Token đã được làm mới");
        } catch (err) {
          console.error("❌ Refresh token thất bại:", err);
        }
      } else {
        console.log("⏱ Token vẫn còn hạn, không cần làm mới khi reload");
      }
    };

    // Gọi một lần khi load (có điều kiện)
    refreshToken();

    // Thiết lập gọi định kỳ sau mỗi 28 phút 20 giây
    const intervalId = setInterval(async () => {
      await refreshToken();
    }, 1700000); // ~28 phút 20 giây

    return () => clearInterval(intervalId);
  }, []);
};

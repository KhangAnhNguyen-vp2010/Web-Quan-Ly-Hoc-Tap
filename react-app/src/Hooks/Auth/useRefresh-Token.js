import axios from "axios";
import { useEffect } from "react";
export const useRefreshToken = () => {
  useEffect(() => {
    const intervalId = setInterval(async () => {
      console.log("Access token hết hạn. Đang làm mới...");
      try {
        await axios.post(
          "https://localhost:7233/api/Auth/refresh-token",
          null,
          {
            withCredentials: true,
          }
        );
        console.log("Đã làm mới token");
      } catch (refreshErr) {
        console.log("Refresh token thất bại:", refreshErr);
      }
    }, 1700000); // 30 phút (1800000 ms)

    return () => clearInterval(intervalId);
  }, []);
};

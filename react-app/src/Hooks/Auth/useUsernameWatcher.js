// src/hooks/useUsernameWatcher.js
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useUsernameWatcher = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      const prevUsername = localStorage.getItem("prev-username");
      const currentUsername = localStorage.getItem("current-username");

      if (prevUsername !== currentUsername || prevUsername === null) {
        localStorage.setItem("prev-username", currentUsername);
        navigate("/signup", { replace: true });
      }
    }, 5000); // Kiểm tra mỗi 5 giây

    return () => clearInterval(intervalId); // Dọn dẹp khi component unmount
  }, [navigate]);
};

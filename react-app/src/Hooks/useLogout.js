import axios from "axios";
import { toast } from "react-toastify";
export const useLogout = (onSuccessLogout) => {
  const handleLogout = async () => {
    try {
      await axios.post("https://localhost:7233/api/Auth/logout", null, {
        withCredentials: true,
      });
      localStorage.removeItem("Temp");
      localStorage.removeItem("Session-ne-ku-em");
      toast.success("Logout successful!");
      onSuccessLogout?.();
    } catch (error) {
      console.error("Đăng xuất thất bại:", error);
    }
  };

  return { handleLogout };
};

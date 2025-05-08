import axiosClient from "../api/axiosClient";
import { toast } from "react-toastify";

export const useLogout = (onSuccessLogout) => {
  const handleLogout = async () => {
    try {
      await axiosClient.post(`/Auth/logout`, null, {
        withCredentials: true,
      });
      toast.success("Logout successful!");
      localStorage.removeItem("prev-username");
      localStorage.removeItem("current-username");
      onSuccessLogout?.();
    } catch (error) {
      console.error("Đăng xuất thất bại:", error);
    }
  };

  return { handleLogout };
};

import { useState } from "react";
import { toast } from "react-toastify";
import axiosClient from "../../api/axiosClient";

export const useJoinTheCourse = (userId) => {
  const [loadingJoin, setLoadingJoin] = useState(false);

  const registerCourse = async (courseId, onSuccess = () => {}) => {
    try {
      setLoadingJoin(true);
      await axiosClient.post(
        `/Students/JoinTheCourse`,
        {
          userID: userId,
          courseID: courseId,
        },
        { withCredentials: true }
      );
      toast.success("Đăng ký khoá học thành công");
      onSuccess();
    } catch (error) {
      console.error("Lỗi đăng ký khoá học: ", error);
      toast.error(error.response.data);
    } finally {
      setLoadingJoin(false);
    }
  };

  return { registerCourse, loadingJoin, setLoadingJoin };
};

import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const useJoinTheCourse = (userId) => {
  const [loading, setLoading] = useState(false);

  const registerCourse = async (courseId, onSuccess = () => {}) => {
    try {
      setLoading(true);
      await axios.post(
        `https://localhost:7233/api/Students/JoinTheCourse`,
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
      toast.error("Đăng ký thất bại. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return { registerCourse, loading };
};

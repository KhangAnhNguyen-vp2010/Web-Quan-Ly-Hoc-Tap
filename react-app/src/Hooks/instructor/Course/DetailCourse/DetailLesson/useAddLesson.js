import { useState } from "react";
import axiosClient from "../../../../../api/axiosClient";
import { toast } from "react-toastify";

export const useAddLesson = (courseId, onClose) => {
  const [lesson, setLesson] = useState({
    lessonName: "",
    linkYoutube: "",
  });

  const handleChange = (e) => {
    setLesson({
      ...lesson,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      await axiosClient.post(
        `/Lessons`,
        {
          courseID: courseId,
          lessonName: lesson.lessonName,
          linkYoutube: lesson.linkYoutube,
        },
        {
          withCredentials: true,
        }
      );
      toast.success("Added!!!");
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Lỗi khi thêm");
    }
  };

  return {
    lesson,
    handleChange,
    handleAdd,
  };
};

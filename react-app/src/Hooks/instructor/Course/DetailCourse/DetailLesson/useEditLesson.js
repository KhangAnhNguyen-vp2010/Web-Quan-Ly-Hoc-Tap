import { useState } from "react";
import { toast } from "react-toastify";
import axiosClient from "../../../../../api/axiosClient";

export const useEditLesson = (initialLesson, onUpdate, onClose) => {
  const [lesson, setLesson] = useState(initialLesson);

  const handleChange = (e) => {
    setLesson({
      ...lesson,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.put(
        `/Lessons/${lesson.lessonId}`,
        {
          lessonName: lesson.lessonName,
          linkYoutube: lesson.linkYoutube,
        },
        {
          withCredentials: true,
        }
      );
      toast.success("Updated!!!");
      onUpdate(lesson);
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Lỗi khi update");
    }
  };

  return {
    lesson,
    handleChange,
    handleEdit,
  };
};

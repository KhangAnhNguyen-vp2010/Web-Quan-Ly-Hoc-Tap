import { useState } from "react";

export const useDetailLesson = (initialLesson) => {
  const [lesson, setLesson] = useState(initialLesson);
  const [showEditLesson, setShowEditLesson] = useState(false);

  const toggleEditLesson = () => {
    setShowEditLesson(!showEditLesson);
  };

  const handleUpdateLesson = (updatedLesson) => {
    setLesson(updatedLesson);
    setShowEditLesson(!showEditLesson);
  };

  return {
    lesson,
    showEditLesson,
    toggleEditLesson,
    handleUpdateLesson,
  };
};

// useLessons.js
import { useState, useEffect } from "react";
import axiosClient from "../../../../api/axiosClient";

export const useLessons = ({ courseId, searchTerm, page, setTotalPages }) => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lesson, setLesson] = useState(null);
  const [showDetailLesson, setShowDetailLesson] = useState(false);
  const [showAddLesson, setShowAddLesson] = useState(false);

  const fetchLessons = async () => {
    try {
      const response = await axiosClient.get(
        `/Lessons/by-course?courseId=${courseId}&search=${searchTerm}&page=${page}`,
        { withCredentials: true }
      );
      setLessons(response.data.items);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching lessons:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, [courseId, searchTerm, page]);

  return {
    lessons,
    loading,
    lesson,
    setLesson,
    showDetailLesson,
    setShowDetailLesson,
    showAddLesson,
    setShowAddLesson,
    refetch: fetchLessons,
  };
};

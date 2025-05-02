// useStudents.js
import { useState, useEffect } from "react";
import axios from "axios";

export const useStudents = ({ courseId, searchTerm, page, setTotalPages }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7233/api/Courses/StudentList/${courseId}?searchTerm=${searchTerm}&page=${page}`,
        { withCredentials: true }
      );
      setStudents(response.data.students);
      setTotalPages(response.data.total_Pages);
    } catch (error) {
      console.error("Error fetching students:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [courseId, searchTerm, page]);

  return {
    students,
    loading,
    refetch: fetchStudents,
  };
};

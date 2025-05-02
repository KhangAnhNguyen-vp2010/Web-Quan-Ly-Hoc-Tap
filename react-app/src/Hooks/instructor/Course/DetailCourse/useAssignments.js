import { useState, useEffect } from "react";
import axios from "axios";

export function useAssignments(courseId, searchTerm, page, setTotalPages) {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [assignment, setAssignment] = useState(null);
  const [showDetailAssignment, setShowDetailAssignment] = useState(false);
  const [showAddAssignment, setShowAddAssignment] = useState(false);

  const fetchAssignments = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7233/api/Assignments/Course/${courseId}?search=${searchTerm}&page=${page}`,
        { withCredentials: true }
      );
      setAssignments(response.data.items);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId, searchTerm, page]);

  return {
    assignments,
    loading,
    assignment,
    setAssignment,
    showDetailAssignment,
    setShowDetailAssignment,
    showAddAssignment,
    setShowAddAssignment,
    fetchAssignments,
  };
}

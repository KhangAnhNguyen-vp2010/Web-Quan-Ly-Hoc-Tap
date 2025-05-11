import { useState, useEffect } from "react";
import axiosClient from "../../../../../api/axiosClient";

export const useCompletedAssignments = (assignmentId) => {
  const [completedUsers, setCompletedUsers] = useState({
    list: [],
    count: 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchCompletedAssignments = async () => {
    try {
      const response = await axiosClient.get(
        `/Assignments/completed/${assignmentId}`,
        { withCredentials: true }
      );
      setCompletedUsers({
        list: response.data || [],
        count: response.data ? response.data.length : 0,
      });
    } catch (err) {
      console.error("Error fetching completed assignments: ", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompletedAssignments();
  }, [assignmentId]);

  return { completedUsers, loading, fetchCompletedAssignments };
};

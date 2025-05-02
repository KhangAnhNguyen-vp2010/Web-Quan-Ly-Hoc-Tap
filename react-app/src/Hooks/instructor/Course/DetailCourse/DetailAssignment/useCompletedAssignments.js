import { useState, useEffect } from "react";
import axios from "axios";

export const useCompletedAssignments = (assignmentId, countCompleted) => {
  const [completedUsers, setCompletedUsers] = useState({
    list: [],
    count: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompletedAssignments = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7233/api/Assignments/completed/${assignmentId}`,
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

    fetchCompletedAssignments();
  }, [assignmentId]);

  return { completedUsers, loading };
};

import { useEffect, useState } from "react";
import axios from "axios";

export const useUncompletedAssignments = (assignmentId) => {
  const [uncompletedUsers, setUncompletedUsers] = useState({
    list: [],
    count: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUncompletedAssignments = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://localhost:7233/api/Assignments/uncompleted/${assignmentId}`,
          { withCredentials: true }
        );
        const list = response.data || [];
        setUncompletedUsers({ list, count: list.length });
      } catch (err) {
        console.error("Error fetching uncompleted assignments:", err);
      } finally {
        setLoading(false);
      }
    };

    if (assignmentId) {
      fetchUncompletedAssignments();
    }
  }, [assignmentId]);

  return { uncompletedUsers, loading };
};

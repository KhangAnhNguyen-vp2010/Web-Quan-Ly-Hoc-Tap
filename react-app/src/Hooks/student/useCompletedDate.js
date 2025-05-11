import { useEffect, useState } from "react";
import axiosClient from "../../api/axiosClient";

export const useCompletedDate = ({
  showSubmitAssignment,
  assignment,
  user,
}) => {
  const [completedDate, setCompletedDate] = useState(null);

  const getCompletedDate = async () => {
    if (user.role === "Student") {
      try {
        const res = await axiosClient.get(
          `/Students/completion-date/${user.id}/${assignment.assignmentId}`,
          { withCredentials: true }
        );
        setCompletedDate(res.data.completionDate);
      } catch (error) {}
    }
  };

  useEffect(() => {
    getCompletedDate();
  }, [showSubmitAssignment]);

  return { completedDate, getCompletedDate };
};

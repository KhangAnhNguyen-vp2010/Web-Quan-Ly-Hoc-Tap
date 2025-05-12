import { useEffect, useState } from "react";
import axiosClient from "../../../../../api/axiosClient";

export const useAssignmentScores = ({ studentId, courseId }) => {
  const [listAssignmentScores, getListAssignmentScores] = useState([]);
  const fetch = async () => {
    try {
      const res = await axiosClient.get(
        `/Assignments/student/${studentId}/assignments/${courseId}`,
        { withCredentials: true }
      );

      getListAssignmentScores(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetch();
  }, []);

  return { listAssignmentScores };
};

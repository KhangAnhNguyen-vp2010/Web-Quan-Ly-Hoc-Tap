import { useEffect, useState } from "react";
import axiosClient from "../../../../../api/axiosClient";

export const useTestScores = ({ studentId, courseId }) => {
  const [listTestScores, getListTestScores] = useState([]);
  const fetch = async () => {
    try {
      const res = await axiosClient.get(
        `/Tests/student/${studentId}/tests/${courseId}`,
        { withCredentials: true }
      );

      getListTestScores(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetch();
  }, []);

  return { listTestScores };
};

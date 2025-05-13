import { useEffect, useState } from "react";
import axiosClient from "../../../../../api/axiosClient";

export const useAssignmentScores = ({ studentId, courseId }) => {
  const [listAssignmentScores, setListAssignmentScores] = useState([]);
  const [SCA_AssignmentScores, setSCA_AssignmentScores] = useState({
    studyTime: "",
    totalAssignmentsOntime: "",
    totalAssignmentsLate: "",
    AVG: "",
  });
  const fetch = async () => {
    try {
      const res = await axiosClient.get(
        `/Assignments/student/${studentId}/assignments/${courseId}`,
        { withCredentials: true }
      );

      setListAssignmentScores(res.data.assignments);
      setSCA_AssignmentScores({
        studyTime: res.data.studyTime,
        totalAssignmentsOntime: res.data.totalAssignments_Ontime,
        totalAssignmentsLate: res.data.totalAssignments_Late,
        AVG: res.data.averageGrade,
      });
    } catch (error) {}
  };

  useEffect(() => {
    fetch();
  }, []);

  return { listAssignmentScores, SCA_AssignmentScores };
};

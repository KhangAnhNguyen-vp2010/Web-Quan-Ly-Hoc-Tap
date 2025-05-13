import { useEffect, useState } from "react";
import axiosClient from "../../../../../api/axiosClient";

export const useTestScores = ({ studentId, courseId }) => {
  const [listTestScores, setListTestScores] = useState([]);
  const [SCA_TestScores, setSCA_TestScores] = useState({
    studyTime: "",
    totalTestsOntime: "",
    totalTestsLate: "",
    AVG: "",
  });
  const fetch = async () => {
    try {
      const res = await axiosClient.get(
        `/Tests/student/${studentId}/tests/${courseId}`,
        { withCredentials: true }
      );

      setListTestScores(res.data.testScores);
      setSCA_TestScores({
        studyTime: res.data.studyTime,
        totalTestsOntime: res.data.totalTests_Ontime,
        totalTestsLate: res.data.totalTests_Late,
        AVG: res.data.averageScore,
      });
    } catch (error) {}
  };

  useEffect(() => {
    fetch();
  }, []);

  return { listTestScores, SCA_TestScores };
};

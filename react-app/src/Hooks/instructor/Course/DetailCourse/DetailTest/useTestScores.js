// useTestScores.js
import { useEffect, useState } from "react";
import axiosClient from "../../../../../api/axiosClient";

export const useTestScores = (courseId, testId) => {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await axiosClient.get(
          `/Tests/course/${courseId}/test/${testId}/scores`,
          {
            withCredentials: true,
          }
        );
        setScores(response.data);
      } catch (error) {
        console.error("Lỗi khi tải danh sách điểm:", error);
        setError("Không thể tải dữ liệu điểm. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };

    fetchScores();
  }, [courseId, testId]);

  return { scores, loading, error };
};

// src/hooks/useTests.js
import { useState, useEffect } from "react";
import axiosClient from "../../../../api/axiosClient";

export const useTests = (courseId, searchTerm, page, SetTotalPages) => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [test, setTest] = useState(null);
  const [showDetailTest, setShowDetailTest] = useState(false);
  const [showAddTest, setShowAddTest] = useState(false);

  const fetchTests = async () => {
    try {
      const response = await axiosClient.get(
        `/Tests/Course/${courseId}?search=${searchTerm}&page=${page}`,
        { withCredentials: true }
      );

      setTests(response.data.items);
      SetTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching tests:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTests();
  }, [courseId, searchTerm, page]);

  return {
    tests,
    test,
    setTest,
    loading,
    showDetailTest,
    setShowDetailTest,
    showAddTest,
    setShowAddTest,
    fetchTests,
  };
};

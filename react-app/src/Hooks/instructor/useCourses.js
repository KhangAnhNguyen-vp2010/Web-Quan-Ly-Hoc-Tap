// src/hooks/useCourses.js
import { useEffect, useState } from "react";
import { useCourse } from "../../contexts/CourseContext";
import { useGetUser } from "../useGetUser";
import axiosClient from "../../api/axiosClient";

export const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [studentCounts, setStudentCounts] = useState({});
  const pageSize = 6;

  const { getListCourses, load, setLoad } = useCourse();
  const { user } = useGetUser();

  const GetStudentCount = async (id) => {
    try {
      const res = await axiosClient.get(`/Courses/StudentCount/${id}`);
      return res.data;
    } catch (error) {
      console.log("Error by get count student: " + error);
      return 0;
    }
  };

  const fetchCourses = async (page, query = "", sort = "") => {
    setLoading(true);
    try {
      const result = await getListCourses(page, pageSize, query, sort);
      if (result) {
        setCourses(result.data);
        setTotalPages(result.totalPages);

        // Parallel fetching for better performance
        const counts = await Promise.all(
          result.data.map((course) => GetStudentCount(course.courseId))
        );
        const countMap = {};
        result.data.forEach((course, index) => {
          countMap[course.courseId] = counts[index];
        });
        setStudentCounts(countMap);
      }
    } catch (err) {
      console.error("Lỗi khi lấy danh sách khoá học:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses(page, searchQuery, sortOption);
  }, [page, sortOption]);

  useEffect(() => {
    fetchCourses(page, searchQuery, sortOption);
    setLoad(false);
  }, [load]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchCourses(1, searchQuery, sortOption);
  };

  const handleSort = (e) => {
    setSortOption(e.target.value);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setSearchQuery("");
    setSortOption("");
    setPage(1);
    fetchCourses(1, "", "").finally(() => {
      setTimeout(() => setIsRefreshing(false), 600);
    });
  };

  return {
    courses,
    loading,
    page,
    totalPages,
    searchQuery,
    sortOption,
    isRefreshing,
    studentCounts,
    user,
    setSearchQuery,
    handleSearch,
    handleSort,
    handleRefresh,
    setPage,
  };
};

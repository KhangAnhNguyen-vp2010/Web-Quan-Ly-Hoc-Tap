import React, { useEffect, useState } from "react";
import axiosClient from "../../../api/axiosClient";
import styles from "./MyCourse.module.scss";

const MyCourse = ({ user }) => {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize] = useState(6);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await axiosClient.get(
        `/Students/registered?userId=${user.id}`,
        {
          params: {
            search,
            sort,
            page,
            pageSize,
          },
        }
      );
      setCourses(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [search, sort, page]);

  const handleSortChange = (e) => {
    setSort(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1); // Reset page khi search
  };

  return (
    <div className={styles.container}>
      <h2>📚 Danh sách khoá học đã đăng ký</h2>

      <div className={styles.controls}>
        <input
          type="text"
          placeholder="Tìm kiếm khoá học..."
          value={search}
          onChange={handleSearchChange}
          className={styles.search}
        />

        <select
          value={sort}
          onChange={handleSortChange}
          className={styles.sort}
        >
          <option value="">Mới nhất</option>
          <option value="name-asc">Tên A → Z</option>
          <option value="name-desc">Tên Z → A</option>
        </select>
      </div>

      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <ul className={styles.courseList}>
          {courses.map((course) => (
            <li key={course.courseId} className={styles.courseItem}>
              <img
                src={
                  `${import.meta.env.VITE_PUBLIC_URL}${course.img}` ||
                  "https://via.placeholder.com/100x100?text=No+Image"
                }
                alt={course.courseName}
                className={styles.courseImage}
              />
              <div className={styles.courseContent}>
                <h4>Tên khoá học: {course.courseName}</h4>
                <p>Mô tả:{course.description}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className={styles.pagination}>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          ⬅ Trước
        </button>
        <span>
          Trang {page} / {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Tiếp ➡
        </button>
      </div>
    </div>
  );
};

export default MyCourse;

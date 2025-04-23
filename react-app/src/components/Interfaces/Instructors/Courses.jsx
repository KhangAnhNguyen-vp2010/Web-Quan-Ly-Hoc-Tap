import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../../assets/css/Instructor/Courses.module.css";
import { useCourse } from "../../../contexts/CourseContext";

function Courses({ onCloseEditForm, course }) {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const pageSize = 6;
  const { getListCourses, load, setLoad } = useCourse();

  const fetchCourses = async (page, query = "", sort = "") => {
    setLoading(true);
    try {
      const result = await getListCourses(page, pageSize, query, sort);

      if (result) {
        setCourses(result.data);
        setTotalPages(result.totalPages);
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
    setPage(1); // Reset to first page when searching
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

  const handleEdit = (obj) => {
    onCloseEditForm();
    course(obj);
  };

  const handleDelete = (courseId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa khóa học này không?")) {
      console.log("Xóa khóa học với ID:", courseId);
    }
  };

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };

  const renderPageNumbers = () => {
    const maxPagesToShow = 5;
    let pagesToShow = [];
    if (totalPages <= maxPagesToShow) {
      pagesToShow = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      const start = Math.max(1, page - 2);
      const end = Math.min(totalPages, page + 2);
      if (start > 1) pagesToShow.push(1);
      if (start > 2) pagesToShow.push("...");
      for (let i = start; i <= end; i++) {
        pagesToShow.push(i);
      }
      if (end < totalPages - 1) pagesToShow.push("...");
      if (end < totalPages) pagesToShow.push(totalPages);
    }
    return pagesToShow;
  };

  const getStatusBadge = (status) => {
    // Placeholder for course status
    switch (status) {
      case "active":
        return (
          <span className={styles.statusBadge + " " + styles.active}>
            Đang hoạt động
          </span>
        );
      case "draft":
        return (
          <span className={styles.statusBadge + " " + styles.draft}>
            Bản nháp
          </span>
        );
      case "archived":
        return (
          <span className={styles.statusBadge + " " + styles.archived}>
            Đã lưu trữ
          </span>
        );
      default:
        return (
          <span className={styles.statusBadge + " " + styles.active}>
            Đang hoạt động
          </span>
        );
    }
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}>
          <div className={styles.loadingCircle}></div>
        </div>
        <p className={styles.loadingText}>Đang tải dữ liệu...</p>
      </div>
    );
  }

  return (
    <>
      <div className={styles.coursesContainer}>
        <div className={styles.pageHeader}>
          <h2 className={styles.pageTitle}>
            <span className={styles.pageIcon}>📚</span> Quản lý khóa học
          </h2>
          <p className={styles.pageDescription}>
            Xem và quản lý tất cả các khóa học trong hệ thống
          </p>
        </div>

        <div className={styles.actionBar}>
          <div className={styles.leftActions}>
            <button className={styles.addButton}>
              <span className={styles.buttonIcon}>➕</span>
              <span>Thêm khóa học</span>
            </button>
            <button
              className={`${styles.refreshButton} ${
                isRefreshing ? styles.refreshing : ""
              }`}
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <span className={styles.buttonIcon}>🔄</span>
              <span>{isRefreshing ? "Đang làm mới..." : "Làm mới"}</span>
            </button>
          </div>
          <div className={styles.rightActions}>
            <form className={styles.searchForm} onSubmit={handleSearch}>
              <div className={styles.searchInputWrapper}>
                <input
                  type="text"
                  className={styles.searchInput}
                  placeholder="Tìm kiếm khóa học..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className={styles.searchButton}>
                  🔍
                </button>
              </div>
            </form>
          </div>
          <div className={styles.sortWrapper}>
            <select
              className={styles.sortSelect}
              value={sortOption}
              onChange={handleSort}
            >
              <option value="">Sắp xếp theo</option>
              <option value="name-asc">Tên A → Z</option>
              <option value="name-desc">Tên Z → A</option>
            </select>
          </div>
        </div>

        {courses.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📋</div>
            <h3>Không tìm thấy khóa học nào</h3>
            <p>Hãy thêm khóa học mới hoặc thử tìm kiếm với từ khóa khác</p>
          </div>
        ) : (
          <ul className={styles.coursesList}>
            {courses.map((course, index) => (
              <li key={index} className={styles.courseItem}>
                <div className={styles.courseImageContainer}>
                  {course.img ? (
                    <img
                      src={`https://localhost:7233${course.img}`}
                      alt={course.courseName}
                      className={styles.courseImage}
                    />
                  ) : (
                    <div className={styles.placeholderImage}>
                      <span>📘</span>
                    </div>
                  )}
                </div>
                <div className={styles.courseContent}>
                  <div className={styles.courseHeader}>
                    <h3 className={styles.courseTitle}>
                      {course.courseName}
                      {getStatusBadge(course.status)}
                    </h3>
                  </div>
                  <p className={styles.courseDescription}>
                    {course.description || "Không có mô tả cho khóa học này"}
                  </p>
                  <div className={styles.courseDetails}>
                    <div className={styles.detailItem}>
                      <span className={styles.detailIcon}>👨‍🏫</span>
                      <span>{course.instructorId || "Chưa có giảng viên"}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailIcon}>👥</span>
                      <span>{(course.studentCount || 0) + " học viên"}</span>
                    </div>
                  </div>
                </div>
                <div className={styles.courseActions}>
                  <button
                    className={styles.editButton}
                    onClick={() => handleEdit(course)}
                    title="Chỉnh sửa khóa học"
                  >
                    <span className={styles.buttonIcon}>✏️</span>
                    <span className={styles.buttonText}>Sửa</span>
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => handleDelete(course.id)}
                    title="Xóa khóa học"
                  >
                    <span className={styles.buttonIcon}>🗑️</span>
                    <span className={styles.buttonText}>Xóa</span>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

        {totalPages > 1 && (
          <div className={styles.pagination}>
            <button
              className={`${styles.paginationButton} ${styles.paginationArrow}`}
              onClick={() => handlePageClick(1)}
              disabled={page === 1}
            >
              «
            </button>
            <button
              className={`${styles.paginationButton} ${styles.paginationArrow}`}
              onClick={() => handlePageClick(Math.max(1, page - 1))}
              disabled={page === 1}
            >
              ‹
            </button>

            {renderPageNumbers().map((number, index) =>
              number === "..." ? (
                <span key={index} className={styles.paginationEllipsis}>
                  …
                </span>
              ) : (
                <button
                  key={number}
                  className={`${styles.paginationButton} ${
                    number === page ? styles.paginationActive : ""
                  }`}
                  onClick={() => handlePageClick(number)}
                >
                  {number}
                </button>
              )
            )}

            <button
              className={`${styles.paginationButton} ${styles.paginationArrow}`}
              onClick={() => handlePageClick(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
            >
              ›
            </button>
            <button
              className={`${styles.paginationButton} ${styles.paginationArrow}`}
              onClick={() => handlePageClick(totalPages)}
              disabled={page === totalPages}
            >
              »
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Courses;

import styles from "../../../assets/css/Instructor/Courses.module.css";
import { useCourses } from "../../../Hooks/instructor/useCourses";
import Pagination from "./Pagination";

function Courses({
  onCloseEditForm,
  course,
  onCloseAddForm,
  onCloseDetailForm,
}) {
  const {
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
  } = useCourses();

  const handleEdit = (obj) => {
    onCloseEditForm();
    course(obj);
  };

  const handleAdd = () => {
    onCloseAddForm();
  };

  const handleDetail = (obj) => {
    onCloseDetailForm();
    course(obj);
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
        <p className={styles.loadingText}>Loading data...</p>
      </div>
    );
  }

  return (
    <>
      <div className={styles.coursesContainer}>
        <div className={styles.pageHeader}>
          <h2 className={styles.pageTitle}>
            <span className={styles.pageIcon}>📚</span> Course Management
          </h2>
          <p className={styles.pageDescription}>
            View and manage all courses in the system
          </p>
        </div>

        <div className={styles.actionBar}>
          <div className={styles.leftActions}>
            <button className={styles.addButton} onClick={handleAdd}>
              <span className={styles.buttonIcon}>➕</span>
              <span>Add new course</span>
            </button>
            <button
              className={`${styles.refreshButton} ${
                isRefreshing ? styles.refreshing : ""
              }`}
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <span className={styles.buttonIcon}>🔄</span>
              <span>{isRefreshing ? "Updating..." : "Refresh"}</span>
            </button>
          </div>
          <div className={styles.rightActions}>
            <form className={styles.searchForm} onSubmit={handleSearch}>
              <div className={styles.searchInputWrapper}>
                <input
                  type="text"
                  className={styles.searchInput}
                  placeholder="Search for courses..."
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
              <option value="">Sort by</option>
              <option value="name-asc">Name A → Z</option>
              <option value="name-desc">Name Z → A</option>
            </select>
          </div>
        </div>

        {courses.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>📋</div>
            <h3>No courses found</h3>
            <p>
              Please add a new course or try searching with different keywords
            </p>
          </div>
        ) : (
          <ul className={styles.coursesList}>
            {courses.map((course, index) => (
              <li key={index} className={styles.courseItem}>
                <div className={styles.courseImageContainer}>
                  {course.img ? (
                    <img
                      src={`${import.meta.env.VITE_PUBLIC_URL}${course.img}`}
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
                    {course.description ||
                      "There is no description for this course."}
                  </p>
                  <div className={styles.courseDetails}>
                    <div className={styles.detailItem}>
                      <span className={styles.detailIcon}>👨‍🏫</span>
                      <span>{user.fullName || "No instructor yet"}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailIcon}>👥</span>
                      <span>
                        {studentCounts[course.courseId] + " students"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className={styles.courseActions}>
                  <button
                    className={styles.editButton}
                    onClick={() => handleEdit(course)}
                    title="Edit course"
                  >
                    <span className={styles.buttonIcon}>✏️</span>
                    <span className={styles.buttonText}>Edit</span>
                  </button>
                  <button
                    className={styles.detailButton}
                    onClick={() => handleDetail(course)}
                    title="Course details"
                  >
                    <span className={styles.buttonIcon}>📄</span>
                    <span className={styles.buttonText}>Detail</span>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>
    </>
  );
}

export default Courses;

import StudentList from "./Detail/StudentList";
import styles from "../../../../assets/css/Instructor/Courses/DetailCourse.module.css";
import { useState, useEffect } from "react";
import { useGetUser } from "../../../../Hooks/useGetUser";
import Pagination from "../Pagination";
import TabSelector from "./Detail/TabSelector";
import Assignments from "./Detail/Assignments";

function DetailCourse({ onClose, course }) {
  const [search, setSearch] = useState({
    text: "",
    debounce: "",
  });
  const { user } = useGetUser();
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch((prev) => ({ ...prev, debounce: prev.text }));
    }, 300);

    return () => clearTimeout(handler);
  }, [search.text]);

  const selectTab = [
    <StudentList
      key="0"
      courseId={course.courseId}
      searchTerm={search.debounce}
      page={page}
      SetTotalPages={(totalPages) => setTotalPages(totalPages)}
    />,
    <Assignments
      key="1"
      courseId={course.courseId}
      searchTerm={search.debounce}
      page={page}
      SetTotalPages={(totalPages) => setTotalPages(totalPages)}
    />,
  ];

  return (
    <div className={styles.overlay}>
      <button
        className={styles.closeButton}
        onClick={onClose}
        aria-label="Close"
      >
        &times;
      </button>
      <div className={styles.modal}>
        <div className={styles.card}>
          <div className={styles.imageWrapper}>
            <img
              src={`https://localhost:7233${course.img}`}
              className={styles.cardImg}
              alt={course.courseName}
            />
          </div>

          <div className={styles.cardContent}>
            <h2 className={styles.courseName}>{course.courseName}</h2>
            <p className={styles.description}>
              <strong>Description:</strong> {course.description}
            </p>
            <p className={styles.instructor}>
              <strong>Lecturer:</strong> {user ? user.fullName : "Loading..."}
            </p>
          </div>
        </div>

        <div className={styles["header-container"]}>
          <div className={styles["search-container"]}>
            <input
              type="text"
              className={styles["search-input"]}
              placeholder="🔍Search..."
              value={search.text}
              onChange={(e) =>
                setSearch((prev) => ({ ...prev, text: e.target.value }))
              }
            />
          </div>
          <div className={styles["tab-container"]}>
            <TabSelector
              tabs={["Students", "Assignments", "Tests"]}
              onTabChange={(index) => {
                setTabIndex(index);
                setPage(1);
                setSearch({ text: "", debounce: "" });
              }}
            />
          </div>
        </div>
        <div className={styles.studentSection}>
          {selectTab[tabIndex]}
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>
      </div>
    </div>
  );
}

export default DetailCourse;

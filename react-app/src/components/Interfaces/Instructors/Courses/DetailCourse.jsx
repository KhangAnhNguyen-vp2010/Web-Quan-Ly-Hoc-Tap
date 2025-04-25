import StudentList from "./Detail/StudentList";
import styles from "../../../../assets/css/Instructor/Courses/DetailCourse.module.css";
import { useState, useEffect } from "react";
import { useGetUser } from "../../../../Hooks/useGetUser";

function DetailCourse({ onClose, course }) {
  const [search, setSearch] = useState({
    text: "",
    debounce: "",
  });
  const { user } = useGetUser();

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearch((prev) => ({ ...prev, debounce: prev.text }));
    }, 300);

    return () => clearTimeout(handler);
  }, [search.text]);

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
        <div className={styles.studentSection}>
          <StudentList
            courseId={course.courseId}
            searchTerm={search.debounce}
          />
        </div>
      </div>
    </div>
  );
}

export default DetailCourse;

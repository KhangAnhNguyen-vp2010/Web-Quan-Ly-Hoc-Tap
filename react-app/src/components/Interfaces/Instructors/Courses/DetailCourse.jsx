import StudentList from "./Detail/StudentList";
import styles from "../../../../assets/css/Instructor/Courses/DetailCourse.module.css";
import { useGetUser } from "../../../../Hooks/useGetUser";
import Pagination from "../Pagination";
import TabSelector from "./Detail/TabSelector";
import Assignments from "./Detail/Assignments";
import Tests from "./Detail/Test";
import Lessons from "./Detail/Lessons";
import { useDetailCourse } from "../../../../Hooks/instructor/Course/useDetailCourse";

function DetailCourse({ onClose, course }) {
  const { user } = useGetUser();

  const {
    search,
    setSearch,
    page,
    setPage,
    totalPages,
    setTotalPages,
    tabIndex,
    setTabIndex,
    resetSearchAndPage,
  } = useDetailCourse();

  if (!user) {
    return null;
  }

  const selectTab =
    user && user.role === "Instructor"
      ? [
          <StudentList
            key="0"
            courseId={course.courseId}
            searchTerm={search.debounce}
            page={page}
            SetTotalPages={(totalPages) => setTotalPages(totalPages)}
          />,
          <Lessons
            key="1"
            courseId={course.courseId}
            searchTerm={search.debounce}
            page={page}
            SetTotalPages={(totalPages) => setTotalPages(totalPages)}
            user={user}
          />,
          <Assignments
            key="2"
            courseId={course.courseId}
            searchTerm={search.debounce}
            page={page}
            SetTotalPages={(totalPages) => setTotalPages(totalPages)}
            user={user}
          />,
          <Tests
            key="3"
            courseId={course.courseId}
            searchTerm={search.debounce}
            page={page}
            SetTotalPages={(totalPages) => setTotalPages(totalPages)}
            user={user}
          />,
        ]
      : [
          <Lessons
            key="0"
            courseId={course.courseId}
            searchTerm={search.debounce}
            page={page}
            SetTotalPages={(totalPages) => setTotalPages(totalPages)}
            user={user}
          />,
          <Assignments
            key="1"
            courseId={course.courseId}
            searchTerm={search.debounce}
            page={page}
            SetTotalPages={(totalPages) => setTotalPages(totalPages)}
            user={user}
          />,
          <Tests
            key="2"
            courseId={course.courseId}
            searchTerm={search.debounce}
            page={page}
            SetTotalPages={(totalPages) => setTotalPages(totalPages)}
            user={user}
          />,
        ];

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <div className={styles.card}>
          <div className={styles.imageWrapper}>
            <img
              src={`${import.meta.env.VITE_PUBLIC_URL}${course.img}`}
              className={styles.cardImg}
              alt={course.courseName}
            />
          </div>

          <div className={styles.cardContent}>
            <h2 className={styles.courseName}>{course.courseName}</h2>
            <p className={styles.description}>
              <strong>📜Description:</strong> {course.description}
            </p>
            {user && user.role === "Instructor" && (
              <p className={styles.instructor}>
                <strong>🧑‍🏫Lecturer:</strong>{" "}
                {user ? user.fullName : "Loading..."}
              </p>
            )}
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
              tabs={
                user && user.role === "Instructor"
                  ? ["Students", "Lessons", "Assignments", "Tests"]
                  : ["Lessons", "Assignments", "Tests"]
              }
              // tabs={["Students", "Lessons", "Assignments", "Tests"]}
              onTabChange={(index) => {
                setTabIndex(index);
                resetSearchAndPage();
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

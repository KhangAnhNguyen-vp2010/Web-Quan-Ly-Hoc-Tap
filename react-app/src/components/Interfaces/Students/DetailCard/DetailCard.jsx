import styles from "./DetailCard.module.scss";
import { useJoinTheCourse } from "../../../../Hooks/student/useJoinTheCourse";

function DetailCard({ user, course, onClose, onJoin }) {
  if (!course) return null;

  const { registerCourse, loading } = useJoinTheCourse(user.id);

  const handleRegister = (courseId) => {
    registerCourse(courseId, onClose);
    onJoin();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.card} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ×
        </button>
        <img
          src={`${import.meta.env.VITE_PUBLIC_URL}${course.img}`}
          alt={course.img}
          className={styles.image}
        />
        <div className={styles.content}>
          <h2 className={styles.title}>{course.courseName}</h2>
          <p className={styles.description}>Mô tả: {course.description}</p>
          <div className={styles.footer}>
            {/* <span className={styles.instructor}>👨‍🏫 {instructor}</span> */}
            <span className={styles.price}>Free</span>
          </div>
          <button
            className={styles.registerButton}
            onClick={() => handleRegister(course.courseId)}
            disabled={loading}
          >
            {loading ? "Đang thực thi..." : "Tham gia khoá học này miễn phí"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DetailCard;

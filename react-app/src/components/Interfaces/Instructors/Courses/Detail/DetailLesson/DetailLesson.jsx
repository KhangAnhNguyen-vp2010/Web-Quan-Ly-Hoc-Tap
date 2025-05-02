import styles from "../../../../../../assets/css/Instructor/Courses/Detail/DetailTest/DetailTest.module.css";
import VideoPlayer from "./VideoPlayer";
import EditLesson from "./EditLessson";
import { useDetailLesson } from "../../../../../../Hooks/instructor/Course/DetailCourse/DetailLesson/useDetailLesson";

const DetailLesson = ({ lesson: initialLesson, onClose }) => {
  const { lesson, showEditLesson, toggleEditLesson, handleUpdateLesson } =
    useDetailLesson(initialLesson);
  return (
    <div className={styles.testDetails}>
      <div className={styles.overlay}></div>

      <div className={styles.content}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <div className={styles["header-container"]}>
          <div>
            <h2 className={styles.assignmentTitle}>{lesson.lessonName}</h2>
            <button className={styles["btn-edit"]} onClick={toggleEditLesson}>
              ✏️Edit Lesson
            </button>
          </div>
        </div>
        <hr />
        <VideoPlayer key={lesson.linkYoutube} url={lesson.linkYoutube} />
      </div>
      {showEditLesson && (
        <EditLesson
          lesson={lesson}
          onUpdate={handleUpdateLesson}
          onClose={toggleEditLesson}
        />
      )}
    </div>
  );
};

export default DetailLesson;

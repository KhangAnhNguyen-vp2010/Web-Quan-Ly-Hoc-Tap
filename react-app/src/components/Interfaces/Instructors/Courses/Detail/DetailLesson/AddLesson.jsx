import styles from "../../../../../../assets/css/Instructor/Courses/Detail/DetailTest/EditTest.module.css";
import { useAddLesson } from "../../../../../../Hooks/instructor/Course/DetailCourse/DetailLesson/useAddLesson";

const AddLesson = ({ courseId, onClose }) => {
  const { lesson, handleChange, handleAdd } = useAddLesson(courseId, onClose);
  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <button className={styles.closeButton} onClick={() => onClose()}>
          &times;
        </button>
        <form onSubmit={handleAdd} className={styles["form-container"]}>
          <div>
            <label>Lesson name:</label>
            <input
              type="text"
              name="lessonName"
              value={lesson.lessonName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Link video {"(Youtube)"}:</label>
            <input
              type="text"
              name="linkYoutube"
              value={lesson.linkYoutube}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
};

export default AddLesson;

import styles from "../../../../../../assets/css/Instructor/Courses/Detail/DetailTest/EditTest.module.css";
import { useEditLesson } from "../../../../../../Hooks/instructor/Course/DetailCourse/DetailLesson/useEditLesson";

const EditLesson = ({ lesson: initialLesson, onUpdate, onClose }) => {
  const { lesson, handleChange, handleEdit } = useEditLesson(
    initialLesson,
    onUpdate,
    onClose
  );

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <button className={styles.closeButton} onClick={() => onClose()}>
          &times;
        </button>
        <form onSubmit={handleEdit} className={styles["form-container"]}>
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
            <label>Link video {"(Youtube,...)"}:</label>
            <input
              type="text"
              name="linkYoutube"
              value={lesson.linkYoutube}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit">Edit</button>
        </form>
      </div>
    </div>
  );
};

export default EditLesson;

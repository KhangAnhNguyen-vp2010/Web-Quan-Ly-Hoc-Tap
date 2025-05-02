import styles from "../../../../../../assets/css/Instructor/Courses/Detail/DetailTest/EditTest.module.css";
import { useEditTest } from "../../../../../../Hooks/instructor/Course/DetailCourse/DetailTest/useEditTest";

const EditTest = ({ courseId, initialTest, onUpdate, onClose }) => {
  const { test, files, handleChange, handleFileChange, handleUpdate } =
    useEditTest(initialTest, courseId, onUpdate, onClose);

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <button className={styles.closeButton} onClick={() => onClose()}>
          &times;
        </button>
        <form onSubmit={handleUpdate} className={styles["form-container"]}>
          <div>
            <label>Exercise name:</label>
            <input
              type="text"
              name="testName"
              value={test.testName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Deadline:</label>
            <input
              type="date"
              name="testDate"
              value={test.testDate}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Exercise Content:</label>
            <input
              type="text"
              name="testContent"
              value={test.testContent}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>File đính kèm</label>
            <input type="file" multiple onChange={handleFileChange} />
          </div>

          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
};

export default EditTest;

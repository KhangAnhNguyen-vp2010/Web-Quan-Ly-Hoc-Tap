import styles from "../../../../../../assets/css/Instructor/Courses/Detail/DetailTest/EditTest.module.css";
import { useAddTest } from "../../../../../../Hooks/instructor/Course/DetailCourse/DetailTest/useAddTest";

const AddTest = ({ courseId, onClose }) => {
  const { test, files, handleChange, handleFileChange, handleAdd } = useAddTest(
    courseId,
    onClose
  );

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <button className={styles.closeButton} onClick={() => onClose()}>
          &times;
        </button>
        <form onSubmit={handleAdd} className={styles["form-container"]}>
          <div>
            <label>Test name:</label>
            <input
              type="text"
              name="testName"
              value={test.testName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Test Content:</label>
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

          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
};

export default AddTest;

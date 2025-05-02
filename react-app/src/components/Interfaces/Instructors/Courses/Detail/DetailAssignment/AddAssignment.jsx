import styles from "../../../../../../assets/css/Instructor/Courses/Detail/DetailAssignment/AddAssignment.module.css";
import { useAddAssignment } from "../../../../../../Hooks/instructor/Course/DetailCourse/DetailAssignment/useAddAssignment";

function AddAssignment({ courseId, onClose }) {
  const { form, files, loading, handleFileChange, handleChange, handleSubmit } =
    useAddAssignment(courseId, onClose);
  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <h2>Add New Exercise</h2>
        <form onSubmit={handleSubmit} className={styles["form-container"]}>
          <div>
            <label>Exercise name:</label>
            <input
              type="text"
              name="assignmentName"
              value={form.assignmentName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Exercise content:</label>
            <textarea
              name="assignmentContent"
              value={form.assignmentContent}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>File đính kèm</label>
            <input type="file" multiple onChange={handleFileChange} />
          </div>
          <button
            type="submit"
            className={styles["btn-submit"]}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create exercise"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddAssignment;

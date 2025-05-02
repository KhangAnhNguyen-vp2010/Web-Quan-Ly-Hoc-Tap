import React from "react";
import styles from "../../../../../../assets/css/Instructor/Courses/Detail/DetailAssignment/EditAssignment.module.css";
import { useEditAssignment } from "../../../../../../Hooks/instructor/Course/DetailCourse/DetailAssignment/useEditAssignment";

function EditAssignment({ assignment, onUpdate, onClose }) {
  const { form, files, loading, handleChange, handleFileChange, handleUpdate } =
    useEditAssignment(assignment, onUpdate, onClose);

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
              name="assignmentName"
              value={form.assignmentName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Deadline:</label>
            <input
              type="date"
              name="dueDate"
              value={form.dueDate}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Exercise Content:</label>
            <input
              type="text"
              name="exerciseContent"
              value={form.exerciseContent}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>File đính kèm</label>
            <input type="file" multiple onChange={handleFileChange} />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditAssignment;

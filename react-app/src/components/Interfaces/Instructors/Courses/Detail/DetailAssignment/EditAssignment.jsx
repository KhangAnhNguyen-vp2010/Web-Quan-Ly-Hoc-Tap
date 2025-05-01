import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "../../../../../../assets/css/Instructor/Courses/Detail/DetailAssignment/EditAssignment.module.css";

function EditAssignment({ assignment, onUpdate, onClose }) {
  const [form, setForm] = useState(assignment);
  const [files, setFiles] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    function isValidDate(dateStr) {
      const regex = /^\d{4}-\d{2}-\d{2}$/;
      if (!regex.test(dateStr)) return false;

      const date = new Date(dateStr);
      const [year, month, day] = dateStr.split("-").map(Number);

      return (
        date.getFullYear() === year &&
        date.getMonth() + 1 === month &&
        date.getDate() === day
      );
    }

    if (form.dueDate === "" || !isValidDate(form.dueDate)) {
      toast.error("Invalid submission deadline");
      return;
    }

    const formData = new FormData();
    formData.append("courseID", form.courseId);
    formData.append("assignmentName", form.assignmentName);
    formData.append("dueDate", form.dueDate);
    formData.append("assignmentContent", form.exerciseContent);

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      await axios.put(
        `https://localhost:7233/api/Assignments/EditAssignment/${form.assignmentId}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Updated exercises");
      onUpdate(form);
      onClose();
    } catch (err) {
      toast.error(err || "Update failed");
    }
  };

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

          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}

export default EditAssignment;

import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "../../../../../../assets/css/Instructor/Courses/Detail/DetailAssignment/AddAssignment.module.css";

function AddAssignment({ courseId, onClose }) {
  const [form, setForm] = useState({
    assignmentName: "",
    assignmentContent: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.assignmentName.trim() || !form.assignmentContent.trim()) {
      toast.error("Please enter complete information");
      return;
    }

    try {
      const response = await axios.post(
        "https://localhost:7233/api/Assignments/AddAssignment",
        {
          courseID: courseId,
          assignmentName: form.assignmentName,
          assignmentContent: form.assignmentContent,
        },
        { withCredentials: true }
      );

      toast.success("Create a successful exercise");
      setForm({
        assignmentName: "",
        assignmentContent: "",
      });
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating exercise");
    }
  };

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
          <button type="submit" className={styles["btn-submit"]}>
            Create exercise
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddAssignment;

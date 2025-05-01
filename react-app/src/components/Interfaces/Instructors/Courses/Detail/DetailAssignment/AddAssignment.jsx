import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "../../../../../../assets/css/Instructor/Courses/Detail/DetailAssignment/AddAssignment.module.css";

function AddAssignment({ courseId, onClose }) {
  const [form, setForm] = useState({
    assignmentName: "",
    assignmentContent: "",
  });
  const [files, setFiles] = useState([]);
  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

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

    const formData = new FormData();
    formData.append("courseID", courseId);
    formData.append("assignmentName", form.assignmentName);
    formData.append("assignmentContent", form.assignmentContent);

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      const response = await axios.post(
        "https://localhost:7233/api/Assignments/AddAssignment",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Create a successful exercise");
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
          <div>
            <label>File đính kèm</label>
            <input type="file" multiple onChange={handleFileChange} />
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

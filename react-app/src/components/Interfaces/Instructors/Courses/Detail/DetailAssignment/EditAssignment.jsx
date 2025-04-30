import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "../../../../../../assets/css/Instructor/Courses/Detail/DetailAssignment/EditAssignment.module.css";

function EditAssignment({ assignment, onUpdate, onClose }) {
  const [form, setForm] = useState(assignment);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const isPastDate = () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const dueDate = new Date(form.dueDate);
      dueDate.setHours(0, 0, 0, 0);

      return dueDate < today;
    };

    if (form.dueDate === "") {
      toast.error("Invalid submission deadline");
      return;
    }

    if (form.dueDate && isPastDate()) {
      toast.error("The due date cannot be in the past.");
      return;
    }

    try {
      await axios.put(
        `https://localhost:7233/api/Assignments/EditAssignment/${form.assignmentId}`,
        {
          assignmentName: form.assignmentName,
          dueDate: form.dueDate || null,
          assignmentContent: form.exerciseContent,
        },
        { withCredentials: true }
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

          <button type="submit">Update</button>
        </form>
      </div>
    </div>
  );
}

export default EditAssignment;

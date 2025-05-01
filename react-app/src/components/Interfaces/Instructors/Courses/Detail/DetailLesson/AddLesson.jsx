import React, { useState } from "react";
import styles from "../../../../../../assets/css/Instructor/Courses/Detail/DetailTest/EditTest.module.css";
import { toast } from "react-toastify";
import axios from "axios";

const AddLesson = ({ courseId, onClose }) => {
  const [lesson, setLesson] = useState({
    lessonName: "",
    linkYoutube: "",
  });

  const handleChange = (e) => {
    setLesson({
      ...lesson,
      [e.target.name]: e.target.value,
    });
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `https://localhost:7233/api/Lessons`,
        {
          courseID: courseId,
          lessonName: lesson.lessonName,
          linkYoutube: lesson.linkYoutube,
        },
        {
          withCredentials: true,
        }
      );
      onClose();
      toast.success("Added!!!");
    } catch (error) {
      console.error(error);
      toast.error("Lỗi khi thêm");
    }
  };

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

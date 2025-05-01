import React, { useState } from "react";
import styles from "../../../../../../assets/css/Instructor/Courses/Detail/DetailTest/EditTest.module.css";
import { toast } from "react-toastify";
import axios from "axios";

const EditLesson = ({ lesson, onUpdate, onClose }) => {
  const [Lesson, setLesson] = useState(lesson);

  const handleChange = (e) => {
    setLesson({
      ...lesson,
      [e.target.name]: e.target.value,
    });
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `https://localhost:7233/api/Lessons/${Lesson.lessonId}`,
        {
          lessonName: Lesson.lessonName,
          linkYoutube: Lesson.linkYoutube,
        },
        {
          withCredentials: true,
        }
      );
      onUpdate(Lesson);
      onClose();
      toast.success("Updated!!!");
    } catch (error) {
      console.error(error);
      toast.error("Lỗi khi update");
    }
  };

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
              value={Lesson.lessonName}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Link video {"(Youtube,...)"}:</label>
            <input
              type="text"
              name="linkYoutube"
              value={Lesson.linkYoutube}
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

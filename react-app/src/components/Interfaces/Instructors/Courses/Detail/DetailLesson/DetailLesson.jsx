import React, { useState, useReducer } from "react";
import styles from "../../../../../../assets/css/Instructor/Courses/Detail/DetailTest/DetailTest.module.css";
import VideoPlayer from "./VideoPlayer";
import EditLesson from "./EditLessson";

const DetailLesson = ({ lesson, onClose }) => {
  const [showEditLesson, setShowEditLesson] = useState(false);
  const [Lesson, setLesson] = useState(lesson);

  const handleOncloseEdit = (obj) => {
    setLesson(obj);
    setShowEditLesson(!showEditLesson);
  };

  return (
    <div className={styles.testDetails}>
      <div className={styles.overlay}></div>

      <div className={styles.content}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <div className={styles["header-container"]}>
          <div>
            <h2 className={styles.assignmentTitle}>{Lesson.lessonName}</h2>
            <button
              className={styles["btn-edit"]}
              onClick={() => setShowEditLesson(!showEditLesson)}
            >
              ✏️Edit Lesson
            </button>
          </div>
        </div>
        <hr />
        <VideoPlayer key={Lesson.linkYoutube} url={Lesson.linkYoutube} />
      </div>
      {showEditLesson && (
        <EditLesson
          lesson={Lesson}
          onUpdate={(obj) => handleOncloseEdit(obj)}
          onClose={() => setShowEditLesson(!showEditLesson)}
        />
      )}
    </div>
  );
};

export default DetailLesson;

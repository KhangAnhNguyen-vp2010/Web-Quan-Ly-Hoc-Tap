import styles from "../../../../../../assets/css/Instructor/Courses/Detail/DetailTest/DetailTest.module.css";
import { useDetailTest } from "../../../../../../Hooks/instructor/Course/DetailCourse/DetailTest/useDetailTest";
import EditTest from "./EditTest";
import TestFilesList from "./TestFilesList";
import TestScoreList from "./TestScoreList";
import axiosClient from "../../../../../../api/axiosClient";
import { useEffect, useState } from "react";
import SubmitForm from "../../../../Students/DetailCourse/SubmitForm";

const DetailTest = ({ test, courseId, onClose, user }) => {
  const {
    test: currentTest,
    showEditTest,
    loadListFile,
    toggleEditTest,
    handleOnCloseEdit,
    handleOnSubmit,
  } = useDetailTest(test);

  const [timestamps, setTimestamps] = useState({
    completedDate: null,
    startDate: null,
    endDate: null,
  });

  const [showSubmitTest, setShowSubmitTest] = useState(false);

  const getTimestamps = async () => {
    try {
      const res = await axiosClient.get(
        `/Students/timestamps/${user.id}/${test.testId}`
      );
      setTimestamps({
        completedDate: res.data.completedDate,
        startDate: res.data.startDate,
        endDate: res.data.endDate,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const startTesting = async () => {
    try {
      await axiosClient.post(
        `/Students/StartTesting/${user.id}/${test.testId}`
      );
    } catch (error) {
      console.log("Loi khi start testing " + error);
    }
  };

  const handleStartTesting = async () => {
    await startTesting();
    await getTimestamps();
  };

  useEffect(() => {
    getTimestamps();
  }, [, showSubmitTest]);

  return (
    <div className={styles.testDetails}>
      <div className={styles.overlay}></div>

      <div className={styles.content}>
        <button className={styles.closeButton} onClick={onClose}>
          &times;
        </button>
        <div className={styles["header-container"]}>
          <div>
            <h2 className={styles.assignmentTitle}>{currentTest.testName}</h2>
            <div className={styles.testDate}>
              <strong>🗓️Created at:</strong>{" "}
              {new Date(currentTest.testDate).toLocaleDateString()}
            </div>
            <div className={styles.testContent}>
              <strong>📋Content:</strong> {currentTest.testContent}
            </div>
            {user.role === "Instructor" ? (
              <button className={styles["btn-edit"]} onClick={toggleEditTest}>
                ✏️Edit Test or Adding File
              </button>
            ) : timestamps.startDate === null ? (
              <button
                className={styles["btn-edit"]}
                onClick={handleStartTesting}
              >
                Bắt đầu làm bài
              </button>
            ) : (
              <>
                <button
                  className={
                    timestamps.completedDate !== null
                      ? styles["btn-submitted"]
                      : styles["btn-edit"]
                  }
                  onClick={() => setShowSubmitTest(!showSubmitTest)}
                  disabled={timestamps.completedDate !== null}
                >
                  {timestamps.completedDate !== null
                    ? "Đã Nộp Bài Vào Lúc " + timestamps.completedDate
                    : "Nộp bài"}
                </button>{" "}
                {new Date().toLocaleDateString("vi-VN") +
                  "🕒" +
                  new Date(timestamps.startDate).toTimeString().slice(0, 5) +
                  "  ⏩  " +
                  new Date(timestamps.endDate).toTimeString().slice(0, 5) +
                  "🕔" +
                  "(Thời lượng 60 phút)"}
              </>
            )}
          </div>
        </div>
        <hr />
        {user.role !== "Instructor" && timestamps.startDate === null ? (
          <p>Nhấn "Bắt đầu làm bài" để mở khoá đề bài!!!</p>
        ) : (
          <TestFilesList
            testId={currentTest.testId}
            loadingFile={loadListFile}
            user={user}
          />
        )}

        <hr />
        {user.role === "Instructor" ? (
          <TestScoreList testId={currentTest.testId} courseId={courseId} />
        ) : (
          <TestFilesList
            testId={currentTest.testId}
            loadingFile={loadListFile}
            user={user}
            completed={true}
          />
        )}
      </div>
      {showEditTest && (
        <EditTest
          courseId={courseId}
          initialTest={currentTest}
          onUpdate={handleOnCloseEdit}
          onClose={toggleEditTest}
        />
      )}
      {showSubmitTest && (
        <SubmitForm
          user={user}
          test={currentTest}
          onClose={() => setShowSubmitTest(!showSubmitTest)}
          onSubmit={handleOnSubmit}
        />
      )}
    </div>
  );
};

export default DetailTest;

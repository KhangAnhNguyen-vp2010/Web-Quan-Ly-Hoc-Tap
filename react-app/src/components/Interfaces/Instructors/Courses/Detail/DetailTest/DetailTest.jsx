import styles from "../../../../../../assets/css/Instructor/Courses/Detail/DetailTest/DetailTest.module.css";
import EditTest from "./EditTest";
import TestFilesList from "./TestFilesList";
import TestScoreList from "./TestScoreList";
import SubmitForm from "../../../../Students/DetailCourse/SubmitForm";
import { useStartTesting } from "../../../../../../Hooks/student/useStartTesting";
import { useGetTimestamps } from "../../../../../../Hooks/student/useGetTimestamps";
import { useDetailTest } from "../../../../../../Hooks/instructor/Course/DetailCourse/DetailTest/useDetailTest";
import StudentView from "../../../Scoring/StudentView";
import { useState } from "react";
const DetailTest = ({ test, courseId, onClose, user }) => {
  const {
    test: currentTest,
    showEditTest,
    loadListFile,
    toggleEditTest,
    handleOnCloseEdit,
    handleOnSubmit,
  } = useDetailTest(test);
  const { startTesting } = useStartTesting({ test, user });

  const [showSubmitTest, setShowSubmitTest] = useState(false);

  const { timestamps, getTimestamps } = useGetTimestamps({
    test,
    user,
    showSubmitTest,
  });

  const [showStudentTest, setShowStudentTest] = useState(false);
  const [student, setStudent] = useState(null);
  const [loadTestScoreList, setLoadTestScoreList] = useState(false);

  const handleStartTesting = async () => {
    await startTesting();
    await getTimestamps();
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
          <TestScoreList
            key={loadTestScoreList}
            testId={currentTest.testId}
            courseId={courseId}
            onOpenStudentTest={(s) => {
              setShowStudentTest(!showStudentTest);
              setStudent(s);
            }}
          />
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
      {showStudentTest && (
        <StudentView
          test={currentTest}
          student={student}
          onClose={() => setShowStudentTest(!showStudentTest)}
          onUpdateScore={() => setLoadTestScoreList(!loadTestScoreList)}
        />
      )}
    </div>
  );
};

export default DetailTest;

import React, { useEffect } from "react";
import styles from "../../../../../../assets/css/Instructor/Courses/Detail/DetailAssignment/CompletedAssignmentsList.module.css"; // Import the CSS module
import { useCompletedAssignments } from "../../../../../../Hooks/instructor/Course/DetailCourse/DetailAssignment/useCompletedAssignments";

const CompletedAssignmentsList = ({
  assignmentId,
  countCompleted,
  onOpenStudentAssignment,
  student,
}) => {
  const { completedUsers, loading } = useCompletedAssignments(assignmentId);

  useEffect(() => {
    countCompleted(completedUsers.count);
  }, [completedUsers.count]);

  if (loading)
    return <p className={styles.loading}>Loading completed assignments...</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>✅Completed</h2>
      <ul className={styles.assignmentList}>
        {completedUsers.list.length === 0 ? (
          <div className={styles.congratulationsWrapper}>
            <div className={styles.congratulationsMessage}>
              😞No student has completed the assignment yet.
            </div>
          </div>
        ) : (
          completedUsers.list.map((user) => (
            <li
              key={user.userID}
              className={styles.assignmentItem}
              onClick={() => {
                onOpenStudentAssignment();
                student(user);
              }}
            >
              <span className={styles.assignmentText}>
                Mã số: {user.userID}
              </span>
              <span className={styles.assignmentText}>{user.full_Name}</span>
              <span className={styles.completionDate}>
                Completed at: {user.completion_Date}
              </span>
              <span className={styles.completionDate}>
                Grade: {user.grade !== null ? user.grade : "Chưa chấm"}
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default CompletedAssignmentsList;

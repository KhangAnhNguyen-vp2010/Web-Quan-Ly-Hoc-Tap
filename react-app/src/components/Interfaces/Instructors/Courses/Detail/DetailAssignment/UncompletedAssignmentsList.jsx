import React, { useEffect } from "react";
import styles from "../../../../../../assets/css/Instructor/Courses/Detail/DetailAssignment/UncompletedAssignmentsList.module.css"; // Import the CSS module
import { useUncompletedAssignments } from "../../../../../../Hooks/instructor/Course/DetailCourse/DetailAssignment/useUncompletedAssignments";

const UncompletedAssignmentsList = ({ assignmentId, countUncompleted }) => {
  const { uncompletedUsers, loading } = useUncompletedAssignments(assignmentId);

  useEffect(() => {
    countUncompleted(uncompletedUsers.count);
  }, [uncompletedUsers.count]);

  if (loading)
    return <p className={styles.loading}>Loading uncompleted assignments...</p>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>⏳Uncompleted</h2>
      <ul className={styles.assignmentList}>
        {uncompletedUsers.list.length === 0 ? (
          <div className={styles.congratulationsWrapper}>
            <div className={styles.congratulationsMessage}>
              🎉Congratulations! All students completed the assignment.
            </div>
          </div>
        ) : (
          uncompletedUsers.list.map((user) => (
            <li key={user.userID} className={styles.assignmentItem}>
              <span className={styles.assignmentText}>
                Mã số: {user.userID}
              </span>
              <span className={styles.assignmentText}>{user.full_Name}</span>
              <span className={styles.statusText}>Not completed yet</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default UncompletedAssignmentsList;

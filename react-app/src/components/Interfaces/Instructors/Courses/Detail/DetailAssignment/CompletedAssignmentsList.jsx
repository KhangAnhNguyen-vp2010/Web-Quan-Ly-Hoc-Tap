import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../../../../../assets/css/Instructor/Courses/Detail/DetailAssignment/CompletedAssignmentsList.module.css"; // Import the CSS module

const CompletedAssignmentsList = ({ assignmentId, countCompleted }) => {
  const [completedUsers, setCompletedUsers] = useState({
    list: [],
    count: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompletedAssignments = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7233/api/Assignments/completed/${assignmentId}`
        );
        setCompletedUsers({
          list: response.data && response.data,
          count: response.data && response.data.length,
        });
      } catch (err) {
        console.log("Error " + err);
      } finally {
        setLoading(false);
      }
    };

    fetchCompletedAssignments();
  }, [assignmentId]);

  useEffect(() => {
    countCompleted(completedUsers.count);
  }, [loading]);

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
            <li key={user.userID} className={styles.assignmentItem}>
              <span className={styles.assignmentText}>
                Mã số: {user.userID}
              </span>
              <span className={styles.assignmentText}>{user.full_Name}</span>
              <span className={styles.completionDate}>
                Completed at: {new Date(user.completion_Date).toLocaleString()}
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default CompletedAssignmentsList;

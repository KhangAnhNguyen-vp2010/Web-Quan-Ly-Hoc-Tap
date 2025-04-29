import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../../../../../assets/css/Instructor/Courses/Detail/DetailAssignment/UncompletedAssignmentsList.module.css"; // Import the CSS module

const UncompletedAssignmentsList = ({ assignmentId, countUncompleted }) => {
  const [uncompletedUsers, setUncompletedUsers] = useState({
    list: [],
    count: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUncompletedAssignments = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7233/api/Assignments/uncompleted/${assignmentId}`,
          { withCredentials: true }
        );
        setUncompletedUsers({
          list: response.data && response.data,
          count: response.data && response.data.length,
        });
      } catch (err) {
        console.log("Error " + err);
      } finally {
        setLoading(false);
      }
    };

    fetchUncompletedAssignments();
  }, [assignmentId]);

  useEffect(() => {
    countUncompleted(uncompletedUsers.count);
  }, [loading]);

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

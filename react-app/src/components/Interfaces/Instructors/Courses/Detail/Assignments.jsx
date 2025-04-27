import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../../../../assets/css/Instructor/Courses/Detail/Assignments.module.css";
import { FaSadTear } from "react-icons/fa";

const Assignments = ({ courseId, searchTerm, page, SetTotalPages }) => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSetTotalPages = (data) => {
    SetTotalPages(data);
  };

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7233/api/Assignments/Course/${courseId}?search=${searchTerm}&page=${page}`
        );
        setAssignments(response.data.items);
        handleSetTotalPages(response.data.totalPages);
      } catch (error) {
        console.error("Error fetching assignments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [courseId, searchTerm, page]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleClick = () => {};

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h4 className={styles.title}>List of Assignments</h4>
        <button className={styles["btn-addAssignment"]}>Add Assignment</button>
      </div>

      <div className={styles.assignmentsList}>
        {assignments.length === 0 ? (
          <div className={styles.noAssignments}>
            <FaSadTear size={40} style={{ marginBottom: "10px" }} />
            No Assignments yet!!!
          </div>
        ) : (
          assignments.map((assignment, index) => (
            <div
              key={index}
              className={styles.assignmentCard}
              onClick={handleClick}
            >
              <div className={styles.assignmentInfo}>
                <h5 className={styles.assignmentName}>
                  {assignment.assignmentName}
                </h5>
                <p className={styles.assignmentDescription}>
                  {assignment.exerciseContent}
                </p>
              </div>
              <span className={styles.assignmentDueDate}>
                Due Date: {new Date(assignment.dueDate).toLocaleDateString()}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Assignments;

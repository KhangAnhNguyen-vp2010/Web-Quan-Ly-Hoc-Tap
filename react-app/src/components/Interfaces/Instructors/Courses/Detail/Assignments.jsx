import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../../../../assets/css/Instructor/Courses/Detail/Assignments.module.css";
import { FaSadTear } from "react-icons/fa";
import DetailAssignment from "./DetailAssignment/DetailAssignment";
import AddAssignment from "./DetailAssignment/AddAssignment";

const Assignments = ({ courseId, searchTerm, page, SetTotalPages }) => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [assignment, setAssignment] = useState(null);
  const [showDetailAssignment, setShowDetailAssignment] = useState(false);
  const [showAddAssignment, setShowAddAssignment] = useState(false);

  const handleSetTotalPages = (data) => {
    SetTotalPages(data);
  };

  const fetchAssignments = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7233/api/Assignments/Course/${courseId}?search=${searchTerm}&page=${page}`,
        { withCredentials: true }
      );

      setAssignments(response.data.items);
      handleSetTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, [courseId, searchTerm, page]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h4 className={styles.title}>📙List of Assignments</h4>
          <button
            className={styles["btn-addAssignment"]}
            onClick={() => setShowAddAssignment(!showAddAssignment)}
          >
            📙Add Exercises
          </button>
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
                onClick={() => {
                  setAssignment(assignment);
                  setShowDetailAssignment(!showDetailAssignment);
                }}
              >
                <div className={styles.assignmentInfo}>
                  <h5 className={styles.assignmentName}>
                    📖{assignment.assignmentName}
                  </h5>
                  <p className={styles.assignmentDescription}>
                    📋{assignment.exerciseContent}
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

      {showDetailAssignment && (
        <DetailAssignment
          courseId={courseId}
          assignment={assignment}
          onClose={() => {
            fetchAssignments();
            setShowDetailAssignment(!showDetailAssignment);
          }}
        />
      )}

      {showAddAssignment && (
        <AddAssignment
          courseId={courseId}
          onClose={() => {
            fetchAssignments();
            setShowAddAssignment(!showAddAssignment);
          }}
        />
      )}
    </>
  );
};

export default Assignments;

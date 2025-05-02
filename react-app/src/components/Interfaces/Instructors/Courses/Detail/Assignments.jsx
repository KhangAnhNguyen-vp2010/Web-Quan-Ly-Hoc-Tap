import styles from "../../../../../assets/css/Instructor/Courses/Detail/Assignments.module.css";
import { FaSadTear } from "react-icons/fa";
import DetailAssignment from "./DetailAssignment/DetailAssignment";
import AddAssignment from "./DetailAssignment/AddAssignment";
import { useAssignments } from "../../../../../Hooks/instructor/Course/DetailCourse/useAssignments";

const Assignments = ({ courseId, searchTerm, page, SetTotalPages }) => {
  const {
    assignments,
    loading,
    assignment,
    setAssignment,
    showDetailAssignment,
    setShowDetailAssignment,
    showAddAssignment,
    setShowAddAssignment,
    fetchAssignments,
  } = useAssignments(courseId, searchTerm, page, SetTotalPages);

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
                  Deadline: {new Date(assignment.dueDate).toLocaleDateString()}
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

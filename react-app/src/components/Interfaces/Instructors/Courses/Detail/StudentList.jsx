import styles from "../../../../../assets/css/Instructor/Courses/Detail/StudentList.module.css";
import { FaSadTear } from "react-icons/fa";
import { useStudents } from "../../../../../Hooks/instructor/Course/DetailCourse/useStudents";

const StudentList = ({ courseId, searchTerm, page, SetTotalPages }) => {
  const { students, loading } = useStudents({
    courseId,
    searchTerm,
    page,
    setTotalPages: SetTotalPages,
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h4 className={styles.title}>🧑‍🎓List of students</h4>
      <div className={styles.studentList}>
        {students.length === 0 ? (
          <div className={styles.noStudents}>
            <FaSadTear size={40} style={{ marginBottom: "10px" }} />
            No students yet!!!
          </div>
        ) : (
          students.map((student, index) => (
            <div key={index} className={styles.studentCard}>
              <div className={styles.studentInfo}>
                <h5 className={styles.studentName}>🧑‍💻{student.fullName}</h5>
                <p className={styles.studentEmail}>📧{student.email}</p>
              </div>
              <span className={styles.studentRole}>
                Mã học sinh: {student.userId}
              </span>
              <span className={styles.studentRole}>{student.role}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default StudentList;

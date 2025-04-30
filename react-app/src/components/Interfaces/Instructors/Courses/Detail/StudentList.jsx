import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../../../../assets/css/Instructor/Courses/Detail/StudentList.module.css";
import { FaSadTear } from "react-icons/fa";

const StudentList = ({ courseId, searchTerm, page, SetTotalPages }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSetTotalPages = (data) => {
    SetTotalPages(data);
  };
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7233/api/Courses/StudentList/${courseId}?searchTerm=${searchTerm}&page=${page}`,
          { withCredentials: true }
        );
        setStudents(response.data.students);
        handleSetTotalPages(response.data.total_Pages);
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [courseId, searchTerm, page]);

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

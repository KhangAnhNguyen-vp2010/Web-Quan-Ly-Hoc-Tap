import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../../assets/css/Instructor/Courses.module.css";

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get("https://localhost:7233/api/Courses", {
          withCredentials: true,
        });
        setCourses(res.data);
      } catch (err) {
        console.error("Lỗi khi lấy danh sách khoá học:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Đang tải...</span>
        </div>
      </div>
    );

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">📚 Danh sách khoá học</h2>
      <div className="row g-4">
        {courses.map((course) => (
          <div key={course.id} className="col-sm-12 col-md-6 col-lg-4">
            <div className={`card h-100 shadow-sm border-0 ${styles.card}`}>
              {course.img && (
                <div
                  className={`card-img-top ${styles.cardImgContainer}`}
                  style={{
                    backgroundImage: `url('https://localhost:7233${course.img}')`,
                  }}
                >
                  {/* <img src={`https://localhost:7233${course.img}`} alt={course.courseName} className={styles.cardImgTop} /> */}
                </div>
              )}
              <div className="card-body d-flex flex-column">
                <h5 className={`card-title ${styles.cardTitle}`}>
                  {course.courseName}
                </h5>
                <p
                  className={`card-text ${styles.cardText} ${styles.cardTextTruncate}`}
                >
                  <strong>Mô tả:</strong>{" "}
                  {course.description || "Không có mô tả"}
                </p>
                <p className="text-muted mt-auto">
                  <strong>Giảng viên ID:</strong>{" "}
                  {course.instructorID || "Chưa có"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;

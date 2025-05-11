import React, { useEffect, useState } from "react";
import axiosClient from "../../../api/axiosClient";
import styles from "./ShopCourse.module.scss";
import DetailCard from "./DetailCard/DetailCard";
import { useJoinTheCourse } from "../../../Hooks/student/useJoinTheCourse";
import Pagination from "../Instructors/Pagination";

const ShopCourse = ({ user }) => {
  const [courses, setCourses] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(3);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState({
    item: "",
    show: false,
  });
  const [join, setJoin] = useState(false);
  const { registerCourse } = useJoinTheCourse(user.id);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const res = await axiosClient.get(
        `/Students/unregistered?userId=${user.id}`,
        {
          params: { page, pageSize, search, sort },
          withCredentials: true,
        }
      );
      setCourses(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchCourses();
    }, 300); // đợi 500ms sau khi ngừng gõ mới gọi API

    return () => clearTimeout(delayDebounce);
  }, [page, search, sort, join]);

  const handleViewDetails = (course) => {
    setDetail({
      item: course,
      show: !detail.show,
    });
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.controls}>
          <div className={styles.searchBox}>
            <input
              type="text"
              placeholder="Tìm kiếm khoá học..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
            />
            <i className={styles.searchIcon}>🔍</i>
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className={styles.sortSelect}
          >
            <option value="">Sắp xếp mặc định</option>
            <option value="name-asc">Tên A-Z</option>
            <option value="name-desc">Tên Z-A</option>
          </select>
        </div>

        {loading ? (
          <div className={styles.loading}>Đang tải khóa học...</div>
        ) : (
          <div className={styles.courseGrid}>
            {courses.length > 0 ? (
              courses.map((course) => (
                <div key={course.courseId} className={styles.card}>
                  <div className={styles.imageContainer}>
                    <img
                      src={`${import.meta.env.VITE_PUBLIC_URL}${course.img}`}
                      alt={course.courseName}
                      className={styles.courseImage}
                    />
                    {course.discount > 0 && (
                      <span className={styles.discountBadge}>
                        -{course.discount}%
                      </span>
                    )}
                  </div>

                  <div className={styles.cardContent}>
                    <h2 className={styles.courseName}>{course.courseName}</h2>
                    <p className={styles.courseDescription}>
                      {course.description
                        ? course.description.length > 100
                          ? course.description.substring(0, 100) + "..."
                          : course.description
                        : "Không có mô tả."}
                    </p>

                    <div className={styles.cardFooter}>
                      <div className={styles.cardButtons}>
                        <button
                          className={styles.detailsBtn}
                          onClick={() => handleViewDetails(course)}
                        >
                          Chi tiết
                        </button>
                        <button
                          className={styles.registerBtn}
                          onClick={() => {
                            registerCourse(course.courseId);
                            setJoin(!join);
                          }}
                        >
                          Tham gia miễn phí
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.noCourses}>
                Không tìm thấy khóa học nào phù hợp.
              </div>
            )}
          </div>
        )}

        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>
      {detail.show && (
        <DetailCard
          user={user}
          course={detail.item}
          onClose={() =>
            setDetail({
              ...detail,
              show: !detail.show,
            })
          }
          onJoin={() => {
            setDetail({
              ...detail,
              show: !detail.show,
            });
            setJoin(!join);
          }}
        />
      )}
    </>
  );
};

export default ShopCourse;

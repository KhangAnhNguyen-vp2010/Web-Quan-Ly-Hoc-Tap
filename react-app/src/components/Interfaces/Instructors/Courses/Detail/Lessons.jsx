import { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../../../../assets/css/Instructor/Courses/Detail/Lessons.module.css";
import { FaSadTear } from "react-icons/fa";
import DetailLesson from "./DetailLesson/DetailLesson";
import AddLesson from "./DetailLesson/AddLesson";

const Lessons = ({ courseId, searchTerm, page, SetTotalPages }) => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lesson, setLesson] = useState(null);
  const [showDetailLesson, setShowDetailLesson] = useState(false);
  const [showAddLesson, setShowAddLesson] = useState(false);

  const handleSetTotalPages = (data) => {
    SetTotalPages(data);
  };

  const fetchLessons = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7233/api/Lessons/by-course?courseId=${courseId}&search=${searchTerm}&page=${page}`,
        { withCredentials: true }
      );

      setLessons(response.data.items);
      handleSetTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching lessons:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLessons();
  }, [courseId, searchTerm, page]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.header}>
          <h4 className={styles.title}>🎥List of Lessons</h4>
          <button
            className={styles["btn-addLesson"]}
            onClick={() => setShowAddLesson(!showAddLesson)}
          >
            🎥Add Lesson
          </button>
        </div>

        <div className={styles.lessonsList}>
          {lessons.length === 0 ? (
            <div className={styles.noLessons}>
              <FaSadTear size={40} style={{ marginBottom: "10px" }} />
              No lessons yet!!!
            </div>
          ) : (
            lessons.map((lesson, index) => {
              // Extract YouTube video ID
              const videoIdMatch = lesson.linkYoutube?.match(
                /(?:\?v=|\/embed\/|\.be\/)([a-zA-Z0-9_-]{11})/
              );
              const videoId = videoIdMatch ? videoIdMatch[1] : null;
              const thumbnailUrl = videoId
                ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
                : null;

              return (
                <div
                  key={index}
                  className={styles.lessonCard}
                  onClick={() => {
                    setLesson(lesson);
                    setShowDetailLesson(!showDetailLesson);
                  }}
                >
                  <div className={styles.lessonInfo}>
                    <h5 className={styles.lessonName}>📺{lesson.lessonName}</h5>
                  </div>
                  {thumbnailUrl && (
                    <img
                      src={thumbnailUrl}
                      alt="YouTube thumbnail"
                      className={styles.thumbnail}
                      onError={(e) => {
                        e.target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                      }}
                    />
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {showDetailLesson && (
        <DetailLesson
          lesson={lesson}
          courseId={courseId}
          onClose={() => {
            fetchLessons();
            setShowDetailLesson(!showDetailLesson);
          }}
        />
      )}

      {showAddLesson && (
        <AddLesson
          courseId={courseId}
          onClose={() => {
            fetchLessons();
            setShowAddLesson(!showAddLesson);
          }}
        />
      )}
    </>
  );
};

export default Lessons;

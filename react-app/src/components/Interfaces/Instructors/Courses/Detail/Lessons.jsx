import styles from "../../../../../assets/css/Instructor/Courses/Detail/Lessons.module.css";
import { FaSadTear } from "react-icons/fa";
import DetailLesson from "./DetailLesson/DetailLesson";
import AddLesson from "./DetailLesson/AddLesson";
import { useLessons } from "../../../../../Hooks/instructor/Course/DetailCourse/useLessons";

const Lessons = ({ courseId, searchTerm, page, SetTotalPages }) => {
  const {
    lessons,
    loading,
    lesson,
    setLesson,
    showDetailLesson,
    setShowDetailLesson,
    showAddLesson,
    setShowAddLesson,
    refetch,
  } = useLessons({ courseId, searchTerm, page, setTotalPages: SetTotalPages });

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
            refetch();
            setShowDetailLesson(!showDetailLesson);
          }}
        />
      )}

      {showAddLesson && (
        <AddLesson
          courseId={courseId}
          onClose={() => {
            refetch();
            setShowAddLesson(!showAddLesson);
          }}
        />
      )}
    </>
  );
};

export default Lessons;

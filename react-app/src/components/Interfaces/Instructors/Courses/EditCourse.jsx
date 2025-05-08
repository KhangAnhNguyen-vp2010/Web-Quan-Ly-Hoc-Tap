import styles from "../../../../assets/css/Instructor/Courses/EditCourse.module.css";
import { useEditCourse } from "../../../../Hooks/instructor/Course/useEditCourse";
import { useCourse } from "../../../../contexts/CourseContext";
function EditCourse({ onClose, courseObject }) {
  const { setLoad } = useCourse();

  const {
    formData,
    selectedImage,
    handleChange,
    handleImageChange,
    handleSubmit,
  } = useEditCourse(courseObject, setLoad, onClose);

  return (
    <div className={styles.overlay}>
      <div className={styles["edit-course-container"]}>
        <h2>Edit Course</h2>

        <img
          src={
            selectedImage
              ? URL.createObjectURL(selectedImage)
              : `${import.meta.env.VITE_PUBLIC_URL}${courseObject.img}`
          }
          alt={courseObject.courseName}
          className={styles["edit-img"]}
        />

        <form onSubmit={handleSubmit}>
          <div className={styles["form-group"]}>
            <label htmlFor="courseName">Course Name:</label>
            <input
              type="text"
              id="courseName"
              name="courseName"
              value={formData.courseName}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="courseDescription">Course Description:</label>
            <textarea
              id="courseDescription"
              name="courseDescription"
              value={formData.courseDescription}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="courseImage">Course Image:</label>
            <input
              type="file"
              id="courseImage"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <div className={styles["form-actions"]}>
            <button type="button" onClick={onClose} className={styles.cancel}>
              Cancel
            </button>
            <button type="submit" className={styles.submit}>
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCourse;

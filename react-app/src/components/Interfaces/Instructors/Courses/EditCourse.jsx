import { useState } from "react";
import axios from "axios";
import styles from "../../../../assets/css/Instructor/Courses/EditCourse.module.css";
import { toast } from "react-toastify";
import { useCourse } from "../../../../contexts/CourseContext";

function EditCourse({ onClose, courseObject }) {
  const [formData, setFormData] = useState({
    courseName: courseObject.courseName,
    courseDescription: courseObject.description,
  });
  const [selectedImage, setSelectedImage] = useState(null);

  const { setLoad } = useCourse();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://localhost:7233/api/courses/${courseObject.courseId}`,
        {
          courseName: formData.courseName,
          description: formData.courseDescription,
        },
        { withCredentials: true }
      );

      const form = new FormData();
      if (selectedImage) {
        form.append("file", selectedImage);
      }
      await axios.post(
        `https://localhost:7233/api/Courses/upload/${courseObject.courseId}`,
        form,
        { withCredentials: true }
      );
    } catch (error) {
      console.error("Error updating course:", error);
      return;
    }
    toast.success("Course updated successfully!");
    onClose();
    setLoad(true);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles["edit-course-container"]}>
        <h2>Edit Course</h2>

        <img
          src={
            selectedImage
              ? URL.createObjectURL(selectedImage)
              : `https://localhost:7233${courseObject.img}`
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
              value={formData.courseName}
              onChange={(e) =>
                setFormData({ ...formData, courseName: e.target.value })
              }
            />
          </div>

          <div>
            <label htmlFor="courseDescription">Course Description:</label>
            <textarea
              id="courseDescription"
              value={formData.courseDescription}
              onChange={(e) =>
                setFormData({ ...formData, courseDescription: e.target.value })
              }
            ></textarea>
          </div>
          <div className={styles["form-group"]}>
            <label htmlFor="courseImage">Course Image:</label>
            <input
              type="file"
              id="courseImage"
              accept="image/*"
              onChange={(e) => setSelectedImage(e.target.files[0])}
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

import axios from "axios";
import { toast } from "react-toastify";
import axiosClient from "../../../../api/axiosClient";
import styles from "../../../../assets/css/Instructor/Courses/AddCourse.module.css";
import { useCourse } from "../../../../contexts/CourseContext";
import { useGetUser } from "../../../../Hooks/useGetUser";
import { useAddCourse } from "../../../../Hooks/instructor/Course/useAddCourse";

const AddCourse = ({ onClose }) => {
  const { user } = useGetUser();
  const { setLoad } = useCourse();

  const {
    formData,
    selectedImage,
    handleChange,
    handleImageChange,
    handleSubmit,
  } = useAddCourse(user, setLoad, onClose);

  return (
    <>
      {/* Overlay */}
      <div className={`${styles.overlay}`}>
        <div className={styles.modal}>
          <h3 className={styles.modalTitle}>Add Course</h3>
          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Course Name</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className={styles.input}
                placeholder="Enter course name"
                required
              />
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Describe</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={styles.textarea}
                placeholder="Enter course description"
                rows="4"
                required
              ></textarea>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Select image</label>
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                className={styles.input}
                accept="image/*"
                required
              />
              {selectedImage && (
                <div className={styles.imagePreviewContainer}>
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Preview"
                    className={styles.previewImage}
                  />
                </div>
              )}
            </div>

            <div className={styles.buttonGroup}>
              <button type="submit" className={styles.submitButton}>
                Add
              </button>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddCourse;

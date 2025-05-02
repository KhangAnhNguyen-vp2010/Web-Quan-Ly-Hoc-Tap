import axios from "axios";
import { toast } from "react-toastify";
import styles from "../../../../assets/css/Instructor/Courses/AddCourse.module.css";
import { useCourse } from "../../../../contexts/CourseContext";
import { useGetUser } from "../../../../hooks/useGetUser";
import { useAddCourse } from "../../../../Hooks/instructor/Course/useAddCourse";

const AddCourse = ({ onClose }) => {
  const { user } = useGetUser();
  const { load, setLoad } = useCourse();

  const {
    formData,
    selectedImage,
    handleChange,
    handleImageChange,
    resetForm,
  } = useAddCourse();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://localhost:7233/api/courses",
        {
          name: formData.title,
          description: formData.description,
          instructorId: user.id,
        },
        { withCredentials: true }
      );

      const res_lastId = await axios.get(
        `https://localhost:7233/api/Courses/LastId`
      );

      const form = new FormData();
      if (selectedImage) {
        form.append("file", selectedImage);
      }
      await axios.post(
        `https://localhost:7233/api/Courses/upload/${res_lastId.data}`,
        form,
        { withCredentials: true }
      );
    } catch (err) {
      toast.error("Error adding course.");
      console.error(err);
      return;
    }

    toast.success("Course added successfully!");
    resetForm(); // Reset form after successful submission
    onClose();
    setLoad(!load);
  };

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

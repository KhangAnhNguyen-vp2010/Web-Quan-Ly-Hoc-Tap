import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import styles from "../../../../assets/css/Instructor/Courses/AddCourse.module.css";
import { useGetUser } from "../../../../Hooks/useGetUser";
import { useCourse } from "../../../../contexts/CourseContext";

const AddCourseForm = ({ onClose }) => {
  const { user } = useGetUser();
  const { load, setLoad } = useCourse();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });
  const [selectedImage, setSelectedImage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
    setFormData({ title: "", description: "" });
    onClose();
    setLoad(!load);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-75 d-flex justify-content-center align-items-center ${styles["fade-in-overlay"]}`}
        style={{ zIndex: 1050 }}
      >
        <div
          className="bg-white p-4 rounded shadow-lg animate__animated animate__fadeIn"
          style={{ minWidth: "400px" }}
        >
          <h3 className="text-center mb-4">Add Course</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Course Name</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter course name"
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Describe</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter course description"
                rows="4"
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">Select image</label>
              <input
                type="file"
                name="image"
                onChange={(e) => setSelectedImage(e.target.files[0])}
                className="form-control"
                accept="image/*"
                required
              />
              {selectedImage && (
                <div className="mt-3 d-flex justify-content-center">
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Preview"
                    style={{
                      width: "100px", // Đặt kích thước ảnh
                      height: "auto", // Đảm bảo tỷ lệ ảnh được giữ nguyên
                      borderRadius: "8px",
                    }}
                  />
                </div>
              )}
            </div>

            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-primary w-48">
                Add
              </button>
              <button
                type="button"
                className="btn btn-secondary w-48"
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

export default AddCourseForm;

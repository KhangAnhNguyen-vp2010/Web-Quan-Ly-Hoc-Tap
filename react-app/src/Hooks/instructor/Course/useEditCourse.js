import { useState } from "react";
import axiosClient from "../../../api/axiosClient";
import { toast } from "react-toastify";

export const useEditCourse = (courseObject, setLoad, onClose) => {
  const [formData, setFormData] = useState({
    courseName: courseObject.courseName,
    courseDescription: courseObject.description,
  });
  const [selectedImage, setSelectedImage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosClient.put(
        `/courses/${courseObject.courseId}`,
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
      await axiosClient.post(`/Courses/upload/${courseObject.courseId}`, form, {
        withCredentials: true,
      });
    } catch (error) {
      toast.error(error.response.data);
      console.error("Error updating course:", error);
      return;
    }
    toast.success("Course updated successfully!");
    setLoad(true);
    onClose();
  };

  return {
    formData,
    selectedImage,
    handleChange,
    handleImageChange,
    handleSubmit,
  };
};

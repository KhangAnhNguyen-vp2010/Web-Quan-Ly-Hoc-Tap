import { useState } from "react";
import axiosClient from "../../../api/axiosClient";
import { toast } from "react-toastify";

export const useAddCourse = (user, setLoad, onClose) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [selectedImage, setSelectedImage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const resetForm = () => {
    setFormData({ title: "", description: "" });
    setSelectedImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosClient.post(
        "/courses",
        {
          name: formData.title,
          description: formData.description,
          instructorId: user.id,
        },
        { withCredentials: true }
      );

      const res_lastId = await axiosClient.get(`/Courses/LastId`);

      const form = new FormData();
      if (selectedImage) {
        form.append("file", selectedImage);
      }
      await axiosClient.post(`/Courses/upload/${res_lastId.data}`, form, {
        withCredentials: true,
      });

      toast.success("Course added successfully!");
    } catch (err) {
      toast.error(err.response.data);
      console.error(err);
    }
    resetForm();
    onClose();
    setLoad((prev) => !prev);
  };

  return {
    formData,
    selectedImage,
    handleChange,
    handleImageChange,
    resetForm,
    handleSubmit,
  };
};

import { useState } from "react";

export const useAddCourse = () => {
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

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const resetForm = () => {
    setFormData({ title: "", description: "", image: null });
    setSelectedImage(null);
  };

  return {
    formData,
    selectedImage,
    handleChange,
    handleImageChange,
    resetForm,
  };
};

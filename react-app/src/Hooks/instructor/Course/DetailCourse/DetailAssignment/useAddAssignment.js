import { useState } from "react";
import axiosClient from "../../../../../api/axiosClient";
import { toast } from "react-toastify";

export function useAddAssignment(courseId, onClose) {
  const [form, setForm] = useState({
    assignmentName: "",
    assignmentContent: "",
    dueDate: "",
  });
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const isValidDate = (dateStr) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dateStr)) return false;

    const date = new Date(dateStr);
    const [year, month, day] = dateStr.split("-").map(Number);

    return (
      date.getFullYear() === year &&
      date.getMonth() + 1 === month &&
      date.getDate() === day
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.dueDate === "" || !isValidDate(form.dueDate)) {
      toast.error("Invalid submission deadline");
      return;
    }

    const formData = new FormData();
    formData.append("courseID", courseId);
    formData.append("assignmentName", form.assignmentName);
    formData.append("dueDate", form.dueDate);
    formData.append("assignmentContent", form.assignmentContent);

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    setLoading(true); // Set loading state to true

    try {
      const response = await axiosClient.post(
        "/Assignments/AddAssignment",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Create a successful exercise");
      onClose();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error creating exercise");
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  return {
    form,
    files,
    loading,
    handleFileChange,
    handleChange,
    handleSubmit,
  };
}

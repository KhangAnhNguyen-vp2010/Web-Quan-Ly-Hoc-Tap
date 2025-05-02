import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export function useEditAssignment(assignment, onUpdate, onClose) {
  const [form, setForm] = useState(assignment);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
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

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (form.dueDate === "" || !isValidDate(form.dueDate)) {
      toast.error("Invalid submission deadline");
      return;
    }

    const formData = new FormData();
    formData.append("courseID", form.courseId);
    formData.append("assignmentName", form.assignmentName);
    formData.append("dueDate", form.dueDate);
    formData.append("assignmentContent", form.exerciseContent);

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    setLoading(true);

    try {
      await axios.put(
        `https://localhost:7233/api/Assignments/EditAssignment/${form.assignmentId}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("Updated exercise successfully");
      onUpdate(form);
      onClose();
    } catch (err) {
      toast.error(err?.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    files,
    loading,
    handleChange,
    handleFileChange,
    handleUpdate,
  };
}

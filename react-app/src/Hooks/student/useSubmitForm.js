import { useState } from "react";
import axiosClient from "../../api/axiosClient";

export const useSubmitForm = ({
  user,
  assignment,
  onClose,
  onSubmit,
  test,
}) => {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    setLoading(true);

    try {
      if (assignment) {
        await axiosClient.patch(
          `/Students/submitAssignment/${user.id}/${assignment.assignmentId}`,
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        await axiosClient.patch(
          `/Students/submitTest/${user.id}/${test.testId}`,
          formData,
          {
            withCredentials: true,
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      onSubmit();
      onClose();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleFileChange, handleSubmit };
};

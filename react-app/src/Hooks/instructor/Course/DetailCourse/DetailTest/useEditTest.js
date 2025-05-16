// useEditTest.js
import { useState } from "react";
import { toast } from "react-toastify";
import axiosClient from "../../../../../api/axiosClient";

export const useEditTest = (initialTest, courseId, onUpdate, onClose) => {
  const [test, setTest] = useState({
    testId: initialTest.testId,
    testName: initialTest.testName,
    testDate: initialTest.testDate,
    testContent: initialTest.testContent,
  });

  const [files, setFiles] = useState([]);

  const handleChange = (e) => {
    setTest({
      ...test,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    function isValidDate(dateStr) {
      const regex = /^\d{4}-\d{2}-\d{2}$/;
      if (!regex.test(dateStr)) return false;

      const date = new Date(dateStr);
      const [year, month, day] = dateStr.split("-").map(Number);

      return (
        date.getFullYear() === year &&
        date.getMonth() + 1 === month &&
        date.getDate() === day
      );
    }

    if (test.testDate === "" || !isValidDate(test.testDate)) {
      toast.error("Invalid submission deadline");
      return;
    }

    // if (
    //   new Date(test.testDate).setHours(0, 0, 0, 0) <
    //   new Date().setHours(0, 0, 0, 0)
    // ) {
    //   toast.error("Không chấp nhận ngày trong quá khứ");
    //   return;
    // }

    const formData = new FormData();
    formData.append("testName", test.testName);
    formData.append("testContent", test.testContent);
    formData.append("testDate", test.testDate);
    formData.append("courseID", courseId);

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      await axiosClient.put(`/Tests/${test.testId}/with-files`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      onUpdate(test);
      onClose();
      toast.success("Updated!!!");
    } catch (error) {
      console.error(error);
      toast.error("Chỉ được phép up các file word, pdf, excel");
    }
  };

  return {
    test,
    files,
    handleChange,
    handleFileChange,
    handleUpdate,
  };
};

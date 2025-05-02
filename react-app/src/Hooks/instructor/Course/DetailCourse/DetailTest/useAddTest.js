// useAddTest.js
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export const useAddTest = (courseId, onClose) => {
  const [test, setTest] = useState({
    testName: "",
    testContent: "",
  });

  const [files, setFiles] = useState([]);

  const handleChange = (e) => {
    setTest((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("testName", test.testName);
    formData.append("testContent", test.testContent);
    formData.append("courseID", courseId);

    files.forEach((file) => {
      formData.append("files", file);
    });

    try {
      await axios.post(
        `https://localhost:7233/api/Tests/with-files`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      onClose();
      toast.success("Added!!!");
    } catch (error) {
      console.error(error);
      toast.error(
        "Chỉ được phép up các file word, pdf, excel, img, video, csv"
      );
    }
  };

  return {
    test,
    files,
    handleChange,
    handleFileChange,
    handleAdd,
  };
};

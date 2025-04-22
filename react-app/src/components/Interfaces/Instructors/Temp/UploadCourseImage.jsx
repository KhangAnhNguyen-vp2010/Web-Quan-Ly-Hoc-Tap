import React, { useState } from "react";
import axios from "axios";

const UploadCourseImage = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file.");
      return;
    }

    // Tạo formData để gửi lên API
    const formData = new FormData();
    formData.append("file", file);

    try {
      // Gửi file lên API
      const response = await axios.post(
        "https://localhost:5001/api/courses/upload-image/1",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Xử lý phản hồi từ API (ví dụ lấy đường dẫn)
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Upload Image</button>
    </form>
  );
};

export default UploadCourseImage;

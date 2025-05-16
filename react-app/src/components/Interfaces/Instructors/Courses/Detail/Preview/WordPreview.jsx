import React, { useEffect, useState } from "react";
import mammoth from "mammoth";

const WordPreview = ({ fullPath, file }) => {
  const [content, setContent] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchAndReadDocx = async () => {
      try {
        const response = await fetch(fullPath);
        if (!response.ok) throw new Error("Không thể tải file");
        const arrayBuffer = await response.arrayBuffer();
        const result = await mammoth.convertToHtml({ arrayBuffer });
        setContent(result.value);
      } catch (err) {
        console.error("Lỗi khi đọc file Word:", err);
        setError(true);
      }
    };

    fetchAndReadDocx();
  }, [fullPath]);

  if (error) {
    return (
      <p>
        Không thể hiển thị file Word.{" "}
        <a href={fullPath} target="_blank" rel="noopener noreferrer">
          Tải xuống
        </a>
      </p>
    );
  }

  return <div dangerouslySetInnerHTML={{ __html: content }} />;
};

export default WordPreview;

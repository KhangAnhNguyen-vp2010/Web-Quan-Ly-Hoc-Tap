import React, { useEffect, useState } from "react";
import axiosClient from "../../../../../../api/axiosClient";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import * as XLSX from "xlsx";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";
import styles from "../../../../../../assets/css/Instructor/Courses/Detail/DetailTest/TestFilesList.module.css";

const TestFilesList = ({ testId, loadingFile, user }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [filesAdding, setFilesAdding] = useState([]);
  const [loadAdding, setLoadAdding] = useState(false);

  // Base URL để dễ chỉnh sửa nếu cần
  const baseUrl = import.meta.env.VITE_PUBLIC_URL;

  const handleAddingFiles = (e) => {
    setFilesAdding([...e.target.files]);
    setLoadAdding(!loadAdding);
  };

  const handleAddFile = async () => {
    const formData = new FormData();

    for (let i = 0; i < filesAdding.length; i++) {
      formData.append("files", filesAdding[i]);
    }

    try {
      await axiosClient.post(`/Tests/AddFile/${testId}`, formData, {
        withCredentials: true,
      });
      fetchFiles();
    } catch (error) {
      console.log("Error " + error);
    }
  };

  useEffect(() => {
    handleAddFile();
  }, [loadAdding]);

  const fetchFiles = async () => {
    try {
      const response = await axiosClient.get(`/Tests/${testId}/files`, {
        withCredentials: true,
      });
      setFiles(response.data);
      setError("");
    } catch (err) {
      console.error("Error fetching files:", err);
      if (err.response && err.response.status === 404) {
        setError("Không tìm thấy file nào cho bài kiểm tra này.");
      } else {
        setError("Đã xảy ra lỗi khi tải file.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (testId) {
      fetchFiles();
    } else {
      setError("ID bài kiểm tra không hợp lệ");
      setLoading(false);
    }
  }, [testId, loadingFile]);

  const getFileExtension = (fileName) => {
    return fileName.substring(fileName.lastIndexOf("."));
  };

  const renderFilePreview = (file) => {
    const fullPath = file.filePath.startsWith("http")
      ? file.filePath
      : `${baseUrl}${file.filePath}`;
    const fileExtension = getFileExtension(file.fileName).toLowerCase();
    const mimeType = file.fileType || "";

    // Hiển thị xem trước theo định dạng file
    if (selectedFile && selectedFile.fileId === file.fileId) {
      return renderFullPreview(file);
    } else {
      return renderCompactPreview(file);
    }
  };

  const handleDeleteFile = async (fileId) => {
    try {
      await axiosClient.delete(`/Tests/file/${fileId}`, {
        withCredentials: true,
      });
      fetchFiles();
    } catch (error) {
      console.log("Error " + error);
    }
  };

  const renderCompactPreview = (file) => {
    const fileExtension = getFileExtension(file.fileName).toLowerCase();
    const mimeType = file.fileType || "";

    // Nếu là file PDF, hiển thị compact preview
    if (mimeType === "application/pdf" || fileExtension === ".pdf") {
      return (
        <div
          className={styles.compactPreview}
          onClick={() => setSelectedFile(file)}
        >
          <div className={getFileIconClass(file)}>
            <span className={styles.fileTypeLabel}>
              {getFileTypeLabel(file)}
            </span>
          </div>
          <div className={styles.filePreviewName}>{file.fileName}</div>
        </div>
      );
    }

    // Các file khác hiển thị một cách thông thường với icon phù hợp
    return (
      <div
        className={styles.compactPreview}
        onClick={() => setSelectedFile(file)}
      >
        <div className={getFileIconClass(file)}>
          <span className={styles.fileTypeLabel}>{getFileTypeLabel(file)}</span>
        </div>
        <div className={styles.filePreviewName}>{file.fileName}</div>
      </div>
    );
  };

  const getFileIconClass = (file) => {
    const fileExtension = getFileExtension(file.fileName).toLowerCase();
    const mimeType = file.fileType || "";

    if (mimeType === "application/pdf" || fileExtension === ".pdf") {
      return `${styles.fileIcon} ${styles.pdfIcon}`;
    } else if (
      mimeType.startsWith("image/") ||
      [".jpg", ".jpeg", ".png", ".gif", ".bmp"].includes(fileExtension)
    ) {
      return `${styles.fileIcon} ${styles.imageIcon}`;
    } else if (
      mimeType.startsWith("video/") ||
      [".mp4", ".webm", ".ogg"].includes(fileExtension)
    ) {
      return `${styles.fileIcon} ${styles.videoIcon}`;
    } else if (
      mimeType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      fileExtension === ".docx" ||
      fileExtension === ".doc"
    ) {
      return `${styles.fileIcon} ${styles.docIcon}`;
    } else if (
      mimeType ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      fileExtension === ".xlsx" ||
      fileExtension === ".xls"
    ) {
      return `${styles.fileIcon} ${styles.excelIcon}`;
    } else {
      return `${styles.fileIcon} ${styles.genericIcon}`;
    }
  };

  const getFileTypeLabel = (file) => {
    const fileExtension = getFileExtension(file.fileName).toLowerCase();

    if (fileExtension === ".pdf") return "PDF";
    if ([".jpg", ".jpeg", ".png", ".gif", ".bmp"].includes(fileExtension))
      return "IMG";
    if ([".mp4", ".webm", ".ogg"].includes(fileExtension)) return "VIDEO";
    if (fileExtension === ".docx" || fileExtension === ".doc") return "DOC";
    if (fileExtension === ".xlsx" || fileExtension === ".xls") return "EXCEL";
    return fileExtension.substring(1).toUpperCase();
  };

  const renderFullPreview = (file) => {
    console.log("File info:", file.fileName, file.fileType);

    // Đảm bảo đường dẫn đầy đủ
    const fullPath = file.filePath.startsWith("http")
      ? file.filePath
      : `${baseUrl}${file.filePath}`;

    // Fix kiểm tra đuôi file
    const fileExtension = getFileExtension(file.fileName).toLowerCase();
    const mimeType = file.fileType || "";

    // Nút đóng preview
    const closeButton = (
      <div className={styles.previewHeader}>
        <button
          className={styles.closePreviewBtn}
          onClick={() => setSelectedFile(null)}
        >
          ✕
        </button>
        <span className={styles.previewFileName}>{file.fileName}</span>
      </div>
    );

    // Hiển thị hình ảnh
    if (
      mimeType.startsWith("image/") ||
      [".jpg", ".jpeg", ".png", ".gif", ".bmp"].includes(fileExtension)
    ) {
      return (
        <div className={styles.fullPreviewContainer}>
          {closeButton}
          <div className={styles.previewContainer}>
            <img
              src={fullPath}
              alt={file.fileName}
              className={styles.imagePreview}
            />
          </div>
        </div>
      );
    }

    // Hiển thị PDF
    if (mimeType === "application/pdf" || fileExtension === ".pdf") {
      try {
        return (
          <div className={styles.fullPreviewContainer}>
            {closeButton}
            <div className={styles.pdfContainer}>
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                <Viewer fileUrl={fullPath} />
              </Worker>
            </div>
          </div>
        );
      } catch (err) {
        console.error("PDF viewing error:", err);
        return (
          <div className={styles.fullPreviewContainer}>
            {closeButton}
            <p>
              Lỗi khi hiển thị PDF.{" "}
              <a href={fullPath} target="_blank" rel="noopener noreferrer">
                Tải xuống
              </a>
            </p>
          </div>
        );
      }
    }

    // Hiển thị video
    if (
      mimeType.startsWith("video/") ||
      [".mp4", ".webm", ".ogg"].includes(fileExtension)
    ) {
      return (
        <div className={styles.fullPreviewContainer}>
          {closeButton}
          <div className={styles.videoContainer}>
            <video className={styles.videoPlayer} controls>
              <source src={fullPath} type={mimeType || "video/mp4"} />
              Trình duyệt của bạn không hỗ trợ xem video.
            </video>
          </div>
        </div>
      );
    }

    // Hiển thị file Word
    if (
      mimeType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      fileExtension === ".docx" ||
      fileExtension === ".doc"
    ) {
      try {
        return (
          <div className={styles.fullPreviewContainer}>
            {closeButton}
            <div className={styles.docContainer}>
              <DocViewer
                documents={[{ uri: fullPath, fileName: file.fileName }]}
                pluginRenderers={DocViewerRenderers}
              />
            </div>
          </div>
        );
      } catch (err) {
        console.error("DocViewer error:", err);
        return (
          <div className={styles.fullPreviewContainer}>
            {closeButton}
            <p>
              Không thể hiển thị file Word.{" "}
              <a href={fullPath} target="_blank" rel="noopener noreferrer">
                Tải xuống
              </a>
            </p>
          </div>
        );
      }
    }

    // Hiển thị file Excel
    if (
      mimeType ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      fileExtension === ".xlsx" ||
      fileExtension === ".xls"
    ) {
      return (
        <div className={styles.fullPreviewContainer}>
          {closeButton}
          <ExcelPreview filePath={fullPath} fileName={file.fileName} />
        </div>
      );
    }

    // Fallback cho các file khác
    return (
      <div className={styles.fullPreviewContainer}>
        {closeButton}
        <div>
          <p>
            Không thể xem trước.{" "}
            <a
              href={fullPath}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.downloadLink}
            >
              Tải xuống
            </a>
          </p>
        </div>
      </div>
    );
  };

  const ExcelPreview = ({ filePath, fileName }) => {
    const [excelData, setExcelData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
      const fetchExcelData = async () => {
        try {
          setLoading(true);
          const res = await axiosClient.get(filePath, {
            responseType: "arraybuffer",
            headers: { "Cache-Control": "no-cache" },
          });

          const data = new Uint8Array(res.data);
          const workbook = XLSX.read(data, { type: "array" });

          // Lấy sheet đầu tiên
          const sheetName = workbook.SheetNames[0];
          if (!sheetName) {
            throw new Error("Không tìm thấy sheet nào trong file Excel");
          }

          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

          // Chỉ hiển thị tối đa 10 dòng để tránh quá tải
          setExcelData(jsonData.slice(0, 10));
          setError("");
        } catch (err) {
          console.error("Excel loading error:", err);
          setError("Không thể đọc file Excel");
        } finally {
          setLoading(false);
        }
      };

      if (filePath) {
        fetchExcelData();
      }
    }, [filePath]);

    if (loading)
      return <p className={styles.loadingText}>Đang tải dữ liệu Excel...</p>;
    if (error) return <p className={styles.errorText}>{error}</p>;
    if (!excelData || excelData.length === 0) return <p>Không có dữ liệu</p>;

    // Lấy header từ dòng đầu tiên, nếu có
    const headers = excelData[0] || [];

    return (
      <div className={styles.excelContainer}>
        <table className={styles.excelTable}>
          <thead>
            <tr>
              {headers.map((header, idx) => (
                <th key={idx}>{header || `Cột ${idx + 1}`}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {excelData.slice(1).map((row, rowIdx) => (
              <tr key={rowIdx}>
                {headers.map((_, colIdx) => (
                  <td key={colIdx}>{row[colIdx] || ""}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <p className={styles.downloadExcelLink}>
          <a href={filePath} target="_blank" rel="noopener noreferrer">
            Tải xuống file Excel đầy đủ
          </a>
        </p>
      </div>
    );
  };

  if (loading)
    return <p className={styles.loadingText}>Đang tải danh sách file...</p>;
  if (error) return <p className={styles.errorText}>{error}</p>;
  if (files.length === 0)
    return (
      <p className={styles.emptyMessage}>
        Không có file nào cho bài kiểm tra này.
      </p>
    );

  // Hiển thị modal preview khi chọn file
  if (selectedFile) {
    return (
      <div className={styles.container}>
        <div
          className={styles.overlay}
          onClick={() => setSelectedFile(null)}
        ></div>
        <div className={styles.modalContainer}>
          {renderFilePreview(selectedFile)}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>
        Đề bài{" "}
        {user.role === "Instructor" && <label htmlFor="fileUpload">+</label>}
        <input
          id="fileUpload"
          type="file"
          multiple
          onChange={handleAddingFiles}
        />
      </h3>
      <div className={styles.fileGrid}>
        {files.map((file) => (
          <div key={file.fileId} className={styles.fileCard}>
            {renderFilePreview(file)}
            <div className={styles.fileInfo}>
              <a
                href={
                  file.filePath.startsWith("http")
                    ? file.filePath
                    : baseUrl + file.filePath
                }
                target="_blank"
                rel="noopener noreferrer"
                className={styles.downloadLink}
                onClick={(e) => e.stopPropagation()}
              >
                Tải xuống
              </a>
              <button
                className={styles["btn-deleteFile"]}
                onClick={() => handleDeleteFile(file.fileId)}
              >
                Xoá
              </button>
              <div className={styles.uploadDate}>
                {new Date(file.uploadDate).toLocaleDateString("vi-VN")}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestFilesList;

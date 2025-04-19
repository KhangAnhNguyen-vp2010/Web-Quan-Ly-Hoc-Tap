import { useEffect } from "react";

function Student(params) {
  useEffect(() => {
    // Hàm này sẽ chạy mỗi 5 giây
    const intervalId = setInterval(() => {
      let temp = localStorage.getItem("Temp-session");
      let session = localStorage.getItem("Session-ne-ku-em");
      if (temp !== session) {
        localStorage.removeItem("Temp-session"); // Xóa session tạm thời
        localStorage.setItem("Temp-session", session); // Cập nhật session chính thức
        window.location.href = "/signup"; // Chuyển hướng về trang đăng nhập
      }
    }, 5000); // 5000ms = 5 giây

    // Cleanup khi component unmount hoặc effect bị thay đổi
    return () => clearInterval(intervalId);
  }, []); // Chạy một lần khi component được mount

  return (
    <div>
      <h1>Student</h1>
      <p>This is the student page.</p>
    </div>
  );
}

export default Student;

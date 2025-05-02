import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "boxicons/css/boxicons.min.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import ScrollToTop from "./layouts/ScrollToTop";
import "./App.css";
import { ToastContainer } from "react-toastify";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300); // hiện nút khi scroll > 300px
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    AOS.init({
      duration: 1000, // thời gian animation (ms)
      once: true, // chỉ animate 1 lần (true) hoặc mỗi lần scroll tới (false)
    });
  }, []);
  return (
    <div className="App">
      <>
        <ScrollToTop />
        <AppRoutes />

        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="scroll-top d-flex align-items-center justify-content-center"
            style={{
              position: "fixed",
              right: "20px",
              bottom: "20px",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              border: "none",
              backgroundColor: "#7494ec",
              color: "#fff",
              zIndex: "9999",
              transition: "opacity 0.5s",
            }}
            data-aos="fade-up"
            data-aos-duration="500"
            data-aos-delay="100"
            data-aos-once="true"
          >
            <i
              className="bi bi-arrow-up-short"
              style={{ fontSize: "1.5rem" }}
            ></i>
          </button>
        )}
      </>

      <ToastContainer />
    </div>
  );
}

export default App;

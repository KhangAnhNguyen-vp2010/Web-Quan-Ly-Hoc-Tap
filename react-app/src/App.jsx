// import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "boxicons/css/boxicons.min.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect, useState } from "react";
import Index from "./components/index/Index"; // Đường dẫn đến file Index.jsx của bạn
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./components/about/About";
import Contact from "./components/contact/Contact";
import MainLayout from "./layouts/MainLayout";
import LoginLayout from "./layouts/LoginLayout";
import Login from "./pages/Login";
import ScrollToTop from "./layouts/ScrollToTop";
import "./App.css";
import Instructor from "./pages/Instructor";
import Student from "./pages/Student";

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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // giả lập loading trong 1s
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000, // thời gian animation (ms)
      once: true, // chỉ animate 1 lần (true) hoặc mỗi lần scroll tới (false)
    });
  }, []);
  return (
    <div className="App">
      {loading ? (
        <div
          id="preloader"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "#fff",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          <Router>
            <ScrollToTop />
            <Routes>
              <Route element={<MainLayout />}>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
              </Route>

              <Route element={<LoginLayout />}>
                <Route path="/signup" element={<Login />} />
                <Route path="/instructor" element={<Instructor />} />
                <Route path="/student" element={<Student />} />
              </Route>
            </Routes>
          </Router>
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
      )}
    </div>
  );
}

export default App;

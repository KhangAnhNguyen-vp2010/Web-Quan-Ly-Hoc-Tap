import React from "react";
import { Link } from "react-router-dom"; // Import Link từ react-router-dom nếu bạn sử dụng React Router
import "../../assets/css/Index/Hero.css"; // Thay bằng đường dẫn đến file CSS của bạn

const Hero = () => {
  return (
    <section className="hero" data-aos="fade" data-aos-delay="100">
      <div className="overlay"></div>
      <div className="hero-content">
        <h1>Learning Today, Leading Tomorrow</h1>
        <p>We are a team of talented designers</p>
        <Link to="/signup" className="cta-btn">
          Get Started
        </Link>
      </div>
      <div className="hero-background-person"></div>
      {/* Div mới để chứa hình ảnh người làm background */}
    </section>
  );
};

export default Hero;

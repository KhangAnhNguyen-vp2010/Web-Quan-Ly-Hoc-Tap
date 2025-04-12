import React from "react";
import "../../assets/css/Index/CoursesSection.css"; // Nhớ tạo file CSS
import hinh1 from "../../assets/img/course-1.jpg";
import hinh2 from "../../assets/img/course-2.jpg";
import hinh3 from "../../assets/img/course-3.jpg";
import { Link } from "react-router-dom";

function CoursesSection() {
  const courses = [
    {
      title: "Website Design",
      category: "Web Development",
      description:
        "And the architect provides for the gentleness of doing this to repel us. That is done because what pains pain in time.",
      img: hinh1,
    },
    {
      title: "Search Engine Optimization",
      category: "Marketing",
      description:
        "And the architect provides for the gentleness of doing this to repel us. That is done because what pains pain in time.",
      img: hinh2,
    },
    {
      title: "Copywriting",
      category: "Content",
      description:
        "And the architect provides for the gentleness of doing this to repel us. That is done because what pains pain in time.",
      img: hinh3,
    },
  ];

  return (
    <section id="courses" className="courses section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Courses</h2>
        <p>Popular Courses</p>
      </div>

      <div className="container">
        <div className="row">
          {courses.map((course, index) => (
            <div
              key={index}
              className="col-lg-4 col-md-6 d-flex align-items-stretch"
              data-aos="zoom-in"
              data-aos-delay={100 * (index + 1)}
            >
              <div className="course-item">
                <img
                  src={course.img}
                  className="img-fluid"
                  alt={course.title}
                />
                <div className="course-content">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <p className="category">{course.category}</p>
                  </div>
                  <h3>
                    <Link to="/signup">{course.title}</Link>
                  </h3>
                  <p className="description">{course.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CoursesSection;

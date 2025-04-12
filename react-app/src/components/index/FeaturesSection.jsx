import React from "react";
import "../../assets/css/Index/FeaturesSection.css"; // Thay bằng đường dẫn đến file CSS của bạn
const featuresData = [
  { icon: "bi-eye", color: "#ffbb2c", title: "Lorem Ipsum", delay: 100 },
  { icon: "bi-infinity", color: "#5578ff", title: "Pain System", delay: 200 },
  {
    icon: "bi-mortarboard",
    color: "#e80368",
    title: "Sed perspiciatis",
    delay: 300,
  },
  { icon: "bi-nut", color: "#e361ff", title: "Great Sorrows", delay: 400 },
  { icon: "bi-shuffle", color: "#47aeff", title: "Nemo Enim", delay: 500 },
  { icon: "bi-star", color: "#ffa76e", title: "Eiusmod Tempor", delay: 600 },
  { icon: "bi-x-diamond", color: "#11dbcf", title: "Midela Teren", delay: 700 },
  { icon: "bi-camera-video", color: "#4233ff", title: "Pira Neve", delay: 800 },
  { icon: "bi-command", color: "#b2904f", title: "Dirada Pack", delay: 900 },
  { icon: "bi-dribbble", color: "#b20969", title: "Moton Ideal", delay: 1000 },
  { icon: "bi-activity", color: "#ff5828", title: "Verdo Park", delay: 1100 },
  {
    icon: "bi-brightness-high",
    color: "#29cc61",
    title: "Flavor Nivelanda",
    delay: 1200,
  },
];

function FeaturesSection() {
  return (
    <section id="features" className="features section">
      <div className="container">
        <div className="row gy-4">
          {featuresData.map((feature, index) => (
            <div
              key={index}
              className="col-lg-3 col-md-4"
              data-aos="fade-up"
              data-aos-delay={feature.delay}
            >
              <div className="features-item">
                <i
                  className={`bi ${feature.icon}`}
                  style={{ color: feature.color }}
                ></i>
                <h3>
                  <a href="#" className="stretched-link">
                    {feature.title}
                  </a>
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;

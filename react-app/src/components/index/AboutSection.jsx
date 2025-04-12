import "../../assets/css/Index/AboutSection.css"; // Thay bằng đường dẫn đến file CSS của bạn

function About(props) {
  return (
    <section id="about" className="about section">
      <div className="container">
        <div className="row gy-4">
          <div
            className="col-lg-6 order-1 order-lg-2"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <img src={props.image} className="img-fluid" alt="About section" />
          </div>

          <div
            className="col-lg-6 order-2 order-lg-1 content"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <h3>They provide the most worthy pleasure, as if of the body.</h3>
            <p className="fst-italic">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <ul>
              <li>
                <i className="bi bi-check-circle"></i>{" "}
                <span>
                  All labor is useless unless some benefit is derived from it.
                </span>
              </li>
              <li>
                <i className="bi bi-check-circle"></i>{" "}
                <span>
                  But pain is a burden in reproach, in pleasure he desires.
                </span>
              </li>
              <li>
                <i className="bi bi-check-circle"></i>{" "}
                <span>
                  Ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  Duisaute irure dolor in reprehenderit in voluptate trideta
                  storacalaperda mastiro dolore eu fugiat nulla pariatur.
                </span>
              </li>
            </ul>
            {props.btn_more && (
              <a href="#" className="read-more">
                <span>Read More</span>
                <i className="bi bi-arrow-right"></i>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;

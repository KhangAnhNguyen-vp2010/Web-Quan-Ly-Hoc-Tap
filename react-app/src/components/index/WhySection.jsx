import { Link } from "react-router-dom";
import "../../assets/css/Index/WhySection.css"; // Thay bằng đường dẫn đến file CSS của bạn
function WhySection(params) {
  return (
    <section id="why-us" className="section why-us">
      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-4" data-aos="fade-up" data-aos-delay="100">
            <div className="why-box">
              <h3>Why Choose Our Products?</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis
                aute irure dolor in reprehenderit Asperiores dolores sed et.
                Tenetur quia eos. Autem tempore quibusdam vel necessitatibus
                optio ad corporis.
              </p>
              <div className="text-center">
                <Link to="/contact" className="more-btn">
                  <span>Learn More</span>{" "}
                  <i className="bi bi-chevron-right"></i>
                </Link>
              </div>
            </div>
          </div>
          {/* <!-- End Why Box --> */}

          <div className="col-lg-8 d-flex align-items-stretch">
            <div className="row gy-4" data-aos="fade-up" data-aos-delay="200">
              <div className="col-xl-4">
                <div className="icon-box d-flex flex-column justify-content-center align-items-center">
                  <i className="bi bi-clipboard-data"></i>
                  <h4>The pleasures of the body are duties and so on.</h4>
                  <p>
                    They are either a consequence of some of these labors,
                    unless some
                  </p>
                </div>
              </div>
              {/* <!-- End Icon Box --> */}

              <div className="col-xl-4" data-aos="fade-up" data-aos-delay="300">
                <div className="icon-box d-flex flex-column justify-content-center align-items-center">
                  <i className="bi bi-gem"></i>
                  <h4>The laborer of the pan</h4>
                  <p>
                    Except that they are blinded by desire and do not prosper,
                    they are at fault who abandon their duties.
                  </p>
                </div>
              </div>
              {/* <!-- End Icon Box --> */}

              <div className="col-xl-4" data-aos="fade-up" data-aos-delay="400">
                <div className="icon-box d-flex flex-column justify-content-center align-items-center">
                  <i className="bi bi-inboxes"></i>
                  <h4>Work leads to pain.</h4>
                  <p>
                    Either he undertakes or with no one to be comforted or with
                    all. With pains that greater than all make
                  </p>
                </div>
              </div>
              {/* <!-- End Icon Box --> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhySection;

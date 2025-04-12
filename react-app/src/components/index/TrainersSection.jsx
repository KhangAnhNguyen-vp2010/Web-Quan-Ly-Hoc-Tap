import hinh1 from "../../assets/img/trainer-1.jpg";
import hinh2 from "../../assets/img/trainer-2.jpg";
import hinh3 from "../../assets/img/trainer-3.jpg";
import "../../assets/css/Index/TrainersSection.css"; // Nhớ tạo file CSS

function TrainersSection(params) {
  return (
    <section id="trainers-index" className="section trainers-index">
      <div className="container">
        <div className="row">
          <div
            className="col-lg-4 col-md-6 d-flex"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="member">
              <img src={hinh1} className="img-fluid" alt="" />
              <div className="member-content">
                <h4>Walter White</h4>
                <span>Web Development</span>
                <p>
                  Great who that all where and them flight and exercise. Hatred
                  truths see through seek who either or or
                </p>
                <div className="social">
                  <a href="">
                    <i className="bi bi-twitter-x"></i>
                  </a>
                  <a href="">
                    <i className="bi bi-facebook"></i>
                  </a>
                  <a href="">
                    <i className="bi bi-instagram"></i>
                  </a>
                  <a href="">
                    <i className="bi bi-linkedin"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- End Team Member --> */}

          <div
            className="col-lg-4 col-md-6 d-flex"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <div className="member">
              <img src={hinh2} className="img-fluid" alt="" />
              <div className="member-content">
                <h4>Sarah Jhinson</h4>
                <span>Marketing</span>
                <p>
                  Repels flees to obtain no one knows him pleasure to be
                  repelled. In the architect of things things times
                </p>
                <div className="social">
                  <a href="">
                    <i className="bi bi-twitter-x"></i>
                  </a>
                  <a href="">
                    <i className="bi bi-facebook"></i>
                  </a>
                  <a href="">
                    <i className="bi bi-instagram"></i>
                  </a>
                  <a href="">
                    <i className="bi bi-linkedin"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- End Team Member --> */}

          <div
            className="col-lg-4 col-md-6 d-flex"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div className="member">
              <img src={hinh3} className="img-fluid" alt="" />
              <div className="member-content">
                <h4>William Anderson</h4>
                <span>Content</span>
                <p>
                  Pleasures blinded by necessities because. Their whole they
                  achieve who further and labors give bright bed
                </p>
                <div className="social">
                  <a href="">
                    <i className="bi bi-twitter-x"></i>
                  </a>
                  <a href="">
                    <i className="bi bi-facebook"></i>
                  </a>
                  <a href="">
                    <i className="bi bi-instagram"></i>
                  </a>
                  <a href="">
                    <i className="bi bi-linkedin"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
          {/* <!-- End Team Member --> */}
        </div>
      </div>
    </section>
  );
}

export default TrainersSection;

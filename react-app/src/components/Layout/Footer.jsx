import "../../assets/css/Layout/Footer.css"; // Import your CSS file for styling

function Footer() {
  return (
    <footer id="footer" className="footer position-relative light-background">
      <div className="container footer-top">
        <div className="row gy-4">
          {/* About Section */}
          <div className="col-lg-4 col-md-6 footer-about">
            <a href="/" className="logo d-flex align-items-center">
              <span className="sitename">EDUCATION 4.0</span>
            </a>
            <div className="footer-contact pt-3">
              <p>123 Binh Tan</p>
              <p>Ho Chi Minh City, VietNam</p>
              <p className="mt-3">
                <strong>Phone:</strong> <span>+84 922 337 276</span>
              </p>
              <p>
                <strong>Email:</strong> <span>anhkhang784@gmail.com</span>
              </p>
            </div>
            <div className="social-links d-flex mt-4">
              <a href="#">
                <i className="bi bi-twitter-x"></i>
              </a>
              <a href="#">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
          </div>

          {/* Useful Links */}
          <div className="col-lg-2 col-md-3 footer-links">
            <h4>Useful Links</h4>
            <ul>
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">About us</a>
              </li>
              <li>
                <a href="#">Services</a>
              </li>
              <li>
                <a href="#">Terms of service</a>
              </li>
              <li>
                <a href="#">Privacy policy</a>
              </li>
            </ul>
          </div>

          {/* Our Services */}
          <div className="col-lg-2 col-md-3 footer-links">
            <h4>Our Services</h4>
            <ul>
              <li>
                <a href="#">Web Design</a>
              </li>
              <li>
                <a href="#">Web Development</a>
              </li>
              <li>
                <a href="#">Product Management</a>
              </li>
              <li>
                <a href="#">Marketing</a>
              </li>
              <li>
                <a href="#">Graphic Design</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-lg-4 col-md-12 footer-newsletter">
            <h4>Our Newsletter</h4>
            <p>
              Subscribe to our newsletter and receive the latest news about our
              products and services!
            </p>
            <form action="#" method="post" className="newsletter-form">
              <div className="newsletter-input-wrapper">
                <input
                  type="email"
                  name="email"
                  placeholder="Your email"
                  required
                />
                <button type="submit">Subscribe</button>
              </div>
              <div className="error-message"></div>
              <div className="sent-message">
                Your subscription request has been sent. Thank you!
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="container copyright text-center mt-4">
        <p>
          © <span>{new Date().getFullYear()}</span>{" "}
          <strong className="px-1 sitename">Mentor</strong> All Rights Reserved
        </p>
        <div className="credits">Designed by KhangAnhHiHi</div>
      </div>
    </footer>
  );
}

export default Footer;

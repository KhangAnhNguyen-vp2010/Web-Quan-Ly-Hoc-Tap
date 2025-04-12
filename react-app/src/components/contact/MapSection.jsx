import "../../assets/css/Contact/MapSection.css"; // Thay bằng đường dẫn đến file CSS của bạn

function MapSection(params) {
  return (
    <section id="contact" className="contact section">
      {/* Google Maps Embed */}
      <div
        className="mb-5 rounded overflow-hidden shadow-lg"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <iframe
          style={{ border: 0, width: "100%", height: "350px" }}
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d48389.78314118045!2d-74.006138!3d40.710059!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a22a3bda30d%3A0xb89d1fe6bc499443!2sDowntown%20Conference%20Center!5e0!3m2!1sen!2sus!4v1676961268712!5m2!1sen!2sus"
          frameBorder="0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      {/* Contact Info and Form */}
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div id="contact" className="section">
          <div className="row">
            {/* Left: Contact Info */}
            <div className="col-md-5 mb-4">
              <div className="contact">
                <h3>
                  <i className="bi bi-geo-alt-fill"></i>
                  Address
                  <p>123 Binh Tan, Ho Chi Minh City, VietNam</p>
                </h3>

                <h3>
                  <i className="bi bi-telephone-fill"></i>Call Us
                </h3>
                <p>+84 922 337 276</p>

                <h3>
                  <i className="bi bi-envelope-fill"></i>Email Us
                </h3>
                <p>anhkhang784@gmail.com</p>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="col-md-7">
              <form className="php-email-form">
                <div className="form-group mb-3">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Your Name"
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Your Email"
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <input
                    type="text"
                    name="subject"
                    className="form-control"
                    placeholder="Subject"
                    required
                  />
                </div>
                <div className="form-group mb-3">
                  <textarea
                    name="message"
                    rows="6"
                    className="form-control"
                    placeholder="Message"
                    required
                  ></textarea>
                </div>
                <div className="text-end">
                  <button type="submit" className="btn btn-primary px-4">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MapSection;

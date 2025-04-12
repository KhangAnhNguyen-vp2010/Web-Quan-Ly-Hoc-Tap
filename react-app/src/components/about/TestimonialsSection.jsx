import "../../assets/css/About/TestimonialsSection.css"; // Thay bằng đường dẫn đến file CSS của bạn
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import hinh1 from "../../assets/img/testimonials/testimonials-1.jpg"; // Thay bằng đường dẫn đến hình ảnh của bạn
import hinh2 from "../../assets/img/testimonials/testimonials-2.jpg"; // Thay bằng đường dẫn đến hình ảnh của bạn
import hinh3 from "../../assets/img/testimonials/testimonials-3.jpg"; // Thay bằng đường dẫn đến hình ảnh của bạn
import hinh4 from "../../assets/img/testimonials/testimonials-4.jpg"; // Thay bằng đường dẫn đến hình ảnh của bạn
import hinh5 from "../../assets/img/testimonials/testimonials-5.jpg"; // Thay bằng đường dẫn đến hình ảnh của bạn

const testimonials = [
  {
    name: "Saul Goodman",
    role: "CEO & Founder",
    image: hinh1,
    text: "Proin iaculis purus consequat sem cure digni ssim donec porttitora entum suscipit rhoncus...",
  },
  {
    name: "Sara Wilsson",
    role: "Designer",
    image: hinh2,
    text: "Export time that yet bad bad I was which irure be labor whom cillu what...",
  },
  {
    name: "Jena Karlis",
    role: "Store Owner",
    image: hinh3,
    text: "For unless you export two labors, which are great, for which there is none...",
  },
  {
    name: "Matt Brandon",
    role: "Freelancer",
    image: hinh4,
    text: "For I was a woman who fled from pain, pain loves no fault, many export little...",
  },
  {
    name: "John Larson",
    role: "Entrepreneur",
    image: hinh5,
    text: "Who are some of whom I will read, would be there, I was, I will come, some time...",
  },
];

function TestimonialsSection() {
  return (
    <section id="testimonials" className="testimonials section">
      <div className="container section-title" data-aos="fade-up">
        <h2>Testimonials</h2>
        <p>What are they saying</p>
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <Swiper
          modules={[Autoplay, Pagination]}
          loop={true}
          speed={600}
          autoplay={{ delay: 3500 }}
          pagination={{ clickable: true }}
          className="mySwiper pb-12"
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 40,
            },
            1200: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
          }}
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="testimonial-wrap">
                <div className="testimonial-item">
                  <img
                    src={item.image}
                    className="testimonial-img"
                    alt={item.name}
                  />
                  <h3>{item.name}</h3>
                  <h4>{item.role}</h4>
                  <div className="stars">
                    {Array(5)
                      .fill()
                      .map((_, i) => (
                        <i key={i} className="bi bi-star-fill"></i>
                      ))}
                  </div>
                  <p>
                    <i className="bi bi-quote quote-icon-left"></i>
                    <span>{item.text}</span>
                    <i className="bi bi-quote quote-icon-right"></i>
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default TestimonialsSection;

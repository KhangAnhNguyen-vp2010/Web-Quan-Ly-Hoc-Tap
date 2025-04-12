import "../../assets/css/Index/CountSection.css"; // Thay bằng đường dẫn đến file CSS của bạn
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

function CountItem({ end, title }) {
  const { ref, inView } = useInView({
    triggerOnce: true, // chỉ chạy 1 lần khi vào viewport
    threshold: 0.6, // 60% trong viewport thì mới chạy
  });

  return (
    <div className="col-lg-3 col-md-6" ref={ref}>
      <div className="stats-item text-center w-100 h-100">
        <span className="counter">
          {inView ? <CountUp end={end} duration={2} /> : 0}
        </span>
        <p>{title}</p>
      </div>
    </div>
  );
}

function CountSection() {
  return (
    <section id="counts" className="section counts light-background">
      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="row gy-4">
          <CountItem end={1232} title="Students" />
          <CountItem end={64} title="Courses" />
          <CountItem end={42} title="Events" />
          <CountItem end={24} title="Trainers" />
        </div>
      </div>
    </section>
  );
}

export default CountSection;

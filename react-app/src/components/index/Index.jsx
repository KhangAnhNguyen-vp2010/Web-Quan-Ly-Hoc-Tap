import Hero from "./Hero";
import About from "./AboutSection";
import CountSection from "./CountSection";
import WhySection from "./WhySection";
import FeaturesSection from "./FeaturesSection";
import CoursesSection from "./CoursesSection";
import TrainersSection from "./TrainersSection";
import about_img from "../../assets/img/about.jpg"; // Thay bằng đường dẫn đến hình ảnh của bạn
function Index(params) {
  return (
    <>
      <Hero />
      <About image={about_img} btn_more={true} />
      <CountSection />
      <WhySection />
      <FeaturesSection />
      <CoursesSection />
      <TrainersSection />
    </>
  );
}

export default Index;

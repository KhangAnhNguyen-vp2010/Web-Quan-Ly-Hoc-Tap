import CountSection from "../index/CountSection";
import PageTitle from "./PageTitle";
import AboutSection from "../index/AboutSection";
import hinh_about from "../../assets/img/about-2.jpg";
import TestimonialsSection from "./TestimonialsSection";

function About(params) {
  return (
    <>
      <PageTitle title={"About Us"} />;
      <AboutSection image={hinh_about} btn_more={false} />;
      <CountSection />;
      <TestimonialsSection />;
    </>
  );
}

export default About;

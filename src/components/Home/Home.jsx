import React from "react";

import Section1 from "./Section1";
import Section2 from "./Section2";
import ReviewSection from "./ReviewSection";
import ServiceSection from "./ServiceSection";
import BeautySalonVideoSection from "./BeautySalonVideoSection";
import FAQsSection from "./FAQsSection";
import InstagramSection from "./InstagramSection";

const Home = () => {
  return (
    <>
      <Section1 />
      <ServiceSection />
      <BeautySalonVideoSection />
      <Section2 />
      {/* <ReviewSection /> */}
      <FAQsSection />
      {/* <InstagramSection /> */}
    </>
  );
};

export default Home;

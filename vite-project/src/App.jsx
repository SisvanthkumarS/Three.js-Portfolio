import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger, SplitText, ScrollSmoother } from "gsap/all";

import Cursor from "./ui/cursor/Cursor";
import Navbar from "./components/NavBar/Navbar";
import Hero from "./components/Hero/Hero";
import WhoAmI from "./components/WhoAmI/WhoAmI";
import DirectionalMarquee from "./components/DirectionalMarquee/DirectionalMarquee";
import Experience from "./components/Experience/Experience";
import Warp from "./components/Warp/Warp";
import Certifications from "./components/TechnicalCertifications/Certifications";
import TechStack from "./components/TechStack/TechStack";

gsap.registerPlugin(ScrollTrigger, SplitText, ScrollSmoother);

const App = () => {
  useEffect(() => {
  ScrollSmoother.create({
    smooth: 3,
    effects: true,
    normalizeScroll: true,
  });

  ScrollTrigger.refresh();
}, []);


  return (
    <>
      <Warp />
      <Cursor />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <Navbar />
          <Hero />
          <WhoAmI/>
          <DirectionalMarquee />
          <Experience />
          <TechStack/>
          <Certifications />
        </div>
      </div>
    </>
  );
};

export default App;
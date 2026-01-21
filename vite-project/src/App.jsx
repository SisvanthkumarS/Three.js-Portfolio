import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger, SplitText, ScrollSmoother } from "gsap/all";

import Cursor from "./ui/cursor/Cursor";
import Navbar from "./components/NavBar/Navbar";
import Hero from "./components/Hero/Hero";
// import Box from "./components/Box/Box";

gsap.registerPlugin(ScrollTrigger, SplitText, ScrollSmoother);

const App = () => {
  useEffect(() => {
    ScrollSmoother.create({
      smooth: 3,
      effects: true,
    });
  }, []);

  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">
        <Cursor />
        <Navbar />
        <Hero />
        {/* <Box /> */}
      </div>
    </div>
  );
};

export default App;
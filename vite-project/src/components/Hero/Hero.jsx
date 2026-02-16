import React, { useRef } from "react";
import "./Hero.scss";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const zoomRef = useRef(null);
  const stRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "+=80%",
        scrub: 1.2,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        id: "heroPin",
      },
    });

    tl.to(zoomRef.current, { scale: 10, opacity: 0, ease: "none" });

    stRef.current = tl.scrollTrigger;

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-overlay" />
      <div className="hero-content">
        <div ref={zoomRef} className="hero-zoom">
          <h1 className="hero-title">SISVANTH</h1>
          <div className="hero-sub">
            <span className="line" />
            <span className="tag-line">FULL-STACK ENGINEER • CREATIVE TECHNOLOGIST</span>
            <span className="line" />
          </div>
          <div className="scroll-down-indicator">
            <img src="/assets/images/common/scroll-down.png" alt="scroll" />
            <p>Scroll down to explore</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

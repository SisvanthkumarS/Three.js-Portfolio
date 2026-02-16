import React, { useRef } from "react";
import "./WhoAmI.scss";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";

gsap.registerPlugin(ScrollTrigger);

const WhoAmI = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    const root = sectionRef.current;
    const p = textRef.current;
    if (!root || !p) return;

    const split = new SplitType(p, {
      types: "words",
      wordClass: "whoami-word",
      tagName: "span",
    });

    // Force initial state RIGHT NOW
    gsap.set(split.words, { opacity: 0.15, yPercent: 20 });

    const tween = gsap.to(split.words, {
      opacity: 1,
      yPercent: 0,
      stagger: 0.02,
      ease: "none",
      scrollTrigger: {
        trigger: root,
        start: "top 70%",
        end: "bottom 40%",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    // Refresh once layout is stable + after image loads
    const img = root.querySelector("img");
    const refresh = () => ScrollTrigger.refresh();

    requestAnimationFrame(refresh);
    img?.addEventListener("load", refresh, { once: true });

    return () => {
      img?.removeEventListener("load", refresh);
      tween.scrollTrigger?.kill();
      tween.kill();
      split.revert();
    };
  }, { scope: sectionRef });


  return (
    <section className="whoami-section" >
      <h1 className="sub-heading">01. About Me</h1>
      <div className="whoami-content " ref={sectionRef}>
        <div className="whoami-inner">
          <p className="split" ref={textRef}>
            I’m Sisvanth Kumar Sathivadivel, a full-stack software engineer focused on building reliable, scalable products. I design clean backend architecture, craft secure APIs and microservices, and ship fast, responsive interfaces—turning complex ideas into polished experiences that perform in the real world.
          </p>
          <img
            src="/assets/images/common/caricature.png"
            alt="whoami"
            className="whoami-image"
          />
        </div>
      </div>
    </section>
  );
};

export default WhoAmI;

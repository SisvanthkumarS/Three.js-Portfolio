import React, { useRef } from "react";
import "./Hero.scss";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const heroRef = useRef(null);
    const titleRef = useRef(null);

    useGSAP(
        () => {
            const ctx = gsap.context(() => {
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: "top top",
                        end: "+=150%",
                        scrub: 1.2,
                        pin: true,
                        pinSpacing: true,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    },
                });

                tl.to(titleRef.current, {
                    scale: 12,
                    ease: "power2.inOut",
                    duration: 1,
                }).to(
                    titleRef.current,
                    {
                        opacity: 0,
                        duration: 0.4,
                        ease: "power2.out",
                    },
                    "-=0.3"
                );
            }, heroRef);

            return () => ctx.revert();
        },
        { scope: heroRef }
    );

    return (
        <section className="hero" ref={heroRef}>
            <div className="hero-overlay" />

            <div ref={titleRef}  className="hero-content">
                <h1 className="hero-title">
                    SISVANTH
                </h1>
                <div className="hero-sub">
                    <span className="line"></span>
                    <span className="tag-line">FULL-STACK ENGINEER • CREATIVE TECHNOLOGIST</span>
                    <span className="line"></span>
                </div>
                <div className="scroll-down-indicator">
                    <img src="./assets/images/scroll-down.png" alt="scroll-down-arrow" />
                    <p>Scroll down to explore</p>
                </div>
            </div>
        </section>
    );
};

export default Hero;

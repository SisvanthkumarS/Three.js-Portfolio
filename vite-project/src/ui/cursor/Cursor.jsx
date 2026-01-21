import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./cursor.scss";

export default function Cursor() {
  const dotRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const move = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener("mousemove", move);

    gsap.set([dotRef.current, glowRef.current], {
      xPercent: -50,
      yPercent: -50,
    });

    gsap.ticker.add(() => {
      gsap.to(dotRef.current, {
        x: mouse.x,
        y: mouse.y,
        duration: 0.15,
        ease: "power3.out",
      });

      gsap.to(glowRef.current, {
        x: mouse.x,
        y: mouse.y,
        duration: 0.6,
        ease: "power3.out",
      });
    });

    return () => {
      window.removeEventListener("mousemove", move);
      gsap.ticker.remove();
    };
  }, []);

  return (
    <>
      <div ref={glowRef} className="cursor-glow" />
      <div ref={dotRef} className="cursor-dot" />
    </>
  );
}

import React, { useRef } from "react";
import gsap from "gsap";
import { Observer } from "gsap/all";
import { useGSAP } from "@gsap/react";
import "./DirectionalMarquee.scss";
import Circle from "../Circle/Circle";
gsap.registerPlugin(Observer);

const DirectionalMarquee = () => {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray(".rail .text", rootRef.current);
      if (!items.length) return;

      const loopTl = horizontalLoop(items, {
        repeat: -1,
        paddingRight: 30,
        speed: 1,
      });

      const obs = Observer.create({
        target: window,
        type: "wheel,touch,pointer",
        onChangeY(self) {
          const dir = self.deltaY < 0 ? -1 : 1;

          gsap
            .timeline({ defaults: { ease: "none" } })
            .to(loopTl, { timeScale: dir * 3, duration: 0.2, overwrite: true })
            .to(loopTl, { timeScale: dir * 0.6, duration: 1 }, "+=0.2");
        },
      });

      return () => {
        obs.kill();
        loopTl.kill();
      };
    },
    { scope: rootRef }
  );

  return (
    <section className="directional-marquee-container">
      <div>
        <p className="intro-text">I'm mostly the following</p>
      </div>
      <div className="scrolling-text" ref={rootRef}>
      <div className="rail">
        <h4 className="text">I DESIGN</h4>
        <Circle />
        <h4 className="text">I DEVELOP</h4>
        <Circle />  
        <h4 className="text">I GET THINGS DONE</h4>
        <Circle />

        
        <h4 className="text">I DESIGN</h4>
        <Circle />
        <h4 className="text">I DEVELOP</h4>
        <Circle />
        <h4 className="text">I GET THINGS DONE</h4>
        <Circle />
      </div>
    </div>
    </section>
    
  );
};

export default DirectionalMarquee;


function horizontalLoop(items, config = {}) {
  items = gsap.utils.toArray(items);

  const tl = gsap.timeline({
    repeat: config.repeat,
    paused: config.paused,
    defaults: { ease: "none" },
    onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100),
  });

  const length = items.length;
  const startX = items[0].offsetLeft;

  const times = [];
  const widths = [];
  const xPercents = [];

  const pixelsPerSecond = (config.speed || 1) * 100;
  const snap =
    config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1);

  gsap.set(items, {
    xPercent: (i, el) => {
      const w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px")));
      xPercents[i] = snap(
        (parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 +
          gsap.getProperty(el, "xPercent")
      );
      return xPercents[i];
    },
  });

  gsap.set(items, { x: 0 });

  const totalWidth =
    items[length - 1].offsetLeft +
    (xPercents[length - 1] / 100) * widths[length - 1] -
    startX +
    items[length - 1].offsetWidth *
      gsap.getProperty(items[length - 1], "scaleX") +
    (parseFloat(config.paddingRight) || 0);

  for (let i = 0; i < length; i++) {
    const item = items[i];
    const curX = (xPercents[i] / 100) * widths[i];

    const distanceToStart = item.offsetLeft + curX - startX;
    const distanceToLoop =
      distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");

    tl.to(
      item,
      {
        xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
        duration: distanceToLoop / pixelsPerSecond,
      },
      0
    )
      .fromTo(
        item,
        {
          xPercent: snap(
            ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
          ),
        },
        {
          xPercent: xPercents[i],
          duration:
            (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
          immediateRender: false,
        },
        distanceToLoop / pixelsPerSecond
      )
      .add("label" + i, distanceToStart / pixelsPerSecond);

    times[i] = distanceToStart / pixelsPerSecond;
  }

  tl.times = times;
  tl.progress(1, true).progress(0, true);
  return tl;
}
